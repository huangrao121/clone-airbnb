import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from "@/app/libs/prismadb"
export async function DELETE(req:Request, context:{params:{listingId:string}}){
  const currentUser = await getCurrentUser()

  if(!currentUser){
    return NextResponse.error()
  }
  
  const listingId = context.params.listingId
  await prisma?.listing.deleteMany({
    where:{
      AND:[{
        id:listingId
      },{
        userId:currentUser.id
      }]
    }
  })

  return NextResponse.json({listingId})
}