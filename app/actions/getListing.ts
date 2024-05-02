import prisma from "@/app/libs/prismadb"
import { User } from "@prisma/client"

export default async function getListing(
  {params}:{params:{listingId: string}}
){
  try{
    const listingId = params.listingId

    const listing = prisma.listing.findUnique({
      where:{
        id: listingId
      },
      include:{
        user: true
      }
    })
    if(!listing){
      return null
    }
  
    return listing
  }catch(error:any){
    throw new Error(error)
  }
}