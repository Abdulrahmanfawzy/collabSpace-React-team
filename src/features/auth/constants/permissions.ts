export const ROLE_PERMISSIONS = {
  Administrator: [
    "users.create",
    "users.update",
    "users.delete",

    "projects.create",
    "projects.update",
    "projects.delete",

    "teams.manage",
    "reports.view-all",
    "ai.configure",
    "chats.access-all",
    "settings.manage",
     "analytics.view"
  ],

  "Project Manager": [
    "projects.create",
    "projects.update",

    "tasks.manage",
    "tasks.assign",

    "meetings.schedule",
    "reports.generate",
    "analytics.view",
  ],

  "Team Member": [
    "projects.view-assigned",
    "tasks.view-assigned",
    "tasks.update-status",
    "chat.participate",
    "files.upload",
    "meetings.attend",
    "reports.view-personal",
  ],
} as const;

export type UserRole = keyof typeof ROLE_PERMISSIONS;

export type Permission =
  (typeof ROLE_PERMISSIONS)[UserRole][number];

export function hasPermission(
  role: UserRole,
  permission: Permission
) {
  return ROLE_PERMISSIONS[role]?.includes(
    permission as never
  ) ?? false;
}
