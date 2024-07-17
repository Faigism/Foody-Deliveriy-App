import orderIcon from '../../../../public/orders-icon.svg'
import dashboardIcon from '../../../../public/dashboard-icon.svg'
import productIcon from '../../../../public/product-icon.svg'

import { useTranslation } from 'react-i18next'
import AdminAsideItem from '../adminAsideItem'
import { useRouter } from 'next/router'

const AdminAside = () => {
  const { t, i18n } = useTranslation()

  const { push } = useRouter()

  function changePage(value) {
    push(`/admin/${value}`)
  }

  return (
    <div className=" bg-lightPurple_2 w-full sm:w-[256px] h-[474px] flex flex-col gap-2 pt-6 pl-2 sm:pl-6 pr-4 rounded-[14px] fixed mt-[100px]">
      {/* <ToastContainer /> */}
      <AdminAsideItem
        value={'dashboard'}
        innerText={t('adminLeftBarComponent')}
        img={dashboardIcon}
        onClick={changePage}
      />
      <AdminAsideItem
        value={'products'}
        innerText={t('adminLeftBarComponent2')}
        img={productIcon}
        onClick={changePage}
      />
      <AdminAsideItem
        value={'restaurants'}
        innerText={t('adminLeftBarComponent3')}
        img="/restaurant-icon.svg"
        onClick={changePage}
      />
      <AdminAsideItem
        value={'category'}
        innerText={t('adminLeftBarComponent4')}
        img="/category-icon.svg"
        onClick={changePage}
      />
      <AdminAsideItem
        value={'orders'}
        innerText={t('adminLeftBarComponent5')}
        img="/orders-icon.svg"
        onClick={changePage}
      />
      <AdminAsideItem
        value={'history'}
        innerText={t('adminLeftBarComponent8')}
        img="/offer-icon.svg"
        onClick={changePage}
      />
      <AdminAsideItem
        value={'offers'}
        innerText={t('adminLeftBarComponent6')}
        img={orderIcon}
        onClick={changePage}
      />
      {/* <AdminAsideItem
        value={'logout'}
        innerText={t('adminLeftBarComponent7')}
        img="/logout-icon.svg"
        onClick={logout}
      /> */}
    </div>
  )
}
export default AdminAside
