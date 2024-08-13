import { useEffect, useRef, useState } from 'react'
import Button from '../Button'
import NavbarAvatar from '../navbarAvatar'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import NavbarLangButton from '../navbarLangButton'
import AdminLeftModal from '../adminLeftModal'
import { toast } from 'react-toastify'
import { createProduct, getRestaurants } from '../../../services/axios'
import { useGlobalStore } from '../../../services/provider'

const Navbar = ({ adminNavbar }) => {
  const { t } = useTranslation()
  const navigate = useRouter()

  const { products, setProducts, setRefresh, refresh } = useGlobalStore()
  const [isActiveName, setIsActiveName] = useState('')
  const [isHiddenModal, setIsHiddenModal] = useState(true)
  const [isModalOpen, setModalOpen] = useState(false)
  const [restaurants, setRestaurants] = useState()
  const [image, setImage] = useState('')
  const img = useRef(null)
  const addProductName = useRef(null)
  const addProductPrice = useRef(null)
  const addProductRestaurant = useRef(null)
  const addProductDesc = useRef(null)

  const fetchRestaurants = async () => {
    try {
      const response = await getRestaurants()
      const restaurants = response?.data.result.data.map((item) => item.name)
      setRestaurants(restaurants)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchRestaurants()
  }, [])

  const addProduct = async () => {
    const productName = addProductName.current?.value
    const productPrice = addProductPrice.current?.value
    const productDesc = addProductDesc.current?.value
    const productRestaurant = addProductRestaurant.current?.value
    const img = image

    if (
      !isInputValid(
        productName,
        productPrice,
        productDesc,
        productRestaurant,
        img
      )
    ) {
      toast.dismiss()
      toast.warning('Please fill all the inputs!', {
        position: 'top-left',
      })
      return
    }
    const productValues = {
      name: productName,
      description: productDesc,
      img_url: img,
      rest_id: productRestaurant,
      price: parseFloat(productPrice),
    }

    try {
      const response = await createProduct(productValues)
      const prValue = response?.data

      if (response?.status === 201) {
        setProducts((prev) => [...prev, prValue])
        toast.success('Product added successfully...')
        setRefresh(!refresh)

        if (addProductName.current) addProductName.current.value = ''
        if (addProductPrice.current) addProductPrice.current.value = ''
        if (addProductDesc.current) addProductDesc.current.value = ''
        if (addProductRestaurant.current)
          addProductRestaurant.current.value = ''
        if (img.current) img.current.src = '/noimg.png'

        setTimeout(() => {
          changeHidden()
        }, 500)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function isInputValid(
    productName,
    productPrice,
    productDesc,
    productRestaurant,
    img_url
  ) {
    return (
      !!productName &&
      !!productPrice &&
      !!productDesc &&
      !!productRestaurant &&
      !!img_url
    )
  }

  function changeHidden() {
    setIsHiddenModal((prev) => !prev)
  }

  const toggleModal = () => {
    setModalOpen(!isModalOpen)
  }

  const handleAddNewImage = (image_url) => {
    setImage(image_url)
  }

  return (
    <nav className="flex justify-between m-0 mb-4 items-center rounded-md py-11 px-5 sm:m-0 sm:mb-4 bg-darkBlue_3 sm:p-5 fixed w-[98%] z-10">
      <h1 className="text-white text-3xl font-extrabold flex items-center">
        Foody
        <span className="text-orange">.</span>
      </h1>
      <AdminLeftModal
        onClickClose={changeHidden}
        p={t('adminModalAddProduct')}
        p1={t('adminModalUploadImage')}
        p2={t('adminModalProductInformation')}
        hidden={isHiddenModal}
        btn={t('prCreate')}
        imgRef={img}
        getImgUrl={handleAddNewImage}
        createOnClick={addProduct}
        addProductName={addProductName}
        addProductPrice={addProductPrice}
        addProductDesc={addProductDesc}
        addProductRestaurant={addProductRestaurant}
        imageUrl={handleAddNewImage}
        cateArr={restaurants}
      />
      <div className="flex gap-2 sm:gap-5">
        <Button
          onClick={changeHidden}
          className="p-3 hidden sm:block bg-lightPurple_3 text-white text-sm font-medium px-3 rounded-full shadow-sm shadow-textGreenLight hover:scale-95 transition-all duration-500"
          innerText={t('addProduct')}
        />
        <NavbarLangButton />
        <NavbarAvatar isName={isActiveName} />
      </div>
    </nav>
  )
}
export default Navbar
