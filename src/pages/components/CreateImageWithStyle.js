const CreateImageWithStyle = ({ url, className, style, click }) => {
  if (!url) {
    return null
  }
  return (
    <img
      src={url}
      className={className}
      style={{ objectFit: 'cover', objectPosition: 'center', width: '3rem', height: '3rem', ...style }}
      onClick={click}
      alt=''
    ></img>
  )
}
export default CreateImageWithStyle
