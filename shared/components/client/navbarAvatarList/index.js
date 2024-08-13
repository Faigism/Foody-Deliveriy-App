import { useRouter } from 'next/router'

const NavbarAvatarList = () => {
  const navigate = useRouter()

  const logOut = () => {
    localStorage.removeItem('tokenObj')
    localStorage.removeItem('userInfo')
    navigate.push('/login')
  }

  return (
    <ul className="absolute top-12 w-[160px] bg-whiteLight1 z-50 sm:flex flex-col gap-1 p-4 shadow-xl rounded-md">
      <li
        onClick={() => {
          navigate.push('/user-profile')
        }}
        className="border-b-2 border-b-whiteLight2 pb-1 cursor-pointer font-medium hover:text-grayText2"
      >
        Profile
      </li>
      <li
        onClick={() => {
          navigate.push('/user-basket')
        }}
        className="border-b-2 border-b-whiteLight2 pb-1 cursor-pointer font-medium hover:text-grayText2"
      >
        Your Basket
      </li>
      <li
        onClick={() => {
          navigate.push('/user-order')
        }}
        className="border-b-2 border-b-whiteLight2 pb-1 cursor-pointer font-medium hover:text-grayText2"
      >
        Your Orders
      </li>
      <li
        onClick={() => {
          navigate.push('/user-checkout')
        }}
        className="border-b-2 border-b-whiteLight2 pb-1 cursor-pointer font-medium hover:text-grayText2"
      >
        Checkout
      </li>
      <li
        onClick={logOut}
        className="cursor-pointer font-medium hover:text-grayText2"
      >
        Logout
      </li>
    </ul>
  )
}
export default NavbarAvatarList
