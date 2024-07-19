import React from 'react'
import styles from "./addButton.module.css"

const AddButton = ({ text }) => {
    return (
        <div>
            <button className={styles.addButton}>
                <div className={styles.text}>
                    <div style={{ fontSize: '18px' }}>+</div>
                    <div>Add {text}</div>
                </div>
            </button>

        </div>
    )
}

export default AddButton