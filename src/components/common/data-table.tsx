
import type { ReactNode } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PencilIcon, Trash2Icon } from "lucide-react"

export interface Column<T> {
  header: string
  cell: (row: T) => ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  getRowKey: (row: T) => string | number
  onRowClick?: (row: T) => void
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
    canEdit?: boolean
  canDelete?: boolean
}

export function DataTable<T>({
  columns,
  data,
  getRowKey,
  onRowClick,
  onEdit,
  onDelete,
  canEdit=true,
  canDelete=true
}: DataTableProps<T>) {
  const hasActions = !!onEdit || !!onDelete

  return (
    <Table className="border-separate border-spacing-y-2">
      <TableHeader>
        <TableRow className="border-0 hover:bg-transparent [&>th]:border-b">
          {columns.map((col) => (
            <TableHead key={col.header}>{col.header}</TableHead>
          ))}
          {hasActions && <TableHead className="w-24 text-right">Actions</TableHead>}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row) => (
          <TableRow
            key={getRowKey(row)}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
            className={cn(
              "border-0 [&>td]:bg-white [&>td]:py-3 [&>td:first-child]:pl-4",
              onRowClick && "cursor-pointer"
            )}
          >
            {columns.map((col) => (
              <TableCell key={col.header}>{col.cell(row)}</TableCell>
            ))}

            {hasActions && (
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  {onEdit &&  canEdit && (
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Edit"
                      onClick={(e) => {
                        e.stopPropagation() 
                        onEdit(row)
                      }}
                    >
                      <PencilIcon className="size-4" />
                    </Button>
                  )}
                  {onDelete && canDelete && (
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Delete"
                      className="text-destructive hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(row)
                      }}
                    >
                      <Trash2Icon className="size-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}