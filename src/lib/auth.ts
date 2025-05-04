import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { openAPI, organization } from 'better-auth/plugins';
import { db } from './db/drizzle';

import { projects, projectStatuses, accounts, sessions, users, verifications, organizations, members, invitations, tasks, taskStatuses, taskAssignees, taskComments, activityLogs } from './db/schema';

export const auth = betterAuth({
  plugins: [openAPI(), organization()],
  emailAndPassword: {
    enabled: true,
    async sendResetPassword(url, user) {
      console.log('Sending reset password email to', user?.email, 'with url', url);
    },
  },
  database: drizzleAdapter(db, {
    schema: {
      users,
      sessions,
      accounts,
      verifications,
      organizations,
      members,
      invitations,
      projects,
      projectStatuses,
      tasks,
      taskStatuses,
      taskAssignees,
      taskComments,
      activityLogs,
    },
    provider: 'mysql',
    usePlural: true,
  }),
});
