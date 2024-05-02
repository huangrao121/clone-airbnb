"use client"

import Modal from "./Modal"
import useLoginModal from "@/app/hooks/useLoginModal"
import axios from 'axios'
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import {FaSquareFacebook} from "react-icons/fa6"
import { IoLogoWechat } from "react-icons/io5";
import { useCallback, useState } from "react"
import { FieldValues, SubmitHandler, useForm} from "react-hook-form"
import { signIn } from "next-auth/react"
import Heading from "./Heading"
import Input from "../Input/Input"
import Button from "../Button"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import useRegisterModal from "@/app/hooks/useRegisterModal"

const LoginModal = ()=>{
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues:{
      email: '',
      password: ''
    }
  })

  const toggle = useCallback(()=>{
    loginModal.onClose()
    registerModal.onOpen()
  },[loginModal, registerModal])

  const onSubmit = (data:FieldValues)=>{
    setIsLoading(true);
    
    signIn('credentials',{
      ...data,
      redirect:false
    }).then((callback) => {
      if(callback?.ok){
        toast.success("Logged in")
        router.refresh()
        loginModal.onClose()
      }
      if(callback?.error){
        toast.error(callback.error)
      }
    })
  }

  const bodyPart = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb"/>
      <Input
        id="email"
        label="Email"
        disabled = {isLoading}
        register={register}
        errors={errors}
        required={true}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled = {isLoading}
        register={register}
        errors={errors}
        required={true}
      />
    </div>
  )
  
  const footer = (
    <div className="flex flex-col gap-4 pt-3">
      <hr />
      <Button
        outline
        label={"Continue with Google"}
        onClick={()=>{}}
        icon={FcGoogle}
      />
      <Button
        outline
        label={"Continue with Github"}
        onClick={()=>{}}
        icon={AiFillGithub}
      />
      <Button
        outline
        label={"Continue with Facebook"}
        onClick={()=>{}}
        icon={FaSquareFacebook}
      />
      <Button
        outline
        label={"Continue with Facebook"}
        onClick={()=>{}}
        icon={IoLogoWechat}
      />
      <div className="text-neutral-500 text-center mt-4 font-light
        flex flex-row justify-center items-center gap-3
      ">
        <div>
          {"Don't have an account?"}
        </div>
        <div onClick={toggle}
            className="text-black cursor-pointer hover:underline"
        >
          Create new account
        </div>
      </div>
    </div>
  )
  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Log in"
        actionLabel="Continue"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyPart}
        footer={footer}
      />
    </>
  )
}

export default LoginModal