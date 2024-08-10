import { useTranslation } from 'react-i18next'
import Subheading from '../../../shared/components/admin/Subheading'
import AdminLayout from '../../../shared/components/layout/admin'
import AdminLeftModal from '../../../shared/components/admin/adminLeftModal'
import { useEffect, useRef, useState } from 'react'
import { useGlobalStore } from '../../../shared/services/provider'
import { getOffer, postOffer } from '../../../shared/services/axios'
import AdminOffer from '../../../shared/components/admin/adminOffer'
import AuthCheck from '../../../shared/components/admin/authCheck'
import { toast } from 'react-toastify'
const Offers = () => {
  const { t } = useTranslation()
  const [isHiddenModal, setIsHiddenModal] = useState(true)
  const [image, setImage] = useState('')
  const img = useRef(null)
  const addOfferName = useRef(null)
  const addOfferDesc = useRef(null)
  const [loading, setLoading] = useState(true)
  const { offerData, setOfferData, refresh, setRefresh } = useGlobalStore()

  const handleAddNewImage = (image_url) => {
    setImage(image_url)
  }
  function changeHidden() {
    setIsHiddenModal((prev) => !prev)
  }
  const offersRender = async () => {
    try {
      const res = await getOffer()
      const offersArray = res?.data.result.data
      setOfferData(offersArray)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  useEffect(() => {
    offersRender()
  }, [refresh])

  const addOffer = async () => {
    const offerName = addOfferName?.current?.value
    const offerDesc = addOfferDesc?.current?.value
    const img = image

    if (offerName.trim().length < 2) {
      toast.error("Invalid product name")
    } else if (img == null || img?.trim().length === 0) {
      toast.error("Invalid image URL")
    } else if (offerDesc.trim().length < 2) {
      toast.error("Add description")
    } else {
      const data = {
        name: offerName,
        img_url: img,
        description: offerDesc,
      }
      const response = await postOffer(data);

      if (response?.status === 201) {
        toast.success("Offer successfully added")
        // img.current.value = null;
        addOfferName.current.value = "";
        addOfferDesc.current.value = "";
        setIsHiddenModal(true)
        setRefresh(!refresh)
      }
    }

  }

  return (
    <AuthCheck>
      <AdminLayout>
        <AdminLeftModal
          onClickClose={changeHidden}
          createOnClick={addOffer}
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
        {!loading ? (
          <div className=" w-[94%] mt-10 bg-white ml-[50px] h-[400px] overflow-y-scroll">
            <table className="w-[100%] ">
              <thead className="h-16 text-sm px-8">
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Edit and delete</th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(offerData) ? offerData : []).map((item) => (
                  <AdminOffer key={item.id} item={item} />
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
    </AuthCheck>
  )
}
export default Offers
