import { useRouter } from 'next/router'
import Button from '../button'
import RestaurantSearchModalCard from '../restaurantSearchModalCard'

const RestaurantSearchModal = ({ filterRestaurant, onClose }) => {
  function onclick(id) {
    push(`/restaurants/${id}`)
  }

  const { query, push } = useRouter()

  return (
    <div className=" absolute top-[135px] right-[20.75%] flex flex-col justify-between rounded-lg py-5 bg-white z-50 w-[32%]">
      <Button
        onClick={onClose}
        className="text-start pl-5 hover:text-mainRedLight mb-5 mr-12"
        innerText="&#10006;"
      />
      <div className="max-h-[180px] overflow-y-auto overflow-x-hidden">
        {filterRestaurant?.map((item) => (
          <div key={item.id}>
            <RestaurantSearchModalCard
              image={item.img_url}
              name={item.name}
              desc={item.cuisine}
              onclick={onclick}
              id={item.id}
            />
          </div>
        ))}

        <Button
          className="text-lg font-light text-grayText2 w-full"
          innerText="More"
        />
      </div>
    </div>
  )
}
export default RestaurantSearchModal
