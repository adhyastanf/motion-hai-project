import { getWorkspace } from '@/app/actions';
import { redirect } from 'next/navigation';

export default async function Dashboard() {

  const workspaces = await getWorkspace()
  if(workspaces.length === 0){
    redirect('/dashboard/create')
  }else {
    const workspace = workspaces[0]
    return redirect(`/dashboard/${workspace?.id}`);
  }
}
