import { User } from "@prisma/client"
import { IconType } from "react-icons"
import useCountries from "@/app/hooks/useCountries"
import Avatar from "@/app/components/Avatar"
import ListingCategory from "./ListingCategory"
import dynamic from "next/dynamic"

const Map = dynamic(()=>import('../Map'),{
  loading: ()=> <p>Loading...</p>
})

interface ListingInfo{
  user: User|null,
  category: {icon: IconType, label:string, description:string}|undefined,
  description: string,
  guestCount:number,
  roomCount: number,
  bathroomCount: number,
  locationValue: string
}

const ListingInfo = ({
  user,
  category,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  locationValue
}:ListingInfo)=>{
  const {getByValue} = useCountries()

  const coordinates = getByValue(locationValue)?.latlng
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="text-xl font-semibold flex flex-row items-center gap-2">
        <div>Hosted by {user?.name}</div>
        <Avatar/>
      </div>
      <div className="
        flex
        flex-row
        items-center
        text-neutral-500
        font-light
        gap-4
      ">
        <div>{guestCount} guests</div>
        <div>{roomCount} rooms</div>
        <div>{bathroomCount} bathrooms</div>
      </div>
      <hr/>
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="font-light text-lg">
        {description}
      </div>
      <hr />
      <Map center={coordinates}/>
    </div>
  )
}

export default ListingInfo