const Button = ({ className, onClick, innerText = 'Button' }) => {
  return (
    <button onClick={onClick} className={className}>
      {innerText}
    </button>
  )
}
export default Button
