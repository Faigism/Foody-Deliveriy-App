import Button from '../Button'
// import { Languages } from '../Languages'

const NavbarAvatar = ({ isName }) => {
  return (
    <div className="flex items-center gap-7 relative">
      {/* <Languages /> */}
      <Button
        className="rounded-full w-10 h-10 text-lg text-white shadow-md bg-mainRed font-semibold cursor-default"
        innerText={isName}
      />
    </div>
  )
}

export default NavbarAvatar
