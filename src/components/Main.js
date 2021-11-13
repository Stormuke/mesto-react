import Card from "./Card";
import api from "../utils/api";
import React, {useEffect} from "react";
function Main(props) {

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

    return (

        <main>
            <section className="profile">
                <div className="profile__container">
                    <button type="button" className="profile__edit-avatar" onClick={props.onEditAvatar}>
                        <img src={userInfo.avatar} alt={userInfo.name}
                            className="profile__avatar"
                        />
                    </button>
                    <div className="profile__info">
                        <div className="profile__title-container">
                            <h1 className="profile__title">{userInfo.name}</h1>
                            <button type="button" className="profile__edit-button" onClick={props.onEditProfile}/>
                        </div>
                        <p className="profile__subtitle">{userInfo.about}</p>
                    </div>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}/>
            </section>

            <section className="elements">
                {cards.map((card, id) => (
                <Card
                key={id}
                card={card}
                link={card.link}
                name={card.name}
                likes={card.likes.length}
                onCardClick={props.onCardClick}
                />
                ))}
            </section>
        </main>
    )
}

export default Main