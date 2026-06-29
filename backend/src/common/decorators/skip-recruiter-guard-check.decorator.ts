import { SetMetadata } from '@nestjs/common';

export const SKIP_RECRUITER_GUARD_KEY = 'skipRecruiterGuard';
export const SkipRecruiterGuardCheck = () => SetMetadata(SKIP_RECRUITER_GUARD_KEY, true);