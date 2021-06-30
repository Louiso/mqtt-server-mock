exports.module = (topic, message, packet, client) => {
  require('./devices').module(topic, message, packet, client)
}