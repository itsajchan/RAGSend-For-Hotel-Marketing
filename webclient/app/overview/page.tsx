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
        <main className=' overflow-auto'>
          
        <div className="h-[calc(100vh-60px)] overflow-auto pb-10">

          <div className="relative z-20 pt-[60px] md:h-screen md:max-h-[950px] md:pt-0">
            <section className="mx-auto max-w-5xl px-6 pb-8 md:h-screen md:max-h-[950px] md:max-w-7xl">
              <div className="flex h-full flex-col items-center justify-between md:flex-row md:pb-24">
                <div className="origin-center-left order-2 max-w-3xl animate-hero-text-slide-up-fade sm:shrink-0 md:order-1 lg:pl-16">
                  <h1 className="font-book font-styling font-display font-effect-hero text-center md:text-left text-[4rem] md:text-7xl leading-[4.35rem] md:leading-[5rem] tracking-tight font-gradient">Gen AI Emails <br/>for Hotels</h1>
                  <p className="sans mb-8 mt-4 max-w-[30rem] text-center leading-7 md:text-left text-base md:text-[1.125rem] md:leading-[1.5] text-slate-11 font-normal">Marketing emails land when they speak to your customers. Use your data and analytics to generate emails that land.</p>
                  <div className="flex flex-col justify-center gap-4 md:flex-row md:justify-start">
                    
                    <a className="text-base h-12 pl-5 pr-2 gap-0 font-semibold bg-white text-black hover:bg-white/90 focus-visible:ring-4 focus-visible:ring-white/30 focus-visible:outline-none focus-visible:bg-white/90 disabled:hover:bg-white inline-flex items-center border justify-center select-none rounded-full disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200" href="/campaigns">Try it now<span className="text-[#70757E]"><svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M10.75 8.75L14.25 12L10.75 15.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg></span></a>
                    
                    <a className="text-base h-12 pl-5 pr-2 gap-0 font-semibold bg-slate-1 border-slate-1 text-slate-11 hover:bg-slate-5 hover:text-slate-12 focus-visible:ring-4 focus-visible:ring-slate-7 focus-visible:outline-none focus-visible:bg-slate-6 disabled:hover:bg-slate-1 inline-flex items-center border justify-center select-none rounded-full disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200" href="/docs">Learn about Weaviate<span className="text-[#70757E]"><svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M10.75 8.75L14.25 12L10.75 15.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg></span></a>
                    
                  </div>
                </div>
                
                <div className="relative order-1 min-h-[225px] min-w-[225px] overflow-hidden grayscale md:hidden md:overflow-auto">
                  <img src="/VerbaDogLogo.png" className='w-60 py-10'/>
                </div>
                  <div className="relative order-1 transform-gpu grayscale md:order-2 md:w-[700px] hidden items-center justify-center lg:flex lg:animate-[open-scale-up-fade_1.5s_ease-in-out] before:absolute before:left-0 before:top-0 before:block before:h-full before:w-full before:rounded-full before:bg-gradient-to-br before:from-mint-5/5 before:to-yellow-6/25 before:blur-[100px] before:content-['']">
                    <div className="relative animate-webgl-scale-in-fade w-full h-full" >
                      <img src="/VerbaDogLogo.png" className=' px-20'/>
                    </div>
                  </div>
              </div>

              <div className=" mt-16 flex animate-hero-text-slide-up-fade items-center justify-center gap-2 text-center md:-mt-20">
                <span className="sans text-sm leading-[1.6] text-slate-11 font-normal">Built with </span><a href="https://weaviate.io/"><img className=' w-12 h-12' src="WeaviateLogo.svg"/></a>
              </div>
            </section>
          </div>

          <div className="flex flex-col mx-auto max-w-5xl px-6 py-8">

          <section className="py-16">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <img src="/EmailRobot2.png" alt="Feature 1" className="mx-auto mb-4" />
                  <h2 className="text-xl font-bold">Automated Creativity</h2>
                  <p>Generate captivating emails in seconds with the help of AI.</p>
                </div>
                <div className="text-center">
                  <img src="/AnalyticsDashboard.png" alt="Feature 2" className="mx-auto mb-4" />
                  <h2 className="text-xl font-bold">Data-Driven Results</h2>
                  <p>Personalize emails based on hotel data for higher conversion rates.</p>
                </div>
                <div className="text-center">
                  <img src="/puzzle.png" alt="Feature 3" className="mx-auto mb-4" />
                  <h2 className="text-xl font-bold">Easy Integration</h2>
                  <p>Seamless workflow integration to streamline your marketing efforts.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-black-100 py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to revolutionize your email marketing?</h2>
              <a href="#" className="px-8 py-3 rounded-full font-semibold">Try it Now</a>
            </div>
          </section>

          <footer className="py-8">
            <div className="container mx-auto text-center">
              <p>&copy; 2023 Weaviate. All rights reserved.</p>
            </div>
          </footer>

          </div>
          </div>
        </main>
      </DashboardLayout>
    </>
  )
}
