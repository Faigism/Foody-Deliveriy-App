import React from 'react'
import styles from './restaurantsSidebar.module.css'

const Sidebar = ({ categories }) => {
    return (
        <div className={styles.sidebar}>
            <ul className='my-8 mx-5' >
                {categories.map((category, index) => (
                    <li className='flex gap-3 my-8' key={index} >
                        <img src={category.img_url} />
                        <p>{category.name}</p>
                    </li>
                ))}
            </ul>
        </div >
    )
}

export default Sidebar