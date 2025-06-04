'use server';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db/drizzle';
import { invitations, members, organizations, projects, taskComments, tasks, taskStatuses, users } from '@/lib/db/schema';
import { and, desc, eq, isNull } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { redirect } from 'next/dist/server/api-utils';
import { headers } from 'next/headers';
import nodemailer from 'nodemailer';

export async function getMe(userId) {
  try {
    const [data] = await db.select().from(users).where(eq(users.id, userId));

    return data;
  } catch (err) {
    return err;
  }
}

export async function getUserForWorkspace(orgId) {
  try {
    const data = await db
      .select()
      .from(users)
      .leftJoin(members, and(eq(users.id, members.userId), eq(members.organizationId, orgId)))
      .where(isNull(members.id));

    const result = data.map((item) => item.users);

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

export async function createProject({ project, description, orgId, projectId }) {
  const user = await auth.api.getSession({
    headers: await headers(),
  });

  const memberOrg = await db
    .select({
      userId: members.userId,
      email: users.email,
      name: users.name,
    })
    .from(members)
    .innerJoin(users, eq(members.userId, users.id))
    .where(eq(members.organizationId, orgId));

  const emailPromises = memberOrg.map((member) => {
    const body = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #4CAF50;">New Project Created 🎯</h2>
        <p>Hello <strong>${member.name ?? 'there'}</strong>,</p>
        <p>We’re excited to let you know that a new project titled <strong>"${project}"</strong> has just been created in your organization’s workspace.</p>
        <p>You can now start collaborating with your team, assign tasks, and track progress easily.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="margin-bottom: 5px;">🚀 Let’s get things moving!</p>
        <p>
          <a href="${process.env.BETTER_AUTH_URL}/dashboard/${orgId}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            View Project
          </a>
        </p>
        <p>If you have any questions or need support, feel free to contact us anytime.</p>
        <p style="margin-top: 30px;">Cheers,<br>Hai Motion</p>
      </div>
    `;

    return sendEmail({
      email: member.email,
      subject: `Project ${project} created`,
      text: body,
    });
  });

  try {
    // Attempt to send all emails
    await Promise.all(emailPromises);

    // Only insert project if all emails succeeded
    await db.insert(projects).values({
      id: nanoid(),
      name: project,
      organizationId: orgId,
      description: description,
      createdBy: user.user.id,
    });
  } catch (error) {
    console.error('Failed to send email(s):', error);
    throw new Error('Project creation aborted because email delivery failed.');
  }
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
    brand: values.brand ? values.brand : null,
    statusId: values.status ? values.status : null,
    dueDate: values.due ? values.due : null,
    assigneeId: values.assigne ? values.assigne : null,
    link : values.link ? values.link : null
  });

    const [status] = await db
      .select({ name: taskStatuses.name })
      .from(taskStatuses)
      .where(eq(taskStatuses.id, values.status));
      
    let statusName = status?.name;
  // Ambil semua member (gabung dengan user untuk ambil email)
  const allMembers = await db
    .select({
      email: users.email,
      name: users.name,
    })
    .from(members)
    .innerJoin(users, eq(members.userId, users.id));

    const [assignee] = await db
      .select({
        email: users.email,
        name: users.name,
      })
      .from(members)
      .innerJoin(users, eq(members.userId, users.id))
      .where(eq(members.id, values.assigne));

  const taskUrl = `${process.env.BETTER_AUTH_URL}/dashboard/${values.orgId}/project/${values.projectId}`;

  const body = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #4CAF50;">New Task Created ✅</h2>
      <p>A new task has been created: <strong>"${values.task}"</strong>.</p>
      <ul>
        <li><strong>Description:</strong> ${values.description || '-'}</li>
        <li><strong>Status:</strong> ${statusName || '-'}</li>
        <li><strong>Due Date:</strong> ${values.due ? new Date(values.due).toLocaleDateString() : '-'}</li>
        <li><strong>Assignee:</strong> ${assignee.name || '-'}</li>
        <li><strong>Link:</strong> ${values.link || '-'}</li>
        <li><strong>Brand:</strong> ${values.brand || '-'}</li>
      </ul>
      <a href="${taskUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
        View Task
      </a>
      <p style="margin-top: 30px;">Thanks,<br>Hai Motion</p>
    </div>
  `;

  // Kirim email ke semua member
  for (const member of allMembers) {
    try {
      await sendEmail({
        email: member.email,
        subject: `New Task Created: ${values.task}`,
        text: body,
      });
    } catch (err) {
      console.error(`Failed to send email to ${member.email}`, err);
      // Tidak menghentikan proses jika salah satu email gagal
    }
  }
}

export async function deleteTask(taskId) {
  await db.delete(tasks).where(eq(tasks.id, taskId));
}

export async function updateTask(values) {
  const [prevTask] = await db.select().from(tasks).where(eq(tasks.id, values.taskId));

  if (!prevTask) throw new Error('Task not found');

  let assignee = null;
  if (values.assigne) {
    [assignee] = await db
      .select({
        email: users.email,
        name: users.name,
      })
      .from(members)
      .innerJoin(users, eq(members.userId, users.id))
      .where(eq(members.id, values.assigne));

    if (!assignee?.name) throw new Error('Assignee not found');
  }

  const isAssigneeChanged = values.assigne !== prevTask.assigneeId;
  const isStatusChanged = values.status !== (prevTask.statusId ?? '');
  const isDescChanged = values.description !== prevTask.description;
  const isLinkChanged = values.link !== prevTask.link;
  const isBrandChanged = values.brand !== prevTask.brand;
  const isDueChanged = values.due?.toLocaleString() !== prevTask.dueDate?.toLocaleString();

  let statusName = null;
  if (isStatusChanged && values.status) {
    const [status] = await db
      .select({ name: taskStatuses.name })
      .from(taskStatuses)
      .where(eq(taskStatuses.id, values.status));
      statusName = status?.name;
    }

  // Ambil semua member (dengan email dan nama)
  const allMembers = await db
    .select({
      email: users.email,
      name: users.name,
    })
    .from(members)
    .innerJoin(users, eq(members.userId, users.id));

  // Email jika assignee berubah
  if (isAssigneeChanged && assignee) {
    const body = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #2196F3;">You've Been Assigned a Task 📝</h2>
        <p>Hi <strong>${assignee.name ?? 'there'}</strong>,</p>
        <p>You've just been assigned to a task: <strong>"${values.task}"</strong>.</p>
        <p>Check your dashboard to get started!</p>
        <a href="${process.env.BETTER_AUTH_URL}/dashboard/${values.orgId}/project/${values.projectId}" style="background-color: #2196F3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          View Task
        </a>
        <p style="margin-top: 30px;">Thanks,<br>Hai Motion</p>
      </div>
    `;

    try {
      await sendEmail({
        email: assignee.email,
        subject: `New Task Assigned: ${values.task}`,
        text: body,
      });
    } catch (error) {
      throw new Error('Failed to send assignment email, task update aborted.');
    }
  }

  // Email ke semua member jika ada perubahan selain assignee
  if (isStatusChanged || isDescChanged || isDueChanged || isLinkChanged) {
    const body = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #FF9800;">Task Updated 🔄</h2>
        <p>The task <strong>"${values.task}"</strong> has been updated:</p>
        <ul>
          ${isDescChanged ? `<li><strong>Description:</strong> ${values.description || '-'}</li>` : ''}
          ${isDueChanged ? `<li><strong>Due Date:</strong> ${values.due ? new Date(values.due).toLocaleDateString() : '-'}</li>` : ''}
          ${isBrandChanged ? `<li><strong>Brand:</strong> ${values.brand || '-'}</li>` : ''}
          ${isStatusChanged ? `<li><strong>Status:</strong> ${statusName || '-'}</li>` : ''}
          ${isLinkChanged ? `<li><strong>Link:</strong> ${values.link || '-'}</li>` : ''}
        </ul>
        <a href="${process.env.BETTER_AUTH_URL}/dashboard/${values.orgId}/project/${values.projectId}" style="background-color: #FF9800; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          View Task
        </a>
        <p style="margin-top: 30px;">Thanks,<br>Hai Motion</p>
      </div>
    `;

    // Kirim ke semua member
    for (const member of allMembers) {
      try {
        await sendEmail({
          email: member.email,
          subject: `Task Updated: ${values.task}`,
          text: body,
        });
      } catch (error) {
        console.error(`Failed to send update email to ${member.email}:`, error);
      }
    }
  }

  // Update task-nya
  await db
    .update(tasks)
    .set({
      name: values.task,
      description: values.description,
      brand: values.brand ? values.brand : null,
      statusId: values.status ? values.status : null,
      dueDate: values.due ? values.due : null,
      assigneeId: values.assigne ? values.assigne : null,
      link: values.link ? values.link : null,
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

    if (filters?.status) {
      conditions.push(eq(tasks.statusId, filters?.status));
    }

    if (filters?.assignee) {
      conditions.push(eq(tasks.assigneeId, filters?.assignee));
    }

    const data = await db
      .select({
        id: tasks.id,
        name: tasks.name,
        description: tasks.description,
        brand: tasks.brand,
        dueDate: tasks.dueDate,
        createdAt: tasks.createdAt,
        updatedAt: tasks.updatedAt,
        statusId: tasks.statusId,
        status: taskStatuses.name,
        assigneeId: tasks.assigneeId,
        assignee: users.name,
        assigneeEmail: users.email,
        link: tasks.link,
      })
      .from(tasks)
      .leftJoin(taskStatuses, eq(tasks.statusId, taskStatuses.id))
      .leftJoin(members, eq(tasks.assigneeId, members.id))
      .leftJoin(users, eq(members.userId, users.id))
      .where(and(...conditions))
      .orderBy(desc(tasks.createdAt));

    const start = (filters?.page - 1) * filters?.limit;
    const end = start + filters?.limit;
    const paginatedData = data?.slice(start, end);

    return { allData: data, data: paginatedData, totalData: data.length };
  } catch (err) {
    return err;
  }
}

export async function getListProject(organizationId) {
  try {
    const data = await db.select().from(projects).where(eq(projects.organizationId, organizationId)).orderBy(desc(projects.createdAt));

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
            organizationId: orgId,
            role: ' member',
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
    const data = await db
      .select({
        id: taskComments.id,
        comment: taskComments.comment,
        createdAt: taskComments.createdAt,
        userName: users.name,
        userImage: users.image,
      })
      .from(taskComments)
      .where(eq(taskComments.taskId, taskId))
      .innerJoin(members, eq(taskComments.memberId, members.id))
      .innerJoin(users, eq(members.userId, users.id))
      .orderBy(taskComments.createdAt);

    return { success: true, data };
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return { success: false, error: 'Failed to fetch comments' };
  }
}

export async function createTaskComment(taskId, memberId, commentText) {
  try {
    const newComment = {
      id: nanoid(),
      taskId,
      memberId,
      comment: commentText,
      createdAt: new Date(),
    };

    await db.insert(taskComments).values(newComment);

    return { success: true, data: newComment };
  } catch (error) {
    console.error('Failed to create comment:', error);
    return { success: false, error: 'Failed to create comment' };
  }
}

export async function sendEmail({ email, subject, text }) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // SSL
      auth: {
        user: 'it.haimotion@gmail.com',
        pass: process.env.pass_SMTP, // Gunakan App Password Gmail
      },
    });

    const mailOptions = {
      from: '"Hai Motion" <it.haimotion@gmail.com>',
      to: email,
      subject: subject,
      html: text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email terkirim:', info.response);
    return { success: true };
  } catch (error) {
    console.error('Gagal kirim email:', error);
    return { success: false, error: error };
  }
}
