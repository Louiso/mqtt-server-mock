require('dotenv').config()
const mqtt = require('mqtt')


const { SBC_ID, MQTT_HOST } = process.env 

const client  = mqtt.connect(MQTT_HOST)

client.on('connect', () => {
  client.subscribe(`${SBC_ID}/#`, (err) => {
    if (!err) {
      console.log("Se suscribió correctamente")
    }
  })
})

client.on('message', (topic, message) => {
  // message is Buffer
  console.log("topic",topic)
  require('./src/routes').module(topic, message, client)
})