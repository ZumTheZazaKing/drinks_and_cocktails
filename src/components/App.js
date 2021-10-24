import { lazy, Suspense, useState } from 'react';
import { Context } from '../data/context';
import { HashRouter, Switch, Route } from 'react-router-dom';

const Main = lazy(() => import('./Main').then(module => ({default:module.Main})));
const Drink = lazy(() => import('./Drink').then(module => ({default:module.Drink})));

function App() {

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [previewData, setPreviewData] = useState("");

  return (
    <HashRouter>
      <div className="App">
        <Switch>
          <Suspense fallback={<div className="loading"><h1>Loading...</h1></div>}>
            <Context.Provider value={{
              searchQuery, setSearchQuery,
              results, setResults,
              previewData, setPreviewData
            }}>

              <Route exact path="/" component={Main}/>
              <Route path="/drink/:idDrink" component={Drink}/>

            </Context.Provider>
          </Suspense>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
