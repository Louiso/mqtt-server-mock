import paho.mqtt.client as mqtt
from paho.mqtt.properties import Properties
from paho.mqtt.packettypes import PacketTypes
import json

MQTT_VERSION = mqtt.MQTTv5
HOST = 'test.mosquitto.org'
PORT = 1883
SBC_ID = '123AKF'


client = mqtt.Client("server", protocol=MQTT_VERSION)

#########################################################################################################
client.connect(HOST, PORT)

def on_connect(client, userdata, flags, reasonCode,properties=None):
  print('Connected ',flags)
  print('Connected properties',properties)
  print('Connected ',reasonCode)

client.on_connect = on_connect

#########################################################################################################
def on_message(client, userdata, message):
  print('client',client)
  print('userdata',userdata)
  msg=str(message.payload.decode("utf-8"))
  print('RECV Topic = ',message.topic)
  print('RECV MSG =', msg)

  try:
    print("message.properties", message.properties)
    if(message.properties and message.properties.ResponseTopic):
      response_topic = message.properties.ResponseTopic
      properties=Properties(PacketTypes.PUBLISH)
      properties.CorrelationData=message.properties.CorrelationData
      print("message.properties.CorrelationData String", message.properties.CorrelationData.decode("utf-8"))
      print("message.properties.CorrelationData", int.from_bytes(message.properties.CorrelationData, 'big'))
      client.publish(response_topic, json.dumps("server response message") ,properties=properties)
  except:
    print("An exception occurred")
    


client.on_message = on_message

#########################################################################################################
def on_disconnect(client, userdata, rc):
  print('Received Disconnect ',rc)

client.on_disconnect = on_disconnect

#########################################################################################################
def on_subscribe(client, userdata, mid, granted_qos,properties=None):
  print('SUBSCRIBED')

client.on_subscribe = on_subscribe

#########################################################################################################
def on_publish(client, userdata, mid):
  print("published")

client.on_publish = on_publish

#########################################################################################################

client.subscribe(SBC_ID + '/#')

client.loop_forever()
