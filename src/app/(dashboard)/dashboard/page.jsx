import { getWorkspace } from '@/app/actions';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  // const session = await auth.api.getSession({
  //   headers : await headers()
  // })

  // if(!session.user){
  //   return redirect('/sign-in')
  // }

  const workspaces = await getWorkspace()
  if(workspaces.length === 0){
    redirect('/dashboard/create')
  }else {
    const workspace = workspaces[0]
    return redirect(`/dashboard/${workspace?.id}`);
  }
}
