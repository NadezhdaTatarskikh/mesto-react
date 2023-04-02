import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import Footer from "./Footer.js";

function App() {
  /**переменные состояния попапов */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  /**Переменные состояния для попапа открытия карточки*/
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }
  
  return (
    <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <PopupWithForm
          name="name_profile"
          title="Редактировать профиль"
          text="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type="text"
            className="popup__input popup__input_text_name"
            name="userName"
            placeholder="Ваше Имя"
            required
            minLength="2"
            maxLength="40"
            id="profile-name-input"
          />
          <span className="popup__error-text profile-name-input-error"></span>
          <input
            type="text"
            className="popup__input popup__input_text_job"
            name="userJob"
            placeholder="О себе"
            required
            minLength="2"
            maxLength="200"
            id="profile-job-input"
          />
          <span className="popup__error-text profile-job-input-error"></span>
        </PopupWithForm>
        <PopupWithForm
          name="name_photo"
          title="Новое место"
          text="Сохранить"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type="text"
            className="popup__input popup__input_text_title"
            name="name"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
            id="photo-title-input"
          />
          <span className="popup__error-text photo-title-input-error"></span>
          <input
            type="url"
            className="popup__input popup__input_text_link"
            name="link"
            placeholder="Ссылка на картинку"
            id="photo-url-input"
            required
          />
          <span className="popup__error-text photo-url-input-error"></span>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <PopupWithForm name="delete-card" title="Вы уверены?" text=" Да" />
        <PopupWithForm
          name="edit-avatar"
          title="Обновить аватар"
          text="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type="url"
            className="popup__input popup__input_edit_avatar"
            name="avatar"
            placeholder="Ссылка на аватар"
            required
            id="avatar-url-input"
          />
          <span className="popup__error-text avatar-url-input-error"></span>
        </PopupWithForm>
        <Footer />
    </div>
  );
}

export default App;
