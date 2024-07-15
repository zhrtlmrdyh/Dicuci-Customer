import {NavigationContainer, useNavigation} from '@react-navigation/native';
import React,{ useState, useEffect,useRef } from 'react';
import FlashMessage from 'react-native-flash-message';
import {Provider, useDispatch, useSelector} from 'react-redux';
// import {Loading} from './components';
import store from './redux/store';
import Router from './router';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet,LogBox, AppRegistry } from 'react-native';
import { Loading } from './components';
// import { ModalPortal } from 'react-native-modals';

// import NetworkState, { Settings } from 'react-native-network-state';
// import socket from './config/socket';
// import { getAllUserLB } from './redux/action';
// import { getData } from './utils';
// import { notificationListener, requestUserPermission } from './helper/notificationServices';

// import { io } from 'socket.io-client';
// import ApiConfigLB from './config/ApiConfigLB';
// import { getData, showToasty } from './utils';

// import { io } from 'socket.io-client';
// import socket from './config/socket';
LogBox.ignoreAllLogs();

const MainApp = () => {
  const {isLoading} = useSelector((state) => state.globalReducer);
  
  return (
    <NavigationContainer style={{backgroundColor: 'white'}}>
      
      <Router />
      <FlashMessage position="top" />
      {isLoading && <Loading />}
      {/* <NetworkState
          style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
          onConnected={() => {
            console.log("connected")
          }}
          // onDisconnected={() => Settings.openWifi()}
        /> */}
      
    </NavigationContainer>
  );
};

const App = () => {
  // return (
  //     <MainApp />
  // );
  return (
    <Provider store={store} >
      <MainApp />
      {/* <ModalPortal /> */}
    </Provider>
  );
};


export default App;
const styles = StyleSheet.create({
  
})

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import type {Node} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
