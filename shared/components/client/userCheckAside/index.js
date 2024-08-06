import { useTranslation } from 'react-i18next'
import { getProductForBasket } from '../../../services/axios'
import { useEffect, useState } from 'react'

const UserCheckAside = () => {
  const { t } = useTranslation()
  const [basket, setBasket] = useState({})

  const renderBasket = async () => {
    const res = await getProductForBasket()
    if (res?.status === 200) {
      setBasket(res.data.result.data)
    }
  }
  useEffect(() => {
    renderBasket()
  }, [])

  return (
    <div className="w-full sm:w-[40%] flex flex-col justify-between px-3 sm:px-8 py-10 flex-wrap gap-0 sm:bg-whiteLight1">
      <p className="w-full text-center text-grayText1 font-medium text-xl">
        {t('userDesc3')}
      </p>
      <div className="flex flex-col mt-4 sm:mt-0 gap-6 max-h-72 pr-2 overflow-y-auto ">
        {basket?.items?.map((item) => {
          return (
            <div
              className="flex items-center text-grayText1 justify-between"
              key={item.id}
            >
              <div className="flex items-center gap-1">
                <p className="text-grayText2 text-lg font-semibold">
                  {item.count}
                </p>
                <p>x {item.name}</p>
              </div>
              <p>$ {item.price}</p>
            </div>
          )
        })}
      </div>
      <div className="flex justify-between items-center px-6 border-t-2 mt-2 pt-8 border-t-whiteLight2">
        <p className="font-semibold text-xl text-grayText2">
          {t('userCheck6')}
        </p>
        <p className="text-grayText1">${basket?.total_amount}</p>
      </div>
    </div>
  )
}
export default UserCheckAside
