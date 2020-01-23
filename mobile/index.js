/**
 * @format
 */

import {AppRegistry} from 'react-native';
import index from './src/index'; // O RN vai buscar o arquivo 'index' dentro da pasta 'src'.
import {name as appName} from './app.json';

// Registrando componente 'App' como componente geral da aplicação.
AppRegistry.registerComponent(appName, () => index);
