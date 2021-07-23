import * as React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";


const useStyles = makeStyles((theme) => ({
    options: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));
export default function OptionBar({ limit, handleLimit, date, handleDate}) {
  const classes = useStyles();

  return (
    <div style={{ width: "100%" }}>
    <Box
      display="flex"
      justifyContent="center"
      m={1}
      p={1}
      bgcolor="background.paper"
    >
      <Box className={classes.options} justifyContent="center">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Date
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={date}
            onChange={handleDate}
            label="Date"
          >
            <MenuItem value={Date.now() - 9467085600}>3 Months</MenuItem>
            <MenuItem value={Date.now() - 15778476000}>6 Months</MenuItem>
            <MenuItem value={Date.now() - 31556952000}>1 Year</MenuItem>
            <MenuItem value={Date.now() - 94670856000}>3 Years</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Limit
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={limit}
            onChange={handleLimit}
            label="Limit"
          >
            <MenuItem value={3}>Top 3</MenuItem>
            <MenuItem value={10}>Top 10</MenuItem>
            <MenuItem value={50}>Top 50</MenuItem>
            <MenuItem value={100}>Top 100</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  </div>
  );
}
