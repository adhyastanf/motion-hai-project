'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ProjectItem({projects}) {
  const pathname = usePathname()
  const isEmpty = projects.data.length === 0;

  return (
    <>
      {isEmpty ? (
        <p className="text-md text-muted-foreground">No projects available</p>
      ) : (
        projects.data.map((project) => {
          const initials = project.name
            .split(' ')
            .map((word) => word[0])
            .join('');
          return (
            <Link key={project.id} href={`${pathname}/project/${project.id}`}>
              <div className="flex gap-3 items-center capitalize hover:text-primary transition-colors">
                <Avatar className="rounded-md">
                  <AvatarImage src={project?.logo} alt={project.name} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <h1>{project.name}</h1>
              </div>
            </Link>
          );
        })
      )}
    </>
  );
}
