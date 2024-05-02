"use client"

import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form"
import {BiDollar} from 'react-icons/bi'
interface InputProps{
  disabled?: boolean,
  type?:string,
  id:string,
  label:string,
  formatPrice?:boolean
  required?:boolean,
  register:UseFormRegister<FieldValues>,
  errors:FieldErrors
}
const Input = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors
}:InputProps)=>{
  return (
    <div className="w-full relative">
      {formatPrice && <BiDollar
        size={24}
        className="
          text-neutral-700
          absolute
          top-5
          left-2
        "
      />}
      <input
        id={id}
        disabled={disabled}
        {...register(id, {required:'Invalid input'})}
        placeholder = ""
        type={type}
        className={`
          peer
          w-full
          p-3
          pt-6
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice? 'pl-9':'pl-3.5'}
          ${errors[id]? 'border-rose-500':'border-neutral-300'}
          ${errors[id]? 'focus:border-rose-500':'focus:border-neutral-300'}
        `}
      />
      <label
        className={`
          absolute
          origin-[0]
          -translate-y-3
          ${formatPrice? "left-9":"left-4"}
          top-5
          text-md
          z-10
          transform
          duration-150
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id]? "text-rose-500":"text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  )
}

export default Input