import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.3:3321',
  //localhost
})

export default api;

/*
all of imports

expo install react-native-svg
expo install expo-app-loading
expo install @expo/vector-icons
expo install expo-notifications
expo install lottie-react-native
expo install expo-font @expo-google-fonts/jost
expo install @react-native-community/datetimepicker
expo install @react-native-async-storage/async-storage
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

yarn add axios 
yarn add date-fns
yarn add @react-navigation/stack
yarn add @react-navigation/native
yarn add @react-navigation/bottom-tabs

npm install -g json-server  
npm i react-native-gesture-handler       
npm i react-native-iphone-x-helper --save


------------------------------------------
to start the code:
APP - expo start 
SERVER - json-server ./src/services/server.json --host 192.168.0.7 --port 3321
*/