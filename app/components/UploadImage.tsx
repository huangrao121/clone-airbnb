'use client'
import { CldUploadWidget } from 'next-cloudinary';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';
import Image from 'next/image';
declare global {
  var cloudinary:any
}

interface UploadImageProps{
  value:string,
  onChange: (value:string)=>void
}
const UploadImage = ({
  value,
  onChange
}:UploadImageProps)=>{
  const handleSuccess = useCallback((result: any)=>{
    onChange(result.info.secure_url)
  },[onChange])

  return(
    <CldUploadWidget
      onSuccess={handleSuccess}
      uploadPreset='veohgdlt'
      options={{
        maxFiles: 2
      }}
    >
      {({open})=>{
        return (
          <div
            onClick={()=>open?.()}
            className='
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed
              border-[2px]
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
              p-20
            '
          >
            <TbPhotoPlus size={50}/>
            <div className='font-semibold text-lg'>
              {"Click to upload images"}
            </div>
            {value && (
              <div className='absolute inset-0 w-full h-full'>
                <Image
                  fill={true}
                  style={{objectFit: 'cover'}}
                  src={value}
                  alt='Uploaded picture'
                />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}

export default UploadImage