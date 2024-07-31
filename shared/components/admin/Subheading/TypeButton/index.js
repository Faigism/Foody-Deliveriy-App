'use client'

import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import styles from './typeButton.module.css'

const TypeButton = ({ text, states, handleClick, handleSearchByType }) => {
  const [searchText, setSearchText] = useState('')
  const [popUp, setPopUp] = useState(false)

  return (
    <div style={{ position: 'relative' }}>
      <button
        className={styles.typeButton}
        onClick={() => {
          handleClick()
          setPopUp(!popUp)
        }}
      >
        {searchText.length === 0 ? (
          <div className={styles.text}>{text} type</div>
        ) : (
          <div className={styles.text}>{searchText}</div>
        )}
        <div>
          <ExpandMoreIcon style={{ width: '27px', height: '28px' }} />
        </div>
      </button>
      <div
        style={{ position: 'absolute', zIndex: '10' }}
        className='flex flex-col rounded-[14px] bg-white mt-1 pt-1 overflow-x-hidden overflow-y-auto h-[300px]'
      >
        {popUp &&
          states?.map((state, index) => (
            <button
              key={index}
              className='bg-white rounded-[14px] w-[190px] p-2 hover:bg-grayText'
              onClick={() => {
                handleSearchByType(state.id)
                setSearchText(state.name)
                setPopUp(false)
              }}
            >
              {state.name}
            </button>
          ))}
      </div>
    </div>
  )
}

export default TypeButton
