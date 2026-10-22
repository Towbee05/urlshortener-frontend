import { SettingsSection } from "./SettingsSection";
import type { UserProfile } from "@/lib/types/user";

const PROVIDERS: { id: UserProfile["authProvider"]; label: string }[] = [
  { id: "local", label: "Email & password" },
  { id: "google", label: "Google" },
  { id: "github", label: "GitHub" },
];

interface ConnectedAccountsSectionProps {
  profile: UserProfile;
}

export function ConnectedAccountsSection({ profile }: ConnectedAccountsSectionProps) {
  return (
    <SettingsSection
      title="Connected accounts"
      description="Sign-in methods linked to your account"
    >
      <div className="space-y-2">
        {PROVIDERS.map((provider) => {
          const isCurrent = provider.id === profile.authProvider;
          return (
            <div
              key={provider.id}
              className="flex items-center justify-between rounded-lg border border-[#E7E5E4] px-3.5 py-2.5"
            >
              <span className="text-sm text-[#18181B]">{provider.label}</span>
              {isCurrent ? (
                <span className="rounded-full bg-[#EFF4FF] px-2 py-0.5 text-xs font-medium text-[#2563EB]">
                  Connected
                </span>
              ) : (
                <button
                  type="button"
                  disabled
                  title="Account linking isn't available yet"
                  className="rounded-md px-2 py-1 text-xs font-medium text-[#A1A1AA]"
                >
                  Connect
                </button>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-[#A1A1AA]">
        Your account is currently tied to a single sign-in method. Linking
        additional methods isn&apos;t supported yet.
      </p>
    </SettingsSection>
  );
}