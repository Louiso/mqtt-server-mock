exports.module = (topic, message, client) => {
  require('./devices').module(topic, message, client)
}