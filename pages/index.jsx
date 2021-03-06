// This is a skeleton starter React page generated by Plasmic.
// This file is owned by you, feel free to edit as you see fit.
import * as React from "react";
import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";


import timeConverter from "../Utils/timeConverter";
import GridItem from "./components/GridItem";
import HeadBar from "./components/HeadBar";
import OptionBar from "./components/OptionBar";
import LeftDrawer from "./components/LeftDrawer";

import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

function Homepage() {

  const API_KEY = process.env.NEXT_PUBLIC_API

  if (typeof window !== "undefined") {
    Storage.prototype.setObj = function (key, obj) {
      return this.setItem(key, JSON.stringify(obj));
    };
    Storage.prototype.getObj = function (key) {
      return JSON.parse(this.getItem(key));
    };
  }

  const [chartsData, setchartsData] = useState([]);
  const [coinsList, setcoinsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coinName, setCoinName] = useState("");
  const [date, setDate] = useState(Date.now() - 31556952000);
  const [limit, setLimit] = useState(3);

  useEffect(() => {
    getCoinsList();
    getChartsData(coinsList);
  }, [limit]);

  useEffect(() => {
    getChartsData(coinsList);
  }, [coinsList, date]);

  const handleDate = (event) => {
    setDate(event.target.value);
  };

  const handleLimit = (event) => {
    setLimit(event.target.value);
  };

  async function getCoinsList() {
    console.log("coinsList");
    try {
      setLoading(true);
      const res = await fetch(
        new Request("https://api.livecoinwatch.com/coins/list"),
        {
          method: "POST",
          headers: new Headers({
            "content-type": "application/json",
            "x-api-key": API_KEY, //INSERT API KEY
          }),
          body: JSON.stringify({
            currency: "USD",
            sort: "rank",
            order: "ascending",
            offset: 0,
            limit: limit,
            meta: false,
          }),
        }
      );
      const raw = await res.json();
      const computedData = raw.map((obj) => {
        let coins = [];
        coins.push(obj.code);
        return coins;
      });
      setcoinsList(computedData);
      setLoading(false);
      console.log(computedData);
      return computedData;
    } catch (e) {
      console.log(e);
    }
  }

  async function getChartsData(coinsList) {
    console.log("getChartsData");
    let newChartsData = [];
    for (const coin of coinsList) {
      console.log(coin);
      setCoinName(coin);
      try {
        setLoading(true);
        const now = Date.now();
        const res = await fetch(
          new Request("https://api.livecoinwatch.com/coins/single/history"),
          {
            method: "POST",
            headers: new Headers({
              "content-type": "application/json",
              "x-api-key": "b9ebe714-6c37-40d5-b818-6514487c18aa",
            }),
            body: JSON.stringify({
              currency: "USD",
              code: coin,
              start: date, // - One year
              end: now,
              meta: true,
            }),
          }
        );
        const raw = await res.json();
        const computedData = raw.history.map((obj) => {
          let rObj = {};
          rObj["rate"] = obj.rate;
          rObj["volume"] = obj.volume;
          rObj["date"] = timeConverter(obj.date);
          return rObj;
        });
        newChartsData = newChartsData.concat([computedData]);
        console.log(newChartsData);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    setchartsData(newChartsData);
  }

  return (
    <>
      <LeftDrawer />
      <HeadBar />
      <Box pt={12} />
      {loading ? (
        <>
          <LinearProgress />
          <Typography component="div">
            <Box textAlign="center" m={1}>
              {coinName}
            </Box>
          </Typography>
        </>
      ) : (
        <div></div>
      )}
      <OptionBar
        limit={limit}
        handleLimit={handleLimit}
        date={date}
        handleDate={handleDate}
      />
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
        spacing={4}
      >
        {chartsData?.map(function (item, i) {
          return <GridItem key={i} data={item} coin={coinsList[i]}></GridItem>;
        })}
      </Grid>
    </>
  );
}

export default Homepage;
