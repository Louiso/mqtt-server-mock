require('dotenv').config()
const mqtt = require('mqtt')


const { SBC_ID, MQTT_HOST } = process.env 

const client = mqtt.connect(MQTT_HOST)
 
client.on('connect', () => {
  // client.subscribe({ [`${SBC_ID}/#`]: { qos: 1 }}, (err) => {
  //   if (!err) {
  //     console.log("Se suscribió correctamente")
  //   }
  // })
  client.subscribe(`${SBC_ID}/#`, {
    qos: 1
  } , (err) => {
    if (!err) {
      console.log("Se suscribió correctamente")
    }
  })
})

client.on('message', (topic, message, packet) => {
  // message is Buffer
  console.log("topic",topic)
  console.log("message", message.toString())
  console.log("packet", packet)
  
  require('./src/routes').module(topic, message, packet, client)
})