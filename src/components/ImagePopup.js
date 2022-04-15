import Popup from "./Popup"

function ImagePopup({ isOpen, onClose, card}) {
  return(
    <Popup name='preview' isOpen={isOpen} onClose={onClose}>
      <button
        type='button'
        className='modal__close-btn modal__close-btn_type_preview link'
        aria-label='close image preview'
        onClick={onClose}
      />
      <img src={card.link} alt={card.name} className='modal__image' />
      <p className='modal__caption'>{card.name}</p>
    </Popup>
  )
}

export default ImagePopup