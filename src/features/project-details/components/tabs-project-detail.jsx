'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const tabs = [
  { name: 'Overview', value: '' },
  { name: 'List', value: 'list' },
  { name: 'Activity', value: 'activity' },
  { name: 'Settings', value: 'settings' },
];

export default function NavDetailProject() {
  const router = useRouter();
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);
  const last = segments.at(-1) || '';
  const isTab = tabs.some((tab) => tab.value === last);

  const currentTab = isTab ? last : '';
  const basePath = isTab ? '/' + segments.slice(0, -1).join('/') : pathname;

  const handleChange = (value) => router.push(value ? `${basePath}/${value}` : basePath);

  return (
    <Tabs value={currentTab} onValueChange={handleChange} className='w-full'>
      <TabsList className='w-full p-0 bg-background justify-start border-b rounded-none'>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.name} value={tab.value} className='rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary'>
            <p className='text-[13px]'>{tab.name}</p>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
