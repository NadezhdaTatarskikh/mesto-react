const ImagePopup = ({ card, onClose }) => {
  return (
    <div className={`popup popup_name_image ${card ? "popup_opened" : ""}`}>
      <div className="popup__image-container">
        <button
          className="popup__close-button"
          onClick={onClose}
          type="button"
          aria-label="Кнопка закрыть"
        ></button>
        <img
          className="popup__image"
          src={card ? card.link : "#"}
          alt={card ? card.name : ""}
        />
        <h2 className="popup__image-title">{card ? card.name : ""}</h2>
      </div>
    </div>
  );
};

export default ImagePopup;
