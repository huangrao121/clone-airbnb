'use client'

import { Listing, User, Reservation } from "@prisma/client"
import useCountries from "../../hooks/useCountries"
import { useCallback, useMemo } from "react"
import {format} from 'date-fns'
import Link from "next/link"
import Image from "next/image"
import HeartButton from "./HeartButton"
import Button from "../Button"
import { useRouter } from "next/navigation"
interface ListingCardProps{
  data: Listing,
  currentUser?: User,
  onAction?: (id:string)=>void,
  disabled?: boolean,
  actionLabel?: string,
  actionId?: string,
  reservation?: Reservation
}

const ListingCard = ({
  data,
  currentUser,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId=""
}:ListingCardProps)=>{
  const router = useRouter()
  const { getByValue } = useCountries()
  const location = getByValue(data.locationValue)
  const hasFavorited = false
  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>)=>{
    e.stopPropagation()

    if(disabled){
      return;
    }
    onAction?.(actionId)
  },[onAction, actionId, disabled])

  const price = useMemo(()=>{
    if(reservation){
      return reservation.totalPrice
    }

    return data.price
  },[reservation, data])

  const reservationDate = useMemo(()=>{
    if(!reservation){
      return null;
    }
    
    const start:string = format(new Date(reservation.startDate), "PP")
    const end:string = format(new Date(reservation.endDate), "PP")

    return `${start} - ${end}`
  },[reservation])

  return (
    <div
      onClick={()=>router.push(`listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="
        flex
        flex-col
        gap-2
        w-full
      ">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            src={data.imageSrc}
            alt={data.title}
            className="
              object-cover
              group-hover:scale-110
              transition
            "
          />
          <HeartButton
            listingIds={data.id}
            currentUser={currentUser!}
          />
          <div className="absolute top-3 left-3 
            text-neutral-800 
            bg-neutral-100
            px-2
            rounded-full
            cursor-pointer
          ">
            Guest favourite
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region},{location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {data.category}
          <br />
          {reservationDate}
        </div>
        <div className="font-semibold text-lg">
          ${price}
          {!reservation && <span className="font-light">night</span>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  )
}

export default ListingCard