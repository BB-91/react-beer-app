import { useEffect, useState } from 'react';
import './App.scss';
import BeerCardContainer from './containers/BeerCardContainer/BeerCardContainer';
import Sidebar from './containers/Sidebar/Sidebar';

export let beers = null;
let customBeers = [];


export const filterCriteria = {
    high_alcohol: false,
    classic_range: false,
    high_acidity: false,
    real_beers: false,
    search: "",
}

export const getNewlyFilteredBeers = () => {
    const _filteredBeers = filterCriteria.real_beers ? customBeers : beers;

    return (
        _filteredBeers.filter(beer => filterCriteria.high_alcohol ? beer.abv > 6.0 : true)
            .filter(beer => filterCriteria.classic_range ? +(beer.first_brewed.split("/")[1]) < 2010 : true)
            .filter(beer => filterCriteria.high_acidity ? beer.ph < 4.0 : true)
            .filter(beer => filterCriteria.search ? beer.name.toUpperCase().includes(filterCriteria.search.toUpperCase()) : true)
    );
}

function App() {
    const [filteredBeers, setFilteredBeers] = useState(null);
    // const [state setState]
    // can use state obj to save the filter criteria
    // should get the API to do the filter

    // can save the filtered beerArrays here, and reference later. (caching)


    const saveOriginalBeers = () => {
        fetch("https://api.punkapi.com/v2/beers")
        .then(res => {
            return res.json()
        })
        .then(beerArr => {
            beers = beerArr;
            addCustomBeers()
        })
        .catch(err => {
            throw new Error(`Error: ${err}`);
        });
    }

    const addCustomBeers = () => {
        fetch("http://localhost:3010/api/beers/")
        .then(res => {
            return res.json()
        })
        .then(_customBeersObj => {                  
            customBeers = _customBeersObj.customBeers;
            console.log(`customBeers: `, customBeers);
            setFilteredBeers(beers);

        })
        .catch(err => {
            throw new Error(`Error: ${err}`);
        });
    }

    useEffect(() => {
        saveOriginalBeers()
    }, [])

    const getContent = () => {
        console.log(`filteredBeers: `, filteredBeers);
        return (
            <div className="App">   
                <header>
                    Punk Beer API - React Demo
                </header>
                
                <main>
                    <Sidebar checkboxNames={Object.keys(filterCriteria).slice(0, -1)} setFilteredBeers={setFilteredBeers}/>
                    <BeerCardContainer filteredBeers={filteredBeers} />
                </main>   
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

