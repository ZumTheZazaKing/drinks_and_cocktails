import { Link } from 'react-router-dom';

export function Result(props){

    let { strDrink, strAlcoholic, strGlass, strDrinkThumb, idDrink } = props.result;

    return (<div className="result">
        <img src={strDrinkThumb} alt="drinkImg"/>
        <div>
            <h1>{strDrink}</h1>
            <h3>{strGlass}</h3>
            <p>{strAlcoholic}</p>
            <br/>
            <Link to={`/drink/${idDrink}`}><button>DETAILS</button></Link>
        </div>
    </div>)
}