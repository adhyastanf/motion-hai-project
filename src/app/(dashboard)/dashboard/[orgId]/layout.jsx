import Header from "@/components/layout/header";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/drizzle";
import { members, organizations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function DashboardDetailLayout({ children, params }) {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { orgId } = await params;

  const workspace = await db.select().from(members).innerJoin(organizations, eq(members.organizationId, orgId)).where(eq(members.userId, session.user.id));

  const isEmpty = workspace.length === 0;

  if(isEmpty){
    return notFound()
  }

  return (
    <>
      <Header session={session} />
      {children}
    </>
  );
}
