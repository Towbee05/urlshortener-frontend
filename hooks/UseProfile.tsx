"use client";

import useSWR from "swr";
import apiClient from "@/lib/api/apiClient";
import type { UserProfile, UpdateProfileRequest } from "@/lib/types/user";

const fetcher = (url: string) =>
  apiClient.get<{ data: UserProfile }>(url).then((res) => res.data.data);

export function useProfile() {
  const { data: profile, error, isLoading, mutate } = useSWR<UserProfile>(
    "/api/users/me",
    fetcher
  );

  const updateProfile = async (payload: UpdateProfileRequest) => {
    const { data } = await apiClient.patch<{ data: UserProfile }>(
      "/api/users/me",
      payload
    );
    await mutate(data.data, { revalidate: false });
    return data.data;
  };

  return {
    profile,
    loading: isLoading,
    error: error ? "Unable to load your profile right now." : null,
    updateProfile,
  };
}