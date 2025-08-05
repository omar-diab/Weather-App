import {
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import CloudSharpIcon from "@mui/icons-material/CloudSharp";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import axios from "axios";
import moment from "moment";
import 'moment/dist/locale/ar';

import { locations } from "../utils/Locations";

const CardContent = () => {
  const { t, i18n } = useTranslation();

  const [selectedLocation, setSelectedLocation] = useState("Palestine");
  const [response, setResponse] = useState({
    temp: null,
    min: null,
    max: null,
    icon: null,
    timestamp: null,
  });
  const [formattedTime, setFormattedTime] = useState("");

  // Fetch weather data
  useEffect(() => {
    const { lat, lon } = locations[selectedLocation];
    const cancelTokenSource = axios.CancelToken.source();

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a705b3908e57ff99033e3b083d5b6c10`,
        { cancelToken: cancelTokenSource.token }
      )
      .then((res) => {
        const { dt, timezone } = res.data;
        const timestamp = (dt + timezone) * 1000;

        const Temp = Math.round(res.data.main.temp - 273.15);
        const Min = Math.round(res.data.main.temp_min - 273.15);
        const Max = Math.round(res.data.main.temp_max - 273.15);
        const Icon = res.data.weather[0].icon;

        setResponse({
          temp: Temp,
          min: Min,
          max: Max,
          icon: `https://openweathermap.org/img/wn/${Icon}@2x.png`,
          timestamp,
        });
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          console.error("Request failed:", err);
        }
      });

    return () => cancelTokenSource.cancel("Component unmounted");
  }, [selectedLocation]);

  // Format localized time when language or timestamp changes
  useEffect(() => {
    if (response.timestamp) {
      moment.locale(i18n.language); // ✅ Correct usage
      const formatted = moment(response.timestamp).format("dddd, MMMM D, YYYY, h:mm A");
      setFormattedTime(formatted);
    }
  }, [response.timestamp, i18n.language]);

  return (
    <div className="w-full px-2">
      {/* Location & Date */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-start gap-2">
        <Typography variant="h3" color="text.primary">
          {t(`country.${selectedLocation}`)}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {formattedTime}
        </Typography>
      </div>

      <hr className="my-4" />

      {/* Weather Info */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 w-full">
        <div className="text-center md:text-left w-full">
          <div className="flex justify-center items-start">
            <Typography
              variant="h1"
              className="text-[3.5rem] sm:text-[4.5rem] leading-none break-words"
              color="text.primary"
            >
              {response.temp}°
            </Typography>
            <img src={response.icon} alt="weather icon" />
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3 mt-2 flex-wrap">
            <Typography variant="h6" color="text.primary">
              {t("maxTemp")}: {response.max}°
            </Typography>
            <Typography variant="h6" color="text.primary">
              |
            </Typography>
            <Typography variant="h6" color="text.primary">
              {t("minTemp")}: {response.min}°
            </Typography>
          </div>
        </div>

        {/* Weather Icon */}
        <div className="w-full flex justify-center md:justify-end">
          <CloudSharpIcon
            sx={{
              fontSize: { xs: 100, sm: 150, md: 200 },
              maxWidth: "100%",
              color: "text.primary",
            }}
          />
        </div>
      </div>

      {/* Location Selector */}
      <div className="mt-6">
        <FormControl fullWidth>
          <InputLabel id="location-select-label">
            {t("selectLocation")}
          </InputLabel>
          <Select
            labelId="location-select-label"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            label={t("selectLocation")}
          >
            {Object.keys(locations).map((loc) => (
              <MenuItem key={loc} value={loc}>
                {t(`country.${loc}`)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default CardContent;
