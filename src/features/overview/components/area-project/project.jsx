'use server';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';

export default async function ProjectItem() {
  const project = await auth.api.listOrganizations({
    headers: await headers(),
  });

  return (
    <>
      {project.map((project) => {
        const initials = project.name
          .split(' ')
          .map((word) => word[0])
          .join('');
        return (
          <Link key={project.id} href={`project/${project.id}`}>
            <div className='flex gap-3 items-center'>
              <Avatar className='rounded-md'>
                <AvatarImage src={project?.logo} alt={project.name} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <h1>{project.name}</h1>
            </div>
          </Link>
        );
      })}
    </>
  );
}
