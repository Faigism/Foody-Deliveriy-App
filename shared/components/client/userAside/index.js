import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const UserAside = () => {
  const { t, i18n } = useTranslation()
  const navigate = useRouter()
  const isCurrentRoute = (path) => navigate.pathname === path

  const logOut = () => {
    localStorage.removeItem('tokenObj')
    localStorage.removeItem('userInfo')
    navigate.push('/login')
  }

  return (
    <div className="rounded-md hidden sm:flex flex-col max-h-screen overflow-y-auto gap-8 bg-whiteLight1 w-1/6 p-4">
      <div
        className={`flex items-center gap-4 cursor-pointer group transition-all p-2 ${
          isCurrentRoute('/user-profile') ? 'bg-mainRedLight ' : ''
        }`}
      >
        <Image width={25} height={0} src={'/profile.svg'} alt="profileIcon" />
        <p
          onClick={() => navigate.push('/user-profile')}
          className={`font-semibold text-grayText2 text-lg group-hover:text-mainRed ${
            isCurrentRoute('/user-profile') ? 'text-mainRed ' : ''
          }`}
        >
          {t('userDesc')}
        </p>
      </div>

      <div
        className={`flex items-center gap-4 cursor-pointer group transition-all p-2 ${
          isCurrentRoute('/user-basket') ? 'bg-mainRedLight' : ''
        }`}
      >
        <Image width={25} height={0} src={'/basketIcon.svg'} alt="basketIcon" />
        <p
          onClick={() => navigate.push('/user-basket')}
          className={`font-semibold text-grayText2 text-lg group-hover:text-mainRed ${
            isCurrentRoute('/user-basket') ? 'text-mainRed ' : ''
          }`}
        >
          {t('userDesc2')}
        </p>
      </div>

      <div
        className={`flex items-center gap-4 cursor-pointer group transition-all p-2 ${
          isCurrentRoute('/user-order') ? 'bg-mainRedLight' : ''
        }`}
      >
        <Image
          className=" "
          width={25}
          height={0}
          src={'/orders-icon.svg'}
          alt="orderIcon"
        />
        <p
          onClick={() => navigate.push('/user-order')}
          className={`font-semibold text-grayText2 text-lg group-hover:text-mainRed ${
            isCurrentRoute('/user-order') ? 'text-mainRed ' : ''
          }`}
        >
          {t('userDesc3')}
        </p>
      </div>

      <div
        className={`flex items-center gap-4 cursor-pointer group transition-all p-2 ${
          isCurrentRoute('/user-checkout') ? 'bg-mainRedLight' : ''
        }`}
      >
        <Image
          width={22}
          height={0}
          src={'/checkoutIcon.svg'}
          alt="checkoutIcon"
        />
        <p
          onClick={() => navigate.push('/user-checkout')}
          className={`font-semibold text-grayText2 text-lg group-hover:text-mainRed ${
            isCurrentRoute('/user-checkout') ? 'text-mainRed ' : ''
          }`}
        >
          {t('userDesc4')}
        </p>
      </div>

      <div
        className="flex items-center gap-4 cursor-pointer group hover:bg-mainRedLight transition-all p-2"
        onClick={logOut}
      >
        <Image width={25} height={0} src={'/logout.svg'} alt="logoutIcon" />
        <p
          className={`font-semibold text-grayText2 text-lg group-hover:text-mainRed `}
        >
          {t('userDesc5')}
        </p>
      </div>
    </div>
  )
}
export default UserAside
