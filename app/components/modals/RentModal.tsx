'use client'

import useRentModal from "@/app/hooks/useRentModal"
import Modal from "./Modal"
import { useCallback, useMemo, useState } from "react"
import Heading from "./Heading"
import { categories } from "../navbar/Categories"
import { Field, FieldValues, SubmitHandler, useForm } from "react-hook-form"
import CategoryInput from "../Input/CategoryInput"
import CountrySelect from "../Input/CountrySelect"
import dynamic from "next/dynamic"
import Counter from "../Counter"
import UploadImage from "../UploadImage"
import Input from "../Input/Input"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

enum STEPS{
  CATEGORY = 0,
  LOCATION,
  INFO,
  IMAGES,
  DESCRIPTION,
  PRICE
}
const RentModal = ()=>{
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { 
    register, 
    control, 
    handleSubmit, 
    watch, 
    setValue,
    formState:{
      errors
    },
    reset
  } = useForm<FieldValues>({
    defaultValues:{
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imgSrc: '',
      price: 1,
      title: '',
      description: ''
    }
  })

  const category = watch('category')
  const location = watch('location')
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount')
  const bathroomCount = watch('bathroomCount')
  const imgSrc = watch('imgSrc')
  const Map = useMemo(()=>dynamic(()=>import('../Map'),{
    ssr: false
  }),[])
  const changeValues = (id: string, value: any)=>{

    setValue(id, value, {
      shouldDirty:true,
      shouldTouch:true,
      shouldValidate:true
    })
  }
  const rentModal = useRentModal()
  const [step, setStep] = useState(STEPS.CATEGORY)
  const onNext = useCallback(()=>{
    setStep((val)=>val+1)
  },[step])

  const onBack = useCallback(()=>{
    setStep((val)=>val-1)
  },[step])

  const actionLabel = useMemo(()=>{
    if (step === STEPS.PRICE){
      return 'Create'
    }
    return 'Next'
  },[step])

  const secondaryActionLabel = useMemo(()=>{
    if (step === STEPS.CATEGORY){
      return undefined;
    }
    return 'Back'
  },[step])

  const onSubmit: SubmitHandler<FieldValues> = (data:any)=>{
    if(step !== STEPS.PRICE){
      return onNext()
    }
    setIsLoading(true)
    axios.post('/api/listing', data)
    .then(()=>{
      toast.success('Creating listing successfully')
      router.refresh()
      reset()
      setStep(STEPS.CATEGORY)
      rentModal.onClose()
    })
    .catch(()=>{
      toast.error('something goes wrong')
    })
    .finally(()=>{
      setIsLoading(false)
    })

  } 
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title='Which of following category do you choose'/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[50vh] overflow-y-auto">
        {categories.map((item)=>(
          <div className="col-span-1"
            key={item.label}
          >
            <CategoryInput
              onClick={(category)=>changeValues('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if(step === STEPS.LOCATION){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where's your place located?"
        />
        <CountrySelect
          value={location}
          onChange={(value)=>changeValues('location', value)}
        />
        <Map
          center={location?.latlng}
        />
      </div>
    )
  }

  if(step === STEPS.INFO){
    bodyContent=(
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
        />
        <Counter
          title="Guests"
          subtitle="How many guests are allowed"
          value={guestCount}
          onChange={(value)=>changeValues('guestCount', value)}
        />
        <Counter
          title="Bedrooms"
          subtitle="How many bedrooms in your property"
          value={roomCount}
          onChange={(value)=>changeValues('roomCount', value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms in your property"
          value={bathroomCount}
          onChange={(value)=>changeValues('bathroomCount', value)}
        />
      </div>
    )
  }

  if(step === STEPS.IMAGES){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Add some photos of your place"/>
        <UploadImage
          value={imgSrc}
          onChange={(value)=>changeValues('imgSrc', value)}
        />
      </div>
    )
  }

  if(step === STEPS.DESCRIPTION){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Description of your property"/>
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register = {register}
          errors={errors}
        />
        <br />
        <Input
          id="description"
          label="description"
          disabled={isLoading}
          register = {register}
          errors={errors}
        />
      </div>
    )
  }

  if(step === STEPS.PRICE){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Set the price of your property"
        />
        <Input
          id="price"
          label="price"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

      </div>
    )
  }
  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction = {(step===STEPS.CATEGORY)? undefined : onBack}
      title='Airbnb your home!'
      body={bodyContent}
    />
  )
}

export default RentModal