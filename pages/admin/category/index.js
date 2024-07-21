import { useTranslation } from 'react-i18next'
import Subheading from '../../../shared/components/admin/Subheading'
import AdminLayout from '../../../shared/components/layout/admin'
import { useRef, useState } from 'react'
import AdminLeftModal from '../../../shared/components/admin/adminLeftModal'

const Category = () => {
  const { t } = useTranslation()
  const [isHiddenModal, setIsHiddenModal] = useState(true)
  const [image, setImage] = useState('')
  const img = useRef(null)
  const addCategoryName = useRef(null)
  const addCategorySlug = useRef(null)

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
        p={t('cateAdd')}
        p1={t('adminModalUploadImage')}
        p2={t('adminModalCategoryInformation')}
        hidden={isHiddenModal}
        imageUrl={handleAddNewImage}
        getImgUrl={handleAddNewImage}
        imgRef={img}
        addProductName={addCategoryName}
        addCategorySlug={addCategorySlug}
        btn={t('cateCreate')}
      />
      <Subheading
        text={t('adminLeftBarComponent4')}
        add={t('addCategory')}
        changeHidden={changeHidden}
      />
    </AdminLayout>
  )
}
export default Category
