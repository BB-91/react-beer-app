import React, { useRef } from 'react';
import BeerCard from '../../components/BeerCard/BeerCard';
import { getRandomKey } from '../../Util/Util';
import "./BeerCardContainer.scss";
import beers from '../../data/beer';

const BeerCardContainer = (props) => {
    const { filteredBeers } = props;

    /* 
        Using useRef here will prevent the filtered BeerCards from animating if they were already in the previous filter.
        Only BeerCards ADDED to the filter will play the CSS animation (if filter is removed or becomes less restrictive).
    */
    const allBeerCards = useRef(
        beers.map(beer => {
            return <BeerCard beer={beer} key={getRandomKey()}/>
        })
    )

    const getFilteredBeerCards = () => {
        const filteredBeerNames = filteredBeers.map(filteredBeer => filteredBeer.name);

        const filteredBeerCards = allBeerCards.current.filter(beerCard => {
            return filteredBeerNames.includes(beerCard.props.beer.name);
        })

        return filteredBeerCards;
    }

    return (
        <div className='beer-card-container'>
            {getFilteredBeerCards()}
        </div>
    )
}

export default BeerCardContainer;