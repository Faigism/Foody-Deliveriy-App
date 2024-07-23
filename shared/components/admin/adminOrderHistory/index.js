import Image from 'next/image'
import { ToastContainer } from 'react-toastify'
import Modal from '../Modal'
import Button from '../Button'
import { useTranslation } from 'react-i18next'
const AdminOrderHistory = () => {
  const { t } = useTranslation()
  return (
    <>
      <ToastContainer />
      <tr className="h-14 text-center  border-slate-700  border-y text-gray-900 text-sm not-italic font-normal leading-5">
        <td>
          <div>
            <p className=" border-slate-700  border rounded-lg ml-2">id</p>
          </div>
        </td>
        <td>
          <div className="flex justify-center">
            <p className=" border-slate-700  border rounded-lg px-2 ">
              customer id
            </p>
          </div>
        </td>
        <td>formatDate</td>
        <td>data Address</td>
        <td>Credit or Cash</td>
        <td>Amount</td>
        <td>Contact</td>
        <td>
          <Image
            width="24"
            height="0"
            src="/adminMarqaritaDeleteButton.svg"
            alt=""
            className=" cursor-pointer"
          />
        </td>
      </tr>{' '}
      <Modal>
        <div className="flex justify-between items-center">
          <p className="mx-auto text-3xl font-medium">desc</p>
          <Button className="text-mainRed text-lg" innerText="&#10006;" />
        </div>
        <p className=" text-grayText1 w-2/3 mx-auto text-center my-5">button</p>
        <div className="mx-auto flex items-center justify-center gap-9">
          <Button
            className=" border-grayText1 text-grayText1 py-1 px-8 rounded-md border-2 shadow-md hover:scale-95 transition-all duration-500"
            innerText="button1"
          />
          <Button
            className="bg-mainRed border-2 text-white py-1 px-8 rounded-md border-mainRed shadow-md hover:scale-95 transition-all duration-500"
            innerText="button2"
          />
        </div>
      </Modal>
    </>
  )
}
export default AdminOrderHistory








