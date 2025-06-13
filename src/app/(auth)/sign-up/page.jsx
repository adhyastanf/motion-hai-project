import SignViewPage from "@/features/auth/components/sigin-view";

export const metadata = {
  title: 'Hai Motion | Sign Up',
  description: 'Create your Hai Motion account and get started today.',
  openGraph: {
    title: 'Hai Motion | Sign Up',
    description: 'Register your account to explore premium media production services from Hai Motion.',
    url: 'https://haimotion.com/sign-up', 
    siteName: 'Hai Motion',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: '/sign-up',
  },
  robots: {
    index: false,
    follow: false,
  },
};

// Viewport agar tidak muncul warning
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default async function SignUpPage() {

  return <SignViewPage mode='register' />;
}