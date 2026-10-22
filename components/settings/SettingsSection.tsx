import type { ReactNode } from "react";

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <div className="rounded-xl border border-[#E7E5E4] bg-white p-5">
      <div className="mb-4">
        <h2 className="text-sm font-medium text-[#18181B]">{title}</h2>
        {description && (
          <p className="mt-0.5 text-sm text-[#71717A]">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}