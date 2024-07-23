import styles from './addButton.module.css'

const AddButton = ({ text, changeHidden }) => {
  return (
    <div>
      <button className={styles.addButton} onClick={changeHidden}>
        <div className={styles.text}>
          <div>{text}</div>
        </div>
      </button>
    </div>
  )
}

export default AddButton
