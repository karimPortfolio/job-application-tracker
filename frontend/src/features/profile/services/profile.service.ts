import { api } from "@/lib/api/axios";
import { PROFILE_ROUTES } from "../routes/profile.routes";
import {
  PasswordUpdatePayload,
  ProfileUpdatePayload,
} from "../types/profile.types";

export const update = (payload: ProfileUpdatePayload | FormData) => {
  return api.patch(PROFILE_ROUTES.update, payload);
};

export const passwordUpdate = (payload: PasswordUpdatePayload) => {
  return api.patch(PROFILE_ROUTES.passwordUpdate, payload);
};
