import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const AdminAsideItem = ({ img, innerText, onClick, value }) => {
  const [active, setActive] = useState(false)
  const query = useRouter()

  useEffect(() => {
    activeItem()
  }, [])

  function activeItem() {
    let currentPath = query.asPath.split('/')[2]

    setActive(currentPath === value)
  }

  return (
    <div
      onClick={() => onClick(value)}
      className={`flex gap-6 items-center cursor-pointer p-3  hover:bg-white  hover:rounded  hover:bg-opacity-10 ${
        active ? 'bg-white rounded bg-opacity-10' : ''
      } `}
    >
      <Image src={img} alt="icon" width={24} height={24} />
      <p className="text-[#FCDDEC] text-base font-medium">{innerText}</p>
    </div>
  )
}
export default AdminAsideItem
