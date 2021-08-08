const deviceController = require('../controllers/devices')
const { SBC_ID } = process.env

const actions = {
  SWITCH_CAMERA: 'SWITCH_CAMERA',
  SET_CAMERA: 'SET_CAMERA',
  CHECK_STATUS_CAMERA: 'CHECK_STATUS_CAMERA',
  SET_THRESHOLD: 'SET_THRESHOLD',
  SWITCH_DETECTION: 'SWITCH_DETECTION'
}

// _: packet
exports.module = async (topic, message, packet, client) => {
  const body = JSON.parse(message.toString())
  const { type, payload } = body
  if(topic === `/${SBC_ID}/devices/cameras`) {
    console.log("type",type)
    try {
      switch(type) {
        case actions.SWITCH_CAMERA: {
          const { powerOn, deviceId } = payload
  
          await deviceController.module.switchCamera({
            deviceId,
            powerOn
          })
  
          client.publish(packet.properties.responseTopic, JSON.stringify({
            success: true,
            data: null,
            message: ''
          }), {
            properties: {
              correlationData: packet.properties.correlationData
            }
          })
          break
        }
  
        case actions.SET_CAMERA: {
          const { ip, deviceId } = payload
  
          await deviceController.module.setCamera({
            deviceId,
            ip
          })
  
          client.publish(packet.properties.responseTopic, JSON.stringify({
            success: true,
            data: null,
            message: ''
          }), {
            properties: {
              correlationData: packet.properties.correlationData
            }
          })
          break
        }
  
        case actions.CHECK_STATUS_CAMERA: {
          const { deviceId } = payload
          const powerOn = await deviceController.module.checkStatusCamera({ deviceId })
  
          client.publish(packet.properties.responseTopic, JSON.stringify({
            success: true,
            data: {
              powerOn
            },
            message: ''
          }), {
            properties: {
              correlationData: packet.properties.correlationData
            }
          })
          break
        }

        case actions.SET_THRESHOLD: {
          // detection es detectionCode
          const { deviceId, detection, newThreshold } = payload
          await deviceController.module.setThreshold({ deviceId, detection, newThreshold })
  
          client.publish(packet.properties.responseTopic, JSON.stringify({
            success: true,
            data: null,
            message: ''
          }), {
            properties: {
              correlationData: packet.properties.correlationData
            }
          })
          break
        }

        case actions.SWITCH_DETECTION: {
          const { deviceId, detection, powerOn } = payload
          await deviceController.module.switchDetection({ deviceId, detection, powerOn })
  
          client.publish(packet.properties.responseTopic, JSON.stringify({
            success: true,
            data: null,
            message: ''
          }), {
            properties: {
              correlationData: packet.properties.correlationData
            }
          })
          break
        }
  
        default: {
          if(packet.properties.responseTopic)
            client.publish(packet.properties.responseTopic, JSON.stringify({
              success: false,
              data: null,
              message: '404'
            }), {
              properties: {
                correlationData: packet.properties.correlationData
              }
            })
          break
        }
      }
    } catch (error) {
      client.publish(packet.properties.responseTopic, JSON.stringify({
        success: false,
        data: null,
        message: error.message
      }), {
        properties: {
          correlationData: packet.properties.correlationData
        }
      })
    }
    
  }
}