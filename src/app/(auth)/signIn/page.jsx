import SignViewPage from "@/features/auth/components/sigin-view";

export const metadata = {
  title: 'Authentication | Sign In',
  description: 'Sign In page for authentication.'
};

export default async function SignInPage() {

  return <SignViewPage mode='login' />;
}
