var nio = require('niojs');
var d3 = require('d3');

nio.source.socketio(
  'http://brand.nioinstances.com',
  ['count_by_network']
  ).pipe(nio.log());