const { InfluxDB, Point } = require('@influxdata/influxdb-client');

const host = process.env.INFLUXDB_HOST;
const token = process.env.INFLUXDB_TOKEN;

// Create InfluxDB client
const client = new InfluxDB({ url: host, token: token });

module.exports = client;
