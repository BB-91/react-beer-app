import { useEffect, useState, useRef } from 'react';
import './App.scss';
import BeerCardContainer from './containers/BeerCardContainer/BeerCardContainer';
import Sidebar from './containers/Sidebar/Sidebar';

const imgFolder = "http://localhost:3010/images/";
const customApiURL = "http://localhost:3010/api/beers/";
// const customApiURL = "https://api.punkapi.com/v2/beers";

export let beers = null;
let customBeers = [];
let counter = 0;

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

    // const [state setState]
    // can use state obj to save the filter criteria
    // should get the API to do the filter

    // can save the filtered beerArrays here, and reference later. (caching)

    const getCustomBeers = () => {
        return fetch(customApiURL)
        .then(res => { return res.json(); })
        .then(_customBeersObj => {
            const _customBeers = _customBeersObj.customBeers;
            console.log(`_customBeers: `, _customBeers);
            return _customBeers;
        })
        .catch(err => { throw new Error(`Error: ${err}`); });
    }

    const getPunkBeers = () => {
        return fetch("https://api.punkapi.com/v2/beers")
        .then(res => { return res.json(); })
        .then(beerArr => { return beerArr; })
        .catch(err => { throw new Error(`Error: ${err}`); });
    }


    const savePunkBeers = () => {
        return getPunkBeers()
        .then(_punkBeers => { beers = _punkBeers; return _punkBeers; })
        .catch(err => { throw new Error(`Error: ${err}`); });
    }

    const saveCustomBeers = () => {
        return getCustomBeers()
        .then(_customBeers => { customBeers = _customBeers; return _customBeers; })
        .catch(err => { throw new Error(`error: ${err}`) })
    }

    // const postCustomBeer = () => {
    //     return fetch(customApiURL, {
    //         method: 'POST',
    //         headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json'
    //         },
    //         body: `{"id": 999, "name": "Beer C"}`,
    //     })
    //     .then(res => { return res.json(); })
    //     .then(data => {

    //     })
    //     .catch(err => { throw new Error(err) })
    // }

    // const postCustomBeer = () => {
    //     const newBeer = {id: 999, name: "Beer C"}
    //     const jsonStr = JSON.stringify(newBeer);
    //     console.log(`jsonStr: `, jsonStr);

    //     return fetch(customApiURL, {
    //         method: 'POST',
    //         headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json'
    //         },
    //         body: jsonStr,
    //     })
    //     .then(res => { return res.json(); })
    //     .then(data => {
    //         console.log(`postCustomBeer data: `, data);
    //         return newBeer;
    //     })
    //     .catch(err => { throw new Error(err) })
    // }


    const postCustomBeer = () => {
        const newID = beers.length + customBeers.length + (counter++);
        console.log(`newID: `, newID)

        const newBeer = {
            // id: 28,
            id: newID,
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
            ],
        }

        // const newBeer = {
        //     // id: 28,
        //     id: newID,
        //     name: "Beer C",
        //     tagline: "Beer C tagline",
        //     first_brewed: "09/2007",
        //     description: "Beer C description.",
        //     image_url: `${imgFolder}BudLight.png`,
        //     abv: 4.8,
        //     ph: 4.8,
        //     food_pairing: [
        //         "Pizza",
        //         "Chips",
        //         "Hamburgers"
        //     ],
        // }

        // const jsonStr = JSON.stringify(newBeer);
        const jsonStr = JSON.stringify({beer: newBeer});
        console.log(`jsonStr: `, jsonStr);

        return fetch(customApiURL, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: jsonStr,
            // body: newBeer,
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(`postCustomBeer data: `, data);
            return newBeer;
        })
        .catch(err => {
            throw new Error(`Error: ${err}`)
        })
    }


    // useEffect(() => {
    //     savePunkBeers()
    //     // .then( _punkBeers => {
    //     //     return postCustomBeer();
    //     // })
    //     .then( _punkBeers => {
    //         // console.log(`_newBeer: `, _newBeer);
    //         return saveCustomBeers();
    //     })
    //     .then(_customBeers => {
    //         console.log("App useEffect completed.");
    //         console.log(`beers: `, beers);
    //         console.log(`customBeers: `, customBeers)
    //         setFilteredBeers(beers);
    //     })
    //     .catch(err =>{ throw new Error(`Error: ${err}`) })

    // }, [])

    useEffect(() => {
        if (effectRan.current) {
            return;
        }

        effectRan.current = true;

        savePunkBeers()
        .then( _punkBeers => {
            return postCustomBeer();
        })
        .then( _newBeer => {
            console.log(`_newBeer: `, _newBeer);
            return saveCustomBeers();
        })
        .then(_customBeers => {
            console.log("App useEffect completed.");
            console.log(`beers: `, beers);
            console.log(`customBeers: `, customBeers)
            
            setFilteredBeers(beers);
        })
        .catch(err =>{ throw new Error(`Error: ${err}`) })

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

