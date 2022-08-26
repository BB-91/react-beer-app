import React from 'react';
import BeerCard from '../../components/BeerCard/BeerCard';
import { getRandomKey } from '../../Util/Util';
import "./BeerCardContainer.scss";

const BeerCardContainer = (props) => {
    const { filteredBeers } = props;

    // console.log(`filteredBeers IN THE BeerCardContainer: `, filteredBeers)

    /* 
        Using useRef here will prevent the filtered BeerCards from animating if they were already in the previous filter.
        Only BeerCards ADDED to the filter will play the CSS animation (if filter is removed or becomes less restrictive).
        Using getRandomKey() would cause a re-render if not saved into a ref, because the key would change on each assignment.
    */

    const getCardsFromArray = (arr) => {
        return arr.map(beer => {
                return <BeerCard beer={beer} key={getRandomKey()}/>
            })
    }

    const getFilteredBeerCards = () => {
        const filteredBeerCards = getCardsFromArray(filteredBeers)
        return filteredBeerCards;
    }

    return (
        <div className='beer-card-container'>
            {getFilteredBeerCards()}
        </div>
    )
}

export default BeerCardContainer;