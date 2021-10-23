export function Result(props){

    let { strDrink, strAlcoholic, strGlass, strDrinkThumb } = props.result;

    return (<div className="result">
        <img src={strDrinkThumb} alt="drinkImg"/>
        <h1>{strDrink}</h1>
        <h3>{strGlass}</h3>
        <p>{strAlcoholic}</p>
    </div>)
}