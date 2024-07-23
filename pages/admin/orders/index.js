import { useTranslation } from 'react-i18next'
import Subheading from '../../../shared/components/admin/Subheading'
import AdminLayout from '../../../shared/components/layout/admin'
import { useEffect, useState } from 'react'
import AdminOrderHistory from '../../../shared/components/admin/adminOrderHistory'
const Orders = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  function changeHidden() {
    setIsHiddenModal((prev) => !prev)
  }
  const orderRender = async () => {
    try {
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(() => {
    orderRender()
  }, [])
  return (
    <AdminLayout>
      <Subheading
        text={t('adminLeftBarComponent5')}
        changeHidden={changeHidden}
      />
      {!loading ? (
        <div className=" w-[94%] mt-10 bg-white ml-[50px] h-[400px] overflow-y-scroll">
          <table className="w-[100%] ">
            <thead className="h-16 text-sm px-8">
              <tr>
                <th>ID</th>
                <th>Customer Id</th>
                <th>Time</th>
                <th>Delivery Address</th>
                <th>Payment Method</th>
                <th>Amount</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              <AdminOrderHistory />
            </tbody>
          </table>
        </div>
      ) : (
        <div className="h-60 flex items-center justify-center">
          <div className="loading"></div>
        </div>
      )}
    </AdminLayout>
  )
}
export default Orders









