const {alias} = require('react-app-rewire-alias');

module.exports = function override(config)
{
    alias(
    {
        "@server": "server/server.js"
    })(config);
    return config;
};