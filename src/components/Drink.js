import { useEffect, useContext, useState } from "react";
import { Context } from "../data/context";
import { useHistory } from "react-router-dom";

export const Drink = ({match}) => {

    let { previewData, setPreviewData } = useContext(Context);

    const history = useHistory();

    const [ingredients, setIngredients] = useState([]);

    const back = () => {
        history.push("/");
        setPreviewData("");
    }

    useEffect(() => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${match.params.idDrink}`)
        .then(res => res.json())
        .then(data => {
            setPreviewData(data.drinks);
            const ingredientsSave = []
            for(var i = 1; i < 15; i++){
                const variable = "strIngredient";
                if(data.drinks[0][variable+`${i}`] === null)break;
                ingredientsSave.push(data.drinks[0][variable+`${i}`])
            }
            setIngredients(ingredientsSave)
        });
    },[])

    return (previewData && ingredients ? 
    <div className="drink">
        <button onClick={() => back()}>BACK</button>
        <h1>{previewData[0].strDrink}</h1>
        <div className="info">
            <img src={previewData[0].strDrinkThumb} alt="drinkImg"/>
            <div className="details">
                <p><span className="label">Name:</span> {previewData[0].strDrink}</p><br/>
                <p><span className="label">Category:</span> {previewData[0].strCategory}</p><br/>
                <p><span className="label">Info:</span> {previewData[0].strAlcoholic}</p><br/>
                <p><span className="label">Glass:</span> {previewData[0].strGlass}</p><br/>
                <p><span className="label">Instructions:</span> {previewData[0].strInstructions}</p><br/>
                <p>
                    <span className="label">Ingredients:</span> 
                    &nbsp;{ingredients && ingredients.map((ingredient,i) => <span key={i}>{ingredient}{i === ingredients.length - 1 ? "" : ", "} </span>)}
                </p>
            </div>
        </div>
    </div> 
    : <div className="loading"><h1>Loading...</h1></div>)
}