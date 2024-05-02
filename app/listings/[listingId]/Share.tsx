'use client'
import { CiShare1 } from "react-icons/ci";

const Share = ()=>{
  return (
    <div 
      className="flex flex-row gap-1 items-center cursor-pointer"
      onClick={()=>{}}
    >
      <CiShare1
        size={28}
      />
      <span className="text-lg">Share</span>
    </div>
  )
}
export default Share