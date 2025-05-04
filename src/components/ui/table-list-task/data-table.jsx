import React, { useState } from 'react';
import { getCoreRowModel, useReactTable, flexRender, getExpandedRowModel } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';

const STATUS_OPTIONS = [
  {
    value: 'To Do',
    name: 'To Do',
  },
  {
    value: 'In Progress',
    name: 'In Progress',
  },
  {
    value: 'In Review',
    name: 'In Review',
  },
  {
    value: 'Done',
    name: 'Done',
  },
];
// Opsi assignee (id dan name)
const ASSIGNEE_OPTIONS = [
  { value: null, name: 'No Assignee' },
  { value: 'alice', name: 'Alice' },
  { value: 'bob', name: 'Bob' },
  { value: 'charlie', name: 'Charlie' },
];

export default function TaskTable({ data, columns }) {
  const [tasks, setTasks] = useState(data);

  const handleStatusChange = (taskId, subtaskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((sub) => (sub.id === subtaskId ? { ...sub, status: newStatus } : sub)),
            }
          : task
      )
    );
  };

  const handleAssigneeChange = (taskId, subtaskId, newAssigneeId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((sub) => (sub.id === subtaskId ? { ...sub, assignee: newAssigneeId } : sub)),
            }
          : task
      )
    );
  };

  const table = useReactTable({
    data: tasks,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
  });

  const toggleAllRows = () => {
    // setExpandedRows(
    //   expandedRows.length === data.length ? [] : data.map((task) => task.id)
    // );
  };

  return (
    <div className='space-y-4'>
      <div className='flex justify-end gap-2'>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows ? (
              table.getRowModel().rows.map((row) => {
                const task = row.original;

                return (
                  <React.Fragment key={task.id}>
                    <TableRow>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>

                    {row.getIsExpanded() &&
                      task.tasks.map((sub) => (
                        <TableRow key={sub.id} className='bg-muted/50'>
                          <TableCell />
                          <TableCell className='pl-8'>{sub.title}</TableCell>
                          <TableCell>
                            <ReusableSelect value={sub.status} onValueChange={(value) => handleStatusChange(task.id, sub.id, value)} options={STATUS_OPTIONS} placeholder='Select status' />
                          </TableCell>
                          <TableCell>
                            <ReusableSelect value={sub.assignee} onValueChange={(value) => handleAssigneeChange(task.id, sub.id, value)} options={ASSIGNEE_OPTIONS} placeholder='Select Assignee' />
                          </TableCell>
                        </TableRow>
                      ))}

                    {/* <TableRow>
                    <TableCell colSpan={4}>
                      <Button>New Task</Button>
                    </TableCell>
                  </TableRow> */}
                  </React.Fragment>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function ReusableSelect({ value, onValueChange, options, placeholder }) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className='w-[150px]'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
