'use server';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db/drizzle';
import { projects, tasks, taskStatuses } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { headers } from 'next/headers';

export async function createProject(project, description, orgId) {
  const user = await auth.api.getSession({
    headers: await headers(),
  });
  await db.insert(projects).values({
    id: nanoid(),
    name: project,
    organizationId: orgId,
    description: description,
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
  try {
    const rawData = await db.select().from(projects).leftJoin(tasks, eq(tasks.projectId, projects.id)).where(eq(projects.organizationId, organizationId));

    const projectMap = new Map();

    for (const row of rawData) {
      const project = row.projects;
      const task = row.tasks;

      if (!projectMap.has(project.id)) {
        projectMap.set(project.id, {
          ...project,
          tasks: [],
        });
      }

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

export async function getStatusTask() {
  const data = await db.select().from(taskStatuses);

  return data;
}
