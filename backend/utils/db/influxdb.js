const { InfluxDB, Point } = require('@influxdata/influxdb-client')
const { INFLUXDB_HOST, INFLUXDB_TOKEN } = require('../../config/env-config')

const host = INFLUXDB_HOST
const token = INFLUXDB_TOKEN

// Create InfluxDB client
const client = new InfluxDB({ url: host, token: token })

module.exports = client
