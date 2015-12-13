var nio = require('niojs');

nio.source.socketio(
  'http://brand.nioinstances.com',
  ['count_by_time']
  ).pipe(nio.log());