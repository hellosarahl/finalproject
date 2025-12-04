// Maps Open-Meteo weather_code values to human-readable labels.
export function mapWeatherCodeToDescription(code: number): string {
    if (code === 0) return "Clear sky";
    if (code === 1) return "Mainly clear";
    if (code === 2) return "Partly cloudy";
    if (code === 3) return "Overcast";

    if (code === 45 || code === 48) return "Foggy";

    if (code >= 51 && code <= 57) return "Drizzle";
    if (code >= 61 && code <= 67) return "Rain";
    if (code >= 71 && code <= 77) return "Snowfall";
    if (code === 80 || code === 81 || code === 82) return "Rain showers";
    if (code === 85 || code === 86) return "Snow showers";

    if (code === 95) return "Thunderstorm";
    if (code === 96 || code === 99) return "Thunderstorm with hail";

    return "Unknown";
}