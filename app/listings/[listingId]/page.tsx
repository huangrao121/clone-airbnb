import getCurrentUser from "@/app/actions/getCurrentUser"
import getListing from "@/app/actions/getListing"
import { getReservations } from "@/app/actions/getReservations"
import EmptyState from "@/app/components/EmptyState"
import ListingClient from "@/app/listings/[listingId]/ListingClient"

const ListingPage = async (params:{params:{listingId: string}})=>{
  const listing = await getListing(params)
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser()
  if(!listing){
    return (
      <EmptyState/>
    )
  }
  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  )
}

export default ListingPage