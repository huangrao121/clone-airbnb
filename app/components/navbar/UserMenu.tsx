"use client"
import { AiOutlineMenu } from "react-icons/ai";
import { ImSphere } from "react-icons/im";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";
interface userMenuProps{
  currentUser?: User | null
}
const UserMenu = ({currentUser}: userMenuProps)=>{
  const [isOpen, setIsOpen] = useState(false)
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()
  const router = useRouter()
  const toggle = useCallback(()=>{
    setIsOpen((value)=>!value)
  },[])
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={()=>{}}
          className="
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
          "
        >
          Airbnb your home
        </div>
        <div
          onClick={()=>{}}
          className="
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
          "
        >
          <ImSphere />
        </div>
        <div
          onClick={toggle}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
          "
        >
          <AiOutlineMenu/>
          <div className="hidden md:block">
            <Avatar/>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
          "
        >
          <div className="
            flex
            flex-col
            cursor-pointer
          ">
            {currentUser? (
              <>
                <MenuItem 
                  onClick={()=>router.push('/trips')} 
                  label="My trips"
                />
                <MenuItem 
                  onClick={()=>router.push('/favorites')} 
                  label="My favorites"
                />
                <MenuItem 
                  onClick={()=>router.push('/reservations')} 
                  label="My Reservations"
                />
                <MenuItem 
                  onClick={()=>router.push('/properties')} 
                  label="My Properties"
                />
                <MenuItem 
                  onClick={rentModal.onOpen} 
                  label="Airbnb My Home"
                />
                <MenuItem 
                  onClick={()=>signOut()} 
                  label="Log out"
                />
              </>
            ):(
              <>
                <MenuItem 
                  onClick={loginModal.onOpen} 
                  label="log in"
                />
                <MenuItem 
                  onClick={registerModal.onOpen} 
                  label="Sign up"
                />
              </>
            )}

          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu