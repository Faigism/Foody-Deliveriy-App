import { useTranslation } from 'react-i18next'
import Subheading from '../../../shared/components/admin/Subheading'
import AdminLayout from '../../../shared/components/layout/admin'
import { useEffect, useRef, useState } from 'react'
import AdminLeftModal from '../../../shared/components/admin/adminLeftModal'
import { useGlobalStore } from '../../../shared/services/provider'
import {
  getCategoriesFromDB,
  postCategory,
} from '../../../shared/services/axios'
import { ToastContainer } from 'react-toastify'
import AdminCategory from '../../../shared/components/admin/adminCategory'

const Category = () => {
  const { t } = useTranslation()
  const [isHiddenModal, setIsHiddenModal] = useState(true)
  const [imageUrl, setImageUrl] = useState('string')
  const imgRef = useRef(null)
  const addCategoryName = useRef(null)
  const addCategorySlug = useRef(null)
  const { categoryData, setCategoryData } = useGlobalStore()
  const [loading, setLoading] = useState(true)

  const addCategory = async () => {
    const categoryName = addCategoryName?.current?.value
    const categorySlug = addCategorySlug?.current?.value
    const img = imageUrl

    const form = {
      name: categoryName,
      slug: categorySlug,
      img_url: img,
    }

    try {
      const res = await postCategory(form)

      if (res?.status === 201) {
        setCategoryData((prev) => [...prev, res.data])
        if (addCategoryName.current && addCategorySlug.current) {
          addCategoryName.current.value = ''
          addCategorySlug.current.value = ''
        }

        setTimeout(() => {
          changeHidden()
        }, 500)

        // toast.success('Category created successfully!')
      }
    } catch (error) {
      console.error('Error adding category:', error)
    }
  }

  const fetchCategoryData = async () => {
    try {
      const res = await getCategoriesFromDB()
      setCategoryData(res)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategoryData()
  }, [])

  const handleAddNewImage = (image_url) => {
    setImageUrl(image_url)
  }

  function changeHidden() {
    setIsHiddenModal((prev) => !prev)
  }

  return (
    <>
      <ToastContainer />
      <AdminLayout>
        <AdminLeftModal
          onClickClose={changeHidden}
          p={t('cateAdd')}
          p1={t('adminModalUploadImage')}
          p2={t('adminModalCategoryInformation')}
          hidden={isHiddenModal}
          imageUrl={handleAddNewImage}
          getImgUrl={handleAddNewImage}
          createOnClick={addCategory}
          imgRef={imgRef}
          addProductName={addCategoryName}
          addCategorySlug={addCategorySlug}
          btn={t('cateCreate')}
        />
        <Subheading
          text={t('adminLeftBarComponent4')}
          add={t('addCategory')}
          changeHidden={changeHidden}
        />
        {!loading ? (
          <div className=" w-[94%] mt-10 bg-white ml-[50px] h-[400px] overflow-y-scroll">
            <table className="w-[100%] ">
              <thead className="h-16 text-sm px-8">
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Edit and delete</th>
                </tr>
              </thead>
              <tbody>
                {categoryData?.map((item) => (
                  <AdminCategory key={item.id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="h-60 flex items-center justify-center">
            <div className="loading"></div>
          </div>
        )}
      </AdminLayout>
    </>
  )
}
export default Category
