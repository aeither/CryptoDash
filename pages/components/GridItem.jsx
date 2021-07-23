import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import nFormatter from "../../Utils/nFormatter"

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  Bar,
  Area,
} from "recharts";

const GridItem = ({ data, coin }) => (
  <Grid item xs={12} sm={3}>
    <Typography component="div">
      <Box textAlign="center" m={1}>
        {coin}
      </Box>
    </Typography>
    <ComposedChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis yAxisId="left" tickFormatter={nFormatter} />
      <YAxis
        yAxisId="right"
        orientation="right"
        tickFormatter={nFormatter}
      />
      <Tooltip formatter={(value) => nFormatter(value, 2)}/>
      <Legend />
      <Bar yAxisId="right" dataKey="volume" barSize={20} fill="#413ea0" />
      <Area
        yAxisId="left"
        type="monotone"
        dataKey="rate"
        stroke="#8884d8"
        fill="#8884d8"
      />
    </ComposedChart>
  </Grid>
);

export default GridItem;