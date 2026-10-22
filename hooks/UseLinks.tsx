"use client";

import useSWR from "swr";
import apiClient from "@/lib/api/apiClient";
import type { ShortLink, CreateLinkRequest } from "@/lib/types/link";

const fetcher = (url: string) =>
  apiClient.get<{ data: ShortLink[] }>(url).then((res) => res.data.data);

export function useLinks() {
  const {
    data: links,
    error,
    isLoading,
    mutate,
  } = useSWR<ShortLink[]>("/api/v1/urls", fetcher);

  console.log(links);

  const createLink = async (payload: CreateLinkRequest) => {
    const { data } = await apiClient.post<{ data: ShortLink }>(
      "/api/v1/urls",
      payload
    );
    console.log(data);
    // Update the local cache immediately without waiting for a refetch
    await mutate((current) => [data.data, ...(current ?? [])], {
      revalidate: false,
    });
    return data.data;
  };

  const deleteLink = async (id: string) => {
    await apiClient.delete(`/api/v1/urls/${id}`);
    await mutate((current) => current?.filter((link) => link.id !== id), {
      revalidate: false,
    });
  };

  return {
    links: links ?? [],
    loading: isLoading,
    error: error ? "Unable to load your links right now." : null,
    createLink,
    deleteLink,
    refetch: mutate,
  };
}
