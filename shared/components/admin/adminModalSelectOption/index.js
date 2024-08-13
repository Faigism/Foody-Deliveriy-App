import { useTranslation } from 'react-i18next'

const AdminModalSelectOption = ({ p, arr, useRef, className }) => {
  const { t } = useTranslation()
  return (
    <div>
      <p className="text-white font-medium text-base">{p}</p>
      <select ref={useRef} className={className} defaultValue={''}>
        <option value="" disabled>
          {t('adminModalSelectChoose')}
        </option>
        {/* <option value="all">All</option> */}
        {arr
          ? arr?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))
          : ''}
      </select>
    </div>
  )
}
export default AdminModalSelectOption
