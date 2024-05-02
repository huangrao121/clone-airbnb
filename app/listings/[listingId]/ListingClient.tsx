'use client'

import { differenceInCalendarDays, eachDayOfInterval } from "date-fns"
import { Listing, Reservation, User } from "@prisma/client"
import {categories} from "@/app/components/navbar/Categories"
import { useCallback, useMemo, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Container from "@/app/components/Container"
import ListingHead from "@/app/components/Listing/ListingHead"
import ListingInfo from "../../components/Listing/ListingInfo"
import ListingReservation from "@/app/components/Listing/ListingReservation"
import useLoginModal from "@/app/hooks/useLoginModal"
import axios from "axios"
import toast from "react-hot-toast"
import { Range } from "react-date-range"

interface ListingClient{
  reservations?:Reservation[]
  listing: Listing & {
    user: User
  },
  currentUser: User | null
}
const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}
const ListingClient = ({
  reservations,
  listing,
  currentUser
}:ListingClient)=>{
  const loginModal = useLoginModal()
  const router = useRouter()

  const disabledDate = useMemo(()=>{
    let dates: Date[] = []

    reservations?.forEach((reservation)=>{
      let dateRange = eachDayOfInterval({
        start: reservation.startDate,
        end: reservation.endDate
      })
      dates = [...dates, ...dateRange]
    })
    return dates
  },[reservations])

  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)
  const [totalNight, setTotalNight] = useState(1)
  const onCreateReservation = useCallback(()=>{
    if(!currentUser){
      loginModal.onOpen()
      return
    }
    setIsLoading(true)
    axios.post('/api/reservations',{
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing.id
    })
    .then(()=>{
      toast.success("successfully reserved")
      setDateRange(initialDateRange)
      router.refresh()
    })
    .catch(()=>{
      toast.error("Can't reserve, something went wrong")
    })
    .finally(()=>{
      setIsLoading(false)
    })
  },[loginModal, totalPrice, dateRange, listing, currentUser, router])

  useEffect(()=>{
    if(dateRange.startDate && dateRange.endDate){
      const difference = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      )
      if(difference && listing.price){
        setTotalPrice(difference * listing.price)
        setTotalNight(difference)
      }else{
        setTotalPrice(listing.price)
        setTotalNight(1)
      }
    }
  
  },[dateRange, listing])
  
  const category = useMemo(()=>{
    return categories.find((category)=>category.label===listing.category)
  },[])

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="
            mt-6
            flex
            flex-col
            md:flex
            md:flex-row
            justify-between
            gap-6
          ">
            <div className="basis-7/12">
              <ListingInfo
                user={listing.user}
                category={category}
                description={listing.description}
                guestCount={listing.guestCount}
                roomCount={listing.roomCount}
                bathroomCount={listing.bathroomCount}
                locationValue={listing.locationValue}
              />
            </div>
            <div className="basis-5/12 relative">
              <div className="sticky">
                <ListingReservation
                  price={listing.price}
                  totalPrice={totalPrice}
                  totalNight={totalNight}
                  onChangeDate={(value:Range)=>setDateRange(value)}
                  dateRange={dateRange}
                  onSubmit={onCreateReservation}
                  disabled={isLoading}
                  disabledDates={disabledDate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient