import { updateAssigneTask, updateStatusTask } from '@/app/actions';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ButtonCreateTask from '@/features/list-project/components/list-project-tables/modal-task';
import ButtonModalProject from '@/features/list-project/components/list-project-tables/modal-project';
import { useGetMembers, useGetStatusTask } from '@/hooks/use-query';
import { flexRender, getCoreRowModel, getExpandedRowModel, useReactTable } from '@tanstack/react-table';
import { format } from 'date-fns';
import { MoreHorizontal, PlusSquareIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '../button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../dropdown-menu';
import SelectField from '../select-options';

export default function TaskTable({ data, columns, orgId }) {
  const [tasks, setTasks] = useState(data);
  const [modal, setModal] = useState('');
  const [modalTask, setModalTask] = useState('');
  const [selectedProject, setSelectedProject] = useState({});
  const [selectedTask, setSelectedTask] = useState({});
  const { data: taskOptions } = useGetStatusTask();
  const { data: memberOptions } = useGetMembers(orgId);
  
  const MODAL_CONSTANT = ['update', 'delete', 'create'];

  useEffect(() => {
    setTasks(data);
  }, [data]);

  const handleStatusChange = async (taskId, subtaskId, newStatus) => {
    const updated = tasks.map((task) => {
      if (task.id !== taskId) return task;

      return {
        ...task,
        tasks: task.tasks.map((sub) => (sub.id === subtaskId ? { ...sub, statusId: newStatus } : sub)),
      };
    });

    setTasks(updated);

    await updateStatusTask({ taskId: subtaskId, status: newStatus });
  };

  const handleAssigneeChange = async (taskId, subtaskId, newAssigneeId) => {
    const updated = tasks.map((task) => {
      if (task.id !== taskId) return task;

      return {
        ...task,
        tasks: task.tasks.map((sub) => (sub.id === subtaskId ? { ...sub, assigneeId: newAssigneeId } : sub)),
      };
    });

    setTasks(updated);

    await updateAssigneTask({ taskId: subtaskId, member: newAssigneeId });
  };

  const table = useReactTable({
    data: tasks,
    columns: columns(setSelectedProject, setModal),
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
      <div className='flex justify-end gap-2'></div>

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
                          <TableCell className='pl-8'>{sub.name}</TableCell>
                          <TableCell>
                            <SelectField value={sub?.statusId || ''} onValueChange={(value) => handleStatusChange(task.id, sub.id, value)} options={taskOptions} placeholder='Select status' />
                          </TableCell>
                          <TableCell>
                            <SelectField value={sub?.assigneeId || ''} onValueChange={(value) => handleAssigneeChange(task.id, sub.id, value)} options={memberOptions?.data} placeholder='Select Assignee' />
                          </TableCell>
                          <TableCell>{sub?.dueDate ? format(sub.dueDate, 'MMM dd, yyyy') : ''}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant='ghost' className='h-8 w-8 p-0'>
                                  <MoreHorizontal />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align='end'>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setModalTask('update');
                                    setSelectedTask({ projectId: task.id, ...sub });
                                  }}
                                >
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setModalTask('delete');
                                    setSelectedTask({ projectId: task.id, ...sub });
                                  }}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}

                    <TableRow>
                      <TableCell colSpan={4}>
                        <Button
                          className='flex gap-5 items-center self-start'
                          variant='ghost'
                          onClick={() => {
                            setModalTask('create');
                            setSelectedTask({ projectId: task.id });
                          }}
                        >
                          <PlusSquareIcon size={40} />
                          <h1>Create Task</h1>
                        </Button>
                      </TableCell>
                    </TableRow>
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
        {MODAL_CONSTANT.includes(modal) && <ButtonModalProject modal={modal} setModal={setModal} projectId={selectedProject?.id} initialData={selectedProject} />}
        {MODAL_CONSTANT.includes(modalTask) && <ButtonCreateTask modal={modalTask} setModal={setModalTask} projectId={selectedTask?.projectId} taskId={selectedTask?.id} initialData={selectedTask} taskOptions={taskOptions} memberOptions={memberOptions?.data} />}
      </div>
    </div>
  );
}
