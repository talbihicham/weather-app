import React, {useState} from 'react'


const api = {
  key : "2586bc7a84957b1e91087f47fa95460e",
  base : "https://api.openweathermap.org/data/2.5/"
}

function App() {
  
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});


  const search = evt => {

    if(evt.key==="Enter") {
      fetch (`${api.base}weather?q=${query}&Units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July",
     "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}` 
  }
  
 
  
  return (
    <div>
      <main>
        <div>
          <input
            type="text"
            placeholder="serach ..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div>
              <div>{weather.name}, {weather.sys.country}</div>
              <div>{dateBuilder(new Date())} </div>
            </div>
            <div>
              <div>
                {Math.round(weather.main.temp-273.15)}°C
              </div>
              <div>{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
      
    </div>
  );
}

export default App;
