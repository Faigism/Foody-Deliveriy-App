import { useState } from 'react'
import Button from '../Button'
import NavbarAvatar from '../navbarAvatar'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

const Navbar = ({ adminNavbar }) => {
  const { t } = useTranslation()
  const navigate = useRouter()
  const [isActiveName, setIsActiveName] = useState('')
  const [isHiddenModal, setIsHiddenModal] = useState(true)
  const [isModalOpen, setModalOpen] = useState(false)

  function changeHidden() {
    setIsHiddenModal((prev) => !prev)
  }

  const toggleModal = () => {
    setModalOpen(!isModalOpen)
  }

  return (
    <nav className="flex justify-between m-0 mb-4 items-center rounded-md py-11 px-5 sm:m-0 sm:mb-4 bg-darkBlue_3 sm:p-5 fixed w-full z-10">
      <h1 className="text-white text-3xl font-extrabold flex items-center">
        Foody
        <span className="text-orange">.</span>
      </h1>
      <div className="flex gap-2 sm:gap-5">
        <Button
          onClick={changeHidden}
          className="p-3 hidden sm:block bg-lightPurple_3 text-white text-sm font-medium px-3 rounded-full shadow-sm shadow-textGreenLight hover:scale-95 transition-all duration-500"
          innerText={t('addCategory')}
        />
        <NavbarAvatar isName={isActiveName} />
      </div>
    </nav>
  )
}
export default Navbar
