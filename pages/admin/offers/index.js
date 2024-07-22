import { useTranslation } from 'react-i18next'
import Subheading from '../../../shared/components/admin/Subheading'
import AdminLayout from '../../../shared/components/layout/admin'
import AdminLeftModal from '../../../shared/components/admin/adminLeftModal'
import { useRef, useState } from 'react'

const Offers = () => {
  const { t } = useTranslation()
  const [isHiddenModal, setIsHiddenModal] = useState(true)
  const [image, setImage] = useState('')
  const img = useRef(null)
  const addOfferName = useRef(null)
  const addOfferDesc = useRef(null)

  const handleAddNewImage = (image_url) => {
    setImage(image_url)
  }
  function changeHidden() {
    setIsHiddenModal((prev) => !prev)
  }
  return (
    <AdminLayout>
      <AdminLeftModal
        onClickClose={changeHidden}
        p={t('ofAdd')}
        p1={t('adminModalUploadImage')}
        p2={t('adminModalOfferInformation')}
        hidden={isHiddenModal}
        imageUrl={handleAddNewImage}
        getImgUrl={handleAddNewImage}
        imgRef={img}
        addProductName={addOfferName}
        addProductDesc={addOfferDesc}
        btn={t('ofCreate')}
      />
      <Subheading
        text={t('adminLeftBarComponent6')}
        add={t('addOffer')}
        changeHidden={changeHidden}
      />
    </AdminLayout>
  )
}
export default Offers
