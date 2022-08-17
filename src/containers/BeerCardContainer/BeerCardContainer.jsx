import React from 'react';
import BeerCard from '../../components/BeerCard/BeerCard';
import "./BeerCardContainer.scss";

const BeerCardContainer = (props) => {
    const { beers } = props;
    console.log(`beers: `, beers);

    const beerCards = beers.map(beer => {
        return <BeerCard beer={beer}/>
    })

    return (
        <div className='beer-card-container'>
            {beerCards}
        </div>
    )
}

export default BeerCardContainer;