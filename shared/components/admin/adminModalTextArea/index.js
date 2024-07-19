const AdminModalTextArea = ({ p, useRef }) => {
  return (
    <div className="mb-3">
      <p className=" text-grayText font-medium  mb-2   text-base">{p}</p>
      <textarea
        ref={useRef}
        className=" w-full  rounded-2xl h-24  font-medium text-base  text-whiteLight pt-2 pl-4 bg-darkBlue_4 capitalize"
      ></textarea>
    </div>
  )
}
export default AdminModalTextArea
