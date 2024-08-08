import { useTranslation } from 'react-i18next'
import TableData from '../orderTableData'
import { useEffect, useState } from 'react'
import { useGlobalStore } from '../../../services/provider'
import { getOrders } from '../../../services/axios'

const Table = () => {
  const { t } = useTranslation()
  const { orderData, setOrderData } = useGlobalStore()
  const { orderForShow, setOrderForShow } = useGlobalStore()

  const fetchOrder = async () => {
    try {
      const res = await getOrders()
      const result = res?.data.result.data || []

      const sortedResult = result.sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      )

      setOrderForShow(res)
      setOrderData(sortedResult)
    } catch (error) {
      console.error('Error fetching order:', error)
    }
  }

  useEffect(() => {
    fetchOrder()
  }, [])

  return (
    <section className="max-w-full overflow-x-auto">
      <table className=" min-w-full bg-white text-center">
        <thead className="sticky top-0 bg-white z-[10]">
          <tr>
            <th className="py-2 px-4 border-b border-whiteLight3">ID</th>
            <th className="py-2 px-4 border-b border-whiteLight3">
              {t('userDesc6')}
            </th>
            <th className="py-2 px-4 border-b border-whiteLight3">
              {t('userDesc7')}
            </th>
            <th className="py-2 px-4 border-b border-whiteLight3">
              {t('userDesc8')}
            </th>
            <th className="py-2 px-4 border-b border-whiteLight3">
              {t('userDesc9')}
            </th>
            <th className="py-2 px-4 border-b border-whiteLight3">
              {t('userDesc10')}
            </th>
            <th className="py-2 px-4 border-b border-whiteLight3">Show</th>
          </tr>
        </thead>
        <tbody>
          {orderData?.map((item, index) => (
            <TableData
              key={`tableData_${index}`}
              id={item.id}
              time={item.created}
              address={item.delivery_address}
              amount={item.amount}
              payment={item.payment_method == 1 ? 'Credit Card' : 'Pay Cash'}
              contact={item.contact}
            />
          ))}
        </tbody>
      </table>
    </section>
  )
}
export default Table
