import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { openAPI, organization } from 'better-auth/plugins';
import { db } from './db/drizzle';

import { accounts, activityLogs, invitations, members, organizations, projects, sessions, taskComments, tasks, taskStatuses, users, verifications } from './db/schema';
import { sendEmail } from '@/app/actions';

export const auth = betterAuth({
  plugins: [openAPI(), organization()],
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: true,
    async sendResetPassword({ user, url }) {
      await sendEmail({
        email: user.email,
        subject: 'Reset Your Password',
        text: `Click the link to reset your password: ${url}`,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        email: user.email,
        subject: 'Email Verification, Hai Motion',
        text: `Click the link to verify your email: ${url}`,
      });
    },
  },
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url, token }) => {
        await sendEmail({
          email: newEmail,
          subject: 'Approve email change',
          text: `Click the link to approve the change: ${url}`,
        });
      },
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
      tasks,
      taskStatuses,
      taskComments,
      activityLogs,
    },
    provider: 'mysql',
    usePlural: true,
  }),
});
