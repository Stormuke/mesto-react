import React from "react";

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card)
    }

    return(
        <article className="element">
            <img src={props.link} alt={props.name} className="element__image" onClick={handleClick}/>
            <button className="element__delete"/>
            <div className="element__content">
                <h2 className="element__title">{props.name}</h2>
                <div className="element__like-container">
                    <button type="button" className="element__like"/>
                    <p className="element__like-count">{props.likes}</p>
                </div>
            </div>
        </article>
    )
}

export default Card