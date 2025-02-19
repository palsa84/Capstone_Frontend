import { AppRegistry } from 'react-native';
import App from './App';  // App.js에서 Login.js를 렌더링
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);  // App.js를 루트로 등록

