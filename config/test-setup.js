const jsdom = require('jsdom').jsdom;

process.env.NODE_ENV = 'test';

['.css', '.scss', '.png', '.jpg'].forEach(ext => {
  require.extensions[ext] = () => null;
});

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

require('babel-register')();
