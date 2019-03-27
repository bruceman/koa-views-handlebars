const assert = require('assert');
const path = require('path');
const core = require('../lib/core');


describe('test [getViewOptions] function ', function() {
    it('should return default view options when have no parameters', function() {
        const viewOptions = core.getViewOptions();
        assert.equal(viewOptions.extension, 'hbs');
        assert.equal(viewOptions.map.hbs, 'handlebars');
        assert.equal(viewOptions.options.helpers, null);
        assert.equal(viewOptions.options.partials, null);
    });

    it('should return expected view options when pass one folder', function() {
        const helperDirs = __dirname + '/fixtures/helpers';
        const partialDirs =  __dirname + '/fixtures/views';

        const viewOptions = core.getViewOptions(__dirname + '/fixtures', {
            helperDirs,
            partialDirs
        });

        assert.equal(viewOptions.extension, 'hbs');
        assert.equal(viewOptions.map.hbs, 'handlebars');

        // helpers
        const str = 'hello';
        const helpers = viewOptions.options.helpers;
        assert.equal(helpers.uppercase(str), str.toUpperCase());
        // partials
        const partials = viewOptions.options.partials;
        assert.equal(partials['includes/header'], getAbsolutePath(partialDirs, 'includes/header', '.hbs'));
        assert.equal(partials['includes/footer'], getAbsolutePath(partialDirs, 'includes/footer', '.hbs'));
        assert.equal(partials['layout/base'], getAbsolutePath(partialDirs, 'layout/base', '.hbs'));
        assert.equal(partials['pages/index'], getAbsolutePath(partialDirs, 'pages/index', '.hbs'));
        assert.equal(partials['pages/detail'], getAbsolutePath(partialDirs, 'pages/detail', '.hbs'));
    });

    it('should return expected view options when pass multiple partials folders', function() {
        const partialDirs = [__dirname + '/fixtures/views/includes', __dirname + '/fixtures/views/layout', __dirname + '/fixtures/views/pages'];

        const viewOptions = core.getViewOptions(__dirname + '/fixtures', {
            partialDirs
        });

        assert.equal(viewOptions.extension, 'hbs');
        assert.equal(viewOptions.map.hbs, 'handlebars');

        // helpers
        assert.equal(viewOptions.options.helpers, null);
        // partials
        const partials = viewOptions.options.partials;
        const viewPath = __dirname + '/fixtures/views';
        assert.equal(partials['header'], getAbsolutePath(viewPath, 'includes/header', '.hbs'));
        assert.equal(partials['footer'], getAbsolutePath(viewPath, 'includes/footer', '.hbs'));
        assert.equal(partials['base'], getAbsolutePath(viewPath, 'layout/base', '.hbs'));
        assert.equal(partials['index'], getAbsolutePath(viewPath, 'pages/index', '.hbs'));
        assert.equal(partials['detail'], getAbsolutePath(viewPath, 'pages/detail', '.hbs'));
    });
});


function getAbsolutePath(rootPath, filePath, ext) {
    return path.resolve(rootPath, filePath + ext);
}

