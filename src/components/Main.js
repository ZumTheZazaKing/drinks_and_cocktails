import { useContext, lazy, Suspense, useEffect } from "react";
import { Context } from "../data/context";

const Result = lazy(() => import('./Result').then(module => ({default:module.Result})));

export function Main(){

    let { searchQuery, setSearchQuery, results, setResults} = useContext(Context);

    useEffect(() => {

        if(!searchQuery){
            fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a')
            .then(res => res.json()).then(data => {setResults(data.drinks);console.log(data)})
            return;
        }

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`)
        .then(res => res.json())
        .then(data => {setResults(data.drinks);console.log(data)})
    },[searchQuery])

    return (<div id="Main">
        <h1>Drinks & Cocktails</h1>
        
        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>
        <button>Search</button>

        <div id="results">
            <Suspense fallback={<h1>Loading...</h1>}>
                {results && results.map((result,i) => <Result result={result} key={i}/>)}
            </Suspense>
        </div>
    </div>)
}