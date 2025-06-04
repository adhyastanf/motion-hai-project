'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarRail } from '@/components/ui/sidebar';
import { navItems } from '@/constants/data';
import ButtonModalProject from '@/features/list-task/components/list-project-tables/modal-project';
import { useGetListProject } from '@/hooks/use-query';
import { ChevronRight, NotepadText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useState } from 'react';
import ProfilePic from '../assets/profilepic.png';
import { Icons } from '../icons';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Separator } from '../ui/separator';

export default function AppSidebar() {
  const pathname = usePathname();
  const { orgId } = useParams();
  const [modal, setModal] = useState('');
  const { data: projects } = useGetListProject(orgId);
  const isEmpty = projects.data.length === 0;

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <Link href={'/dashboard'}>
          <Image src={ProfilePic} alt='Logo Hai Motion' width={60} height={60} />
        </Link>
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
                          <Button className='cursor-pointer flex gap-1 items-center text-sm w-full' onClick={() => setModal('create')}>
                            <NotepadText size={20} /> New Project
                          </Button>
                          <Separator />
                          <ButtonModalProject modal={modal} setModal={setModal} />

                          <ScrollArea className='h-20 pr-2'>
                            {!isEmpty ? (
                              <div className='space-y-2'>
                                {projects.data.map((project) => (
                                  <Link key={project.id} href={`project/${project.id}`} className='flex items-center gap-2 text-sm capitalize hover:text-primary transition-colors duration-200'>
                                    <Avatar className='h-6 w-6'>
                                      <AvatarFallback>{project.name.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    {project.name}
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              <p className='text-md text-muted-foreground'>No projects found</p>
                            )}
                          </ScrollArea>
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
      <SidebarRail />
    </Sidebar>
  );
}
