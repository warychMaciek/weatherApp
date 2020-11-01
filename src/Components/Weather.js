import React from 'react';

function Weather(props) {
    const {city, code, temp, min, max, description, icon} = props;
    const descriptionCapitalized = description.slice(0, 1).toUpperCase() + description.slice(1);

    return (
        city === "" ? 
            <div></div> 
            :
            <div className="weather-container">
                <h1>{city}, {code}</h1>
                <i className={`wi wi-owm-${icon}`}></i>
                <h2>{temp}&deg;</h2>
                <h3>Min: {min}&deg; | Max: {max}&deg;</h3>
                <h3 className="description">{descriptionCapitalized}</h3>
            </div>
    )
}

export default Weather;