import useCountries from "@/app/hooks/useCountries"
import { User } from "@prisma/client"
import Heading from "@/app/components/modals/Heading"
import Share from "../../listings/[listingId]/Share"
import Image from "next/image"
import HeartButton from "@/app/components/Listing/HeartButton"
interface ListingHeadProps{
  title:string,
  imageSrc: string,
  locationValue: string,
  id:string,
  currentUser:User | null
}
const ListingHead = ({
  title,
  imageSrc,
  locationValue,
  currentUser,
  id
}:ListingHeadProps)=>{
  const {getByValue} = useCountries()
  const country = getByValue(locationValue)
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <Heading
          title={title}
          subtitle={`${country?.region}, ${country?.label}`}
        />
        <Share/>
      </div>
      <div
        className="
          w-full
          h-[60vh]
          overflow-hidden
          rounded-xl
          relative
        "
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton
            listingIds={id}
            currentUser={currentUser!}
          />
        </div>
      </div>
    </>
  )
}

export default ListingHead