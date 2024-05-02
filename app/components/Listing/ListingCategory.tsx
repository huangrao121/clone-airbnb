import React from 'react'
import { IconType } from 'react-icons'

interface ListingCategoryProps{
  icon: IconType,
  label: string,
  description: string
}
const ListingCategory = ({
  icon: Icon,
  label,
  description
}:ListingCategoryProps)=>{
  return (
    <div className='
      flex
      flex-row
      items-center
      gap-4
    '>
      <Icon size={40} className='text-neutral-600'/>
      <div className='flex flex-col'>
        <div className='font-semibold text-lg'>{label}</div>
        <div className='font-light text-neutral-500'>{description}</div>
      </div>
    </div>
  )
}

export default ListingCategory