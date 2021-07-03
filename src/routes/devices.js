require("react")
const matchPath = require('node-match-path').match
const deviceController = require('../controllers/devices')
const { generatePath } = require("react-router")
const { SBC_ID } = process.env

const endpoints = {
  POST_SWITCH_DEVICE_SWITCH: `${SBC_ID}/POST/devices/:deviceIp/switch`
}

// _: packet
exports.module = async (topic, message, _, client) => {
  if(matchPath(endpoints.POST_SWITCH_DEVICE_SWITCH, topic).matches) {
    const match = matchPath(endpoints.POST_SWITCH_DEVICE_SWITCH, topic)

    const { deviceIp } = match.params
    const { check } = JSON.parse(message.toString())

    await deviceController.module.checkEnableDevice({
      ip: deviceIp,
      check
    })

    console.log("_", _)

    client.publish(generatePath(`${endpoints.POST_SWITCH_DEVICE_SWITCH}/response`, { deviceIp }), JSON.stringify({
      success: true,
      data: {
        deviceIp,
        check: true
      }
    }))
  }
}