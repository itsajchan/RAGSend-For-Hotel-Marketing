"use client"

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NavBar } from '@/components/aj/navbar';
import { NavMenu } from '@/components/aj/navmenu';
import DashboardLayout from '@/components/aj/dashboardPageLayout';
export default function Campaigns() {

  return (

    <>
    <DashboardLayout>
        <main className=''>
          <h1 className='text-2xl'>
            Campaigns
          </h1>
        </main>
      </DashboardLayout>
    </>
  )
}
