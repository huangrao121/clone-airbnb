'use client'

import { HashLoader } from "react-spinners"

const Loader = ()=>{
  return (
    <div className="
      h-[60vh]
      flex
      flex-col
      justify-center
      items-center
    ">  
      <HashLoader
        size={80}
        color="red"
      />
    </div>
  )
}

export default Loader