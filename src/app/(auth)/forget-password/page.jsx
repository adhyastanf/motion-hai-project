import ForgetPasswordViewPage from "@/features/auth/forget-password-view-page";

export const metadata = {
  title: 'Hai Motion | Forgot Password',
  description: 'Recover your Hai Motion account password easily.',
  openGraph: {
    title: 'Hai Motion | Forgot Password',
    description: 'Start the process to recover your Hai Motion account.',
    url: 'https://haimotion.com/forget-password',
    siteName: 'Hai Motion',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: '/forget-password',
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

export default function ForgetPasswordPage() {
  return <ForgetPasswordViewPage />;
}
