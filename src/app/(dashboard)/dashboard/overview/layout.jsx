import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { PlusCircle } from 'lucide-react';
import React from 'react';
import { headers } from 'next/headers';

export default async function OverViewLayout({ area_task, area_project }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const EmptyState = (
    <div>
      <h2>Tidak ada proyek yang aktif Mulailah dengan membuat proyek pertamamu di sini.</h2>
      <Button>
        Create Project
        <PlusCircle />
      </Button>
    </div>
  );

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>Hi, Welcome back 👋</h2>
        </div>
        {/* My Project Section */}

        {/* {EmptyState} */}

        {/* <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <div className='col-span-4'>{bar_stats}</div>
          <div className='col-span-4 md:col-span-3'>
            {sales}
          </div>
        </div> */}

        <h2>Wednesday, March 19</h2>
        <h2>Good Afternoon, Hai Motion</h2>

        <div>
          <p>My Week</p>
          <p>Tasks completed</p>
          <p>Collaborator</p>
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <div className='col-span-4'>{area_task}</div>
          <div className='col-span-4 md:col-span-3'>{area_project}</div>
        </div>
      </div>
    </PageContainer>
  );
}
