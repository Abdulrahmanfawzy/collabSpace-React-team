import type { ReactNode } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

export interface Column<T> {
  header: string
  cell: (row: T) => ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  getRowKey: (row: T) => string | number
  onRowClick?: (row: T) => void
}

export function DataTable<T>({ columns, data, getRowKey, onRowClick }: DataTableProps<T>) {
  return (
    <Table className="border-separate border-spacing-y-2">
      <TableHeader>
        <TableRow className="border-0 hover:bg-transparent [&>th]:border-b">
          {columns.map((col) => (
            <TableHead key={col.header}>{col.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((row) => (
          <TableRow
            key={getRowKey(row)}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
            className={cn(
              "border-0 [&>td]:bg-white [&>td]:py-3  [&>td:first-child]:pl-4 ",
              onRowClick && "cursor-pointer"
            )}
          >
            {columns.map((col) => (
              <TableCell key={col.header}>{col.cell(row)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}