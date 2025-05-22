'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as ReTooltip, Legend as ReLegend, ResponsiveContainer } from 'recharts';

export default function TaskOverview({ data = [], isLoading }) {
  if (isLoading) return <p className='text-center text-gray-500 italic'>Loading task overview...</p>;

  const statusCounts = {
    todo: data.filter((task) => task.status === 'todo').length,
    inprogress: data.filter((task) => task.status === 'inprogress').length,
    done: data.filter((task) => task.status === 'done').length,
    unassigned: data.filter((task) => !task.assignee).length,
    total: data.length,
  };

  const completionRate = statusCounts.total ? Math.round((statusCounts.done / statusCounts.total) * 100) : 0;

  const pieData = [
    { name: 'To Do', value: statusCounts.todo },
    { name: 'In Progress', value: statusCounts.inprogress },
    { name: 'Done', value: statusCounts.done },
  ];

  const COLORS = ['#2563EB', '#D97706', '#059669'];

  const memberMap = {};

  data.forEach((task) => {
    if (!task.assignee) return;

    const name = task.assignee;

    if (!memberMap[name]) {
      memberMap[name] = { todo: 0, inprogress: 0, done: 0 };
    }

    if (task.status === 'todo') memberMap[name].todo++;
    if (task.status === 'inprogress') memberMap[name].inprogress++;
    if (task.status === 'done') memberMap[name].done++;
  });

  const barData = Object.entries(memberMap).map(([name, status]) => ({
    name,
    ...status,
  }));

  return (
    <div className='flex flex-col gap-8'>
      {/* Summary Cards */}
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6'>
        {[
          { label: 'Total Tasks', value: statusCounts.total, detail: `In Progress: ${statusCounts.inprogress} To Do: ${statusCounts.todo} Done: ${statusCounts.done}` },
          { label: 'Completion Rate', value: completionRate, rate: completionRate },
          { label: 'To Do', value: statusCounts.todo },
          { label: 'In Progress', value: statusCounts.inprogress },
          { label: 'Unassigned', value: statusCounts.unassigned },
        ].map(({ label, value, detail, rate }) => (
          <Card key={label} className='shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg text-2xl m-0 py-3 px-4'>
            <CardHeader className='border-gray-200 text-sm p-0 text-black/50'>{label}</CardHeader>
            <CardContent className='p-0'>
              <p className='font-semibold p-0 mb-1'>{rate ? `${value}%` : value}</p>
              {rate ? <Progress value={value} className='h-2 m-0' /> : <p className='border-gray-200 text-xs p-0 text-black/50'>{detail}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
        {/* Pie Chart */}
        <Card className='shadow-lg rounded-lg'>
          <CardHeader className='border-gray-200'>
            <p className='text-xl font-semibold text-gray-800'>Task Type Distribution</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={320}>
              <PieChart>
                <Pie data={pieData} cx='50%' cy='50%' outerRadius={110} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} dataKey='value' stroke='none'>
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ReTooltip formatter={(value) => [`${value}`, 'Tasks']} contentStyle={{ backgroundColor: '#1e293b', borderRadius: 8, border: 'none' }} itemStyle={{ color: '#f9fafb' }} />
                <ReLegend verticalAlign='bottom' height={36} wrapperStyle={{ fontWeight: '200', fontSize: 14, color: '#374151', margin: 'auto' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className='shadow-lg rounded-lg'>
          <CardHeader className='border-gray-200'>
            <p className='text-xl font-semibold text-gray-800'>Team Performance by Status</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={barData} layout='vertical' margin={{ top: 10, right: 20, bottom: 5 }}>
                <XAxis type='number' tick={{ fill: '#6b7280', fontWeight: '200' }} axisLine={{ stroke: '#9ca3af' }} tickLine={false} />
                <YAxis dataKey='name' type='category' tick={{ fill: '#374151', fontWeight: '200', fontSize: 12 }} axisLine={false} tickLine={false} width={120} />
                <ReTooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ backgroundColor: '#111827', borderRadius: 6, border: 'none' }} itemStyle={{ color: '#f9fafb' }} />
                <ReLegend
                  verticalAlign='bottom'
                  wrapperStyle={{
                    fontWeight: '200',
                    fontSize: 14,
                    color: '#374151',
                    marginBottom: 12,
                    textAlign: 'center',
                  }}
                />
                <Bar dataKey='todo' stackId='a' fill={COLORS[0]} name='To Do' />
                <Bar dataKey='inprogress' stackId='a' fill={COLORS[1]} name='In Progress' />
                <Bar dataKey='done' stackId='a' fill={COLORS[2]} name='Done' />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
