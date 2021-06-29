/* 
  interface CheckEnableDeviceArgs {
    ip: string;
  }
*/
const checkEnableDevice = async ({ ip, check }) => {
  try {
    console.log("ip", ip)
    console.log("check",check)

    return check
  } catch (error) {
    throw error
  }
}

exports.module = {
  checkEnableDevice
}