const matchPath = require('node-match-path').match
const deviceController = require('../controllers/devices')

const { SBC_ID } = process.env

const paths = {
  POST_SWITCH_DEVICE_SWITCH: `${SBC_ID}/POST/devices/:deviceIp/switch`
}

exports.paths = paths

exports.module = async (topic, message, client) => {
  if(matchPath(paths.POST_SWITCH_DEVICE_SWITCH, topic).matches) {
    const match = matchPath(paths.POST_SWITCH_DEVICE_SWITCH, topic)

    const { deviceIp } = match.params
    const { check } = JSON.parse(message.toString())

    await deviceController.module.checkEnableDevice({
      ip: deviceIp, 
      check
    })

    client.publish(`${paths.POST_SWITCH_DEVICE_SWITCH}/response`)
  }
}