import { useTranslation } from 'react-i18next'
import Subheading from '../../../shared/components/admin/Subheading'
import AdminLayout from '../../../shared/components/layout/admin'
import { useEffect, useState } from 'react'
import AdminOrderHistory from '../../../shared/components/admin/adminOrderHistory'
import AuthCheck from '../../../shared/components/admin/authCheck'
import { useGlobalStore } from '../../../shared/services/provider'
import { getHistory } from '../../../shared/services/axios'
const OrderHistory = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const { history, setHistory } = useGlobalStore()

  function changeHidden() {
    setIsHiddenModal((prev) => !prev)
  }

  const historyRender = async () => {
    try {
      const response = await getHistory()
      const sortedOrder = response?.data.result.data.sort((a, b) => {
        return new Date(b.created) - new Date(a.created)
      })
      setHistory(sortedOrder)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    historyRender()
  }, [])

  return (
    <AuthCheck>
      <AdminLayout>
        <Subheading
          text={t('adminLeftBarComponent8')}
          changeHidden={changeHidden}
        />
        {!loading ? (
          <div className=" w-[94%] mt-10 bg-white ml-[50px] h-[400px] overflow-y-scroll rounded-md">
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
                {history.map((data) => (
                  <AdminOrderHistory data={data} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="h-60 flex items-center justify-center">
            <div className="loading"></div>
          </div>
        )}
      </AdminLayout>
    </AuthCheck>
  )
}
export default OrderHistory
