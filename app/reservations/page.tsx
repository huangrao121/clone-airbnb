import getCurrentUser from "../actions/getCurrentUser";
import { getReservations } from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import ReservationClient from "./ReservationClient";


const ReservationPage = async ()=>{
  const currentUser = await getCurrentUser()
  const reservations = await getReservations({params:{authorId:currentUser?.id}})
  if(!currentUser){
    return (
      <EmptyState
        title="You haven't logged in"
        subtitle="Please log in"
      />
    )
  }

  if(reservations.length === 0){
    return (
      <EmptyState
        title="No one reserves yet"
        subtitle="Attract more client"
      />
    )
  }

  return (
    <ReservationClient
      currentUser={currentUser}
      reservations={reservations}
    />
  )
}

export default ReservationPage