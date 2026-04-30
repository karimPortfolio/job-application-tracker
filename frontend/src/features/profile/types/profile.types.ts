

export interface ProfileUpdatePayload {
    email?: string;
    name?: string;
    avatar?: File;
};

export interface PasswordUpdatePayload {
    currentPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
}
