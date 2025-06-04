'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ProjectItem({ projects }) {
  const pathname = usePathname();
  const isEmpty = projects?.data?.length === 0;

  if (isEmpty) {
    return (
      <div className="flex h-[250px] items-center justify-center">
        <p className="text-md text-muted-foreground">No projects available</p>
      </div>
    );
  }

  return (
    <>
      {projects.data.map((project) => {
        return (
          <Link key={project.id} href={`${pathname}/project/${project.id}`}>
            <div className="flex gap-3 items-center capitalize hover:text-primary transition-colors">
              <Avatar className="rounded-md">
                <AvatarImage src={project?.logo} alt={project.name} />
                <AvatarFallback>{project.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <h1>{project.name}</h1>
            </div>
          </Link>
        );
      })}
    </>
  );
}
