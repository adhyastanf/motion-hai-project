'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ProjectItem({projects, isLoading}) {
  const pathname = usePathname()

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <>
      {projects.data.map((project) => {
        const initials = project.name
          .split(' ')
          .map((word) => word[0])
          .join('');
        return (
          <Link key={project.id} href={`${pathname}/project/${project.id}`}>
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
