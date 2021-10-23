module.exports = {
    name: 'ping',
    description: 'Test Command!',
    execute(message,args) {
        message.channel.send('Test command.');
    },
};