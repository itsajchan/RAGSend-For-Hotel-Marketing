"use client"

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from '../ui/button'
import Link from 'next/link'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const inter = Inter({ subsets: ['latin'] })

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex' >
        <aside className='hidden h-screen w-[250px] flex-shrink-0 flex-col justify-between border-r md:flex pt-5'>
          
          <div>
            <div className='pl-6'><a href="/">RAGSend</a></div>
            <div className={'flex flex-col px-2 pt-10 space-y-2'} > 
              <Link href={"/overview"} className='flex'>
                <Button className='dark:bg-neutral-950 h-10 dark:text-white dark:hover:bg-gray-600 hover:text-gray-200 font-normal text-xs  hover:bg-gray-600 hover:bg-opacity-40 justify-start	w-full'>Overview</Button>
              </Link>
              <Link href={"/hotels"} className='flex'>
                <Button className={'dark:bg-neutral-950 h-10 dark:text-white dark:hover:bg-gray-600 hover:text-gray-200 font-normal text-xs  hover:bg-gray-600 hover:bg-opacity-40 justify-start	w-full ' }>Hotels</Button>
              </Link>
              {/* <Link href={"/domains"} className='flex'>
                <Button className={'dark:bg-neutral-950 h-10 dark:text-white dark:hover:bg-gray-600 hover:text-gray-200 font-normal text-xs  hover:bg-gray-600 hover:bg-opacity-40 justify-start	w-full ' }>Domains</Button>
              </Link> */}
              <Link href={"/campaigns"} className='flex'>
                <Button className={'dark:bg-neutral-950 h-10 dark:text-white dark:hover:bg-gray-600 hover:text-gray-200 font-normal text-xs hover:bg-opacity-40 justify-start	w-full ' }>Campaigns</Button>
              </Link>
              <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='hover:bg-gray-600' variant="dark"><div className=' w-full text-left'>FAQ</div></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

            </div>
          </div>
          <div className='container pb-6 text-sm text-gray-400'>
            A Weaviate Sample Project
          </div>
        </aside>
        <div className='w-full h-screen'> 
            <div className='flex h-[60px] items-center justify-between md:justify-end border-b px-6 '>
              <div className='md:hidden'><a href="/">RAGSend</a></div>

              <Button className='h-7 border text-gray-400 bg-slate-600 bg-opacity-20 hover:text-white font-normal text-xs hover:bg-gray-600 hover:bg-opacity-40'>Learn about Weaviate</Button>

            </div>
            <div className=''>
              {children}
            </div>
        </div>
    </div>
  )
}
