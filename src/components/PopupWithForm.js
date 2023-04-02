const PopupWithForm = ({ name, title, children, text, isOpen, onClose }) => {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
          aria-label="Кнопка закрыть"
        ></button>
        <h3 className="popup__header">{title}</h3>
        <form className="popup__form">
          {children}
          <button type="submit" className="popup__button">
            {text}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;