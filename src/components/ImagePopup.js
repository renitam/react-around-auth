function ImagePopup({ isOpen, onClose, card}) {
  return(
    <section className={`modal modal_type_preview ${isOpen && 'modal_display'}`}>
      <div className='modal__body modal__body_type_preview'>
        <button
          type='button'
          className='modal__close-btn modal__close-btn_type_preview link'
          aria-label='close image preview'
          onClick={onClose}
        ></button>
        <img src={card.link} alt={card.name} className='modal__image' />
        <p className='modal__caption'>{card.name}</p>
      </div>
    </section>
  )
}

export default ImagePopup