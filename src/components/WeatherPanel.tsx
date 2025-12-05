// Component: WeatherPanel
// Author: Run Liu
// Description: Displays current weather information for Boston using data
// fetched in App from the Open-Meteo API.
import styled from "styled-components";
import type { Weather } from "../interfaces/Weather";
import { mapWeatherCodeToDescription } from "../utils/mapWeatherCode";



const WeatherPanelContainer = styled.section`
  width: 70vw;
  max-width: 900px;
  margin-bottom: 4vh;
  padding: 3vh 4vw;
  background-color: rgba(15, 23, 42, 0.9);
  border-radius: 2vh;
  box-shadow: 0 0 2vh rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  font-size: calc(0.9vw + 0.8vh);
`;

const WeatherTitle = styled.h2`
  margin: 0 0 2vh;
  font-size: calc(1.4vw + 1.2vh);
  color: #e5e7eb;
`;

const WeatherLine = styled.p`
  margin: 0.5vh 0;
`;

type WeatherPanelProps = {
    weather: Weather | null;
};

function WeatherPanel({ weather }: WeatherPanelProps) {
    if (!weather) {
        return (
            <WeatherPanelContainer>
                <h2>Boston Weather</h2>
                <p>No weather data yet. Submit the form to load it.</p>
            </WeatherPanelContainer>
        );
    }
    const description = mapWeatherCodeToDescription(weather.weather_code);
    return (
        <WeatherPanelContainer>
            <WeatherTitle>Boston Weather</WeatherTitle>
            <WeatherLine>Temperature: {weather.temperature_2m} °C</WeatherLine>
            <WeatherLine>Rain: {weather.rain}</WeatherLine>
            <WeatherLine>Condition: {description}</WeatherLine>
        </WeatherPanelContainer>
    );

}

export default WeatherPanel;

