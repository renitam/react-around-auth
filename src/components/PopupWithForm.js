function PopupWithForm ({ isOpen, name, title, onClose, buttonText = 'Save', onSubmit, children }) {
  return(
    <section className={`modal modal_type_${name} ${isOpen && 'modal_display'}`}>
        <div className='modal__body'>
          <form className={`modal__form modal__form_type_${name}`} name={name} onSubmit={onSubmit}>
            <button
              type='button'
              className='modal__close-btn link'
              aria-label={`close ${name} menu`}
              onClick={onClose}
            ></button>
            <h2 className='modal__title'>{title}</h2>
            {children}
            <button type='submit' className='modal__save'>{buttonText}</button>
          </form>
        </div>
      </section>
  )
} 

export default PopupWithForm