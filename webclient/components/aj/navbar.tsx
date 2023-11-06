"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const openNavMenu = () => { }
const NavBar = (
  ({ className, type, ...props }, ref) => {
    return (
      <nav className="bg-black text-white shadow-md">
        <div className="container mx-auto px-4 py-1 flex justify-between items-center">
          <a href="#" className="text-xl font-bold">RAGSend</a>
          <div className="lg:hidden" id="burger">
            <button className="flex items-center px-3 py-2 border rounded" onClick={openNavMenu}>
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
            </button>
          </div>

          <ul className="space-x-4 lg:space-x-0 lg:flex hidden" id="menu">
            <li className="lg:px-4 lg:py-2 mt-2 lg:mt-0"><a href="#" className="hover:bg-black px-4 py-2 block rounded">Home</a></li>
            <li className="lg:px-4 lg:py-2 mt-2 lg:mt-0"><a href="/about" className="hover:bg-black px-4 py-2 block rounded">About</a></li>
            <li className="lg:px-4 lg:py-2 mt-2 lg:mt-0"><a href="#" className="hover:bg-black px-4 py-2 block rounded">Services</a></li>
            <li className="lg:px-4 lg:py-2 mt-2 lg:mt-0"><a href="#" className="hover:bg-black px-4 py-2 block rounded">Contact</a></li>
          </ul>

        </div>
      </nav>
    )
  }
)

export { NavBar }
