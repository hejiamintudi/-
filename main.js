'use strict';

module.exports = {
  load () {
    // execute when package loaded
  },

  unload () {
    // execute when package unloaded
  },

  // register your ipc messages here
  messages: {
    'open' () {
      // open entry panel registered in package.json
      Editor.Panel.open('packages');
    },
    'say-hello' () {
      Editor.Ipc.sendToPanel('packages', 'packages:hello');
    },
    'clicked' () {
      Editor.log('Button clicked!');
    }
  },
};