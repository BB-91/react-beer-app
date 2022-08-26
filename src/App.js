import { useEffect, useState, useRef } from 'react';
import './App.scss';
import BeerCardContainer from './containers/BeerCardContainer/BeerCardContainer';
import Sidebar from './containers/Sidebar/Sidebar';

const imgFolder = "http://localhost:3010/images/";
// const customApiURL = "http://localhost:3010/api/beers/";
const customApiURL = "http://localhost:3010/api/beers";
// const customApiURL = "https://api.punkapi.com/v2/beers";

export let beers = [];
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

    const getPunkBeers = async () => {
        const _punkBeers = await fetch("https://api.punkapi.com/v2/beers").then(res => { return res.json(); })
        console.log(`_punkBeers: `, _punkBeers);
        return _punkBeers;
    }

    const getCustomBeers = async () => {
        const _customBeers = await fetch(customApiURL).then(res => { return res.json(); })
        console.log(`_customBeers: `, _customBeers);
        return _customBeers
    }

    const savePunkBeers = async () => {
        const _punkBeers = await getPunkBeers();
        beers = _punkBeers;
        return _punkBeers;
    }

    const saveCustomBeers = async () => {
        const _customBeers = await getCustomBeers()
        customBeers = _customBeers;
        return _customBeers;
    }

    const postCustomBeer = async (id) => {
        console.log("id in postCustomBeer: ", id)
        // console.log("in postCustomBeer")

        // id: 8354974,

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

        console.log(`newBeer: `, newBeer)
        console.log(`JSON.stringify(newBeer): `, JSON.stringify(newBeer))

        const data = await fetch(customApiURL, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBeer),
        })

        return newBeer;

        // const data = await fetch(customApiURL, {
        //     method: 'POST',
        //     headers: {
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(newBeer),
        // })

    }

    useEffect(() => {
        if (effectRan.current) {
            console.log("returning from useEffect early")
            return;
        }

        effectRan.current = true;
        console.log("ENTRY POINT USE EFFECT!")


        const effectFunc = async () => {
            console.log("fkn message.")

            let id = 0;
    
            const _punkBeers = await getPunkBeers();
            console.log(`_punkBeers: `, _punkBeers);
            id += _punkBeers.length;

            console.log(`id: `, id)

            const _customBeers = await getCustomBeers();
            console.log(`_customBeers: `, _customBeers);
            id += _customBeers.length;

            const _customBeer = await postCustomBeer(id);
            console.log("added a custom beer inside useEffect: ", _customBeer);

        }

        // const effectFunc = async () => {
        //     if (effectRan.current) {
        //         console.log("returning from useEffect early")
        //         return;
        //     }
    
        //     effectRan.current = true;
        //     console.log("ENTRY POINT USE EFFECT!")
    
        //     let id = 0;
    
        //     const _punkBeers = await getPunkBeers();
        //     console.log(`_punkBeers: `, _punkBeers);
        //     id += _punkBeers.length;

        //     const _customBeers = await getCustomBeers();
        //     console.log(`_customBeers: `, _customBeers);
        //     id += _customBeers.length;
            
        //     const _customBeer = postCustomBeer(id);
        //     console.log("added a custom beer inside useEffect: ", _customBeer);
        // }

        effectFunc();

        console.log("after post postCustomBeer");

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
            {(beers.length > 0) && getContent()}
        </>
    )

    // return (
    //     <>
    //         {beers && getContent()}
    //     </>
    // )
}

export default App;

