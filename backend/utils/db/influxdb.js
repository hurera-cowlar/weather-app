const { InfluxDB, Point } = require('@influxdata/influxdb-client');

// InfluxDB connection parameters
// const host = 'http://localhost:8086';
const host = process.env.INFLUXDB_HOST;
const token = process.env.INFLUXDB_TOKEN;
// const token = 'my-super-secret-auth-token';
// const org = 'my-org';
// const bucket = 'my-bucket';

// Create InfluxDB client
const client = new InfluxDB({ url: host, token: token });

// async function queryData() {
//   const queryApi = client.getQueryApi(org);
//   const query =
//     'from(bucket: "' + bucket + '") |> range(start: -1h)';
//   const result = await queryApi.collectRows(query);
//   console.log('Query result:', result);
// }

// async function writeData() {
//   const writeApi = client.getWriteApi(process.env.INFLUXDB_ORG, process.env.INFLUXDB_BUCKET, 'ns');
//   let point = new Point('measurement1')
//     .tag('tagname2', 'tagvalue2')
//     .intField('field2', 10)
//     .intField('field3', 10);

//   writeApi.writePoint(point);
//   writeApi.close();
//   console.log('Data written to InfluxDB');
// }

module.exports = client;
