'use server';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db/drizzle';
import { projects, taskAssignees, tasks, taskStatuses } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { headers } from 'next/headers';

export async function createProject({ project, description, orgId }) {
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
export async function createTask(values) {
  const taskId = nanoid();
  await db.insert(tasks).values({
    id: taskId,
    projectId: values.projectId,
    name: values.task,
    description: values.description,
    statusId: values.status ? values.status : null,
    dueDate: values.due ? values.due : null,
    assigneeId: values.assigne ? values.assigne : null
  });
}

export async function updateStatusTask(values) {
  const { taskId, status } = values;
  await db
  .update(tasks)
  .set({
    statusId: status ? status : null, 
  })
  .where({ id: taskId });
}

export async function updateAssigneTask(values) {
  const { taskId, member } = values;
  await db
  .update(tasks)
  .set({
    assigneeId: member ? member : null, 
  })
  .where({ id: taskId });
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

    return { success: true, data };
  } catch (error) {
    return { error: 'Failed to fetch project list' };
  }
}

export async function getStatusTask() {
  try {
    const data = await db.select().from(taskStatuses);
    return data;
  } catch (error) {
    console.error('Error fetching task statuses:', error);
    return { success: false, error: 'Failed to get task statuses' };
  }
}

export async function getMemberOfOrganization(orgId) {
  try {
    const rawData = await auth.api.getFullOrganization({
      headers: await headers(),
      query: {
        organizationId: orgId,
      },
    });

    const data = rawData.members.map((member) => ({
      id: member.id,
      userId: member.userId,
      name: member.user.name,
      email: member.user.email,
      role: member.role,
    }));

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching organization info:', error);
    return { success: false, error: 'Failed to fetch organization members' };
  }
}
