import React from 'react';
import 'weather-icons/css/weather-icons.css';
import './styles.css';
import Weather from './Components/Weather';

const apiKey = "ea77ee87e85c0c14b3500ee3c1813c12";
const api = "https://api.openweathermap.org/data/2.5/weather?";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: "",
      country: "",
      temp: "",
      min: "",
      max: "",
      description: "",
      icon: "",
      code: "",
      name: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch(`${api}q=${this.state.city},${this.state.country}&appid=${apiKey}&units=metric`)
      .then(res => res.json())
      .then(res => {
        if(res.cod === '404') {
          document.querySelector('.error-message').style.animationPlayState = 'running';
        } else {
          this.setState({
            name: res.name,
            code: res.sys.country,
            temp: res.main.temp,
            min: res.main.temp_min,
            max: res.main.temp_max,
            description: res.weather[0].description,
            icon: res.weather[0].id
          })
        }
      })

    this.setState({
      city: "",
      country: ""
    })
  }

  render() {
    return (
      <>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="error-message">City not found!</div>
          <div className="input-container">
            <input 
              placeholder=" "
              type="text"
              onChange={this.handleChange}
              name="city"
              id="city"
              value={this.state.city}
            />
            <label htmlFor="city">
                City
            </label>
          </div>
          <div className="input-container">
            <input 
              placeholder=" "
              type="text"
              onChange={this.handleChange}
              name="country"
              id="country"
              value={this.state.country}
            />
            <label htmlFor="country">
                Country
            </label>
          </div>
          <button 
            disabled={this.state.city === "" ? true : false} 
            className={this.state.city === "" ? "disabled-button" : ""}
          >
            Get Weather!
          </button>
        </form>
        <Weather
          city={this.state.name}
          code={this.state.code}
          temp={this.state.temp}
          min={this.state.min}
          max={this.state.max}
          description={this.state.description}
          icon={this.state.icon}
        />
      </>
    )
  }
}

export default App;
