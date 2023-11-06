"use client"

// import Image from 'next/image';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"

// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
import { redirect } from 'next/navigation'
 

export default function Home() {
  const openNavMenu = () => {

  }
  redirect('/overview');
  return (

    <>
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


      <section className="bg-black text-white py-16  h-screen flex justify-center">
        <div className='md:w-8/12 flex flex-col-reverse md:flex-row md:mt-36 '>

          <div className="container mb-80 md:mb-0 md:w-1/2 w-full text-center md:text-left ">
            <h1 className="text-4xl font-bold mb-4 text-gradient-to-r from-gray-100 via-gray-600 to-gray-300 w-96">
              AI Email Marketing
            </h1>
            <p className="text-xl mb-8 w-96">
              Craft compelling marketing emails with the power of Generative AI by applying RAG with Weaviate on your dataset.
            </p>
            <div className='w-96'>
            <a href="/api/auth/signin" className="shrink-0 bg-white hover:bg-gray-200 text-black px-8 py-3 rounded-full font-semibold mr-4">Try it</a>
            <a href="/overview" className="shrink-0 bg-white hover:bg-gray-200 text-black px-8 py-3 rounded-full font-semibold mr-4">Dashboard</a>
              <a href="/about" className="shrink-0 hover:bg-gray-100 hover:bg-opacity-10 text-white px-8 py-3 rounded-full font-semibold">About &gt;</a>
            </div>
          </div>
          <div className='container md:w-1/2 w-full md:ml-20 lg:ml-0'>AH</div>

        </div>
      </section>


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
          <a href="#" className="bg-black text-white px-8 py-3 rounded-full font-semibold">Try it Now</a>
        </div>
      </section>

      <footer className="bg-black text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Weaviate. All rights reserved.</p>
        </div>
      </footer>

    </>
  )
}
