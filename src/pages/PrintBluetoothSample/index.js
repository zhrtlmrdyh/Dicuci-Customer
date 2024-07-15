import React, { useState, useEffect, useCallback } from 'react';
import {
  ActivityIndicator,
  DeviceEventEmitter,
  NativeEventEmitter,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Text,
  ToastAndroid,
  View,
  Button, 
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// import { BluetoothManager,BluetoothEscposPrinter,BluetoothTscPrinter } from 'react-native-bluetooth-escpos-printer';

import { IconDicuci } from '../../assets/icon';
import { hsdLogo } from './dummy-logo';
// import ItemList from './ItemList';
// import SamplePrint from './SamplePrint';
// import { styles } from './styles';
const ItemList = ({ label, value, onPress, connected, actionText, color = '#00BCD4' }) => {
    return (
      <View style={styles.containerItem}>
        <View>
          <Text style={styles.label}>{label || 'UNKNOWN'}</Text>
          <Text>{value}</Text>
        </View>
        {connected && <Text style={styles.connected}>Terhubung</Text>}
        {!connected && (
          <TouchableOpacity onPress={onPress} style={styles.button(color)}>
            <Text style={styles.actionText}>{actionText}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  const SamplePrint = () => {
    return (
      <View>
        <Text>Sample Print Instruction</Text>
        <View style={styles.btn}>
          <Button
            onPress={async () => {
              await BluetoothEscposPrinter.printBarCode(
                '123456789012',
                BluetoothEscposPrinter.BARCODETYPE.JAN13,
                3,
                120,
                0,
                2,
              );
              await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
            }}
            title="Print BarCode"
          />
        </View>
        <View style={styles.btn}>
          <Button
            onPress={async () => {
              await BluetoothEscposPrinter.printQRCode(
                'https://hsd.co.id',
                280,
                BluetoothEscposPrinter.ERROR_CORRECTION.L,
              ); //.then(()=>{alert('done')},(err)=>{alert(err)});
              await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
            }}
            title="Print QRCode"
          />
        </View>
  
        <View style={styles.btn}>
          <Button
            onPress={async () => {
              await BluetoothEscposPrinter.printerUnderLine(2);
              await BluetoothEscposPrinter.printText('Prawito Hudoro\r\n', {
                encoding: 'GBK',
                codepage: 0,
                widthtimes: 0,
                heigthtimes: 0,
                fonttype: 1,
              });
              await BluetoothEscposPrinter.printerUnderLine(0);
              await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
            }}
            title="Print UnderLine"
          />
        </View>
  
        <View style={styles.btn}>
          <Button
            title="Print Struk Belanja"
            onPress={async () => {
              let columnWidths = [8, 20, 20];
            //   try {
                await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
                await BluetoothEscposPrinter.printPic(hsdLogo, { width: 250, left: 150 });
                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                await BluetoothEscposPrinter.printColumn(
                  [48],
                  [BluetoothEscposPrinter.ALIGN.CENTER],
                  ['Jl. Brigjen Saptadji Hadiprawira No.93'],
                  {},
                );
                await BluetoothEscposPrinter.printColumn(
                  [32],
                  [BluetoothEscposPrinter.ALIGN.CENTER],
                  ['https://xfood.id'],
                  {},
                );
                await BluetoothEscposPrinter.printText(
                  '================================================',
                  {},
                );
                await BluetoothEscposPrinter.printColumn(
                  [24, 24],
                  [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                  ['Customer', 'Prawito Hudoro'],
                  {},
                );
                await BluetoothEscposPrinter.printColumn(
                  [24, 24],
                  [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                  ['Packaging', 'Iya'],
                  {},
                );
                await BluetoothEscposPrinter.printColumn(
                  [24, 24],
                  [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                  ['Delivery', 'Ambil Sendiri'],
                  {},
                );
                await BluetoothEscposPrinter.printText(
                  '================================================',
                  {},
                );
                await BluetoothEscposPrinter.printText('Products\r\n', { widthtimes: 1 });
                await BluetoothEscposPrinter.printText(
                  '================================================',
                  {},
                );
                await BluetoothEscposPrinter.printColumn(
                  columnWidths,
                  [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                  ],
                  ['1x', 'Cumi-Cumi', 'Rp.200.000'],
                  {},
                );
                await BluetoothEscposPrinter.printColumn(
                  columnWidths,
                  [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                  ],
                  ['1x', 'Tongkol Kering', 'Rp.300.000'],
                  {},
                );
                await BluetoothEscposPrinter.printColumn(
                  columnWidths,
                  [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                  ],
                  ['1x', 'Ikan Tuna', 'Rp.400.000'],
                  {},
                );
                await BluetoothEscposPrinter.printText(
                  '================================================',
                  {},
                );
                await BluetoothEscposPrinter.printColumn(
                  [24, 24],
                  [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                  ['Subtotal', 'Rp.900.000'],
                  {},
                );
                await BluetoothEscposPrinter.printColumn(
                  [24, 24],
                  [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                  ['Packaging', 'Rp.6.000'],
                  {},
                );
                await BluetoothEscposPrinter.printColumn(
                  [24, 24],
                  [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                  ['Delivery', 'Rp.0'],
                  {},
                );
                await BluetoothEscposPrinter.printText(
                  '================================================',
                  {},
                );
                await BluetoothEscposPrinter.printColumn(
                  [24, 24],
                  [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                  ['Total', 'Rp.906.000'],
                  {},
                );
                await BluetoothEscposPrinter.printText('\r\n\r\n', {});
                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                await BluetoothEscposPrinter.printQRCode(
                  'DP0837849839',
                  280,
                  BluetoothEscposPrinter.ERROR_CORRECTION.L,
                );
                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                await BluetoothEscposPrinter.printColumn(
                  [48],
                  [BluetoothEscposPrinter.ALIGN.CENTER],
                  ['DP0837849839'],
                  { widthtimes: 2 },
                );
                await BluetoothEscposPrinter.printText(
                  '================================================',
                  {},
                );
                await BluetoothEscposPrinter.printColumn(
                  [48],
                  [BluetoothEscposPrinter.ALIGN.CENTER],
                  ['Sabtu, 18 Juni 2022 - 06:00 WIB'],
                  {},
                );
                await BluetoothEscposPrinter.printText(
                  '================================================',
                  {},
                );
                await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
                await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
            //   } catch (e) {
            //     console.log('err',e)
            //     alert(e.message || 'ERROR');
            //   }
            }}
          />
        </View>
      </View>
    );
  }; 
const PrintBluetoothSample = () => {
  const [pairedDevices, setPairedDevices] = useState([]);
  const [foundDs, setFoundDs] = useState([]);
  const [bleOpend, setBleOpend] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [boundAddress, setBoundAddress] = useState('');
  const requestAppPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid?.PERMISSIONS.BLUETOOTH_CONNECT, // Camera works good. But bluetooth is not working.
      );
      if (granted === PermissionsAndroid?.RESULTS.GRANTED) {
        console.log(PermissionsAndroid?.RESULTS.GRANTED);
        console.log('You can use');
      } else {
        console.log('permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
    // try {
    //     const granted = await PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.BLUETOOTH,
    //       {
    //         title: "Cool BLUETOOTH Permission",
    //         message:
    //           "Cool Photo App needs access to your camera " +
    //           "so you can take awesome pictures.",
    //         buttonNeutral: "Ask Me Later",
    //         buttonNegative: "Cancel",
    //         buttonPositive: "OK"
    //       }
    //     );
    //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //       console.log("You can use the BLUETOOTH");
    //     } else {
    //       console.log("BLUETOOTH permission denied");
    //     }
    //   } catch (err) {
    //     console.warn(err);
    //   }
  };
  useEffect(() => {
     requestAppPermission()
    BluetoothManager.isBluetoothEnabled().then(
      enabled => {
        setBleOpend(Boolean(enabled));
        setLoading(false);
      },
      err => {
        err;
      },
    );

    if (Platform.OS === 'ios') {
      let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
      bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, rsp => {
        deviceAlreadPaired(rsp);
      });
      bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_FOUND, rsp => {
        deviceFoundEvent(rsp);
      });
      bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_CONNECTION_LOST, () => {
        setName('');
        setBoundAddress('');
      });
    } else if (Platform.OS === 'android') {
      DeviceEventEmitter.addListener(BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, rsp => {
        deviceAlreadPaired(rsp);
      });
      DeviceEventEmitter.addListener(BluetoothManager.EVENT_DEVICE_FOUND, rsp => {
        deviceFoundEvent(rsp);
      });
      DeviceEventEmitter.addListener(BluetoothManager.EVENT_CONNECTION_LOST, () => {
        setName('');
        setBoundAddress('');
      });
      DeviceEventEmitter.addListener(BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT, () => {
        ToastAndroid.show('Device Not Support Bluetooth !', ToastAndroid.LONG);
      });
    }
    if (pairedDevices.length < 1) {
      scan();
    }
  }, [boundAddress, deviceAlreadPaired, deviceFoundEvent, pairedDevices, scan]);

  const deviceAlreadPaired = useCallback(
    rsp => {
      var ds = null;
      if (typeof rsp.devices === 'object') {
        ds = rsp.devices;
      } else {
        try {
          ds = JSON.parse(rsp.devices);
        } catch (e) {}
      }
      if (ds && ds.length) {
        let pared = pairedDevices;
        console.log('11 pared',pared)
        if (pared.length < 1) {
          pared = pared.concat(ds || []);
        }
        setPairedDevices(pared);
      }
    },
    [pairedDevices],
  );

  const deviceFoundEvent = useCallback(
    rsp => {
      var r = null;
      try {
        if (typeof rsp.device === 'object') {
          r = rsp.device;
        } else {
          r = JSON.parse(rsp.device);
        }
      } catch (e) {
        // ignore error
      }

      if (r) {
        let found = foundDs || [];
        if (found.findIndex) {
          let duplicated = found.findIndex(function (x) {
            return x.address == r.address;
          });
          if (duplicated == -1) {
            found.push(r);
            setFoundDs(found);
          }
        }
      }
    },
    [foundDs],
  );

  const connect = row => {
    setLoading(true);
    BluetoothManager.connect(row.address).then(
      s => {
        setLoading(false);
        setBoundAddress(row.address);
        setName(row.name || 'UNKNOWN');
      },
      e => {
        console.log('er',e)
        setLoading(false);
        alert(e);
      },
    );
  };

  const unPair = address => {
    setLoading(true);
    BluetoothManager.unpaire(address).then(
      s => {
        setLoading(false);
        setBoundAddress('');
        setName('');
      },
      e => {
        setLoading(false);
        alert(e);
      },
    );
  };

  const scanDevices = useCallback(() => {
    setLoading(true);
    BluetoothManager.scanDevices().then(
      s => {
        // const pairedDevices = s.paired;
        var found = s.found;
        try {
          found = JSON.parse(found); //@FIX_it: the parse action too weired..
        } catch (e) {
          //ignore
        }
        var fds = foundDs;
        if (found && found.length) {
          fds = found;
        }
        setFoundDs(fds);
        setLoading(false);
      },
      er => {
        setLoading(false);
        // ignore
      },
    );
  }, [foundDs]);

  const scan = useCallback(() => {
    try {
      async function blueTooth() {
        const permissions = {
          title: 'HSD bluetooth meminta izin untuk mengakses bluetooth',
          message: 'HSD bluetooth memerlukan akses ke bluetooth untuk proses koneksi ke bluetooth printer',
          buttonNeutral: 'Lain Waktu',
          buttonNegative: 'Tidak',
          buttonPositive: 'Boleh',
        };

        const bluetoothConnectGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          permissions,
        );
        if (bluetoothConnectGranted === PermissionsAndroid.RESULTS.GRANTED) {
          const bluetoothScanGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            permissions,
          );
          if (bluetoothScanGranted === PermissionsAndroid.RESULTS.GRANTED) {
            scanDevices();
          }
        } else {
          // ignore akses ditolak
        }
      }
      blueTooth();
    } catch (err) {
      console.warn(err);
    }
  }, [scanDevices]);
  const onStatusBluetooth = () =>{
    if(!bleOpend){
      BluetoothManager.isBluetoothEnabled().then((enabled)=> {
        // alert(enabled) // enabled ==> true /false
        setBleOpend(enabled)
        BluetoothManager.enableBluetooth().then((r)=>{
          let paired = [];
          if(r && r.length>0){
              for(let i=0;i<r.length;i++){
                  try{
                    // paired.push(r[i])
                      paired.push(JSON.parse(r[i])); // NEED TO PARSE THE DEVICE INFORMATION
                  }catch(e){
                      //ignore
                  }
              }
          }
          // console.log(JSON.stringify(paired))
          console.log('paired', paired)
         
          setPairedDevices(paired)
      },(err)=>{
         alert(err)
     });
    }, (err)=> {
        alert(err)
    });
    }else{
      BluetoothManager.disableBluetooth().then(()=>{
        // do something.
        setBleOpend(false)
        setPairedDevices([])
        alert('disable')
      },(err)=>{alert(err)});
    }
  }
  return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={()=>{
          onStatusBluetooth()
        }}style={styles.bluetoothStatusContainer}>
          <Text style={styles.bluetoothStatus(!bleOpend ? '#47BF34' : '#A8A9AA')}>
             {!bleOpend ? ' Aktifkan Bluetooth' : 'Matikan Bluetooth'}
          </Text>
        </TouchableOpacity>
        <View onPress={()=>{
          onStatusBluetooth()
        }}style={[styles.bluetoothStatusContainer, {width: 100}]}>
          <Text style={styles.bluetoothStatus(bleOpend ? '#47BF34' : '#A8A9AA')}>
             {bleOpend ? ' Aktive' : 'Non Aktive'}
          </Text>
        </View>
        {!bleOpend && <Text style={styles.bluetoothInfo}>Mohon aktifkan bluetooth anda</Text>}
        <Text style={styles.sectionTitle}>Printer yang terhubung ke aplikasi:</Text>
        {boundAddress.length > 0 && (
          <ItemList
            label={name}
            value={boundAddress}
            onPress={() => unPair(boundAddress)}
            actionText="Putus"
            color="#E9493F"
          />
        )}
       
        {boundAddress.length < 1 && (
          <Text style={styles.printerInfo}>Belum ada printer yang terhubung</Text>
        )}
        <Text style={styles.sectionTitle}>Bluetooth yang terhubung ke HP ini:</Text>
        {loading ? <ActivityIndicator animating={true} /> : null}
        <View style={styles.containerList}>
          {pairedDevices.map((item, index) => {
            return (
              <ItemList
                key={index}
                onPress={() => connect(item)}
                label={item.name}
                value={item.address}
                connected={item.address === boundAddress}
                actionText="Hubungkan"
                color="#00BCD4"
              />
            );
          })}
        </View>
        <SamplePrint />
        <View style={{height: 100}} />
      </ScrollView>
  );
};

export default PrintBluetoothSample;

const styles = StyleSheet.create({
    containerItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#E7E7E7',
      marginBottom: 12,
      padding: 12,
      borderRadius: 4,
    },
    label: { fontWeight: 'bold' },
    connected: { fontWeight: 'bold', color: '#00BCD4' },
    button: color => ({
      backgroundColor: color,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 4,
    }),
    actionText: { color: 'white' },
    btn: {
        marginBottom: 8,
      },

      container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
      },
      containerList: { flex: 1, flexDirection: 'column' },
      bluetoothStatusContainer: { justifyContent: 'flex-end', alignSelf: 'flex-end' },
      bluetoothStatus: color => ({
        backgroundColor: color,
        padding: 8,
        borderRadius: 2,
        color: 'white',
        paddingHorizontal: 14,
        marginBottom: 20,
      }),
      bluetoothInfo: { textAlign: 'center', fontSize: 16, color: '#FFC806', marginBottom: 20 },
      sectionTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 12 },
      printerInfo: { textAlign: 'center', fontSize: 16, color: '#E9493F', marginBottom: 20 },
    

  });