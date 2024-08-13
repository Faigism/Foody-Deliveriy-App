import Image from 'next/image'
import Languages from '../../admin/Languages'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NavbarAvatarList from '../navbarAvatarList'
import { useGlobalStore } from '../../../services/provider'
import NavbarAvatarPhoto from '../navbarAvatarPhoto'
import ClientButton from '../button'

const NavbarAvatar = ({ isName, userPhoto }) => {
  const navigate = useRouter()
  const [navbarList, setNavbarList] = useState(false)

  const { getProductsInBasket, itemCount } = useGlobalStore()

  const toggleNavbarList = () => {
    setNavbarList(!navbarList)
  }

  useEffect(() => {
    getProductsInBasket()
  }, [itemCount])

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
          {itemCount}
        </span>
      </div>

      {userPhoto ? (
        <NavbarAvatarPhoto
          className="rounded-full w-10 h-10 text-lg text-white shadow-md bg-mainRed font-semibold hover:scale-95 transition-all duration-500"
          src={userPhoto}
          onClick={toggleNavbarList}
        />
      ) : (
        <ClientButton
          className="rounded-full w-10 h-10 text-lg text-white shadow-md bg-mainRed font-semibold hover:scale-95 transition-all duration-500"
          innerText={isName}
          onClick={toggleNavbarList}
        />
      )}
      {navbarList && <NavbarAvatarList />}
    </div>
  )
}
export default NavbarAvatar
