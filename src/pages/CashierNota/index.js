import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, Switch } from 'react-native'
import React, { useRef, useState } from 'react'
import ms from '../../utils/ms'
import { colors, showMessage } from '../../utils';
import { ButtonL, Gap, InputLabel, ItemBluetooth, MetodePembayaran, NavigationTop, Number, Product } from '../../components';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import { windowHeight, windowWidth } from '../../utils/constants';
import { IconClose, IconDicuci, IconLineBottom, IconMoney, IconPrint, IconQris, IconShare, IconTransferBank, IconWhatsapp } from '../../assets/icon';
import { useDispatch, useSelector } from 'react-redux';
import CurrencyInput from 'react-native-currency-input';
import moment from 'moment';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

// import { BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter } from 'react-native-bluetooth-escpos-printer';

import RBSheet from 'react-native-raw-bottom-sheet';
import { color } from 'react-native-reanimated';
const CashierNota = ({ navigation }) => {
    const dispatch = useDispatch();
    const refSheet = useRef();
    const viewRef = useRef();
    const { invoice } = useSelector((state) => state.cashierReducer);
    const [bluetoothTerhubung, setBluetoothTerhubung] = useState(null);
    const [bluetoothList, setBluetoothList] = useState();
    // const onMetodePembayaran = (metodePembayaran) => {
    //     dispatch({
    //         type: 'SET_CASHIER_CHECKOUT', value: {
    //             ...checkout,
    //             MetodePembayaran: metodePembayaran,
    //         }
    //     });
    // }
    const onBackCashier = () => {
        dispatch({
            type: 'SET_CASHIER_INVOICE', value: {}
        });
        navigation?.goBack()
    }
    const onShare = async () => {
        // captureRef(viewRef, {
        //   format: "jpg",
        //   quality: 0.8
        // }).then(
        //   uri => console.log("Image saved to", uri),
        //   error => console.error("Oops, snapshot failed", error)
        // );
        try {
            const imageUrl = await viewRef?.current?.capture();
            const shareOptions = {
                message:
                    `Nota Invoice`,
                url: imageUrl,
            }

            const ShareResponse = await Share.open(shareOptions)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    err && console.log(err);
                })
        } catch (err) {
            console.log('err', err)
        }
    }
    const onPrintInit = () => {
        refSheet?.current?.open();
        // BluetoothManager.isBluetoothEnabled().then((enabled) => {
        //     // alert(enabled) // enabled ==> true /false
        //     // setBleOpend(enabled)
        //     BluetoothManager.enableBluetooth().then((r) => {
        //         const paired = [];
        //         if (r && r.length > 0) {
        //             for (let i = 0; i < r.length; i++) {
        //                 try {
        //                     // paired.push(r[i])
        //                     paired.push(JSON.parse(r[i])); // NEED TO PARSE THE DEVICE INFORMATION
        //                 } catch (e) {
        //                     //ignore
        //                 }
        //             }
        //         }
        //         // console.log(JSON.stringify(paired))
        //         console.log('paired', paired)

        //         setBluetoothList(paired)
        //     }, (err) => {
        //         alert(err)
        //     });
        // }, (err) => {
        //     alert(err)
        // });
    }
    const onConnectBluetooth = (blue) =>{
        // BluetoothManager.connect(blue?.address).then(
        //     s => {
        //         showMessage('Berhasil menghubungkan bluetooth', 'success')
        //     //   setLoading(false);
        //     //   setBoundAddress(row.address);
        //     //   setName(row.name || 'UNKNOWN');
        //     },
        //     e => {
        //       console.log('er',e)
        //       showMessage('Gagal menghubungkan bluetooth')

        //     },
        //   );
    }
    return (
        <View style={[ms.containerPage]}>
            <View style={[ms.wh(windowWidth, 60), ms.pdH(10), ms.aiJc(), ms.bdBw(1), ms.bdC(colors.silverLight)]}>
                <View style={[ms.row]}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }} style={[ms.width('15%'), ms.aiJc()]}>
                        <Image source={IconClose} style={[ms.wh('60%', '60%')]} />
                    </TouchableOpacity>
                    <View style={[ms.width('45%'), ms.jc()]}>
                        <Text style={[ms.fzBCLh(16, '600', '#000000', 19)]}>Nota</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        onPrintInit()
                    }} style={[ms.width('12%'), ms.aiJc()]}>
                        <Image source={IconPrint} style={[ms.wh('70%', '70%')]} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        onShare()
                    }} style={[ms.width('12%'), ms.aiJc()]}>
                        <Image source={IconShare} style={[ms.wh('70%', '70%')]} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        onShare()
                    }} style={[ms.width('12%'), ms.aiJc()]}>
                        <Image source={IconWhatsapp} style={[ms.wh('70%', '70%')]} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <ViewShot ref={viewRef} options={{ format: 'jpg', quality: 1.0 }} style={{ backgroundColor: colors.white }}>
                    <View style={[ms.pdH(20)]}>
                        <View style={[ms.pdV(20)]}>
                            <View style={[ms.pdV(2), ms.aiJc()]}>
                                <Text style={[ms.fzBCLh(14, '700', '#222222 ', 17)]}>Nama Mitra</Text>
                            </View>
                            <View style={[ms.pdV(2), ms.aiJc()]}>
                                <Text style={[ms.fzBCLh(14, '400', '#41A3F0', 17)]}>085234852800</Text>
                            </View>
                        </View>
                        <View style={[ms.pdV(8)]}>
                            <View style={[ms.row, ms.pdV(5)]}>
                                <View style={[ms.width('65%')]}>
                                    <Text style={[ms.fzBCLh(14, '400', '#222222', 17)]}>{moment().format('DD MMMM YYYY')}</Text>
                                </View>
                                <View style={[ms.width('35%')]}>
                                    <Text style={[ms.fzBCLh(14, '400', '#222222', 17), ms.txA('right')]}>{invoice?.MetodePembayaran?.name}</Text>
                                </View>
                            </View>
                            <View style={[ms.row, ms.pdV(5)]}>
                                <View style={[ms.width('65%')]}>
                                    <Text style={[ms.fzBCLh(14, '400', '#222222', 17)]}>Invoice: {invoice?.code}</Text>
                                </View>
                                <View style={[ms.width('35%')]}>
                                    <Text style={[ms.fzBCLh(14, '400', '#222222', 17), ms.txA('right')]}>Lunas</Text>
                                </View>
                            </View>
                            <View style={[ms.pdV(10)]}>
                                <Image source={IconLineBottom} style={[ms.wh('100%', 1)]} />
                            </View>
                            <View style={[ms.row, ms.height(26)]}>
                                <View style={[ms.width('40%'), ms.jc()]}>
                                    <Text style={[ms.fzBCLh(14, '600', '#9DA8B1', 17)]}>Barang</Text>
                                </View>
                                <View style={[ms.width('30%'), ms.aiJc()]}>
                                    <Text style={[ms.fzBCLh(14, '600', '#9DA8B1', 17)]}>Jumlah</Text>
                                </View>
                                <View style={[ms.width('30%'), ms.aiJc()]}>
                                    <Text style={[ms.fzBCLh(14, '600', '#9DA8B1', 17)]}>Harga</Text>
                                </View>
                            </View>
                            {
                                invoice?.ProductCheckout?.map((pc, index) => {
                                    return (
                                        <View key={index} style={[ms.row, ms.pdV(8)]}>
                                            <View style={[ms.width('40%'), ms.jc()]}>
                                                <Text style={[ms.fzBCLh(14, '600', '#000000', 17)]}>{pc?.nama_product}</Text>
                                            </View>
                                            <View style={[ms.width('30%'), ms.aiJc()]}>
                                                <View style={[ms.aiJc()]}>
                                                    <Text style={[ms.fzBCLh(14, '400', '#000000', 17)]}>{pc?.qty}</Text>
                                                </View>
                                            </View>
                                            <View style={[ms.width('30%'), ms.jc()]}>
                                                <Text style={[ms.fzBCLh(14, '600', '#000000', 17), ms.txA('right')]}><Number number={pc?.harga_jual_total} /></Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                            <View style={[ms.pdV(10)]}>
                                <Image source={IconLineBottom} style={[ms.wh('100%', 1)]} />
                            </View>
                            <View style={[ms.row, ms.pdV(5)]}>
                                <View style={[ms.width('65%')]}>
                                    <Text style={[ms.fzBCLh(14, '400', '#222222', 17)]}>Total Pembayaran</Text>
                                </View>
                                <View style={[ms.width('35%')]}>
                                    <Text style={[ms.fzBCLh(14, '400', '#222222', 17), ms.txA('right')]}><Number number={invoice?.total_pembayaran} /></Text>
                                </View>
                            </View>
                            <View style={[ms.pdV(10)]}>
                                <Image source={IconLineBottom} style={[ms.wh('100%', 1)]} />
                            </View>
                            <View style={[ms.row, ms.pdV(5)]}>
                                <View style={[ms.width('65%')]}>
                                    <Text style={[ms.fzBCLh(14, '400', '#222222', 17)]}>{invoice?.metode_pembayaran}</Text>
                                </View>
                                <View style={[ms.width('35%')]}>
                                    <Text style={[ms.fzBCLh(14, '400', '#222222', 17), ms.txA('right')]}><Number number={invoice?.total_dibayar} /></Text>
                                </View>
                            </View>
                            <View style={[ms.row, ms.pdV(5)]}>
                                <View style={[ms.width('65%')]}>
                                    <Text style={[ms.fzBCLh(14, '400', '#222222', 17)]}>Uang kembali</Text>
                                </View>
                                <View style={[ms.width('35%')]}>
                                    <Text style={[ms.fzBCLh(14, '400', '#222222', 17), ms.txA('right')]}><Number number={invoice?.total_pembayaran - invoice?.total_dibayar} /></Text>
                                </View>
                            </View>

                        </View>
                        <Gap height={20} />
                        <View style={[ms.pdV(5), ms.aiJc()]}>
                            <Text style={[ms.fzBCLh(16, '600', '#222222', 19), ms.txA('right')]}>Dibuat oleh <Image source={IconDicuci} style={[ms.wh(55, 12)]} /> apps</Text>
                        </View>
                        <View style={[ms.pdV(0), ms.aiJc()]}>
                            <Text style={[ms.fzBCLh(14, '400', '#222222', 17), ms.txA('right')]}>www.dicuci.id</Text>
                        </View>
                        <Gap height={20} />
                    </View>
                </ViewShot>

            </ScrollView>
            <View style={[ms.pdV(5), ms.pdH(20), ms.height(80)]}>
                <ButtonL
                    onPress={() => {
                        onBackCashier()
                    }}
                    label='Tambah catatan baru'
                    width={"100%"}
                    backgroundColor={colors.primary}
                    color={colors.white}
                    height={40}
                    titleFontWeight={"500"}
                    titleLineHeight={20}
                />
            </View>
            <RBSheet
                ref={refSheet}
                closeOnDragDown={false}
                closeOnPressMask={true}
                customStyles={{
                    container: {
                        borderWidth: 1,
                        borderColor: colors.silverLight,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        // opacity: 1,
                        // backgroundColor: "transparent",
                    },
                    wrapper: {
                        // opacity: 1,
                        // backgroundColor: "transparent",
                        //backgroundColor: colors.silverLight,
                        height: 90 / 100 * windowHeight,
                        borderTopWidth: 1,
                        borderColor: colors.silverLight,
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
                height={90 / 100 * windowHeight}
            >
                <View style={[ms.pd(20)]}>
                    <View>
                    <View style={[ms.row]}>
                    <TouchableOpacity onPress={() => {
                        refSheet?.current?.close()
                    }} style={[ms.width('15%'), ms.aiJc()]}>
                        <Image source={IconClose} style={[ms.wh(50, 50)]} />
                    </TouchableOpacity>
                    <View style={[ms.width('85%'), ms.jc()]}>
                        <Text style={[ms.fzBCLh(16, '600', '#000000', 19)]}>Pilih Perangakat Bluetooth</Text>
                    </View>
                </View>
                    </View>
                    {
                        bluetoothTerhubung && (
                            <View>
                                <View style={[ms.pdV(10)]}>
                                    <Text style={[ms.fzBCLh(18, '400', '#222222', 20)]}>Bluetooth Terhubung : </Text>
                                </View>
                                <TouchableOpacity onPress={() => {
                                            // connect(item)
                                            setBluetoothTerhubung(null)
                                        }}>
                                    <ItemBluetooth
                                        // key={index}
                                        
                                        label={bluetoothTerhubung?.name}
                                        value={bluetoothTerhubung?.address}
                                        connected={true}
                                        actionText="Hubungkan"
                                        color={colors.yellow}
                                    />
                                </TouchableOpacity>

                            </View>
                        )
                    }

                    <View style={[ms.pdV(10)]}>
                        <Text style={[ms.fzBCLh(18, '400', '#222222', 20)]}>Bluetooth yang tersedia : </Text>
                    </View>
                    <ScrollView style={[ms.height(50/100 * windowHeight)]}>
                        <View>
                            {
                                bluetoothList?.map((item, index) => {
                                    return (
                                        <ItemBluetooth

                                            key={index}
                                            onPress={() => {
                                                // connect(item)
                                                setBluetoothTerhubung(item)
                                                onConnectBluetooth(item)
                                            }}
                                            label={item.name}
                                            value={item.address}
                                            connected={false}
                                            actionText="Hubungkan"
                                            color="#00BCD4"
                                        />
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                </View>
            </RBSheet>
        </View>
    )
}

export default CashierNota

const styles = StyleSheet.create({

})