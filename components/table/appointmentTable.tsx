"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ReactDatePicker from "react-datepicker";

import Image from "next/image";
import { Doctor } from '@/types/appwrite.types';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  doctors: Doctor[];
}

export function AppointmentTable<TData, TValue>({
  columns,
  data,
  doctors,
}: DataTableProps<TData, TValue>) {
  // State for various filters and sorting
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    globalFilterFn: 'includesString',
    state: {
      columnFilters,
      globalFilter,
      sorting,
    },
  });

  return (
    <div className="data-table p-5">
      <div className="flex flex-wrap items-center mb-4 gap-2">
        {/* Global search input */}
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("patient")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("patient")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        {/* Status filter */}
        <Select
          onValueChange={(value) =>
            table.getColumn('status')?.setFilterValue(value === 'all' ? null : value)
          }
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        {/* Location filter */}
        <Select
          onValueChange={(value) =>
            table.getColumn('type')?.setFilterValue(value === 'all' ? null : value)
          }
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
            <SelectItem value="online">Online</SelectItem>
          </SelectContent>
        </Select>
        {/* Date filter */}
        {/* <ReactDatePicker
            //   selected={field.value}
              timeInputLabel="Time:"
              dateFormat={"MM/dd/yyyy"}
            //   wrapperClassName="date-picker"
              placeholderText='Select a specific date'
              className='shad-input border border-muted rounded-sm max-w-[200px]'
value={()=> table.getColumn("appointment")?.getFilterValue() || null}
          onChange={(date) =>
            table.getColumn('appointment')?.setFilterValue(date)
          }
            /> */}
        {/* Doctor filter */}
        <Select
  onValueChange={(value) =>
    table.getColumn('doctor')?.setFilterValue(value === 'all' ? null : value)
  }
>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Filter by doctor" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="all">All</SelectItem>
    {/* Populate this dynamically with your doctor list */}
    {doctors.map((doctor) => (
        <SelectItem key={doctor?.$id} value={doctor?.$id}>Dr. {doctor.name}</SelectItem>
    ))}
    {/* Add more doctors as needed */}
  </SelectContent>
</Select>
      </div>

      <Table className="shad-table">
        <TableHeader className="">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="shad-table-row-header">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="shad-table-row"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="table-actions">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className=""
        >
          <Image
            src={"/assets/icons/arrow.svg"}
            width={24}
            height={24}
            alt="arrow"
          />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className=""
        >
          <Image
            src={"/assets/icons/arrow.svg"}
            width={24}
            height={24}
            alt="arrow"
            className="rotate-180"
          />
        </Button>
      </div>
    </div>
  );
}
