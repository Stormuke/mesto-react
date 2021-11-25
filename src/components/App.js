import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React, {useEffect} from "react";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import {CurrentUserContext} from "../constexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState(null)
    const [currentUser, setCurrentUser] = React.useState({})
    const [cards, setCards] = React.useState([])

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, cards]) => {
                setCurrentUser(user)
                setCards(cards)
            })
            .catch((err) => {
                console.log(`Ошибка загрузки данных: ${err}`)
            })
    },[])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id)

        if (!isLiked) {
            api.addCardLike(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch((err) => {
                    console.log(`Не получилось поставить лайк: ${err}`)
                })
        } else {
            api.deleteCardLike(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch((err) => {
                    console.log(`Не получилось дизлайкнуть: ${err}`)
                })
        }
    }

    function handleDeleteCard(card) {
        api.deleteCard(card)
            .then(() => {
                setCards((items) => items.filter((c) => c._id !== card._id && c))
            })
            .catch((err) => {
                console.log(`Ошибка удаления карточки: ${err}`)
            })
    }

    function handleUpdateUser(data) {
        api.patchUserInfo(data)
            .then((newUser) => {
                setCurrentUser(newUser)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(`Не удалось обновить профиль: ${err}`)
            })
    }

    function handleAvatarUpdate(data) {
        api.updateAvatar(data)
            .then((newAvatar) => {
              setCurrentUser(newAvatar)
              closeAllPopups()
            })
            .catch((err) => {
                console.log(`Не удалось обновить аватар: ${err}`)
            })
    }

    function handleAddPlaceSubmit(data) {
        api.postNewCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch((err) => {
                console.log(`Не удалось добавить карточку: ${err}`)
            })
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }



    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setSelectedCard(null)
    }

  return (
      <CurrentUserContext.Provider value={currentUser}>
      <div className="container">
      <>
          <Header/>
          <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onDeleteCard={handleDeleteCard}
          />
          <Footer/>

          <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onSubmit={handleUpdateUser}/>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onSubmit={handleAvatarUpdate}/>
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onSubmit={handleAddPlaceSubmit}/>
      </>
      </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
