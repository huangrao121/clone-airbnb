"use client"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import useFavorites from "@/app/hooks/useFavorites"
import { User } from "@prisma/client"

const HeartButton = ({
  currentUser, 
  listingIds}:{
    currentUser:User,
    listingIds:string
  })=>{
  const {hasFavorited, toggleFavorite} = useFavorites({currentUser, listingIds})
  return (
    <div 
      onClick={toggleFavorite}
      className="absolute top-3 right-3"
    >
      <div 
        className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      ">
        <AiOutlineHeart
          size={28}
          className="fill-white"
        />
        <AiFillHeart
          size={24}
          className={`
            absolute
            top-[2px]
            right-[2px]
            ${hasFavorited?'fill-rose-500':'fill-neutral-500/70'}
          `}
        />
      </div>
    </div>
  )
}

export default HeartButton