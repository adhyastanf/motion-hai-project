import ResetPasswordViewPage from '@/features/auth/reset-password-view-page';
import { Suspense } from 'react';

export const metadata = {
  title: 'Hai Motion | Reset Password',
  description: 'Reset your Hai Motion account password securely and quickly.',
  openGraph: {
    title: 'Hai Motion | Reset Password',
    description: 'Recover access to your Hai Motion account by resetting your password.',
    url: 'https://haimotion.com/reset-password',
    siteName: 'Hai Motion',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: '/reset-password',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordViewPage />
    </Suspense>
  );
}
