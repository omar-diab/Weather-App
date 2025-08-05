import {
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import CloudSharpIcon from "@mui/icons-material/CloudSharp";

import axios from "axios";
import moment from "moment";

import { useEffect, useState } from "react";
import { locations } from "../utils/Locations";

const CardContent = () => {
  const [selectedLocation, setSelectedLocation] = useState("Palestine");

  const [response, setResponse] = useState({
    temp: null,
    desc: "",
    min: null,
    max: null,
    icon: null,
    time: ""
  });

  useEffect(() => {
    const { lat, lon } = locations[selectedLocation];
    let cancelTokenSource = axios.CancelToken.source();

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a705b3908e57ff99033e3b083d5b6c10`,
        {
          cancelToken: cancelTokenSource.token,
        }
      )
      .then((response) => {
        const { dt, timezone } = response.data;

        const localTime = moment
        .unix(dt + timezone)
        .utc()
        .format("MMMM Do YYYY, h:mm a");

        const Temp = Math.round(response.data.main.temp - 272.15);
        const Min = Math.round(response.data.main.temp_min - 272.15);
        const Max = Math.round(response.data.main.temp_max - 272.15);
        const Desc = response.data.weather[0].description;
        const Icon = response.data.weather[0].icon;

        setResponse({
          temp: Temp,
          desc: Desc,
          min: Min,
          max: Max,
          icon: `https://openweathermap.org/img/wn/${Icon}@2x.png`,
          time: localTime
        });
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Request failed:", error);
        }
      });

    return () => {
      cancelTokenSource.cancel("Component unmounted");
    };
  }, [selectedLocation]);

  return (
    <div className="w-full px-2">
      {/* Location & Date */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-start gap-2">
        <Typography variant="h3" color="text.primary">
          {selectedLocation}
        </Typography>
        <Typography variant="p" color="text.primary">
          {response.time}
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
            <img src={response.icon} alt="icon" />
          </div>
          <Typography variant="h5" color="text.primary">
            {response.desc}
          </Typography>
          <div className="flex items-center justify-center md:justify-start gap-3 mt-2 flex-wrap">
            <Typography variant="h6" color="text.primary">
              Max: {response.max}°
            </Typography>
            <Typography variant="h6" color="text.primary">
              |
            </Typography>
            <Typography variant="h6" color="text.primary">
              Min: {response.min}°
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

      {/* Select Dropdown */}
      <div className="mt-6">
        <FormControl fullWidth color="text.primary">
          <InputLabel id="location-select-label">Location</InputLabel>
          <Select
            labelId="location-select-label"
            id="location-select"
            value={selectedLocation}
            label="Location"
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {Object.keys(locations).map((loc) => (
              <MenuItem key={loc} value={loc}>
                {loc}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default CardContent;
