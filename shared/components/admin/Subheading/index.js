import React from 'react'
import styles from './subheading.module.css'
import TypeButton from './TypeButton'
import AddButton from './AddButton'

const Subheading = ({
  text,
  type,
  add,
  state,
  callBackValue,
  handleClick,
  handleSearchByType,
  changeHidden,
}) => {
  return (
    <div className={styles.subHeading}>
      <p className={styles.text}>{text}</p>
      <div className="flex gap-5 me-5">
        {type && (
          <TypeButton
            text={type}
            states={state}
            handleClick={handleClick}
            handleSearchByType={handleSearchByType}
            callBackValue={callBackValue}
          />
        )}
        {add && <AddButton text={add} changeHidden={changeHidden} />}
      </div>
    </div>
  )
}

export default Subheading
