import React, { useState } from 'react';
import { getRandomKey } from '../../data/keys';
import "./BeerCard.scss";

const BeerCard = (props) => {
    const { name, tagline, description, image_url, abv, food_pairing } = props.beer;
    const [hovered, setHovered] = useState(false);
    const maxParagraphLength = 200;
    const maxFoodLength = 35;

    const getSentences = () => {
        let buffer = "";
        const sentences = [];
        let paragraphLength = 0;

        for (let i=0; i<description.length; i++) {
            const char = description.charAt(i);
            buffer += char;
            if (".?!".includes(char)){
                const sentenceLength = buffer.length;
                if ((paragraphLength + sentenceLength) < maxParagraphLength) {
                    paragraphLength += sentenceLength;
                    sentences.push(buffer);
                    buffer = "";
                } else {
                    return sentences;
                }
            }
        }
        if (buffer) {
            throw new Error(`buffer not empty: `, buffer);
        }
        return sentences;
    }

    const foodPairingElements = food_pairing.filter(food => {
        return food.length < maxFoodLength;
    })
    .map(food => {
        return <p key={getRandomKey()}>{food}</p>;
    })

    const handleMouseOver = () => {
        setHovered(true);
    }

    const handleMouseLeave = () => {
        setHovered(false);
    }

    const getHoveredElements = () => {
        return (
            <>
                <div>
                    <p className='beer-name'>{name}</p>
                    <p className='beer-description'>{getSentences()}</p>
                </div>

                <div>
                    <p className='beer-try-with'>Try with:</p>
                    <div className='beer-food-pairing'>{foodPairingElements}</div>       
                </div>
  
            </>
        )
    }

    const getNonHoveredElements = () => {
        return (
            <>
                <img className='beer-image' src={image_url} alt="beer" />
                <div className='beer-front-text-section'>
                    <p className='beer-name'>{name}</p>
                    <p className='beer-tagline'>{tagline}</p>
                    <p className='beer-abv'>{abv}% ABV</p>
                </div>
            </>
        )
    }   

    return (
        <div className='beer-card' onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
            {hovered ? getHoveredElements() : getNonHoveredElements()}
        </div>
    )
}

export default BeerCard;