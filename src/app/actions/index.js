'use server';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db/drizzle';
import { tasks, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';

export async function createProject({ name, slug }) {
  try {
    await auth.api.createOrganization({
      headers: await headers(),
      body: {
        name,
        slug,
      },
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to delete post:', error.message);
    return { success: false, error: error.message || 'Failed to create project' };
  }
}

export async function getListProject(projectId) {
  try {
    const data = await db
      .select({
        id: tasks.id,
        title: tasks.title,
        description: tasks.description,
      })
      .from(tasks)
      .where(eq(tasks.organizationId, projectId));

    return { data };
  } catch (error) {
    return { error };
  }
}
