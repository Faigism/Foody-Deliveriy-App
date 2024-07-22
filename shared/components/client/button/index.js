const ClientButton = ({ onClick, className, innerText }) => {
  return (
    <button onClick={onClick} className={className}>
      {innerText}
    </button>
  )
}
export default ClientButton
