import Image from 'next/image'
import Languages from '../../admin/Languages'
import { useRouter } from 'next/router'
import { useState } from 'react'
import NavbarAvatarList from '../navbarAvatarList'
import ClientButton from '../button'

const NavbarAvatar = ({ isName }) => {
  const navigate = useRouter()
  const [navbarList, setNavbarList] = useState(false)

  const toggleNavbarList = () => {
    setNavbarList(!navbarList)
  }

  return (
    <div className="flex items-center gap-7 relative">
      <Languages />

      <div className="relative">
        <Image
          className="cursor-pointer hover:scale-95 transition-all duration-500"
          width={40}
          height={0}
          src={'/basket.svg'}
          alt="basket"
          onClick={() => {
            navigate.push('/user-basket')
          }}
        />
        <span className="w-4 h-4 flex justify-center items-center text-[12px] font-bold text-white absolute right-[-4px] top-[-4px] bg-[#9d251a] z-10 rounded-full">
          0
        </span>
      </div>
      <ClientButton
        className="rounded-full w-10 h-10 text-lg text-white shadow-md bg-mainRed font-semibold hover:scale-95 transition-all duration-500"
        innerText={isName}
        onClick={toggleNavbarList}
      />
      {navbarList && <NavbarAvatarList />}
    </div>
  )
}
export default NavbarAvatar
