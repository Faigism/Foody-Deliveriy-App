import React, { useState } from 'react'
import styles from './restaurantCard.module.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
// import Modal from "../../Modal"
import TransitionsModal from '../../TransitionsModal';

const RestaurantCard = ({ restaurant }) => {
    const [activateModal, setActivateModal] = useState(false);
    console.log(restaurant)
    return (
        <div className={styles.card}>
            <div className={styles.restaurantInfo}>
                <div>
                    <img src={restaurant.img_url} alt="restaurant logo" width={100} height={57} quality={100} objectFit='contain' />
                </div>
                <div>
                    <div className={styles.restaurantName}>{restaurant.name}</div>
                    {/* <div className={styles.category}>category</div> */}
                </div>
            </div>

            <div className='flex flex-col justify-around me-[5px]'>
                <div className={styles.delete}><DeleteForeverIcon style={{ color: '#EB5757' }} onClick={() => { setActivateModal(true) }} /></div>
                <div className={styles.edit}><BorderColorIcon style={{ color: '#00B2A9' }} /></div>
            </div>
            {activateModal && <TransitionsModal />}
        </div>
    )
}

export default RestaurantCard