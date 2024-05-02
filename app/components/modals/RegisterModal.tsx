"use client"

import Modal from "./Modal"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import axios from 'axios'
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import {FaSquareFacebook} from "react-icons/fa6"
import { IoLogoWechat } from "react-icons/io5";
import { useCallback, useState } from "react"
import { FieldValues, SubmitHandler, useForm} from "react-hook-form"
import Heading from "./Heading"
import Input from "../Input/Input"
import Button from "../Button"
import useLoginModal from "@/app/hooks/useLoginModal"

const RegisterModal = ()=>{
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)
  const loginModal = useLoginModal()
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues:{
      name: '',
      email: '',
      password: ''
    }
  })

  const toggle = useCallback(()=>{
    registerModal.onClose()
    loginModal.onOpen()
  },[loginModal, registerModal])

  const onSubmit = (data:FieldValues)=>{
    setIsLoading(true);
    axios.post('/api/register', data)
    .then(()=>{
      registerModal.onClose()
      loginModal.onOpen()
    })
    .catch((error)=>{
      console.log(error)
    })
    .finally(()=>{
      setIsLoading(false)
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
        id="name"
        label="Name"
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
          Already have an account?
        </div>
        <div onClick={toggle}
            className="text-black cursor-pointer hover:underline"
        >
          Log in
        </div>
      </div>
    </div>
  )
  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyPart}
        footer={footer}
      />
    </>
  )
}

export default RegisterModal