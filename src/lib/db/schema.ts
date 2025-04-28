import { mysqlTable, varchar, text, int, timestamp, boolean, datetime } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const users = mysqlTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: text('name').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  deletedAt: timestamp('deleted_at').notNull().defaultNow(),
});

export const sessions = mysqlTable('sessions', {
  id: varchar('id', { length: 36 }).primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: varchar('user_id', { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  activeOrganizationId: text('active_organization_id'),
});

export const accounts = mysqlTable('accounts', {
  id: varchar('id', { length: 36 }).primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: varchar('user_id', { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: datetime('access_token_expires_at'),
  refreshTokenExpiresAt: datetime('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const verifications = mysqlTable('verifications', {
  id: varchar('id', { length: 36 }).primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const organizations = mysqlTable('organizations', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: text('name').notNull(),
  slug: varchar('slug', { length: 255 }).unique(),
  logo: text('logo'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  metadata: text('metadata'),
});

export const members = mysqlTable('members', {
  id: varchar('id', { length: 36 }).primaryKey(),
  organizationId: varchar('organization_id', { length: 36 })
    .notNull()
    .references(() => organizations.id, { onDelete: 'cascade' }),
  userId: varchar('user_id', { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  role: text('role').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const invitations = mysqlTable('invitations', {
  id: varchar('id', { length: 36 }).primaryKey(),
  organizationId: varchar('organization_id', { length: 36 })
    .notNull()
    .references(() => organizations.id, { onDelete: 'cascade' }),
  email: text('email').notNull(),
  role: text('role'),
  status: text('status').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  inviterId: varchar('inviter_id', { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

export const tasks = mysqlTable('tasks', {
  id: varchar('id', { length: 36 }).primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  organizationId: varchar('organization_id', { length: 36 })
    .notNull()
    .references(() => organizations.id, { onDelete: 'cascade' }),
  statusId: varchar('status_id', { length: 36 })
    .notNull()
    .references(() => taskStatuses.id, { onDelete: 'cascade' }),
  priority: text('priority'),
  createdBy: varchar('created_by', { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const taskStatuses = mysqlTable('task_statuses', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: text('name').notNull(),
  organizationId: varchar('organization_id', { length: 36 })
    .notNull()
    .references(() => organizations.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const taskAssignees = mysqlTable('task_assignees', {
  id: varchar('id', { length: 36 }).primaryKey(),
  taskId: varchar('task_id', { length: 36 })
    .notNull()
    .references(() => tasks.id, { onDelete: 'cascade' }),
  memberId: varchar('member_id', { length: 36 })
    .notNull()
    .references(() => members.id, { onDelete: 'cascade' }),
  assignedAt: timestamp('assigned_at').notNull().defaultNow(),
});

export const taskComments = mysqlTable('task_comments', {
  id: varchar('id', { length: 36 }).primaryKey(),
  taskId: varchar('task_id', { length: 36 })
    .notNull()
    .references(() => tasks.id, { onDelete: 'cascade' }),
  memberId: varchar('member_id', { length: 36 })
    .notNull()
    .references(() => members.id, { onDelete: 'cascade' }),
  comment: text('comment').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const activityLogs = mysqlTable('activity_logs', {
  id: varchar('id', { length: 36 }).primaryKey(),
  organizationId: varchar('organization_id', { length: 36 })
    .notNull()
    .references(() => organizations.id, { onDelete: 'cascade' }),
  userId: varchar('user_id', { length: 36 }).references(() => users.id, { onDelete: 'set null' }),
  action: text('action').notNull(),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
  ipAddress: varchar('ip_address', { length: 45 }),
});

export const organizationRelations = relations(organizations, ({ many }) => ({
  members: many(members),
  activityLogs: many(activityLogs),
  invitations: many(invitations),
  tasks: many(tasks),
  taskStatuses: many(taskStatuses),
}));

export const usersRelations = relations(users, ({ many }) => ({
  members: many(members),
  invitationsSent: many(invitations),
  invitations: many(invitations),
  createdTasks: many(tasks, { relationName: 'createdBy' }),
}));

export const invitationsRelations = relations(invitations, ({ one }) => ({
  team: one(organizations, {
    fields: [invitations.organizationId],
    references: [organizations.id],
  }),
  invitedBy: one(users, {
    fields: [invitations.inviterId],
    references: [users.id],
  }),
}));

export const teamMembersRelations = relations(members, ({ one, many }) => ({
  user: one(users, {
    fields: [members.userId],
    references: [users.id],
  }),
  team: one(organizations, {
    fields: [members.organizationId],
    references: [organizations.id],
  }),
  assignedTasks: many(taskAssignees),
  taskComments: many(taskComments),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  team: one(organizations, {
    fields: [activityLogs.organizationId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

export const taskRelations = relations(tasks, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [tasks.organizationId],
    references: [organizations.id],
  }),
  status: one(taskStatuses, {
    fields: [tasks.statusId],
    references: [taskStatuses.id],
  }),
  createdBy: one(users, {
    fields: [tasks.createdBy],
    references: [users.id],
  }),
  assignees: many(taskAssignees),
  comments: many(taskComments),
}));

export const taskStatusRelations = relations(taskStatuses, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [taskStatuses.organizationId],
    references: [organizations.id],
  }),
  tasks: many(tasks),
}));

export const taskAssigneeRelations = relations(taskAssignees, ({ one }) => ({
  task: one(tasks, {
    fields: [taskAssignees.taskId],
    references: [tasks.id],
  }),
  members: one(members, {
    fields: [taskAssignees.memberId],
    references: [members.id],
  }),
}));

export const taskCommentRelations = relations(taskComments, ({ one }) => ({
  task: one(tasks, {
    fields: [taskComments.taskId],
    references: [tasks.id],
  }),
  members: one(members, {
    fields: [taskComments.memberId],
    references: [members.id],
  }),
}));
