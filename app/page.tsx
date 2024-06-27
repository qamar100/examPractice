'use client'

import React, { useEffect } from 'react'
import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { formSchema } from '@/schemas/useschema'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createUser } from '@/actions/createLorem'
import { getLorems } from '@/actions/getLorem'

const Home = () => {

  const [users, setUsers] = useState<any[]>([]);  // Add a state variable to store the users
  useEffect(() => {
    
    getLorems().then((data) => {
      setUsers(data);
    }).catch((error) => {
      console.error(error);
    })
   
  } , [])

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    //
    // console.log(values)
    //fetching from the database
   

    createUser(values)
  }
  return (
    <div className=' flex flex-col bg-yellow-100 h-screen '>
      
      <div className=" h-[100px] 
      pt-8 px-8 grid grid-cols-3 gap-4">
  <div className=' bg-green-200 shadow-xl rounded min-h-[60px]  text-center text-black text-3xl'> hello</div>
  
  <div className='bg-pink-300 shadow-xl rounded min-h-[60px]  text-center text-black text-3xl'>From the </div>
  <div className='bg-red-300 shadow-xl rounded min-h-[60px]  text-center text-black text-3xl'>other side</div>
      </div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
      </Form>     
      {/* <div className=' pt-8 px-8 grid grid-rows-3 gap-4'>
        <div className=' bg-white shadow-xl rounded min-h-[90px]  text-center text-black text-3xl '>
          This box 1
          <Button className='flex flex-col bg-red-600'>
          Click me
          </Button>
        </div>
        <div className=' bg-white shadow-xl rounded min-h-[60px]  text-center text-black text-3xl'>
          This is box 2
          <Button className='flex flex-col bg-red-600'>
          Click me
          </Button>
        </div>
        <div className=' bg-white shadow-xl rounded min-h-[60px]  text-center text-black text-3xl'>
          This is box 3
          <Button className='flex flex-col bg-red-600'>
          Click me
          </Button>
          </div>
      </div> */}
      <div className='pt-8 px-8 grid grid-rows-3 gap-4'>
      {users.map((users: any) => (
        <div key={users.id} className='bg-white shadow-xl rounded min-h-[90px] text-center text-black text-3xl'>
          <div>{users.username}</div>
          {/* Add more user data here, like user.email, user.name, etc. */}
          <Button className='flex flex-col bg-red-600'>
            Click me
          </Button>
        </div>
      ))}
    </div>

      
    </div>
  )
}

export default Home
