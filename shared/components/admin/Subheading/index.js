import React from 'react'
import styles from './subheading.module.css'
import TypeButton from './TypeButton'
import AddButton from './AddButton'

const Subheading = ({ text, type, add, state, handleClick, handleSearchByType }) => {
    return (
        <div className={styles.subHeading} >
            <p>{text}</p>
            <div className='flex gap-5 me-5'>
                {type && <TypeButton text={type} states={state} handleClick={handleClick} handleSearchByType={handleSearchByType} />}
                {add && <AddButton text={add} />}
            </div>
        </div>
    )
}

export default Subheading