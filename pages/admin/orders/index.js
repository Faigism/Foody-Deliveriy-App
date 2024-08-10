import { useTranslation } from 'react-i18next'
import Subheading from '../../../shared/components/admin/Subheading'
import AdminLayout from '../../../shared/components/layout/admin'
import { useEffect, useState } from 'react'
import AdminOrder from '../../../shared/components/admin/adminOrder'
import AuthCheck from '../../../shared/components/admin/authCheck'
import { useGlobalStore } from '../../../shared/services/provider'
import { getOrderList, getOrders } from '../../../shared/services/axios'
const Orders = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [isHiddenModal, setIsHiddenModal] = useState(true)
  const { orderForShow, setOrderForShow } = useGlobalStore()
  const { orderData, setOrderData } = useGlobalStore()

  function changeHidden() {
    setIsHiddenModal((prev) => !prev)
  }

  const orderRender = async () => {
    try {
      const response = await getOrderList()
      const sortedOrder = response?.data.result.data.sort((a, b) => {
        return new Date(a.created) - new Date(b.created)
      })
      setOrderForShow(response)
      setOrderData(sortedOrder)
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
    <AuthCheck>
      <AdminLayout>
        <Subheading
          text={t('adminLeftBarComponent5')}
          changeHidden={changeHidden}
        />
        {!loading ? (
          <div className=" w-[94%] mt-10 bg-white ml-[50px] h-[400px] overflow-y-scroll rounded-md">
            <table className="w-[100%] ">
              <thead className="h-16 text-sm px-8">
                <tr>
                  <th>ID</th>
                  <th>{t('adminOrder1')}</th>
                  <th>{t('userDesc6')}</th>
                  <th>{t('userDesc7')}</th>
                  <th>{t('userDesc9')}</th>
                  <th>{t('userDesc8')}</th>
                  <th>{t('userDesc10')}</th>
                </tr>
              </thead>
              <tbody>
                {orderData?.map((data) => (
                  <AdminOrder data={data} />
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
export default Orders
