export const ROLE_PERMISSIONS = {
  Administrator: [
    // Users
    "users.view",
    "users.create",
    "users.update",
    "users.delete",

    // Projects
    "projects.view",
    "projects.create",
    "projects.update",
    "projects.delete",

    // Teams
    "teams.view",
    "teams.create",
    "teams.update",
    "teams.delete",
    "teams.manage",

    // Tasks
    "tasks.view",
    "tasks.create",
    "tasks.update",
    "tasks.delete",
    "tasks.assign",
    "tasks.update-status",

    // Meetings
    "meetings.view",
    "meetings.create",
    "meetings.update",
    "meetings.delete",
    "meetings.schedule",
    "meetings.attend",

    // Reports & Analytics
    "reports.view-all",
    "reports.generate",
    "reports.view-personal",
    "analytics.view",

    // AI
    "ai.configure",
    "ai.use",

    // Chat
    "chats.access-all",
    "chat.participate",

    // Files
    "files.view",
    "files.upload",
    "files.delete",
    "files.manage",

    // Settings
    "settings.manage",
  ],

  "Project Manager": [
    // Projects
    "projects.view",
    "projects.create",
    "projects.update",

    // Teams
    "teams.view",
    "teams.manage",

    // Tasks
    "tasks.view",
    "tasks.create",
    "tasks.update",
    "tasks.delete",
    "tasks.assign",
    "tasks.update-status",

    // Meetings
    "meetings.view",
    "meetings.create",
    "meetings.update",
    "meetings.delete",
    "meetings.schedule",
    "meetings.attend",

    // Reports & Analytics
    "reports.generate",
    "analytics.view",

    // Chat
    "chat.participate",

    // Files
    "files.view",
    "files.upload",
  ],

  "Team Member": [
    // Projects
    "projects.view-assigned",

    // Tasks
    "tasks.view-assigned",
    "tasks.update-status",

    // Meetings
    "meetings.view",
    "meetings.attend",

    // Chat
    "chat.participate",

    // Files
    "files.view",
    "files.upload",

    // Reports
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