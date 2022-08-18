import { createContext, useState } from 'react';
import './App.scss';
import BeerCardContainer from './containers/BeerCardContainer/BeerCardContainer';
import Sidebar from './containers/Sidebar/Sidebar';
import beers from "./data/beer.js";

export const BeerContext = createContext()

export const filterCriteria = {
    high_alcohol: false,
    classic_range: false,
    high_acidity: false,
    search: "",
}

// export const globalSetters = {};

export const getNewlyFilteredBeers = () => {
    return (
        beers.filter(beer => filterCriteria.high_alcohol ? beer.abv > 6.0 : true)
            .filter(beer => filterCriteria.classic_range ? +(beer.first_brewed.split("/")[1]) < 2010 : true)
            .filter(beer => filterCriteria.high_acidity ? beer.ph < 4.0 : true)
            .filter(beer => filterCriteria.search ? beer.name.includes(filterCriteria.search) : true)
    );
}


function App() {
    const [filteredBeers, setFilteredBeers] = useState(beers);

    // globalSetters["App"] = setFilteredBeers;

    return (
            <div className="App">
                <BeerContext.Provider value={setFilteredBeers}>
                    <Sidebar checkboxNames={Object.keys(filterCriteria).slice(0, -1)} />
                    {/* <BeerCardContainer beers={beers} /> */}
                    <BeerCardContainer beers={filteredBeers} />
                </BeerContext.Provider>
            </div>
    );
}

// function App() {
//     const [filteredBeers, setFilteredBeers] = useState(beers);

//     globalSetters["App"] = setFilteredBeers;

//     return (
//             <div className="App">
//                 <Sidebar checkboxNames={Object.keys(filterCriteria).slice(0, -1)} />
//                 {/* <BeerCardContainer beers={beers} /> */}
//                 <BeerCardContainer beers={filteredBeers} />
//             </div>
//     );
// }

export default App;
