import React from "react";
import api from "../utils/Api.js";
import Card from "./Card.js";
import {useEffect, useState} from 'react';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  /**Переменные состояния пользователя */
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  /**Переменные состояния карточек*/
  const [cards, setCards] = useState([]);

  /** Получаем данные пользователя с сервера*/
  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([initialCards, data]) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container-avatar">
          <button
            type="button"
            aria-label="Кнопка редактировать аватара"
            className="profile__btn-avatar"
            onClick={onEditAvatar}
          ></button>
          <img
            className="profile__avatar"
            src={userAvatar}
            alt="Фотография профиля"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button
            className="profile__edit"
            onClick={onEditProfile}
            type="button"
            name="addEdit"
            aria-label="Кнопка редактировать профиль"
          ></button>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button
          className="profile__add-button"
          onClick={onAddPlace}
          type="button"
          name="addCard"
          aria-label="Кнопка добавить фото"
        ></button>
      </section>
      <section className="photos">
        <ul className="photo-grid">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
