const { INFLUXDB_ORG, INFLUXDB_BUCKET } = require('../config/env-config')
const influxClient = require('../utils/db/influxdb')
const { InfluxDB, Point } = require('@influxdata/influxdb-client')

exports.getAllWeatherDataService = async (req, res) => {
  const queryApi = influxClient.getQueryApi(INFLUXDB_ORG)

  const query = `
    from(bucket: "weather-bucket")
      |> range(start: 0, stop: now())
      |> filter(fn: (r) => r["_measurement"] == "weather")
      |> pivot(rowKey: ["_time"], columnKey: ["_field"], valueColumn: "_value")
      |> group()
      |> yield(name: "all-weather-data")
    `

  let result = await queryApi.collectRows(query)

  const newres = result.map((e) => {
    return {
      _time: e._time,
      city: e.city,
      weather_condition: e.weather_condition,
      humidval: e.humidity,
      tempval: e.temperature,
    }
  })

  return newres
}

exports.writeWeatherDataService = (message) => {
  const writeApi = influxClient.getWriteApi(INFLUXDB_ORG, INFLUXDB_BUCKET, 'ns')

  const point = new Point('weather')
    .tag('city', message.city)
    .tag('weather_condition', message.weather)
    .intField('temperature', message.temperature)
    .intField('humidity', message.humidity)

  writeApi.writePoint(point)
  writeApi.close()
}
