'use server';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db/drizzle';
import { projects, tasks, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { headers } from 'next/headers';

export async function createProject() {
  const user = await auth.api.getSession({
    headers: await headers(),
  });
  await db.insert(projects).values({
    id: nanoid(),
    name: 'Event Bola',
    organizationId: 'GxfdjFeouisYDzvjCgwNn2FjQVDKSVqP',
    description: 'sebuah event bola',
    createdBy: user.user.id,
  });
}
export async function createTask() {
  const user = await auth.api.getSession({
    headers: await headers(),
  });
  await db.insert(projects).values({
    id: nanoid(),
    name: 'Event Bola',
    organizationId: 'dNyhJdDuqBhj4sLVlXoftihT0VJkhsHi',
    description: 'sebuah event bola',
    createdBy: user.user.id,
  });
}

export async function getListProject(organizationId) {
  console.log(organizationId);
  try {
    const rawData = await db.select().from(projects).leftJoin(tasks, eq(tasks.projectId, projects.id)).where(eq(projects.organizationId, organizationId));

    const projectMap = new Map();

    for (const row of rawData) {
      const project = row.projects;
      const task = row.tasks;

      // Jika belum ada project-nya di map, tambahkan
      if (!projectMap.has(project.id)) {
        projectMap.set(project.id, {
          ...project,
          tasks: [],
        });
      }

      // Tambahkan task jika ada (hindari task null dari left join)
      if (task && task.id) {
        projectMap.get(project.id).tasks.push(task);
      }
    }

    const data = Array.from(projectMap.values());

    return { data };
  } catch (error) {
    return { error };
  }
}
