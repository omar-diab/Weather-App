import {
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import CloudSharpIcon from "@mui/icons-material/CloudSharp";

const CardContent = () => {
  return (
    <div className="w-full px-2">
      {/* Location & Date */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-start gap-2">
        <Typography variant="h3" color="text.primary">
          Palestine
        </Typography>
        <Typography variant="h6" color="text.primary">
          09/05/2003
        </Typography>
      </div>

      <hr className="my-4" />

      {/* Weather Info */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 w-full">
        <div className="text-center md:text-left w-full">
          <Typography
            variant="h1"
            className="text-[3.5rem] sm:text-[4.5rem] leading-none break-words"
            color="text.primary"
          >
            30°
          </Typography>
          <Typography variant="h5" color="text.primary">
            Broken Cloud
          </Typography>
          <div className="flex items-center justify-center md:justify-start gap-3 mt-2 flex-wrap">
            <Typography variant="h6" color="text.primary">
              Max: 39°
            </Typography>
            <Typography variant="h6" color="text.primary">
              |
            </Typography>
            <Typography variant="h6" color="text.primary">
              Min: 25°
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
            label="Location"
            defaultValue=""
          >
            <MenuItem value="Palestine">Palestine</MenuItem>
            <MenuItem value="Egypt">Egypt</MenuItem>
            <MenuItem value="Jordan">Jordan</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default CardContent;
