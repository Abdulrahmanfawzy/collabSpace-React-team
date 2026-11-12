import { Skeleton } from "@/components/ui/skeleton"

export function ProjectsLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/3 text-secondary-gray-600" />

      {[1, 2, 3, 4].map((item) => (
        <Skeleton
          key={item}
          className="h-16 w-full"
        />
      ))}
    </div>
  )
}