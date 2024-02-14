import random
import time
import paho.mqtt.client as paho
from paho import mqtt
import json

# MQTT broker information
broker_address = "e586d81940394ed89ccc8493d8b32568.s1.eu.hivemq.cloud"
broker_port = 8883
client_username = "hivemq.webclient.1707843159609"
client_password = "c3*8DMyPiQ2It?<eX5%b"

def get_weather_data():
    cities = ['New York']
    weathers = ['Sunny', 'Cold', 'Cloudy', 'Partly Cloudy']

    random_weather_index = random.randint(0, len(weathers) - 1)
    random_humidity = random.randint(0, 100)

    return {
        'city': cities[0],
        'temperature': random.randint(10, 50),
        'weather': weathers[random_weather_index],
        'humidity': random_humidity
    }

def on_connect(client, userdata, flags, rc, properties=None):
    print("Connected to MQTT broker with result code "+str(rc))
    
def on_publish(client, userdata, mid, properties=None):
    print("published")
    
client = paho.Client(client_id="",callback_api_version=paho.CallbackAPIVersion.VERSION1,userdata=None, protocol=paho.MQTTv5)

client.on_connect = on_connect

client.tls_set(tls_version=mqtt.client.ssl.PROTOCOL_TLS)
client.username_pw_set(client_username, client_password)
client.connect(broker_address, broker_port)
client.on_publish = on_publish

try:
    while True:
        weather_data = get_weather_data()

        # Convert weather data to JSON string
        payload = json.dumps({
            "temperature": weather_data["temperature"],
            "humidity": weather_data["humidity"],
            "city": weather_data["city"],
            "weather": weather_data["weather"],
        })

        client.subscribe("weather/#", qos=1)
        client.publish("weather/today", payload=payload, qos=1)
        print("Published data:", payload)
        # client.loop_forever()
        time.sleep(5)

except KeyboardInterrupt:
    print("KeyboardInterrupt: Stopping the MQTT client")
    client.disconnect()
