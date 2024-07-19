const AdminModalInput = ({ p, useRef }) => {
  return (
    <div className={` flex flex-col gap-2 mb-6`}>
      <p className=" text-grayText font-medium text-base">{p}</p>
      <input
        ref={useRef}
        className="   bg-darkBlue_4 rounded-2xl font-medium text-base  text-whiteLight pl-5 py-3  capitalize "
        type="text"
      />
    </div>
  )
}
export default AdminModalInput
