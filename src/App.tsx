import {useState} from "react";
import UserForm from "./components/UserForm";



type User={
  age:string;
  gender:string;
  preferences:{
    bottom:boolean;
    shoe:boolean;
    top:boolean;
    hat:boolean

  };
};

function App(){
  const [weather,setWeather]=useState(null);
  const[user,setUser]=useState(null);


  async function getWeather(){
    //alert("Weather");
    const f=await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_direction_10m,wind_gusts_10m,rain,precipitation,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure");
  
    const d=await f.json();
    setWeather(d.current);
}
function saveInfo(d:User){
      setUser(d);
      getWeather();
    }

    return(
      <div className="center">
        <h1>What do you want to wear today?</h1>
       <UserForm onSubmit={saveInfo}/>

      </div>

    );
  }

export default App;


