import SignViewPage from '@/features/auth/components/sigin-view';

export const metadata = {
  title: 'Authentication | Sign Up',
  description: 'Sign Up page for authentication.'
};

export default async function SignUpPage() {

  return <SignViewPage mode='register' />;
}
