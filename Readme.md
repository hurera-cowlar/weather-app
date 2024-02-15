# Weather App Project

## Getting Started

To run the Weather App project, you'll need to follow these steps:

### 1. Start the docker steup

```
docker-compose up
```

or

```
docker compose up
```

### 2. Start the MQTT Publisher

Navigate to the `mqtt` directory and run the following command to start the MQTT publisher:

```
cd mqtt
python sub.py
```

csharp
Copy code

The MQTT publisher should now be running and publishing the messages.

## Usage ports

Frontend: `http://localhost:5173`

Backend APIs: `http://localhost:5000`

influxDB: `http://localhost:8086`
