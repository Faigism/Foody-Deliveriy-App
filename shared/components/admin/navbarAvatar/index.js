import Button from '../Button'

const NavbarAvatar = ({ isName }) => {
  return (
    <div className="flex items-center gap-7 relative">
      <Button
        className="rounded-full w-10 h-10 text-lg text-white shadow-md bg-mainRed font-semibold cursor-default"
        innerText={isName}
      />
    </div>
  )
}

export default NavbarAvatar
