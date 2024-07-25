const Input = ({
  Type = 'text',
  Placeholder,
  OnChange,
  OnClick,
  ClassName,
  disabled = false,
  Capitalize = true,
}) => {
  return (
    <>
      <input
        className={`${Capitalize ? 'capitalize' : ' '}  ${ClassName}`}
        disabled={disabled}
        onClick={OnClick}
        onChange={OnChange}
        type={Type}
        placeholder={Placeholder}
      />
    </>
  )
}
export default Input
