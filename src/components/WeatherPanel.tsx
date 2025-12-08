// Component: WeatherPanel
// Author: Run Liu
// Description: Displays current weather information for Boston using data
// fetched in App from the Open-Meteo API.
import styled from "styled-components";
import type { Weather } from "../interfaces/Weather";
import { mapWeatherCodeToDescription } from "../utils/mapWeatherCode";


// Outer container for the weather card
const WeatherPanelContainer = styled.section`
  width: 85vw;
  max-width: 1100px;
  margin-bottom: 3vh;
  padding: 3vh 4vw;
  background-color: rgba(50, 69, 105, 0.36);
  border-radius: 2vh;
  box-shadow: 0 0 2vh rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  font-size: calc(0.9vw + 0.8vh);
  color:#1C1C1E;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
// Title of the weather section
const WeatherTitle = styled.h2`
    width: 100%;
    text-align: center;
  margin: 0 0 2vh;
  font-size: calc(1.4vw + 1.2vh);
  color: #1C1C1E;
`;
// Single line of weather info
const WeatherLine = styled.p`
  margin: 0.5vh 0;
  color: #1C1C1E;

`;

type WeatherPanelProps = {
    weather: Weather | null;
};
// Renders current Boston weather; shows a prompt when data is missing
function WeatherPanel({ weather }: WeatherPanelProps) {
    return (
        <WeatherPanelContainer>
            <WeatherTitle>Boston Weather</WeatherTitle>

            {weather ? (
                <>
                    <WeatherLine>Temperature: {weather.temperature_2m} °C</WeatherLine>
                    <WeatherLine>Rain: {weather.rain}</WeatherLine>
                    <WeatherLine>
                        Condition: {mapWeatherCodeToDescription(weather.weather_code)}
                    </WeatherLine>
                </>
            ) : (
                <WeatherLine>
                    No weather data yet. Submit the form to load it.
                </WeatherLine>
            )}
        </WeatherPanelContainer>
    );
}

export default WeatherPanel;

