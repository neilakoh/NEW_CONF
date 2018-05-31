import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import rx from 'feathers-reactive';
import RxJS from 'rxjs';
import rest from '@feathersjs/rest-client';

import {
  AsyncStorage
} from 'react-native';

const options = {
  idField: '_id',
  listStrategy: 'always'
};
const socket = io('192.168.5.118:3030', {
  transports: ['websocket'],
  forceNew: true
});
const client = feathers();
const restClient = rest('http://192.168.5.118:3030');

client.configure(socketio(socket))
      .configure(auth({ storage: AsyncStorage }))
      .configure(rx(options));

export default {
  client,
}
