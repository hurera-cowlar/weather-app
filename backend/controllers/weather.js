const WeatherModel = require('../models/weather-model');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const influxClient = require('../utils/db/influxdb');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');

exports.getAllWeatherData = catchAsync(async (req, res) => {
  // const allWeatherData = await WeatherModel.find();

  const queryApi = influxClient.getQueryApi(process.env.INFLUXDB_ORG);

  const timeRangeStart = new Date('2023-01-01T17:25:21.068719284Z');
  const timeRangeStop = new Date();

  const mergeFunc = (arr) => {
    const final = [];
    const processedTimes = new Set();
    arr.forEach((current, index) => {
      const { _time, _field, _value } = current;
      if (processedTimes.has(_time)) {
        return;
      }
      const matchingObject = arr.find(
        (obj, idx) => idx !== index && obj._time === _time
      );
      if (matchingObject) {
        const humidval = _field === 'humidity' ? _value : matchingObject._value;
        const tempval =
          _field === 'temperature' ? _value : matchingObject._value;
        final.push({ ...current, humidval, tempval });
        processedTimes.add(_time);
      }
    });
    return final;
  };

  const query = `
  from(bucket: "weather-bucket")
    |> range(start: 0, stop: now())
    |> filter(fn: (r) => r["_measurement"] == "weather")
    |> pivot(rowKey: ["_time"], columnKey: ["_field"], valueColumn: "_value")
    |> group()
    |> yield(name: "all-weather-data")
  `;
  // const query = `
  // from(bucket: "weather-bucket")
  //   |> range(start: ${timeRangeStart.toISOString()}, stop: ${timeRangeStop.toISOString()})
  //   |> group(columns: ["_measurement"])
  // `;

  let result = await queryApi.collectRows(query);

  // result = mergeFunc(result);

  const newres = result.map((e) => {
    return {
      _time: e._time,
      city: e.city,
      weather_condition: e.weather_condition,
      humidval: e.humidity,
      tempval: e.temperature,
    };
  });

  // truncate influx query
  // influx delete --bucket weather-bucket --start '1970-02-14T16:19:09.000Z' --stop '2025-02-14T16:20:00.000Z' --predicate '_measurement="weather"'

  res.status(200).json({
    message: 'success',
    length: newres.length,
    data: newres,
  });
});
