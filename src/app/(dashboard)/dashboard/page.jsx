import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers : await headers()
  });

  console.log(session?.user.id)

  if (!session?.user) {
    return redirect('/signIn');
  } else {
    redirect('/dashboard/overview');
  }
}
