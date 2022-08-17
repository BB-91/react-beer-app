import './App.scss';
import BeerCardContainer from './containers/BeerCardContainer/BeerCardContainer';
import beers from "./data/beer.js";

function App() {
    

    return (
        <div className="App">
            My React App
            <BeerCardContainer beers={beers}/>
        </div>
    );
}

export default App;
