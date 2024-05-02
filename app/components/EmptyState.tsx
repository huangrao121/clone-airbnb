'use client'

import { useRouter } from "next/navigation"
import Heading from "./modals/Heading"
import Button from "./Button"
interface EmptyState{
  title?: string,
  subtitle?: string,
  showReset?: boolean
}
const EmptyState = ({
  title="Not exact matches",
  subtitle="Try changing or removing some of your filter",
  showReset
}:EmptyState)=>{
  const router = useRouter()

  return (
    <div
      className="
        h-[60vh]
        flex
        flex-col
        gap-2
        justify-center
        items-center
      "
    >
      <Heading
        title={title}
        subtitle={subtitle}
        center
      />
      {showReset && (
        <div className="w-48 p-2">
        <Button
          outline
          label="Remove Filters"
          onClick={()=>router.push('/')}
        />
        </div>
      )}
    </div>
  )
}
export default EmptyState