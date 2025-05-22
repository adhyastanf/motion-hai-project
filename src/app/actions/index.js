'use server';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db/drizzle';
import { invitations, members, projects, taskComments, tasks, taskStatuses, users } from '@/lib/db/schema';
import { and, desc, eq, isNull } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { redirect } from 'next/dist/server/api-utils';
import { headers } from 'next/headers';

export async function getUserForWorkspace(orgId) {
  try {
    const data = await db
      .select()
      .from(users)
      .leftJoin(members, and(eq(users.id, members.userId), eq(members.organizationId, orgId)))
      .where(isNull(members.id));

      const result = data.map(item => item.users);

    return result;
  } catch (err) {
    return err;
  }
}

export async function getWorkspace() {
  try {
    const workspace = await auth.api.listOrganizations({
      headers: await headers(),
    });

    return workspace;
  } catch (err) {
    return err;
  }
}

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

export async function deleteProject(projectId) {
  await db.delete(projects).where(eq(projects.id, projectId));
}

export async function updateProject({ project, description, projectId }) {
  await db
    .update(projects)
    .set({
      name: project,
      description: description,
      updatedAt: new Date(),
    })
    .where(eq(projects.id, projectId));
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
    assigneeId: values.assigne ? values.assigne : null,
  });

  const [newTask] = await db
    .select({
      id: tasks.id,
      name: tasks.name,
      description: tasks.description,
      dueDate: tasks.dueDate,
      createdAt: tasks.createdAt,
      updatedAt: tasks.updatedAt,
      statusId: tasks.statusId,
      status: taskStatuses.name,
      assigneeId: tasks.assigneeId,
      assignee: users.name,
      assigneeEmail: users.email,
    })
    .from(tasks)
    .leftJoin(taskStatuses, eq(tasks.statusId, taskStatuses.id))
    .leftJoin(members, eq(tasks.assigneeId, members.id))
    .leftJoin(users, eq(members.userId, users.id))
    .where(eq(tasks.id, taskId));

  return newTask;
}

export async function deleteTask(taskId) {
  await db.delete(tasks).where(eq(tasks.id, taskId));
}

export async function updateTask(values) {
  await db
    .update(tasks)
    .set({
      name: values.task,
      description: values.description,
      statusId: values.status ? values.status : null,
      dueDate: values.due ? values.due : null,
      assigneeId: values.assigne ? values.assigne : null,
      updatedAt: new Date(),
    })
    .where(eq(tasks.id, values.taskId));
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

export async function getListTask(projectId, filters) {
  try {
    const conditions = [eq(tasks.projectId, projectId)];

    // if (filters.status) {
    //   conditions.push(eq(tasks.statusId, filters.status));
    // }

    // if (filters.assignee) {
    //   conditions.push(eq(tasks.assigneeId, filters.assignee));
    // }

    const data = await db
      .select({
        id: tasks.id,
        name: tasks.name,
        description: tasks.description,
        dueDate: tasks.dueDate,
        createdAt: tasks.createdAt,
        updatedAt: tasks.updatedAt,
        statusId: tasks.statusId,
        status: taskStatuses.name,
        assigneeId: tasks.assigneeId,
        assignee: users.name,
        assigneeEmail: users.email,
      })
      .from(tasks)
      .leftJoin(taskStatuses, eq(tasks.statusId, taskStatuses.id))
      .leftJoin(members, eq(tasks.assigneeId, members.id))
      .leftJoin(users, eq(members.userId, users.id))
      .where(and(...conditions))
      .orderBy(desc(tasks.createdAt));

    return data;
  } catch (err) {
    return err;
  }
}

export async function getListProject(organizationId) {
  try {
    const rawData = await db
      .select()
      .from(projects)
      .leftJoin(tasks, eq(tasks.projectId, projects.id))
      .leftJoin(taskStatuses, eq(tasks.statusId, taskStatuses.id))
      .leftJoin(members, eq(tasks.assigneeId, members.id))
      .leftJoin(users, eq(members.userId, users.id))
      .where(eq(projects.organizationId, organizationId));

    const projectMap = new Map();

    for (const row of rawData) {
      const project = row.projects;
      const task = row.tasks;
      const assignee = row.users;
      const taskStatus = row.task_statuses;

      if (!projectMap.has(project.id)) {
        projectMap.set(project.id, {
          ...project,
          tasks: [],
        });
      }

      if (task && task.id) {
        projectMap.get(project.id).tasks.push({
          ...task,
          status: taskStatus
            ? {
                id: taskStatus.id,
                name: taskStatus.name,
              }
            : null,
          assignee: assignee
            ? {
                id: assignee.id,
                name: assignee.name,
                email: assignee.email,
                image: assignee.image,
              }
            : null,
        });
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

    return data;
  } catch (error) {
    console.error('Error fetching organization info:', error);
    return { success: false, error: 'Failed to fetch organization members' };
  }
}

export async function generateInvitationLink(organizationId) {
  const user = await auth.api.getSession({
    headers: await headers(),
  });

  const existing = await db.select().from(invitations).where(eq(invitations.organizationId, organizationId)).where(eq(invitations.isActive, true)).limit(1);

  if (existing.length > 0) {
    return existing[0].id;
  }

  const id = nanoid();
  const isActive = true;

  const newInvitation = await db.insert(invitations).values({
    id,
    organizationId,
    role: 'member',
    inviterId: user.user.id,
    isActive,
  });

  return newInvitation.id;
}

export async function acceptInvitation(userId, orgId) {
  try {
    await auth.api.addMember({
      body: {
        userId,
        organizationId: orgId,
        role: 'member',
      },
    });

    redirect(`/dashboard/project/${orgId}`);
  } catch (err) {
    console.error(err.message);
  }
}

export async function createBulkMember(userIds, orgId) {
  try {
    await Promise.all(
      userIds.map(async (userId) => {
        return auth.api.addMember({
          body: {
            userId,
            organizationId : orgId,
            role :' member',
          },
        });
      })
    );
  } catch (err) {
    console.error(err.message);
  }
}

export async function getCommentsByTaskId(taskId) {
  try {
    const data = await db.select().from(taskComments).where(eq(taskComments.taskId, taskId)).orderBy(taskComments.createdAt);

    return { success: true, data };
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return { success: false, error: 'Failed to fetch comments' };
  }
}

export async function createTaskComment(taskId, memberId, commentText) {
  try {
    const newComment = {
      id: nanoid(), // generate ID unik
      taskId,
      memberId,
      comment: commentText,
      createdAt: new Date(), // timestamp saat ini
    };

    await db.insert(taskComments).values(newComment);

    return { success: true, data: newComment };
  } catch (error) {
    console.error('Failed to create comment:', error);
    return { success: false, error: 'Failed to create comment' };
  }
}
