export interface UserProfile {
  id: string;
  username: string;
  email: string;
  authProvider: "local" | "google" | "github";
  createdAt: string;
}

export interface UpdateProfileRequest {
  username: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}