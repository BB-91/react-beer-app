import './App.scss';
import BeerCardContainer from './containers/BeerCardContainer/BeerCardContainer';
import Sidebar from './containers/Sidebar/Sidebar';
import beers from "./data/beer.js";

function App() {

    return (
        <div className="App">
            <Sidebar />
            <BeerCardContainer beers={beers} />
        </div>
    );
}

export default App;
