const Button = ({ className, onClick, innerText = 'BUTTON' }) => {
  return (
    <button onClick={onClick} className={className}>
      {innerText}
    </button>
  )
}
export default Button
