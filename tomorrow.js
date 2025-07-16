/**
 * AI Summary:
 * This file defines an asynchronous function, `collectWeatherData`, which fetches real-time weather data from the Tomorrow.io API for a specified location. The retrieved weather metrics are then written to an InfluxDB time-series database for storage and further analysis. The function handles API requests, data extraction, and database writes, including error handling and logging.
 *
 * Tools Used:
 * - Tomorrow.io API: Provides real-time weather data for a given location.
 * - InfluxDB: A time-series database used to store and manage the collected weather metrics.
 */

/**
 * Collects real-time weather data from the Tomorrow.io API for a specified location,
 * extracts relevant weather metrics, and writes them to an InfluxDB time-series database.
 * Handles API requests, data extraction, database writes, and error logging.
 *
 * @async
 * @function collectWeatherData
 * @returns {Promise<void>} Resolves when weather data has been successfully written to InfluxDB, or logs an error if the operation fails.
 */

import "dotenv/config";
import { InfluxDB, Point } from "@influxdata/influxdb-client";
import { setInterval } from "timers";

// Configuration
const url = process.env.INFLUX_URL;
const token = process.env.INFLUX_TOKEN;
const org = process.env.INFLUX_ORG;
const bucket = process.env.TOMORROW_BUCKET;
const tomorrowApi = process.env.TOMORROW_TOKEN;

// Initialize InfluxDB
const influxDB = new InfluxDB({ url, token });
const writeApi = influxDB.getWriteApi(org, bucket);

// Location configuration
const location = "777 Glades Rd";

// Function to fetch and write weather data

async function collectWeatherData() {
  try {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };

    const response = await fetch(
      `https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=${tomorrowApi}`,
      options
    );

    const data = await response.json();

    // Prepare InfluxDB write point
    writeApi.useDefaultTags({ region: "west" });
    const writeWeather = new Point("weatherData")
      .tag("location", location)
      .floatField("cloudCover", data.data.values.cloudCover)
      .floatField("dewPoint", data.data.values.dewPoint)
      .floatField(
        "freezingRainIntensity",
        data.data.values.freezingRainIntensity
      )
      .floatField("humidity", data.data.values.humidity)
      .floatField(
        "precipitationProbability",
        data.data.values.precipitationProbability
      )
      .floatField("pressureSurfaceLevel", data.data.values.pressureSurfaceLevel)
      .floatField("rainIntensity", data.data.values.rainIntensity)
      .floatField("sleetIntensity", data.data.values.sleetIntensity)
      .floatField("snowIntensity", data.data.values.snowIntensity)
      .floatField("temperature", data.data.values.temperature)
      .floatField("temperatureApparent", data.data.values.temperatureApparent)
      .floatField("uvHealthConcern", data.data.values.uvHealthConcern)
      .floatField("uvIndex", data.data.values.uvIndex)
      .floatField("visibility", data.data.values.visibility)
      .floatField("weatherCode", data.data.values.weatherCode)
      .floatField("windDirection", data.data.values.windDirection)
      .floatField("windGust", data.data.values.windGust)
      .floatField("windSpeed", data.data.values.windSpeed);

    console.log(`Writing weather data: ${writeWeather}`);

    // Write point to InfluxDB
    writeApi.writePoint(writeWeather);
    writeApi
      .flush()
      .then(() => {
        console.log("Weather data write finished successfully\n");
      })
      .catch((err) => {
        console.error("Error during data flush: ", err);
      });
  } catch (err) {
    console.error("Error collecting weather data:", err);
  }
}

// Run immediately and then every 3 minutes
collectWeatherData();
setInterval(collectWeatherData, 3 * 60 * 1000);

console.log("Weather data collection started. Will run every 3 minutes.");

// Graceful shutdown
const gracefulShutdown = () => {
  console.log("Received SIGINT. Flushing data to InfluxDB...");
  writeApi
    .close()
    .then(() => {
      console.log("InfluxDB write finished, exiting process.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Error during write API close: ", err);
      process.exit(1);
    });
};

process.on("SIGINT", gracefulShutdown);

process.on("unhandledRejection", (err) => {
  console.error("Unhandled promise rejection: ", err);
  gracefulShutdown();
});
