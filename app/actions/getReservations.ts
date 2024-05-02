import prisma from "@/app/libs/prismadb"


export async function getReservations({params}:{params:{
  listingId?: string,
  userId?:string,
  authorId?:string
}}){
  try{
    const {listingId, userId, authorId} = params
    let result:any = []
    if(userId){
      result = await prisma?.reservation.findMany({
        where:{
          userId:params.userId
        },
        include:{
          listing:true
        }
      })
    }
    if(listingId){
      result = await prisma?.reservation.findMany({
        where:{
          listingId:params.listingId
        },
        include:{
          listing:true
        }
      })
    }
    if(authorId){
      result = await prisma?.reservation.findMany({
        where:{
          listing:{
            userId: authorId
          }
        },
        include:{
          listing:true
        }
      })
    }
    return result
  }catch(error:any){
    throw new Error(error)
  }
}