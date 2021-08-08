/* 
  interface CheckEnableDeviceArgs {
    ip: string;
  }
*/
const switchCamera = async ({ deviceId, powerOn }) => {
  try {
    console.log("deviceId", deviceId)
    console.log("powerOn",powerOn)

    return powerOn
  } catch (error) {
    throw error
  }
}


const setCamera = async ({ deviceId, ip }) => {
  try {
    console.log("ip", ip)
    console.log("deviceId",deviceId)
    console.log('prendiendo cámara')

    return true
  } catch (error) {
    throw error
  }
}

const checkStatusCamera = async ({ deviceId }) => {
  try {
    console.log("deviceId",deviceId)
    return Boolean(Math.round(Math.random()))
  } catch (error) {
    throw error
  }
}

const setThreshold = async ({ deviceId }) => {
  try {
    console.log("deviceId",deviceId)
    return Boolean(Math.round(Math.random()))
  } catch (error) {
    throw error
  }
}

const switchDetection = async ({ deviceId }) => {
  try {
    console.log("deviceId",deviceId)
    return Boolean(Math.round(Math.random()))
  } catch (error) {
    throw error
  }
}

exports.module = {
  switchCamera,
  setCamera,
  checkStatusCamera,
  setThreshold,
  switchDetection
}