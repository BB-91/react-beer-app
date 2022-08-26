import React, { useRef, useState } from 'react';
import { getSentences, getRandomKey } from '../../Util/Util';
import "./BeerCard.scss";

const BeerCard = (props) => {
    const { name, id, tagline, description, image_url, abv, food_pairing } = props.beer;
    const maxParagraphLength = 200;
    const maxFoodLength = 35;

    const [hovered, setHovered] = useState(false);

    const hoverOverriden = useRef(false); // allow changing of displayed content on click. Override handleMouseOver() behavior on re-render.
    
    let foodPairingArr = [];
    if (typeof food_pairing == "string") {
        foodPairingArr = food_pairing.split("_");
    } else if (Array.isArray(food_pairing)) {
        foodPairingArr = food_pairing
    } else {
        throw new Error(`Invalid type: ${typeof food_pairing}`)
    }

    const foodPairingElements = useRef(
        foodPairingArr.filter(food => {
            return food.length < maxFoodLength;
        })
        .map(food => {
            return <p key={getRandomKey()}>{food}</p>;
        })
    ) 

    const hoveredElements = useRef(
        <div className='beer-card-content' key={getRandomKey()}>
            <div>
                <p className='beer-name'>{name}</p>
                <p className='beer-description'>{getSentences(description, maxParagraphLength)}</p>
            </div>

            <div>
                <p className='beer-try-with'>Try with:</p>
                <div className='beer-food-pairing'>{foodPairingElements.current}</div>       
            </div>
        </div>
    )

    const nonHoveredElements = useRef(
        <div className='beer-card-content' key={getRandomKey()}>
            <img className='beer-image' src={image_url} alt="beer" />
            <div className='beer-front-text-section'>
                <p className='beer-name'>{name}</p>
                <p className='beer-tagline'>{tagline}</p>
                <p className='beer-abv'>{abv}% ABV</p>
            </div>
        </div>
    )

    const handleMouseOver = () => {
        if (!hoverOverriden.current) {
            setHovered(true);
        }
    }

    const handleMouseLeave = () => {
        hoverOverriden.current = false;
        setHovered(false);
    }

    const handleClick = (event) => {
        console.log("beer card clicked!")
        console.log(`event: `, event)
        console.log(`event.type: `, event.type)
        hoverOverriden.current = !hoverOverriden.current;
        setHovered(!hovered);
    }

    return (
        <div className='beer-card' onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} onClick={handleClick} key={id}>
            {hovered && !hoverOverriden.current ? hoveredElements.current : nonHoveredElements.current}
        </div>
    )
}

export default BeerCard;