'use client'
import useSearchModal from "@/app/hooks/useSearchModal"
import { useCallback, useState, useMemo } from "react"
import dynamic from "next/dynamic"
import Modal from "./Modal"
import { useSearchParams } from "next/navigation"
import { Range } from "react-date-range"
import { CountrySelectValue } from "../Input/CountrySelect"
import qs from 'query-string'
import { useRouter } from "next/navigation"
import formatISO from "date-fns/formatISO"
import Heading from "./Heading"
import Calendar from "../Listing/Calendar"
import CountrySelect from "../Input/CountrySelect"
import Counter from "../Counter"
enum STEPS {
  LOCATION=1,
  DATERANGE,
  INFO
}

const SearchModal = ()=>{
  const SearchModal = useSearchModal()
  const [location, setLocation] = useState<CountrySelectValue>()
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  })
  const [guests, setGuests] = useState(1)
  const [bedrooms, setBedrooms] = useState(1)
  const [bathrooms, setBathrooms] = useState(1)
  const [step, setStep] = useState(1)
  const searchParams = useSearchParams()
  const router = useRouter()
  const Map = useMemo(()=>dynamic(()=>import('../Map'),{ssr:false}),[location])
  const onNext = useCallback(()=>{
    setStep((step)=>step+1)
  },[])

  const onBack = useCallback(()=>{
    setStep((step)=>step-1)
  },[])

  const onSubmit = useCallback(()=>{
    if(step === STEPS.INFO){
      let currentQuery:any = {}
      if(searchParams){
        currentQuery = qs.parse(searchParams.toString())
      }
      const uquery:any = {
        ...currentQuery,
        locationValue: location?.value,
        guests,
        bedrooms,
        bathrooms
      }

      if(dateRange.startDate){
        uquery.startDate = formatISO(dateRange.startDate)
      }

      if(dateRange.endDate){
        uquery.endDate = formatISO(dateRange.endDate)
      }
      const pushURL = qs.stringifyUrl({url:'/', query:uquery},{skipNull: true})
      setStep(STEPS.LOCATION)
      SearchModal.onClose()
      router.push(pushURL)
    }else{
      return onNext()
    }

  },[searchParams,location,guests,bedrooms,bathrooms,dateRange,SearchModal,router,step,onNext])

  const actionLabel = useMemo(()=>{
    if(step!==STEPS.INFO){
      return 'Next'
    }else{
      return 'Search'
    }
  },[step])

  const secondActionLabel = useMemo(()=>{
    if(step!==STEPS.LOCATION){
      return 'Back'
    }else{
      return undefined
    }
  },[step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Country"
        subtitle="Choose your location"
      />
      <CountrySelect
        value={location}
        onChange={(value)=>setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map
        center={location?.latlng}
      />
    </div>
  )

  if(step === STEPS.DATERANGE){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Calendar"
          subtitle="Choose your date range"
        />
        <Calendar
          value={dateRange}
          onChange={(value)=>setDateRange(value.selection)}
        />
      </div>
    )
  }

  if(step===STEPS.INFO){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Guests information"
          subtitle="Choose your information"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you have"
          value={guests}
          onChange={(value)=>setGuests(value)}
        />
        <Counter
          title="Bedrooms"
          subtitle="How many bedrooms you need"
          value={bedrooms}
          onChange={(value)=>setBedrooms(value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms you need"
          value={bathrooms}
          onChange={(value)=>setBathrooms(value)}
        />
      </div>
    )
  }

  return (
    <Modal
      isOpen={SearchModal.isOpen}
      onClose={SearchModal.onClose}
      onSubmit={onSubmit}
      title={'Filters'}
      actionLabel={actionLabel}
      secondaryAction={step===STEPS.LOCATION?undefined:onBack}
      secondaryActionLabel={secondActionLabel}
      body={bodyContent}
    />
  )
}

export default SearchModal