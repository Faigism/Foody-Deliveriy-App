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
  const offerImg = useRef(null)
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

    if (offerName == '' || offerDesc == '' || image == '') {
      toast.warning('Fill the inputs correctly!', {
        position: 'top-left',
        autoClose: 1000,
      })
    } else {
      const data = {
        name: offerName,
        description: offerDesc,
        img_url: image,
      }

      const response = await postOffer(data)

      const prValue = response?.data

      if (response?.status === 201) {
        setOfferData((prev) => [...prev, prValue])

        toast.success('Offer successfully added', {
          autoClose: 1000,
        })
        if (offerImg.current) {
          offerImg.current.src = '/noimg.png'
          setImage('')
        }
        if (addOfferName.current) addOfferName.current.value = ''
        if (addOfferDesc.current) addOfferDesc.current.value = ''
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
          imgRef={offerImg}
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
                  <AdminOffer
                    key={item.id}
                    item={item}
                    setOfferData={setOfferData}
                    offerData={offerData}
                  />
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
