import React from "react";

export default function AuthenticationLayout({ children }: {children: React.ReactNode}) {
  return (
    <div className="w-full min-h-screen bg-[url(/image/bg-cloud.jpg)] bg-cover grid place-content-center p-16">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="place-self-center hidden lg:block">
          <p className="font-black text-black text-3xl uppercase"> UrlShortener </p>
        </div>
        <div className="bg-white text-black p-20 min-w-120">
          {children}
        </div>
      </div>
    </div>
  );
}
