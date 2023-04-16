import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useContext(currentUser.name);
    const [description, setDescription] = React.useContext(currentUser.about);

    // Загружаем данные пользователя в форму.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]); 

    function handleChangeName(evt) {
        setName(evt.target.value);
      }
    
      function handleChangeDescription(evt) {
        setDescription(evt.target.value);
      }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
  
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
          username: name,
          userJob: description,
        });
      }

    return (
        <PopupWithForm 
          name="name_profile" 
          title="Редактировать профиль"
          text="Сохранить"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="popup__input popup__input_text_name"
            value={name}
            onChange={handleChangeName}
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
            value={description}
            onChange={handleChangeDescription}
            name="userJob"
            placeholder="О себе"
            required
            minLength="2"
            maxLength="200"
            id="profile-job-input"
          />
          <span className="popup__error-text profile-job-input-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;