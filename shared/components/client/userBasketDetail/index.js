import Button from '../button'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import UserBasketCard from '../userBasketCard'

const UserBasketDetail = ({ data, itemsCount }) => {
  const { t } = useTranslation()
  const navigate = useRouter()

  return (
    <>
      {itemsCount === 0 ? (
        <>
          <div className="w-full flex flex-col px-3 sm:px-8 py-10 flex-wrap gap-0 sm:bg-whiteLight1">
            <h2 className="font-semibold text-3xl text-grayText2">
              {t('userDesc2')}
            </h2>
            <div className="flex items-center gap-2 border-b-2 border-whiteLight2 pb-4">
              <img
                width={20}
                height={0}
                src={'/basketIconGray.svg'}
                alt="basketIcon"
              />
              <p className="text-whiteLight3 font-medium">
                {itemsCount} {t('items')}
              </p>
            </div>

            <div className="flex flex-col items-center mx-auto my-5">
              <img width={200} height={0} src={'/emptyGray.svg'} alt="empty" />
              <Button
                onClick={() => {
                  navigate.push('/restaurants')
                }}
                className="text-lightRed font-medium text-xl hover:-translate-x-1 transition-all duration-200"
                innerText="&#10094; Restaurants"
              />
            </div>

            <div className="bg-whiteLight3 text-white flex items-center mt-8 justify-between pl-10 pr-2 py-2 rounded-full shadow-md">
              <p className="font-medium text-xl">{t('userDesc4')}</p>
              <Button
                className="bg-white text-whiteLight3 rounded-full py-1 px-14 font-medium text-lg"
                innerText="$0"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex flex-col px-3 sm:px-8 py-10 flex-wrap gap-0 sm:bg-whiteLight1">
            <h2 className="font-semibold text-3xl text-grayText2">
              {t('userDesc2')}
            </h2>
            <div className="flex items-center gap-2 border-b-2 border-whiteLight2 pb-4">
              <img
                width={20}
                height={0}
                src={'/basketIcon.svg'}
                alt="basketIcon"
              />
              <p className="text-mainRed font-medium">
                {itemsCount} {t('items')}
              </p>
            </div>

            <div className="mb-5 max-h-[189px] overflow-y-auto">
              {data?.items?.map((item, index) => {
                return (
                  <UserBasketCard
                    key={index}
                    // clearBasket={() => handleClearButtonClick(data?.id)}
                    // decreaseBtn={() => handleDecreaseButtonClick(item?.id)}
                    // increaseBtn={() => handleIncreaseButtonClick(item?.id)}
                    name={item?.name}
                    price={item?.amount}
                    count={item?.count}
                    imageSrc={item?.img_url}
                  />
                )
              })}
            </div>
            <div className="bg-mainRed text-white flex items-center mt-8 justify-between pl-10 pr-2 py-2 rounded-full shadow-md">
              <p className="font-medium text-xl">{t('userDesc4')}</p>
              <Button
                onClick={() => navigate.push('/user-checkout')}
                className="bg-white text-mainRed rounded-full py-1 px-14 font-medium text-lg hover:scale-95 transition-all duration-500"
                innerText={`$ ${data?.total_amount}`}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}
export default UserBasketDetail
