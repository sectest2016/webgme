/*globals require, describe, it, before, WebGMEGlobal*/
/**
 * @author pmeijer / https://github.com/pmeijer
 */
var should = require('chai').should(),
    WebGME = require('../../../../webgme'),
    requirejs = require('requirejs'),
    config = WebGMEGlobal.getConfig(),
    esprima = require('esprima'),
    pluginConfig = {
        pluginID: 'NewPlugin',
        pluginName: 'New Plugin',
        description: '',
        test: true,
        templateType: "None",// "JavaScript", "Python", "CSharp",
        configStructure: false,
        core: false
    };

function isValidJs(testString) {
    var isValid = true;
    try {
        esprima.parse(testString);
    }
    catch(e) {
        isValid = false;
    }
    return isValid;
}

function runPlugin (pluginName, configuration, callback) {
    var pluginBasePaths = 'plugin/coreplugins/'
        plugin = requirejs(pluginBasePaths + pluginName + '/' + pluginName),
        newPlugin = new plugin(),
        artifact = {
            addedFiles: {},
            addFile: function (fname, fstr, callback) {
                this.addedFiles[fname] = fstr;
                callback(null, 'hash');
            }
        };

    newPlugin.getCurrentConfig = function () {
        return configuration;
    }

    newPlugin.createMessage = function (node, message, severity) {

    };

    newPlugin.result = {
        success: false,
        artifact: artifact,
        setSuccess: function (value) {
            this.success = value;
        },
        addArtifact: function (art) {
        }
    };

    newPlugin.META = {
        FCO: '/1'
    };
    newPlugin.core = {
        getPath: function (node) {
            return '/1';
        }
    }
    newPlugin.logger = {
        info: function (msg) {
            console.log(msg)
        },
        debug: function (msg) {
            console.log(msg)
        },
        warning: function (msg) {
            console.warn(msg)
        },
        error: function (msg) {
            console.error(msg)
        },
    }

    newPlugin.blobClient = {
        createArtifact: function (name) {
            return artifact;
        },
        saveAllArtifacts: function (callback) {
            callback(null, ['aHash']);
        }
    }

    newPlugin.main(callback);
};

describe('PluginGenerator', function () {
    'use strict';

    it ('pluginConfig up to date', function () {
        var plugin = requirejs('plugin/coreplugins/PluginGenerator/PluginGenerator'),
            newPlugin = new plugin(),
            pluginStructure = newPlugin.getConfigStructure(),
            i;
        should.equal(Object.keys(pluginConfig).length, pluginStructure.length);

        for (i = 0; i < pluginStructure.length; i += 1) {
            should.equal(pluginConfig.hasOwnProperty(pluginStructure[i].name), true);
            should.equal(pluginConfig[pluginStructure[i].name], pluginStructure[i].value);
        }
    });

    it('space in pluginID should generate invalid files', function (done){
        var config = Object.create(pluginConfig);
        config.pluginID = 'I have a space';
        runPlugin('PluginGenerator', config, function (err, result) {
            var files = result.artifact.addedFiles,
                keys = Object.keys(files),
                i;

            should.equal(err, null);
            should.equal(keys.length, 3);
            for (i = 0; i < keys.length; i += 1) {
                //console.log(files[keys[i]]);
                if (keys[i] === 'src/plugins/null/I have a space/meta.js') {
                    should.equal(isValidJs(files[keys[i]]), true);
                } else {
                    should.equal(isValidJs(files[keys[i]]), false);
                }
            }
            done();
        })
    });

    it('default settings should generate three valid js files', function (done){
        runPlugin('PluginGenerator', pluginConfig, function (err, result) {
            var files = result.artifact.addedFiles,
                keys = Object.keys(files),
                i;

            should.equal(err, null);
            should.equal(keys.length, 3);
            for (i = 0; i < keys.length; i += 1) {
                //console.log(files[keys[i]]);
                should.equal(isValidJs(files[keys[i]]), true);
            }
            done();
        })
    });

    it('configStructure = true should generate three valid js files', function (done){
        var config = Object.create(pluginConfig);
        config.configStructure = true;
        runPlugin('PluginGenerator', config, function (err, result) {
            var files = result.artifact.addedFiles,
                keys = Object.keys(files),
                i;

            should.equal(err, null);
            should.equal(keys.length, 3);
            for (i = 0; i < keys.length; i += 1) {
                //console.log(files[keys[i]]);
                should.equal(isValidJs(files[keys[i]]), true);
            }
            done();
        })
    });

    it('core = true should generate three valid js files', function (done){
        var config = Object.create(pluginConfig);
        config.core = true;
        runPlugin('PluginGenerator', config, function (err, result) {
            var files = result.artifact.addedFiles,
                keys = Object.keys(files),
                i;

            should.equal(err, null);
            should.equal(keys.length, 3);
            for (i = 0; i < keys.length; i += 1) {
                //console.log(files[keys[i]]);
                should.equal(isValidJs(files[keys[i]]), true);
            }
            done();
        })
    });

    it('core, configStructure = true should generate three valid js files', function (done){
        var config = Object.create(pluginConfig);
        config.core = true;
        config.configStructure = true;
        runPlugin('PluginGenerator', config, function (err, result) {
            var files = result.artifact.addedFiles,
                keys = Object.keys(files),
                i;

            should.equal(err, null);
            should.equal(keys.length, 3);
            for (i = 0; i < keys.length; i += 1) {
                //console.log(files[keys[i]]);
                should.equal(isValidJs(files[keys[i]]), true);
            }
            done();
        })
    });

    it('test = false should generate two valid js files', function (done){
        var config = Object.create(pluginConfig);
        config.test = false;
        runPlugin('PluginGenerator', config, function (err, result) {
            var files = result.artifact.addedFiles,
                keys = Object.keys(files),
                i;

            should.equal(err, null);
            should.equal(keys.length, 2);
            for (i = 0; i < keys.length; i += 1) {
                //console.log(files[keys[i]]);
                should.equal(isValidJs(files[keys[i]]), true);
            }
            done();
        })
    });

    it('templateType = Python should generate four valid js files', function (done){
        var config = Object.create(pluginConfig);
        config.templateType = 'Python';
        runPlugin('PluginGenerator', config, function (err, result) {
            var files = result.artifact.addedFiles,
                keys = Object.keys(files),
                i;

            should.equal(err, null);
            should.equal(keys.length, 5);
            for (i = 0; i < keys.length; i += 1) {
                //console.log(files[keys[i]]);
                if (keys[i] === 'src/plugins/null/NewPlugin/Templates/Python.py.ejs') {
                    should.equal(isValidJs(files[keys[i]]), false);
                } else {
                    should.equal(isValidJs(files[keys[i]]), true);
                }
            }
            done();
        })
    });

    it('templateType = Python and core = true should generate four valid js files', function (done){
        var config = Object.create(pluginConfig);
        config.templateType = 'Python';
        config.core = true;
        runPlugin('PluginGenerator', config, function (err, result) {
            var files = result.artifact.addedFiles,
                keys = Object.keys(files),
                i;

            should.equal(err, null);
            should.equal(keys.length, 5);
            for (i = 0; i < keys.length; i += 1) {
                //console.log(files[keys[i]]);
                if (keys[i] === 'src/plugins/null/NewPlugin/Templates/Python.py.ejs') {
                    should.equal(isValidJs(files[keys[i]]), false);
                } else {
                    should.equal(isValidJs(files[keys[i]]), true);
                }
            }
            done();
        })
    });
});
