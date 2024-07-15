import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import {
  DetailOrder,
  DetailPaket,
  KonfirmasiPesanan,
  LaundryBag,
  MitraCuci,
  PaketDipesan,
  TracingOrder,
  MenungguPembayaran,
  MetodePembayaran,
  PembayaranBerhasil,
  Cashier, 
  CashierDetailPesanan, 
  CashierDetailPesananId, 
  CashierForm, 
  CashierNota, 
  CashierPembayaran, 
  CashierReport, 
  PrintBluetoothSample,
  Login,
  Splash,
  VerifikasiEmail,
  Register,
  GantiPassword,
  ResetPassword,
} from '../pages';
// import {
//   Login,
//   Register,
//   Splash,

// } from '../pages';
import MainApp from './MainApp';
//const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
const Router = () => {
  const fadeConfig = ({ current }) => {
    return {
      cardStyle: {
        opacity: current.progress,
      },
    };
  };
  return (
    <Stack.Navigator
      initialRouteName="VerifikasiUser"
      //  <Stack.Navigator initialRouteName="Notification"
      // <Stack.Navigator initialRouteName="MapTravel"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        // options={{headerShown: false}}
         options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
        
      />
      {/* <Stack.Screen
        name="Intro"
        component={Intro}
        // options={{headerShown: false}}
         options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
      /> */}
      {/* <Stack.Screen name="AuthRoute" component={AuthRoute} options={{ headerShown: false }} /> */}
      <Stack.Screen
        name="Login"
        component={Login}
        // options={{headerShown: false}}
         options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        // options={{headerShown: false}}
         options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
      />
      
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        // options={{headerShown: false}}
        options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
      />
      <Stack.Screen
        name="DetailPaket"
        component={DetailPaket}
        options={{ headerShown: false }}
      //  options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
      />
      <Stack.Screen
        name="LaundryBag"
        component={LaundryBag}
        options={{ headerShown: false }}
      //  options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
      />
      <Stack.Screen
        name="DetailOrder"
        component={DetailOrder}
        options={{ headerShown: false }}
      //  options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
      />

      <Stack.Screen
        name="TracingOrder"
        component={TracingOrder}
        options={{ headerShown: false }}
      //  options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
      />

      <Stack.Screen
        name="MitraCuci"
        component={MitraCuci}
        options={{ headerShown: false }}
      //  options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
      />
      <Stack.Screen
        name="KonfirmasiPesanan"
        component={KonfirmasiPesanan}
        options={{ headerShown: false }}
      //  options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
      />
      <Stack.Screen
        name="PaketDipesan"
        component={PaketDipesan}
        options={{ headerShown: false }}
      //  options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
      />
      <Stack.Screen
        name="Cashier"
        component={Cashier}
        options={{ headerShown: false }}
      //  options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
      />
      <Stack.Screen
        name="CashierForm"
        component={CashierForm}
        options={{ headerShown: false }}
      //  options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
      />
      <Stack.Screen
        name="CashierPembayaran"
        component={CashierPembayaran}
        options={{ headerShown: false }}
      //  options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
      />
      <Stack.Screen
        name="CashierDetailPesanan"
        component={CashierDetailPesanan}
        // options={{headerShown: false}}
        options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
      />
      <Stack.Screen
        name="CashierDetailPesananId"
        component={CashierDetailPesananId}
        options={{ headerShown: false }}
      //  options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
      />
      <Stack.Screen
        name="CashierNota"
        component={CashierNota}
        options={{ headerShown: false }}
      //  options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
      />
       <Stack.Screen
        name="CashierReport"
        component={CashierReport}
        options={{ headerShown: false }}
      //  options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
      />
      <Stack.Screen
        name="MenungguPembayaran"
        component={MenungguPembayaran}
        options={{ headerShown: false }}
      //  options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
      />

      <Stack.Screen
        name="MetodePembayaran"
        component={MetodePembayaran}
        options={{ headerShown: false }}
      //  options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
      />

      <Stack.Screen
        name="PembayaranBerhasil"
        component={PembayaranBerhasil}
        options={{ headerShown: false }}
      //  options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
      />

      <Stack.Screen
        name="PrintBluetoothSample"
        component={PrintBluetoothSample}
        options={{ headerShown: false }}
      //  options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
      />

      <Stack.Screen
        name="GantiPassword"
        component={GantiPassword}
        // options={{ headerShown: false }}
        options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
      />

      <Stack.Screen
        name="VerifikasiEmail"
        component={VerifikasiEmail}
        // options={{ headerShown: false }}
        options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
      />

      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        // options={{ headerShown: false }}
        options={{ headerShown: false, cardStyleInterpolator: fadeConfig }}
      />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
