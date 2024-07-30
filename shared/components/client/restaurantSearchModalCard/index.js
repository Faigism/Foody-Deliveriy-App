import Image from 'next/image'

const RestaurantSearchModalCard = ({ image, name, desc, onclick, id }) => {
  return (
    <div
      onClick={() => onclick(id)}
      className="flex items-center gap-5 border-b-2 border-b-whiteLight1 p-4 mb-5 cursor-pointer hover:bg-whiteLight1"
    >
      <Image width={60} height={0} src={image} alt={image} />
      <div className="flex flex-col w-full ">
        <p className=" font-semibold whitespace-nowrap overflow-x-auto">
          {name}
        </p>
        <p className=" text-grayText2 whitespace-nowrap overflow-x-auto">
          {desc}
        </p>
      </div>
    </div>
  )
}
export default RestaurantSearchModalCard
