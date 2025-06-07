import SignViewPage from "@/features/auth/components/sigin-view";

export const metadata = {
  title: 'Hai Motion | Sign In',
  description: 'Sign in to your Hai Motion account to access your dashboard and services.',
  openGraph: {
    title: 'Hai Motion | Sign In',
    description: 'Secure login to access your personalized Hai Motion experience.',
    url: 'https://haimotion.com/sign-in',
    siteName: 'Hai Motion',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: '/sign-in',
  },
  robots: {
    index: false,
    follow: false,
  },
};

// Viewport untuk mencegah warning
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default async function SignInPage() {

  return <SignViewPage mode='login' />;
}
