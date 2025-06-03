import ResetPasswordViewPage from '@/features/auth/reset-password-view-page';
import { Suspense } from 'react';

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordViewPage />
    </Suspense>
  );
}
