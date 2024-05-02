import { User } from "@prisma/client"
import { useCallback, useMemo } from "react"
import useLoginModal from "./useLoginModal"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
interface UseFavoritesProps{
  currentUser: User,
  listingIds: string
}
const useFavorites = ({
  currentUser,
  listingIds
}:UseFavoritesProps)=>{
  const LoginModal = useLoginModal()
  const router = useRouter()
  const hasFavorited = useMemo(()=>{
    const list = currentUser?.favoriteIds || []
    return list.includes(listingIds)
  },[currentUser, listingIds])

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>)=>{
    e.stopPropagation()

    if(!currentUser){
      return LoginModal.onOpen()
    }

    try{
      
      if(hasFavorited){
        await axios.delete(`api/favorites/${listingIds}`)
      }else{
        await axios.post(`api/favorites/${listingIds}`)
      }
      console.log(hasFavorited)
      router.refresh()
      toast.success('Success')

      
    }catch(error){
      toast.error('Click like not success')
    }
  },[currentUser, listingIds, hasFavorited, LoginModal])

  return {
    hasFavorited,
    toggleFavorite
  }
}
export default useFavorites