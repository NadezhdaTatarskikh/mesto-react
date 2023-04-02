import React from "react";

function Card({ card, onCardClick }) {
  function handleCardClick() {
    onCardClick(card);
  }
  return (
    <li className="photo-grid__item">
      <button
        className="photo-grid__delete"
        type="button"
        aria-label="Кнопка для Удаления"
      ></button>
      <img
        className="photo-grid__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="photo-grid__option">
        <h2 className="photo-grid__text">{card.name}</h2>
        <div className="photo-grid__like-container">
          <button
            className="photo-grid__button"
            type="button"
            name="addLike"
            aria-label="Кнопка нравится"
          ></button>
          <span className="photo-grid__like">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
