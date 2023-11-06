"use client"
import weaviate, { ApiKey } from 'weaviate-ts-client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { LineWave } from  'react-loader-spinner'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

import DashboardLayout from '@/components/aj/dashboardPageLayout';
export default function Campaigns() {
  const [retrievedHotels, setRetrievedHotels] = useState([])
  const [loadingData, setLoadingData] = useState(false)
  const [selectedAmenity, setSelectedAmenity] = useState('')
  const [loadedEmail, setLoadedEmail] = useState(false)

  const selectAmenity = (e) =>{
    setSelectedAmenity(e)
    setRetrievedHotels([])
    setLoadedEmail(false)
  }

  const WEAVIATE_API_KEY = "INSERT_API_KEY_HERE"
  const WEAVIATE_ENDPOINT_URL = "INSERT_WEAVIATE_ENDPOINT_URL"
  const OPENAI_API_KEY = "INSERT_OPENAI_API_KEY"

  const retrieveHotels = async () => {

    if (selectedAmenity == "") {
      alert("Please select an amenity")
      return
    }
    setLoadedEmail(true)
    setLoadingData(true)
    const client = weaviate.client({
      scheme: 'https',
      host: WEAVIATE_ENDPOINT_URL,
      apiKey: new ApiKey(WEAVIATE_API_KEY),
      headers: { 'X-OpenAI-Api-Key': OPENAI_API_KEY},  
    });

    const response = await client.graphql
      .get()
      .withClassName('Hotel')
      .withFields('name, address, nightlyRate, topAmenityImage')
      .withWhere({
        path: ['topAmenity'],
        operator: 'Equal',
        valueText: selectedAmenity,
      })
      .withGenerate({
        singlePrompt: "write a very short paragraph about this hotel and it's amenity of {topAmenity}. This paragraph will be placed in a marketing email featuring hotels with this amenity {topAmenity}. Keep it short. The hotel is named {name} located at {address} with a nightly rate starting at just {nightlyRate}.",
      })
      .do();
    setLoadingData(false)
    console.log(response.data.Get.Hotel)
    setRetrievedHotels(response.data.Get.Hotel);
  }

  return (

    <>
      <DashboardLayout>
        <main className=''>
          
          <div className="h-[calc(100vh-60px)] overflow-auto pb-10">
            <div className="flex flex-col mx-auto max-w-5xl px-6 py-8">
              <div className="flex items-center justify-between">
            
                 <div className="flex  items-center gap-6 md:flex-row">
            
            <img src="/verbaDogLogo.png" width={80} height={80} />
            
            
            <div>
              <span className="text-sm text-slate-11 font-semibold">Generate & Send</span>
              <h1 className="text-xl tracking-[-0.16px] text-slate-12 font-bold">RAG For Hotel Marketing</h1>
            </div>
          </div>
        </div>
              
              <div className='flex space-x-5 pt-4'>
                <Card className="w-[350px]">
                  <CardHeader>
                    <CardTitle>Hotel Retriever</CardTitle>
                    <CardDescription>Augment your emails with retrieved data.</CardDescription>
                  </CardHeader>
                  <CardContent>

                  <form>
                      <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Email Subject</Label>
                          <Input id="name" placeholder="Email Subject for your campaign" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="hotelAttribute">Attribute Selector</Label>
                          <Select onValueChange={(e)=>{selectAmenity(e)}}>
                            <SelectTrigger id="hotelAttribute">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">

                              <SelectItem value="Personalized Butler Service">Personalized Butler Service</SelectItem>
                              <SelectItem value="Spa and Wellness Centers">Spa and Wellness Centers</SelectItem>
                              <SelectItem value="Private Infinity Pools">Private Infinity Pools</SelectItem>
                              <SelectItem value="Helipad or Private Jet Access">Helipad or Private Jet Access</SelectItem>
                              <SelectItem value="Michelin Starred Restaurants">Michelin Starred Restaurants</SelectItem>
                              <SelectItem value="Luxury Car Service">Luxury Car Service</SelectItem>
                              <SelectItem value="Rooftop Bars or Lounges">Rooftop Bars or Lounges</SelectItem>
                              <SelectItem value="Private Beach Access">Private Beach Access</SelectItem>
                              <SelectItem value="Custom Bedding and Pillow Menus">Custom Bedding and Pillow Menus</SelectItem>
                              <SelectItem value="State-of-the-art Technology">State-of-the-art Technology</SelectItem>
                              <SelectItem value="Personal Chefs">Personal Chefs</SelectItem>
                              <SelectItem value="24/7 Room Service">24/7 Room Service</SelectItem>
                              <SelectItem value="Exclusive Experiences">Exclusive Experiences</SelectItem>
                              <SelectItem value="Personal Shopping Concierge">Personal Shopping Concierge</SelectItem>
                              <SelectItem value="Private Cinema">Private Cinema</SelectItem>
                              <SelectItem value="Temperature-controlled Wine Fridges">Temperature-controlled Wine Fridges</SelectItem>
                              <SelectItem value="Fully-equipped Gyms and Personal Trainers">Fully-equipped Gyms and Personal Trainers</SelectItem>
                              <SelectItem value="Yoga and Meditation Classes">Yoga and Meditation Classes</SelectItem>
                              <SelectItem value="Pet Services">Pet Services</SelectItem>
                              <SelectItem value="Cultural Immersion Activities">Cultural Immersion Activities</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={retrieveHotels}>RAG</Button>
                  </CardFooter>
                </Card>
                <Card className="w-[600px]">
                  <CardHeader>
                    <CardTitle>Results</CardTitle>
                    <CardDescription>Augment your emails with retrieved data.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loadingData ?
                    <div className='flex justify-center py-10'>
                      <LineWave
                        height="100"
                        width="100"
                        color="#ffffff"
                        ariaLabel="line-wave"
                        visible={true}
                      />
                    </div>
                 :
                  <Table className='h-60 overflow-scroll'>
                    <TableCaption>A list of retrieved hotels based on your retrieval query.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead className="text-right">Nightly Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {retrievedHotels.map((hotel) => (
                        <TableRow key={hotel.name}>
                          <TableCell className="font-medium">{hotel.name}</TableCell>
                          <TableCell>{hotel.address}</TableCell>
                          <TableCell className="text-right">{hotel.nightlyRate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  }
                  </CardContent>
                  {/* <CardFooter className="flex justify-end">
                    <Button>Augmented Generation</Button>
                  </CardFooter> */}
                </Card>


              </div>
              
                </div>
                
                <div className="mx-auto max-w-5xl px-6">
                  <div dir="ltr" data-orientation="horizontal" className="rounded-md border border-slate-6">
                    <div role="tablist" aria-orientation="horizontal" className="relative flex justify-between px-4 pb-3 pt-4" tabIndex="0" data-orientation="horizontal" >
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className="inline-flex cursor-pointer select-none items-center text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-6 data-[state=active]:text-slate-12 text-slate-11 transition-colors duration-150 ease-in-out hover:text-slate-12 h-[22px] rounded px-1" type="button" role="tab" aria-selected="true" aria-controls="radix-:r4v:-content-html" data-state="active" id="radix-:r4v:-trigger-html" tabIndex="-1" data-orientation="horizontal" data-radix-collection-item="">
                            <span className="relative z-10 flex h-full w-full items-center justify-center gap-1.5 h-[22px] rounded px-1">HTML</span>
                            <div aria-hidden="true" className="absolute left-0 top-0 w-full bg-slate-6 h-[26px] rounded">
                            </div>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="inline-flex cursor-pointer select-none items-center text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-6 data-[state=active]:text-slate-12 text-slate-11 transition-colors duration-150 ease-in-out hover:text-slate-12 h-[22px] rounded px-1" type="button" role="tab" aria-selected="false" aria-controls="radix-:r4v:-content-text" data-state="inactive" id="radix-:r4v:-trigger-text" tabIndex="-1" data-orientation="horizontal" data-radix-collection-item=""><span className="relative z-10 flex h-full w-full items-center justify-center gap-1.5 h-[22px] rounded px-1">Plain Text</span></div></div><div className="relative"><div className="inline-flex cursor-pointer select-none items-center text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-6 data-[state=active]:text-slate-12 text-slate-11 transition-colors duration-150 ease-in-out hover:text-slate-12 h-[22px] rounded px-1" type="button" role="tab" aria-selected="false" aria-controls="radix-:r4v:-content-source" data-state="inactive" id="radix-:r4v:-trigger-source" tabIndex="-1" data-orientation="horizontal" data-radix-collection-item=""><span className="relative z-10 flex h-full w-full items-center justify-center gap-1.5 h-[22px] rounded px-1">Source</span></div></div></div></div>
           
            <div data-state="active" data-orientation="horizontal" role="tabpanel" aria-labelledby="radix-:r4v:-trigger-html" id="radix-:r4v:-content-html" tabIndex="0" className="border-t border-slate-6 outline-none border-none p-4 pt-2 outline-none" >
              
              <div className="rounded-md bg-white text-black p-4" width="100%">
              <>
                {loadedEmail ? 
                <>

                {loadingData ?

                    <div className='flex justify-center py-10'>
                      <LineWave
                        height="100"
                        width="100"
                        color="#000000"
                        ariaLabel="line-wave"
                        visible={true}
                      />
                    </div>
                  :
              

<>
              <table width="100%" cellSpacing="0" cellPadding="0" style={{margin: '0 auto', maxWidth: '600px'}}>
            <tbody>
                <tr>
                    <td style={{backgroundColor: '#ffffff', padding: '20px', textAlign: 'center'}}>
                        <h1 style={{color: '#333333', fontSize: '2em'}}>Exclusive Hotel Stays</h1>
                    </td>
                </tr>
                <tr>
                  <td>

                    <p style={{color: '#666666'}}>
                      Find your next getaway with Exclusive Hotel Stays. Your one stop shop for some of the best hotels in the world. Here's some of our featured hotels for the month.
                    </p>
                  </td>
                </tr>

                {/* Hotel 1 */}
                

                {retrievedHotels.map((hotel) => {
                  return (
                    <tr key={hotel.address}>
                      <td style={{padding: '20px', backgroundColor: '#ffffff'}}>
                        <div style={{display: 'flex', flexDirection:'column', alignItems: 'center', paddingBottom:'10px'}} >
                          <h2 style={{color: '#333333'}}>{hotel.name}</h2>
                          <h3>{hotel.address}</h3>
                          <img src={hotel.topAmenityImage} alt="Hotel 1" style={{width: '75%', height: 'auto', borderRadius:'10px'}}/>
                          </div>
                          <p style={{color: '#666666'}}>{hotel._additional.generate.singleResult}.</p>
                      </td>
                    </tr>
                  )
                })}
                

                {/* CTA */}
                <tr>
                    <td style={{backgroundColor: '#ffffff', padding: '20px', textAlign: 'center'}}>
                        <a href="https://weaviate.io/" style={{backgroundColor: '#e85050', color: '#ffffff', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px', fontSize: '16px'}}>Build with RAG today!</a>
                    </td>
                </tr>
                {/* Footer */}
                <tr>
                    <td style={{backgroundColor: '#333333', padding: '20px', textAlign: 'center'}}>
                        <p style={{color: '#ffffff'}}>Thank you for choosing us. We hope to see you soon!</p>
                    </td>
                </tr>
            </tbody>
        </table>


                <hr  style={{marginTop: '50px'}} />
                <p>
                  Generated with Weaviate - Utrechtsestraat 28 - Amsterdam, The Netherlands
                </p>
                <p style={{marginTop: '50px', color:'gray', fontSize: '.75em'}}>
                  This email was generated by applying Retrieval Augmented Generation, RAG, with the Generative Search module within Weaviate. To learn how to build your own retrieval augmented generation pipelines, connect with us today!
                </p>
              </>
            }
            </> :
            <div className='flex justify-center py-10'> No email has been generated yet</div>
}
        </>


              </div>
              
            </div>
 
                </div>
              </div>
              
          </div>
        </main>
      </DashboardLayout>
    </>
  )
}
