import { createContext, useEffect, useState } from 'react';
import './App.scss';
import BeerCardContainer from './containers/BeerCardContainer/BeerCardContainer';
import Sidebar from './containers/Sidebar/Sidebar';

export let beers = null;
export const BeerContext = createContext()
export const filterCriteria = {
    high_alcohol: false,
    classic_range: false,
    high_acidity: false,
    search: "",
}

export const getNewlyFilteredBeers = () => {
    return (
        beers.filter(beer => filterCriteria.high_alcohol ? beer.abv > 6.0 : true)
            .filter(beer => filterCriteria.classic_range ? +(beer.first_brewed.split("/")[1]) < 2010 : true)
            .filter(beer => filterCriteria.high_acidity ? beer.ph < 4.0 : true)
            .filter(beer => filterCriteria.search ? beer.name.toUpperCase().includes(filterCriteria.search.toUpperCase()) : true)
    );
}

function App() {
    const [filteredBeers, setFilteredBeers] = useState(null);

    useEffect(() => {
        fetch("https://api.punkapi.com/v2/beers")
        .then(res => {
            return res.json()
        })
        .then(beerArr => {
            beers = beerArr;
            setFilteredBeers(beerArr);
        })
        .catch(err => {
            throw new Error("Error: ", err);
        });
    }, [])
    
    const getContent = () => {
        return (
            <div className="App">
                <BeerContext.Provider value={setFilteredBeers}>
                    <header>
                        Punk Beer API - React Demo
                    </header>
                    
                    <main>
                        <Sidebar checkboxNames={Object.keys(filterCriteria).slice(0, -1)} />
                        <BeerCardContainer filteredBeers={filteredBeers} />
                    </main>
                </BeerContext.Provider>
            </div>
        );
    }

    return (
        <>
            {beers && getContent()}
        </>
    )
}

export default App;

