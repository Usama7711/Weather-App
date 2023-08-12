import axios from "axios";
import { useEffect, useState } from "react";
import '../src/App.css'

function App() {
  const [forecastData, setForecastData] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [cityName , setCityName] = useState('')
  const [weather , setWeather] = useState('')

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser.');
    }
  }, []);

  console.log(longitude , latitude)
  console.log("city" , cityName)
  useEffect(() => {
    const apiKey = 'b0011235ef5bece1b52b26b323021eb9';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl)
      .then(response => {
        const data = response.data;
        console.log("res", response)
        setCityName(response.data.city.name)
        setForecastData(data); // Update the state with the weather forecast data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <>
      <div className="totalBody">
        {/* <div class="sky">
          <div class="cloud"></div>
          <div class="cloud2"></div>
          <div className="raindrop" style={{ left: '50px', top: '20px' }}></div>
          <div className="raindrop" style={{ left: '90px', top: '60px' }}></div>
          <div className="raindrop" style={{ left: '210px', top: '180px' }}></div>
          <div className="raindrop" style={{ left: '170px', top: '140px' }}></div>
          <div className="raindrop" style={{ left: '270px', top: '240px' }}></div>
          <div className="raindrop" style={{ left: '150px', top: '120px' }}></div>
          <div className="raindrop" style={{ left: '190px', top: '160px' }}></div>
          <div className="raindrop" style={{ left: '110px', top: '80px' }}></div>
          <div className="raindrop" style={{ left: '330px', top: '300px' }}></div>
          <div className="raindrop" style={{ left: '70px', top: '40px' }}></div>
          <div className="raindrop" style={{ left: '290px', top: '260px' }}></div>
          <div className="raindrop" style={{ left: '250px', top: '220px' }}></div>
          <div className="raindrop" style={{ left: '310px', top: '280px' }}></div>
          <div className="raindrop" style={{ left: '230px', top: '200px' }}></div>
          <div className="raindrop" style={{ left: '130px', top: '100px' }}></div>
        </div> */}
        <div className="SunBack">
          <div class="sun">
            <div class="rays"></div>
            <div class="sunray-line"></div>
            <div class="sunburst-line"></div>
            <div class="border-line-small"></div>
            <div class="border-line-large"></div>
          </div>

        </div>
        <div className="Conatinbox">
          <div className="serchbox">
            <input type="text" />
            <button>Ser</button>
          </div>
          <div className="InformationSection">
            <div className="SingleLine">
              <label>
                City
              </label>
              <p>
                {cityName}
              </p>
            </div>
            <div className="SingleLine">
              <label>
                Weather
              </label>
              <p>
                Sunie
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
