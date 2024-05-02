import prisma from "@/app/libs/prismadb"

export interface listingParams{
  userId?: string,
  locationValue?: string,
  guests?:string,
  bedrooms?:string,
  bathrooms?:string,
  startDate?:string,
  endDate?:string,
  category?:string
}
export default async function getListings(params:listingParams){
  try {
    const {
      userId,
      locationValue,
      guests,
      bedrooms,
      bathrooms,
      startDate,
      endDate,
      category
    } = params
    let query:any = {}
    if(userId){
      query.userId = userId
    }

    if(locationValue){
      query.locationValue = locationValue
    }
    if(guests){
      query.guestCount = {
        gte:parseInt(guests)
      }
    }
    if(bedrooms){
      query.roomCount = {
        gte:parseInt(bedrooms)
      }
    }
    if(bathrooms){
      query.bathroomCount = {
        gte:parseInt(bathrooms)
      }
    }
    if(category){
      query.category=category
    }
    if(startDate && endDate){
      query.NOT = {
        reservations:{
          some:{
            OR:[
              {
                startDate:{lte:startDate},
                endDate:{gte:startDate}
              },
              {
                startDate:{lte:endDate},
                endDate:{gte:startDate}
              }
            ]
          }
        }
      }
    }
    const listings = await prisma.listing.findMany({
      where:query,
      orderBy:{
        createdAt:'desc'
      }
    })

    return listings
  } catch (error: any) {
    throw new Error(error);
    
  }
}