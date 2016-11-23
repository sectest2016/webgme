/* jshint node:true, mocha: true*/
/**
 * @author kecso / https://github.com/kecso
 */
var testFixture = require('../../../_globals.js');

describe.only('gmeNodeGetter', function () {
    'use strict';

    var gmeConfig,
        logger,
        Q,
        expect,
        getNode,
        storage,
        projectName = 'gmeNodeGetterTests',
        context,
        basicState,
        basicStoreNode = function (node) {
            if (node) {
                return context.core.getPath(node);
            }
            return null;
        },
        gmeAuth;

    before(function (done) {
        gmeConfig = testFixture.getGmeConfig();
        logger = testFixture.logger.fork('gmeNodeGetter');
        expect = testFixture.expect;
        Q = testFixture.Q;
        getNode = testFixture.requirejs('js/client/gmeNodeGetter');

        testFixture.clearDBAndGetGMEAuth(gmeConfig, projectName)
            .then(function (gmeAuth_) {
                gmeAuth = gmeAuth_;
                storage = testFixture.getMemoryStorage(logger, gmeConfig, gmeAuth);
                return storage.openDatabase();
            })
            .then(function () {
                return testFixture.importProject(storage,
                    {
                        projectSeed: 'seeds/ActivePanels.webgmex',
                        projectName: projectName,
                        branchName: 'master',
                        gmeConfig: gmeConfig,
                        logger: logger
                    });
            })
            .then(function (importResult) {
                var metaNodes = importResult.core.getAllMetaNodes(importResult.rootNode),
                    path;

                context = importResult;

                basicState = {
                    core: context.core,
                    nodes: {
                        '': {node: context.rootNode}
                    }
                };
                for (path in metaNodes) {
                    basicState.nodes[path] = {node: metaNodes[path]};
                }
            })
            .nodeify(done);
    });

    after(function (done) {
        Q.allDone([
            storage.closeDatabase(),
            gmeAuth.unload()
        ])
            .nodeify(done);
    });

    it('should return null if node is not in state', function () {
        expect(getNode('nevermind', logger, {nodes: {}}, null)).to.eql(null);
    });

    it('should provide all public functions', function () {
        var node = getNode('one', logger, {nodes: {'one': true}}, null);

        expect(typeof node.getParentId).to.equal('function');
        expect(typeof node.getId).to.equal('function');
        expect(typeof node.getRelid).to.equal('function');
        expect(typeof node.getGuid).to.equal('function');
        expect(typeof node.getChildrenIds).to.equal('function');
        expect(typeof node.getChildrenRelids).to.equal('function');
        expect(typeof node.getBaseId).to.equal('function');
        expect(typeof node.isValidNewBase).to.equal('function');
        expect(typeof node.isValidNewParent).to.equal('function');
        expect(typeof node.getInheritorIds).to.equal('function');
        expect(typeof node.getAttribute).to.equal('function');
        expect(typeof node.getOwnAttribute).to.equal('function');
        expect(typeof node.getEditableAttribute).to.equal('function');
        expect(typeof node.getOwnEditableAttribute).to.equal('function');
        expect(typeof node.getRegistry).to.equal('function');
        expect(typeof node.getOwnRegistry).to.equal('function');
        expect(typeof node.getEditableRegistry).to.equal('function');
        expect(typeof node.getOwnEditableRegistry).to.equal('function');
        expect(typeof node.getPointer).to.equal('function');
        expect(typeof node.getPointerId).to.equal('function');
        expect(typeof node.getOwnPointer).to.equal('function');
        expect(typeof node.getOwnPointerId).to.equal('function');
        expect(typeof node.getPointerNames).to.equal('function');
        expect(typeof node.getOwnPointerNames).to.equal('function');
        expect(typeof node.getAttributeNames).to.equal('function');
        expect(typeof node.getValidAttributeNames).to.equal('function');
        expect(typeof node.getOwnAttributeNames).to.equal('function');
        expect(typeof node.getOwnValidAttributeNames).to.equal('function');
        expect(typeof node.getAttributeMeta).to.equal('function');
        expect(typeof node.getRegistryNames).to.equal('function');
        expect(typeof node.getOwnRegistryNames).to.equal('function');
        expect(typeof node.getMemberIds).to.equal('function');
        expect(typeof node.getSetNames).to.equal('function');
        expect(typeof node.getMemberAttributeNames).to.equal('function');
        expect(typeof node.getMemberAttribute).to.equal('function');
        expect(typeof node.getEditableMemberAttribute).to.equal('function');
        expect(typeof node.getMemberRegistryNames).to.equal('function');
        expect(typeof node.getMemberRegistry).to.equal('function');
        expect(typeof node.getEditableMemberRegistry).to.equal('function');
        expect(typeof node.getSetRegistry).to.equal('function');
        expect(typeof node.getSetRegistryNames).to.equal('function');
        expect(typeof node.getSetAttribute).to.equal('function');
        expect(typeof node.getSetAttributeNames).to.equal('function');
        expect(typeof node.getValidChildrenTypes).to.equal('function');
        expect(typeof node.getValidAttributeNames).to.equal('function');
        expect(typeof node.isValidAttributeValueOf).to.equal('function');
        expect(typeof node.getValidPointerNames).to.equal('function');
        expect(typeof node.getValidSetNames).to.equal('function');
        expect(typeof node.getConstraintNames).to.equal('function');
        expect(typeof node.getOwnConstraintNames).to.equal('function');
        expect(typeof node.getConstraint).to.equal('function');
        expect(typeof node.toString).to.equal('function');
        expect(typeof node.getCollectionPaths).to.equal('function');
        expect(typeof node.getInstancePaths).to.equal('function');
        expect(typeof node.getJsonMeta).to.equal('function');
        expect(typeof node.isConnection).to.equal('function');
        expect(typeof node.isAbstract).to.equal('function');
        expect(typeof node.isLibraryRoot).to.equal('function');
        expect(typeof node.isLibraryElement).to.equal('function');
        expect(typeof node.getFullyQualifiedName).to.equal('function');
        expect(typeof node.getNamespace).to.equal('function');
        expect(typeof node.getLibraryGuid).to.equal('function');
        expect(typeof node.getCrosscutsInfo).to.equal('function');
        expect(typeof node.getValidChildrenTypesDetailed).to.equal('function');
        expect(typeof node.getValidSetMemberTypesDetailed).to.equal('function');
        expect(typeof node.getMetaTypeId).to.equal('function');
        expect(typeof node.isMetaNode).to.equal('function');
        expect(typeof node.isTypeOf).to.equal('function');
        expect(typeof node.isValidChildOf).to.equal('function');
        expect(typeof node.getValidChildrenIds).to.equal('function');
        expect(typeof node.isValidTargetOf).to.equal('function');
        expect(typeof node.getValidAspectNames).to.equal('function');
        expect(typeof node.getOwnValidAspectNames).to.equal('function');
        expect(typeof node.getAspectMeta).to.equal('function');
        expect(typeof node.getMixinPaths).to.equal('function');
        expect(typeof node.canSetAsMixin).to.equal('function');
        expect(typeof node.isReadOnly).to.equal('function');
    });

    it('should return the parentId', function () {
        var called = false,
            node = getNode('', logger, {
                core: context.core,
                nodes: {'': {node: context.rootNode}}
            }, function (node) {
                expect(node).to.eql(null);
                called = true;
                return null;
            });

        expect(node.getParentId()).to.eql(null);
        expect(called).to.equal(true);
    });

    it('should return the path/Id', function () {
        var node = getNode('', logger, {
            core: context.core,
            nodes: {'': {node: context.rootNode}}
        }, function (node) {
            return node ? context.core.getPath(node) : null;
        });

        expect(node.getId()).to.eql('');
    });

    it('should return the relative id', function () {
        var node = getNode('', logger, {
            core: context.core,
            nodes: {'': {node: context.rootNode}}
        }, function (node) {
            return node ? context.core.getPath(node) : null;
        });

        expect(node.getRelid()).to.eql(null);
    });

    it('should return the GUID', function () {
        var node = getNode('', logger, {
            core: context.core,
            nodes: {'': {node: context.rootNode}}
        }, function (node) {
            return node ? context.core.getPath(node) : null;
        });

        expect(node.getGuid()).to.eql('86236510-f1c7-694f-1c76-9bad3a2aa4e0');
    });

    it('should return the children paths/Ids', function () {
        var node = getNode('', logger, {
            core: context.core,
            nodes: {'': {node: context.rootNode}}
        }, function (node) {
            return node ? context.core.getPath(node) : null;
        });

        expect(node.getChildrenIds()).to.have.members(['/1', '/175547009', '/1303043463']);
    });

    it('should return the children relative ids', function () {
        var node = getNode('', logger, {
            core: context.core,
            nodes: {'': {node: context.rootNode}}
        }, function (node) {
            return node ? context.core.getPath(node) : null;
        });

        expect(node.getChildrenRelids()).to.have.members(['1', '175547009', '1303043463']);
    });

    it('should return the baseId', function () {
        var called = false,
            node = getNode('', logger, {
                core: context.core,
                nodes: {'': {node: context.rootNode}}
            }, function (node) {
                expect(node).to.eql(null);
                called = true;
                return null;
            });

        expect(node.getBaseId()).to.eql(null);
        expect(called).to.equal(true);
    });

    it('should return whether a new node can or cannot be the base of the given node', function () {
        var node = getNode('/175547009/871430202', logger, basicState, basicStoreNode);

        expect(node.isValidNewBase(null)).to.equal(true);
        expect(node.isValidNewBase(undefined)).to.equal(true);
        expect(node.isValidNewBase('/1')).to.equal(true);
        expect(node.isValidNewBase({})).to.equal(false);
        expect(node.isValidNewBase('unknown')).to.equal(false);
    });

    it('should return whether a new node can or cannot be the parent of the given node', function () {
        var node = getNode('/175547009/871430202', logger, basicState, basicStoreNode);

        expect(node.isValidNewParent(null)).to.equal(false);
        expect(node.isValidNewParent('/1')).to.equal(false);
        expect(node.isValidNewParent('unknown')).to.equal(false);
    });

    it('should return the paths of instance', function () {
        var node = getNode('/175547009/871430202', logger, basicState, basicStoreNode);

        expect(node.getInheritorIds()).to.have.members(['/1303043463/1044885565', '/1303043463/1448030591']);
    });

    it('should return the value of the given attribute', function () {
        var node = getNode('/175547009/871430202', logger, basicState, basicStoreNode);

        expect(node.getAttribute('name')).to.equal('InSet');
    });

    it('should return the own value of the given attribute', function () {
        var node = getNode('/175547009/871430202', logger, basicState, basicStoreNode);

        expect(node.getOwnAttribute('name')).to.equal('InSet');
    });

    it('should return a mutable value of the given attribute', function () {
        var node = getNode('/175547009/871430202', logger, basicState, basicStoreNode),
            originalAttribute = {field: 'one'};

        context.core.setAttribute(basicState.nodes['/175547009/871430202'].node, 'testing', originalAttribute);
        expect(node.getAttribute('testing')).to.equal(originalAttribute);
        expect(node.getEditableAttribute('testing')).not.to.equal(originalAttribute);
        expect(node.getEditableAttribute('name')).to.equal('InSet');
    });

    it('should return a mutable value of the given own attribute', function () {
        var node = getNode('/175547009/871430202', logger, basicState, basicStoreNode),
            originalAttribute = {field: 'one'};

        context.core.setAttribute(basicState.nodes['/175547009/871430202'].node, 'testing', originalAttribute);
        expect(node.getOwnAttribute('testing')).to.equal(originalAttribute);
        expect(node.getOwnEditableAttribute('testing')).not.to.equal(originalAttribute);
        expect(node.getOwnEditableAttribute('name')).to.equal('InSet');
    });

    it('should return the value of the given registry', function () {
        var node = getNode('/175547009/871430202', logger, basicState, basicStoreNode);

        expect(node.getRegistry('position')).to.eql({x: 91, y: 219});
    });

    it('should return the own value of the given registry', function () {
        var node = getNode('/175547009/871430202', logger, basicState, basicStoreNode);

        expect(node.getOwnRegistry('position')).to.eql({x: 91, y: 219});
    });

    it('should return a mutable value of the given registry', function () {
        var node = getNode('/175547009/871430202', logger, basicState, basicStoreNode);

        context.core.setRegistry(basicState.nodes['/175547009/871430202'].node, 'testing', 'one');
        expect(node.getEditableRegistry('testing')).to.equal('one');
        expect(node.getEditableRegistry('position')).to.eql(node.getRegistry('position'));
    });

    it('should return a mutable value of the given own registry', function () {
        var node = getNode('/175547009/871430202', logger, basicState, basicStoreNode);

        context.core.setRegistry(basicState.nodes['/175547009/871430202'].node, 'testing', 'one');
        expect(node.getOwnEditableRegistry('testing')).to.equal('one');
        expect(node.getOwnEditableRegistry('position')).to.eql(node.getOwnRegistry('position'));
    });

    it('should return the path of the target and \'sources\' of the given pointer', function () {
        var node = getNode('/175547009/871430202', logger, basicState, basicStoreNode);

        expect(node.getPointer('base')).to.eql({to: '/1', from: []});
        expect(node.getPointer('something')).to.eql({to: undefined, from: []});
    });

    it('should return the path of the target of the given pointer', function () {
        var node = getNode('/175547009/871430202', logger, basicState, basicStoreNode);

        expect(node.getPointerId('base')).to.equal('/1');
    });

    it('should return the path of the target and \'sources\' of the given own pointer', function () {
        var node = getNode('/1', logger, basicState, basicStoreNode);

        expect(node.getOwnPointer('base')).to.eql({to: null, from: []});
    });

    it('should return the path of the target of the given own pointer', function () {
        var node = getNode('/175547009/871430202', logger, basicState, basicStoreNode);

        expect(node.getOwnPointerId('base')).to.equal('/1');
    });

    it('should return the names of the defined pointers', function () {
        var node = getNode('/175547009/871430202', logger, basicState, basicStoreNode);

        expect(node.getPointerNames()).to.eql(['base']);
    });

    it('should return the names of the own pointers', function () {
        var node = getNode('/175547009/871430202', logger, basicState, basicStoreNode);

        expect(node.getOwnPointerNames()).to.eql(['base']);
    });
});
