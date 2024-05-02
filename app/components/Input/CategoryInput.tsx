'use client'

import { IconType } from "react-icons"

interface CategoryInputProps{
  icon: IconType,
  label:string,
  onClick: (value: string)=>void,
  selected: boolean
}
const CategoryInput = ({
  icon:Icon,
  label,
  onClick,
  selected
}:CategoryInputProps)=>{
  return (
    <div 
      onClick={()=> onClick(label)}
      className={`
        flex 
        flex-col 
        items-center
        rounded-xl
        border
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected? 'border-black':'border-neutral-200'}
      `}
    >
      <Icon size={30}/>
      <div className="font-semibold">
        {label}
      </div>
    </div>
  )
}
export default CategoryInput