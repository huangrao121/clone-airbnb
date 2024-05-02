'use client'
import { User, Reservation } from "@prisma/client"
import { useRouter } from "next/navigation"
import ListingCard from "../components/Listing/ListingCard"
import { useCallback,useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import Container from "../components/Container"
interface ReservationClientProps {
  currentUser: User,
  reservations: any[]
}

const ReservationClient = ({
  currentUser,
  reservations
}:ReservationClientProps)=>{
  const router = useRouter()
  const [deleteId, setDeleteId] = useState('')
  const onCancel = useCallback(async (id:string)=>{
    setDeleteId(id)
    await axios.delete(`api/reservations/${id}`)
    .then(()=>{
      toast.success('delete reservation successfully')
      router.refresh()
    })
    .catch((error)=>{throw new Error(error)})
    .finally(()=>{
      setDeleteId('')
    })
  },[router])
  return(
    <Container>
      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-5
        gap-8
        mt-10
      ">
        {reservations.map((reservation)=>(
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            currentUser={currentUser}
            onAction={onCancel}
            disabled={reservation.id === deleteId}
            actionLabel="Cancel Reservation"
            actionId={reservation.id}
          />
        ))}
      </div>
    </Container>
  )
}

export default ReservationClient