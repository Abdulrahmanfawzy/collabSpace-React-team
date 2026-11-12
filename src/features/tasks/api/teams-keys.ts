
export const teamKeys = {
  all: ["teams"] as const,
  lists: () => [...teamKeys.all, "list"] as const,
  list: (params: { page?: number; per_page?: number }) =>
    [...teamKeys.lists(), params] as const,
}
