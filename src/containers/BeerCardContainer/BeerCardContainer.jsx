import React from 'react';
import BeerCard from '../../components/BeerCard/BeerCard';
import { getRandomKey } from '../../data/keys';
import "./BeerCardContainer.scss";

const BeerCardContainer = (props) => {
    const { beers } = props;

    const beerCards = beers.map(beer => {
        return <BeerCard beer={beer} key={getRandomKey()}/>
    })

    return (
        <div className='beer-card-container'>
            {beerCards}
        </div>
    )
}

export default BeerCardContainer;