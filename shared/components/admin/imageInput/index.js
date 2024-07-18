import uploadImg from '../../../../public/upload-image.svg'

import Image from 'next/image'

const ImageInput = ({ imgRef, onChange }) => {
  return (
    <div className=" bg-darkBlue_5 h-full  flex rounded-2xl items-center justify-center cursor-pointer ">
      <div className=" flex-col  relative">
        <input
          onChange={onChange}
          ref={imgRef}
          type="file"
          accept="image/*"
          className=" absolute  opacity-0 w-full h-full cursor-pointer"
        />
        <Image alt="upload-image" width={60} height={60} src={uploadImg} />
        <p className=" text-grayText  font-medium text-lg ">Upload</p>
      </div>
    </div>
  )
}
export default ImageInput
