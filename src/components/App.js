import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React, {useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";
import ImagePopup from "./ImagePopup";


function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState()
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState()
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState()
    const [selectedCard, setSelectedCard] = React.useState()
    const [userInfo, setUserInfo] = React.useState({})
    const [cards, setCards] = React.useState([])
    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([profileInfo, card]) => {
                setUserInfo(profileInfo)
                setCards(card)
            })
            .catch((err) => {console.log(`Ошибка загрузки: ${err}`)})
    }, [])

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true)
    }



    function closeAllPopups() {
        setEditAvatarPopupOpen(false)
        setEditProfilePopupOpen(false)
        setAddPlacePopupOpen(false)
        setSelectedCard(null)
    }

  return (


      <div className="container">
      <>
          <Header/>
          <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              userInfo={userInfo}
          />
          <Footer/>

          <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          />

          <PopupWithForm
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          form={'edit_profile'}
          title={'Редактировать профиль'}
          name={'edit'}
            children={(
              <>
                      <input
                          type="text"
                          name="profile_name"
                          className="popup__text"
                          id="profile_name"
                          placeholder="Имя"
                          minLength="2"
                          maxLength="40"
                          required
                      />
                      <span className="popup__text-error" id="profile_name-error"/>
                      <input
                          type="text"
                          name="profile_job"
                          className="popup__text"
                          id="profile_job"
                          placeholder="Профессиональная деятельность"
                          minLength="2"
                          maxLength="200"
                          required
                      />
                      <span className="popup__text-error" id="profile_job-error"/>
              </>
            )}
          />

          <PopupWithForm
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              form={'add_mesto'}
              title={'Новое место'}
              name={'add'}
              children={(
                  <>
                      <input
                          type="text"
                          name="name"
                          id="mesto_title"
                          className="popup__text"
                          placeholder="Название"
                          minLength="2"
                          maxLength="30"
                          required
                      />
                      <span className="popup__text-error" id="mesto_title-error"/>
                      <input
                          type="url"
                          name="link"
                          className="popup__text"
                          id="mesto_link"
                          placeholder="Ссылка на картинку"
                          required
                      />
                      <span className="popup__text-error" id="mesto_link-error"/>
                  </>
              )}
          />

          <PopupWithForm
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              form={'edit_avatar'}
              title={'Обновить аватар'}
              name={'avatar'}
              children={(
                  <>
                      <input
                          type="url"
                          name="avatar_link"
                          className="popup__text"
                          id="avatar_link"
                          placeholder="Ссылка на картинку"
                          required
                      />
                      <span className="popup__text-error" id="avatar_link-error"/>
                  </>
              )}
          />

      </>
      </div>
  );
}

export default App;