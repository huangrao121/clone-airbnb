'use client'
import { useEffect } from "react"
import EmptyState from "./components/EmptyState"
interface ErrorStateProps{
  error:Error
}

const ErrorPart = ({
  error
}:ErrorStateProps)=>{
  useEffect(()=>{
    console.error(error)
  },[])

  return (
    <EmptyState 
      title="Error"
      subtitle="Error happens"
    />
  )
}

export default ErrorPart
