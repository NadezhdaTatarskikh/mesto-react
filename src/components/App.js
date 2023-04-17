import React from 'react';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Header from './Header.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';


function App() {
  /**переменные состояния попапов */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  /**Переменные состояния для попапа открытия карточки*/
  const [selectedCard, setSelectedCard] = React.useState({});

  /**переменную состояния пользователя*/
  const [currentUser, setCurrentUser] = React.useState({});
  //**переменную состояния карточки*/
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
    api
    .getUserInfo()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    api
    .getInitialCards()
    .then((initialards) =>{
      setCards([initialards])
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    }); 
  }, []);

  /**Открытие попапов */
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

  /**   function handleCardDelitClick(card) {
    setSelectedCard(card);
  }*/

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    }); 
  } 
  function handleCardDelete() {
   api.deleteCard(selectedCard._id)
    .then(() => {
    setCards((cards) => cards.filter((card) => card._id !==selectedCard._id))
    })
    .then(() => closeAllPopups())
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    }); 
  } 

  function handleUpdateUser(newUserInfo) {
    api
      .updataUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  return ( 
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelite={handleCardDelete}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        >
        </EditProfilePopup>
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
    </CurrentUserContext.Provider>
  );
}

export default App;
