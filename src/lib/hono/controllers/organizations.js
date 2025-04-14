import { auth } from '@/lib/auth';
import { db } from '@/lib/db/drizzle';
import { members, organizations, sessions } from '@/lib/db/schema';
import { nanoid } from 'nanoid';

export const createOrganization = async (c) => {
  const body = await c.req.json();
  const session = await auth.api.getSession();

  if (!session || !session.user) {
    return c.json({ error: 'Unauthorized: You must be logged in to create an organization.' }, 401);
  }

  const { user } = session;

  const orgData = {
    id: nanoid(),
    ...body,
  };
  const org = await db.insert(organizations).values(orgData).returning();
  
  const role = 'owner'

  await db.insert(members).values({
    id: nanoid(),
    organization_id: org[0].id,
    user_id : user.id,
    role,
    createdAt: new Date(),
  });

  await auth.api.setActiveOrganization({
    organizationId : org[0].id,
    organizationSlug: body.slug
  })

  return c.json({ data: org[0] }, 200);
};
