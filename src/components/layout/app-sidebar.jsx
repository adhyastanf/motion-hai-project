'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { navItems } from '@/constants/data';
import { useGetListProject } from '@/hooks/use-query';
import { signOut } from '@/lib/client/auth-client';
import { BadgeCheck, Bell, ChevronRight, ChevronsUpDown, CreditCard, LogOut, NotepadText } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Icons } from '../icons';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Separator } from '../ui/separator';
import ProfilePic from '../assets/profilepic.png';
import Image from 'next/image';

export default function AppSidebar({ session }) {
  const pathname = usePathname();
  const router = useRouter();
  const { orgId } = useParams();
  const { state, isMobile } = useSidebar();
  const [modal, setModal] = useState('');
  const { data: projects } = useGetListProject(orgId);
  const isEmpty = projects.data.length === 0;

  async function handleSignOut() {
    await signOut();
    router.refresh();
  }

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <Image src={ProfilePic} alt='Logo Hai Motion' width={60} height={60} />
      </SidebarHeader>
      <SidebarContent className='overflow-x-hidden'>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => {
              const Icon = item.icon ? Icons[item.icon] : Icons.logo;
              const href = typeof item.url === 'function' ? item.url(orgId) : item.url;

              if (item.title === 'Projects') {
                return (
                  <SidebarMenuItem key={item.title}>
                    <Popover>
                      <PopoverTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          <Icon />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </PopoverTrigger>
                      <PopoverContent side='right' align='start' className='w-64'>
                        <p className='text-sm text-muted-foreground mb-2'>Projects</p>
                        <div className='space-y-2'>
                          <div className='cursor-pointer flex gap-1 items-center text-primary text-md'>
                            <NotepadText size={20} /> New Project
                          </div>
                          <Separator />
                          {!isEmpty ? (
                            projects.data.map((project) => (
                              <Link key={project.id} href={`project/${project.id}`} className='block capitalize text-sm hover:text-primary'>
                                {project.name}
                              </Link>
                            ))
                          ) : (
                            <p className='text-md text-muted-foreground'>No projects found</p>
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </SidebarMenuItem>
                );
              }

              return item?.items && item?.items?.length > 0 ? (
                <Collapsible key={item.title} asChild defaultOpen={item.isActive} className='group/collapsible'>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title} isActive={pathname === item.url}>
                        {item.icon && <Icon />}
                        <span>{item.title}</span>
                        <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => {
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url}>
                    <Link href={href}>
                      <Icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size='lg' className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
                  <Avatar className='h-8 w-8 rounded-lg'>
                    <AvatarImage src={session.user.image || ''} alt={session.user.name || ''} />
                    <AvatarFallback className='rounded-lg'>{session.user.name.slice(0, 2).toUpperCase() || 'CN'}</AvatarFallback>
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-semibold'>{session.user.name || ''}</span>
                    <span className='truncate text-xs'>{session.user.email || ''}</span>
                  </div>
                  <ChevronsUpDown className='ml-auto size-4' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg' side='bottom' align='end' sideOffset={4}>
                <DropdownMenuLabel className='p-0 font-normal'>
                  <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                    <Avatar className='h-8 w-8 rounded-lg'>
                      <AvatarImage src={session.user.image || ''} alt={session.user.name || ''} />
                      <AvatarFallback className='rounded-lg'>{session.user.name.slice(0, 2).toUpperCase() || 'CN'}</AvatarFallback>
                    </Avatar>
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                      <span className='truncate font-semibold'>{session.user.name || ''}</span>
                      <span className='truncate text-xs'> {session.user.email || ''}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleSignOut()}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
