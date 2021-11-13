import Card from "./Card";
function Main(props) {
    return (

        <main>
            <section className="profile">
                <div className="profile__container">
                    <button type="button" className="profile__edit-avatar" onClick={props.onEditAvatar}>
                        <img src={props.userInfo.avatar} alt={props.userInfo.name}
                            className="profile__avatar"
                        />
                    </button>
                    <div className="profile__info">
                        <div className="profile__title-container">
                            <h1 className="profile__title">{props.userInfo.name}</h1>
                            <button type="button" className="profile__edit-button" onClick={props.onEditProfile}/>
                        </div>
                        <p className="profile__subtitle">{props.userInfo.about}</p>
                    </div>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}/>
            </section>

            <section className="elements">
                {props.cards.map((card, id) => (
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