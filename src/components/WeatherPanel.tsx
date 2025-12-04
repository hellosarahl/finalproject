// Component: WeatherPanel
// Author: Run Liu
// Description: Displays current weather information for Boston using data
// fetched in App from the Open-Meteo API.
import styled from "styled-components";
import type { Weather } from "../interfaces/Weather";
import { mapWeatherCodeToDescription } from "../utils/mapWeatherCode";
const WeatherPanelContainer = styled.section`
  margin-top: 1.5rem;
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
            <h2>Boston Weather</h2>
            <p>Temperature: {weather.temperature_2m} °C</p>
            <p>Rain: {weather.rain}</p>
            <p>Condition: {description}</p>
        </WeatherPanelContainer>
    );
}

export default WeatherPanel;

