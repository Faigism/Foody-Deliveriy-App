import { useTranslation } from 'react-i18next'

const UserBasketCard = ({
  imageSrc,
  price,
  count,
  decreaseBtn,
  increaseBtn,
  name,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="flex relative sm:pr-9 justify-between items-center border-b-2 border-whiteLight2 py-8">
        <img width={96} height={0} src={imageSrc} alt={imageSrc} />

        <div className="flex flex-col w-full pl-7">
          <p className="font-medium text-grayText2 text-2xl">{name}</p>
          <p className="font-medium text-lg">${price}</p>
        </div>

        <div className="flex flex-col bg-whiteLight1 sm:bg-white py-1 px-3 rounded-full gap-3 items-center">
          <button onClick={increaseBtn}>
            <img width={30} height={0} src={'/add.svg'} alt="add" />
          </button>
          <p className="text-lg font-medium">{count}</p>
          <button onClick={decreaseBtn}>
            <img width={30} height={0} src={'/remove.svg'} alt="remove" />
          </button>
        </div>
      </div>
    </>
  )
}
export default UserBasketCard
