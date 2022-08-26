import { useEffect, useState, useRef } from 'react';
import './App.scss';
import BeerCardContainer from './containers/BeerCardContainer/BeerCardContainer';
import Sidebar from './containers/Sidebar/Sidebar';

const imgFolder = "http://localhost:3010/images/";
const customApiURL = "http://localhost:3010/api/beers";

export let beers = [];
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
    const effectRan = useRef(false);

    const getPunkBeers = async () => {
        const _punkBeers = await fetch("https://api.punkapi.com/v2/beers").then(res => { return res.json(); })
        return _punkBeers;
    }

    const getCustomBeers = async () => {
        const _customBeers = await fetch(customApiURL).then(res => { return res.json(); })
        return _customBeers
    }


    const postCustomBeer = async (id) => {
        const newBeer = {
            id: id,
            name: "Beer C",
            tagline: "Beer C tagline",
            first_brewed: "09/2007",
            description: "Beer C description.",
            image_url: `${imgFolder}BudLight.png`,
            abv: 4.8,
            ph: 4.8,
            food_pairing: [
                "Pizza",
                "Chips",
                "Hamburgers"
            ].join("_"),
        }

        const data = await fetch(customApiURL, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBeer),
        })

        return newBeer;

    }

    useEffect(() => {
        if (effectRan.current) {
            return;
        }

        effectRan.current = true;

        const effectFunc = async () => {
            let id = 0;

            const _punkBeers = await getPunkBeers();
            id += _punkBeers.length;
            
            const _customBeers = await getCustomBeers();
            id += _customBeers.length;

            const _customBeer = await postCustomBeer(id);

            beers = _punkBeers;
            customBeers = [..._customBeers, _customBeer];
            
            setFilteredBeers(beers);
        }

        effectFunc();
    }, [])




    const getContent = () => {
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
            {(beers.length > 0) && getContent()}
        </>
    )

}

export default App;

