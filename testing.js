/**
 * AI Summary:
 * This script reads weather sensor data from a local JSON file ('weather.json') using Node.js.
 * It then writes this data as a point to an InfluxDB database, tagging it with sensor information and measurements.
 * The script uses environment variables for InfluxDB connection details and logs the process to the console.
 *
 * Notable tools:
 * - readFileSync: Reads the entire contents of a file synchronously, blocking execution until the file is read.
 */

import { InfluxDB, Point } from "@influxdata/influxdb-client";
import "dotenv/config";
import { readFileSync } from "fs";
import { spawn } from "child_process";
const url = process.env.INFLUX_URL;
const token = process.env.INFLUX_TOKEN;
const org = process.env.INFLUX_ORG;
const bucket = process.env.INFLUX_BUCKET;
const influxDB = new InfluxDB({ url, token });
const data = JSON.parse(readFileSync("weather.json", "utf8"));
const writeApi = influxDB.getWriteApi(org, bucket);
writeApi.useDefaultTags({ region: "west" });
const point1 = new Point("sample")
  .tag("sensor_id", data.name)
  .stringField("timestamp", data.time_stamp)
  .floatField("distance_cm", data.distance_cm)
  .floatField("temperature_celsius", data.temperature_celsius)
  .stringField("status", data.status);
console.log(` ${point1}`);
writeApi.writePoint(point1);
writeApi.close().then(() => {
  console.log("WRITE FINISHED");
});
