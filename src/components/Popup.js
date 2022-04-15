function Popup ({ name, isOpen, onClose, children }) {
  return (
    <section className={`modal modal_type_${name} ${isOpen && 'modal_display'}`}>
      <div className='modal__body'>
        <button
          type='button'
          className={`modal__close-btn modal__close-btn_type_${name} link`}
          aria-label={`close ${name} menu`}
          onClick={onClose}
        ></button>
        {children}
      </div>
    </section>
  )
}

export default Popup