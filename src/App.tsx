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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


//title for app
const Title = styled.h1`
  font-size: 3.2em;
  line-height: 1.1;
  margin-bottom: 2px;
  color: #535bf2;
  font-family: cursive, "Arial";

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



