import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import { format } from "date-fns";
import type { ForecastData } from "@/api/types";

interface WeatherForecastProps {
  data: ForecastData;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

export function WeatherForecast({ data }: WeatherForecastProps) {
  // Group forecast by day and get daily min/max
  const dailyForecasts = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }

    return acc;
  }, {} as Record<string, DailyForecast>);

  // Get next 5 days
  const nextDays = Object.values(dailyForecasts).slice(1, 6);

  // Format temperature
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {nextDays.map((day) => (
            <div
              key={day.date}
              className="grid grid-cols-3 items-center gap-8 rounded-lg border p-3 md:p-4"
            >
              <div>
                <p className="font-semibold text-xs md:text-base">
                  {format(new Date(day.date * 1000), "EEE, MMM d")}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground capitalize">
                  {day.weather.description}
                </p>
              </div>

              <div className="flex justify-center gap-1 md:gap-4 text-xs md:text-base">
                <span className="flex items-center text-blue-500">
                  <ArrowDown className="mr-0.1 h-3 w-3 md:h-4 md:w-4" />
                  {formatTemp(day.temp_min)}
                </span>
                <span className="flex items-center text-red-500">
                  <ArrowUp className="mr-0.1 h-3 w-3 md:h-4 md:w-4" />
                  {formatTemp(day.temp_max)}
                </span>
              </div>

              <div className="flex justify-end gap-1 md:gap-4">
                <span className="flex items-center gap-">
                  <Droplets className="h-3 w-3 md:h-4 md:w-4 text-blue-500" />
                  <span className="text-xs md:text-sm">{day.humidity}%</span>
                </span>
                <span className="flex items-center gap-">
                  <Wind className="h-3 w-3 md:h-5 md:w-5 text-blue-500" />
                  <span className="text-xs md:text-sm">{day.wind}m/s</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
