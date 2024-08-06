const OrderTableDetailData = ({ image, name, price, count, amount }) => {
  return (
    <tr>
      <td className="py-2 px-4 border-b border-whiteLight3">
        <img width={30} height={0} src={image} alt={image} />
      </td>
      <td className="py-2 px-4 border-b border-whiteLight3">{name}</td>
      <td className="py-2 px-4 border-b border-whiteLight3">${price}</td>
      <td className="py-2 px-4 border-b border-whiteLight3">{count}</td>
      <td className="py-2 px-4 border-b border-whiteLight3">${amount}</td>
    </tr>
  )
}
export default OrderTableDetailData
