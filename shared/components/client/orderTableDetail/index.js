import { useTranslation } from 'react-i18next'
import OrderTableDetailData from '../orderTableDetailData'
import { useGlobalStore } from '../../../services/provider'

const OrderTableDetail = ({ id }) => {
  const { t } = useTranslation()
  const { orderForShow, setOrderForShow } = useGlobalStore()

  let FilteredData = orderForShow?.data?.result.data.filter(
    (item) => item.id == id
  )

  return (
    <div className="h-[300px] overflow-scroll">
      <table className="min-w-full bg-white text-center">
        <thead className="sticky top-0 bg-white z-10">
          <tr>
            <th className="py-2 px-4 border-b border-whiteLight3">
              {t('userOrder')}
            </th>
            <th className="py-2 px-4 border-b border-whiteLight3">
              {t('userOrder2')}
            </th>
            <th className="py-2 px-4 border-b border-whiteLight3">
              {t('userOrder3')}
            </th>
            <th className="py-2 px-4 border-b border-whiteLight3">
              {t('userOrder4')}
            </th>
            <th className="py-2 px-4 border-b border-whiteLight3">
              {t('userOrder5')}
            </th>
          </tr>
        </thead>
        <tbody>
          {FilteredData[0]?.products?.map((item, index) => (
            <OrderTableDetailData
              key={index}
              image={item.img_url}
              name={item.name}
              price={item.price}
              count={item.count}
              amount={item.amount}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default OrderTableDetail
