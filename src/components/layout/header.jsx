import { getWorkspace } from '@/app/actions';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import SearchInput from '../search-input';
import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar';
import WorkspaceDropdown from './dropdown-workspace';
import ThemeToggle from './ThemeToggle/theme-toggle';
import { UserNav } from './user-nav';

export default async function Header({ session }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['workspaces'],
    queryFn: getWorkspace,
  });

  return (
    <header className='flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />

        <HydrationBoundary state={dehydrate(queryClient)}>
          <WorkspaceDropdown />
        </HydrationBoundary>
      </div>

      <div className='flex items-center gap-2 px-4'>
        <div className='hidden md:flex'>
          {/* <SearchInput /> */}
        </div>
        <UserNav session={session} />
        <ThemeToggle />
      </div>
    </header>
  );
}
