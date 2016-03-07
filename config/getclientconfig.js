/*jshint node:true*/
/**
 * Strips away sensitive data from gmeConfig, use before sending it to the client.
 * @author pmeijer / https://github.com/pmeijer
 */

function getClientConfig(gmeConfig) {
    'use strict';
    var clientConfig = JSON.parse(JSON.stringify(gmeConfig));

    delete clientConfig.server.log;
    delete clientConfig.server.extlibExcludes;
    delete clientConfig.authentication.jwt;
    delete clientConfig.authentication.salts;
    delete clientConfig.executor.nonce;
    delete clientConfig.mongo;
    delete clientConfig.blob;
    delete clientConfig.bin;

    clientConfig.storage.cache = clientConfig.storage.clientCacheSize;

    return clientConfig;
}

module.exports = getClientConfig;
