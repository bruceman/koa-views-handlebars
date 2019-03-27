const views = require('koa-views');
const walkSync = require('walk-sync');
const path = require('path');

// helper file extension
const HELPER_EXT = '.js';


/**
 * init koa-views instance
 */
function init(viewRootPath, options) {
    // set default root path to current folder
    if (!viewRootPath) {
        viewRootPath = __dirname;
    }

    const viewOptions = getViewOptions(viewRootPath, options);

    if (options.debug) {
        console.log('[koa-views-handlebars] koa-views options :')
        console.log(viewOptions);
    }

    return views(viewRootPath, viewOptions);
}

function getViewOptions(viewRootPath, options) {
    const opts = Object.assign({}, options);
    const extension = opts.extension || 'hbs';
    const partialExt = '.' + extension;
    
    return {
        extension: extension,
        map: {
            [extension]: 'handlebars'
        },
        options: {
            helpers: _getObjectsInDirs(viewRootPath, opts.helperDirs, HELPER_EXT),
            partials: _getObjectsInDirs(viewRootPath, opts.partialDirs, partialExt)
        }
    };
}

// get all partails/helpers in target folders
function _getObjectsInDirs(rootPath, targetDirs, ext) {
    if (!targetDirs) {
        return null;
    }

    if (typeof targetDirs === 'string') {
        return _getObjectsInDir(rootPath, targetDirs, ext);
    } else {
        // array
        const objects = {};
        targetDirs.forEach(function(targetDir) {
            // merge objects into one
            Object.assign(objects, _getObjectsInDir(rootPath, targetDir, ext));
        });
        return objects;
    }
}

// get all partails/helpers in one folder
function _getObjectsInDir(rootPath, targetDir, ext) {
    if (!path.isAbsolute(targetDir)) {
        targetDir = path.resolve(rootPath, targetDir);
    }

    const filePaths = walkSync(targetDir, {directories: false , includeBasePath: false});
    const objects = {};

    filePaths.forEach(function(filePath) {
        if (path.extname(filePath) === ext) {
            const absolutePath = path.resolve(targetDir, filePath);
            // helpers key: base file name
            if (ext === HELPER_EXT) {
                objects[path.basename(filePath, HELPER_EXT)] = require(absolutePath);
            } else {
                // partials key: related file path without file extension 
                objects[filePath.substr(0, filePath.length - ext.length)] = absolutePath;
            }
        }
    });

    return objects;
}


module.exports = {
    init,
    getViewOptions
}
