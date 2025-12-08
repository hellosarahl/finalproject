//Component: App
//Author: Sarah Lam 
// Description: App component for managing user input and fetches weather data from api


import { useState } from "react";
import UserForm from "./components/UserForm";
import WeatherPanel from "./components/WeatherPanel";
import OutfitSuggestion from "./components/OutfitSuggestion";
import type { User } from "./interfaces/User";
import type { Weather } from "./interfaces/Weather";
import styled from "styled-components";


//wrapper for app layout
const PageWrapper = styled.div`
    width: 100vw;
    min-height: 100vh;
    box-sizing: border-box;
    padding: 4vh 3vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: radial-gradient(circle at top,rgb(232, 238, 247) 0, #BBC8E0 55%);
  
`;


//title for app
const Title = styled.h1`
  font-size: calc(3vw + 2vh); /* big and responsive */
  margin: 0 0 3vh;
  text-align: center;
  color: #1C1C1E; /* dark text and light background  */
  font-family: "Georgia", "Times New Roman", serif;
`;

function App() {
    const [weather, setWeather] = useState<Weather | null>(null);
    const [user, setUser] = useState<User | null>(null);
// fetch weather data from api for Boston
    async function getWeather() {
        const f = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=42.36&longitude=-71.06&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_direction_10m,wind_gusts_10m,rain,precipitation,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure"
        );
        const d = await f.json();
        setWeather(d.current as Weather);
    }

    // save userform details and fetches data
    function saveInfo(d: User) {
        setUser(d);
        getWeather();
    }

    //render data
    return (
        <PageWrapper>
            <Title>What do you want to wear today?</Title>
            <UserForm onSubmit={saveInfo} />
            <WeatherPanel weather={weather} />
            <OutfitSuggestion user={user} weather={weather} />
        </PageWrapper>
    );
}

export default App;



