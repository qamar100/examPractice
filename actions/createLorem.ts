'use server'

import { z } from "zod"
import { formSchema } from '@/schemas/useschema'
import prisma from "@/lib/db";



export const createUser = async (values: z.infer<typeof formSchema>) => { 
    
    
    const user = await prisma.task.create({   //task prisma schema me jo model ka nam hy wohi rakhna
        data: {
            name: values.username,
            createdAt: new Date(),
            updatedAt: new Date(),
            isCompleted: false
        }
     
    });

};