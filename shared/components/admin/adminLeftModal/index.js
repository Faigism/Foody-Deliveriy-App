import { useState } from 'react'
import Button from '../Button'
import Image from 'next/image'
import ImageInput from '../imageInput'
import { fileStorage } from '../../../../server/configs/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const AdminLeftModal = ({
  p,
  p1,
  p2,
  mod,
  btn,
  hidden,
  imgRef,
  onClickClose,
  getImgUrl,
}) => {
  const [imgUrl, setImgUrl] = useState('')
  const [imgOnload, setImgOnload] = useState(false)

  const getImage = (e) => {
    const name = e?.target?.files?.[0]?.name
    if (!name) {
      return
    }
    const imageRef = ref(fileStorage, `files/images/${name}`)
    const file = e?.target?.files?.[0]
    if (!file) {
      return
    }
    uploadBytes(imageRef, file).then((snapshot) => {
      setImgOnload(true)
      getDownloadURL(snapshot.ref).then((url) => {
        setImgOnload(false)
        setImgUrl(url)
        getImgUrl(url)
      })
    })
  }

  return (
    <div
      className={` fixed  z-10  w-full sm:w-3/4 sm:pl-12 ${
        hidden ? '  -right-full' : 'right-0'
      } transition-all duration-500 top-0 h-screen`}
    >
      <button
        onClick={onClickClose}
        className=" bg-lightPurple_3 rounded-full    absolute  right-5 sm:left-0  top-7 w-7 h-7 cursor-pointer"
      >
        <Image alt="close-icon" height={28} width={28} src="/close.svg" />
      </button>
      <div className=" bg-darkBlue_2   flex-col pl-7 pt-7 pb-5 pr-7 lg:pr-14  max-h-screen   overflow-y-auto h-screen">
        <div>
          <p className=" text-grayText font-medium text-2xl  mb-2">{p}</p>
        </div>
        <div className=" flex flex-col   lg:flex-row       w-full   mb-20">
          <div className=" w-full lg:w-1/3 h-38 ">
            <p className=" text-grayText font-medium  text-lg  tracking-wide">
              {p1}
            </p>
            <img
              ref={imgRef}
              src={`${
                imgOnload ? '/loadingImg.jpg' : imgUrl ? imgUrl : '/noimg.png'
              }`}
              width={124}
              height={124}
              alt="img"
            />
          </div>
          <div className=" w-full lg:w-2/3  h-38 pt-6 ">
            <ImageInput onChange={getImage} />
          </div>
        </div>

        <div className="flex   flex-col   lg:flex-row  w-full mb-36">
          <div className="w-full lg:w-1/3">
            <p className=" text-grayText font-medium  text-lg  tracking-wide">
              {p2}
            </p>
          </div>
        </div>

        <div className="flex justify-around  border-t-darkBlue_5 border-t-4 pt-6  gap-10">
          <Button
            onClick={onClickClose}
            className=" bg-darkBlue_5 text-white py-3 w-1/2 rounded-2xl"
            innerText="Cancel"
          />
          <Button
            className=" text-white bg-lightPurple_3 w-1/2 rounded-2xl"
            innerText={btn}
          />
        </div>
      </div>
    </div>
  )
}
export default AdminLeftModal
