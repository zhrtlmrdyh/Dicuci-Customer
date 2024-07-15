import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, Switch } from 'react-native'
import React, { useRef, useState } from 'react'
import ms from '../../utils/ms'
import { colors } from '../../utils';
import { ButtonL, Gap, InputLabel, MetodePembayaran, NavigationTop, Number, Product } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { sum, windowWidth } from '../../utils/constants';
import { IconMoney, IconQris, IconTransferBank } from '../../assets/icon';
import { useDispatch, useSelector } from 'react-redux';
// import CurrencyInput from 'react-native-currency-input';
const CashierDetailPesanan = ({ navigation }) => {
    const dispatch = useDispatch();
    const { checkout } = useSelector((state) => state.cashierReducer);
    console.log('checkout', checkout)

    // const onBtnQty = (status = 'plus', product) => {
    //     let productCheckoutListNew;
    //     const productFind = checkout?.ProductCheckout?.find((pc) => {
    //         return pc.fk_product == product.id
    //     })
    //     if (productFind) {
    //         checkout?.ProductCheckout?.forEach((pc, index) => {
    //             pc.index = index
    //         })
    //         // const onDeleteCheckoutProduct = ()
    //         checkout?.ProductCheckout?.forEach((pc) => {

    //             if (pc.fk_product == product.id) {
    //                 console.log('else')
    //                 if (pc.qty > 0) {
    //                     if (status == 'plus') {
    //                         pc.qty++
    //                         return pc.harga_jual_total = pc.qty * pc?.Product?.harga_jual

    //                     } else {
    //                         if (pc.qty == 1) {
    //                             // pc.qty = 0//
    //                             // delete productcheckout   
    //                             return checkout?.ProductCheckout?.splice(pc?.index, 1)

    //                         } else {
    //                             pc.qty--
    //                             return pc.harga_jual_total = pc.qty * pc?.Product?.harga_jual

    //                         }
    //                     }
    //                 } else {
    //                     pc.qty = 0
    //                     return pc.harga_jual_total = pc.qty * pc?.Product?.harga_jual
    //                 }

    //             }
    //             // else{
    //             //     console.log('else')
    //             //     pc.qty = 0
    //             //     pc.harga_jual_total = 0
    //             // }
    //         })
    //         productCheckoutListNew = checkout?.ProductCheckout
    //         dispatch({
    //             type: 'SET_CASHIER_CHECKOUT', value: {
    //                 ...checkout,
    //                 ProductCheckout: productCheckoutListNew,
    //                 total_pembayaran: sum(productCheckoutListNew, 'harga_jual_total')

    //             }
    //         });
    //     } else {

    //     }
    // }
    const onDeletePesanan = () => {
        dispatch({
            type: 'SET_CASHIER_CHECKOUT', value: {
                ...checkout,
                ProductCheckout: [],
                total_pembayaran: 0,
            }
        });
        navigation.goBack()
    }
    const onPembayaran = () => {
        navigation.replace('CashierPembayaran')
    }
    return (
        <View style={[ms.containerPage]}>
            <NavigationTop
                onPressStart={() => {
                    navigation.goBack()
                }}
                title="Detail Pesanan"
                titleFontSize={16}
                titleFontWeight="600"
                titleLineHeight={19}
            />
            <ScrollView>
                <View style={[ms.pdH(20)]}>
                    <View style={[ms.row, ms.bc('#FFAA00'), ms.height(26)]}>
                        <View style={[ms.width('40%'), ms.aiJc()]}>
                            <Text style={[ms.fzBCLh(14, '600', '#ffffff', 17)]}>Barang</Text>
                        </View>
                        <View style={[ms.width('30%'), ms.aiJc()]}>
                            <Text style={[ms.fzBCLh(14, '600', '#ffffff', 17)]}>Jumlah</Text>
                        </View>
                        <View style={[ms.width('30%'), ms.aiJc()]}>
                            <Text style={[ms.fzBCLh(14, '600', '#ffffff', 17)]}>Harga</Text>
                        </View>
                    </View>
                    {
                        checkout?.ProductCheckout?.map((pc, index) => {
                            return (
                                <TouchableOpacity onPress={()=>{
                                    const pcNew = {
                                        ...pc,
                                        harga_jual_total_awal : pc.harga_jual_total,
                                    }
                                    dispatch({
                                        type: 'SET_CASHIER_CHECKOUT_PRODUCT_ID', value: pcNew
                                    });
                                    navigation.navigate('CashierDetailPesananId')
                                }} key={index} style={[ms.row, ms.height(26)]}>
                                    <View style={[ms.width('40%'), ms.aiJc()]}>
                                        <Text style={[ms.fzBCLh(14, '600', '#000000', 17)]}><Icon name="pen" size={14} />  {pc?.Product?.name}</Text>
                                    </View>
                                    <View style={[ms.width('30%'), ms.aiJc()]}>
                                        <View style={[ms.height(16), ms.bdC('#222222'), ms.bdR(2)]}>
                                            {/* <TouchableOpacity onPress={() => {
                                                onBtnQty('minus', pc.Product)
                                            }} style={[ms.width('30%'), ms.aiJc()]}>
                                                <Icon name="minus" size={12} color={'#000000'} />
                                            </TouchableOpacity> */}
                                            <View style={[ms.width('100%'), ms.aiJc()]}>
                                                <Text style={[ms.fzBCLh(14, '400', '#000000', 17)]}>{pc?.qty}</Text>
                                            </View>
                                            {/* <TouchableOpacity onPress={() => {
                                                onBtnQty('plus', pc.Product)
                                            }} style={[ms.width('30%'), ms.aiJc()]}>
                                                <Icon name="plus" size={12} color={'#000000'} />
                                            </TouchableOpacity> */}
                                        </View>
                                    </View>
                                    <View style={[ms.width('30%'), ms.aiJc()]}>
                                        <Text style={[ms.fzBCLh(14, '600', '#000000', 17)]}><Number number={pc?.harga_jual_total} /></Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                    <Gap height={20} />
                    <Gap height={1} backgroundColor={'#9DA8B1'} />
                    <Gap height={10} />

                    {/* <View style={[ms.pdV(8)]}>
                        <View style={[ms.row]}>
                            <View style={[ms.width('80%')]}>
                                <Text style={[ms.fzBCLh(12, '400', '#000000', 17)]}>Subtotal</Text>
                            </View>
                            <View style={[ms.width('20%')]}>
                                <Text style={[ms.fzBCLh(12, '700', '#000000', 17), ms.txA('right')]}><Number number={checkout?.total_pembayaran} /></Text>
                            </View>
                        </View>
                    </View> */}
                    <View style={[ms.pdV(8), ms.aiJc()]}>
                        <ButtonL onPress={() => {
                            onDeletePesanan()
                        }} label='Hapus Pesanan' width={'90%'} height={40} backgroundColor={'#FFAA00'} color={colors?.white} borderRadius={12} />
                    </View>

                    <View>

                    </View>

                    <Gap height={100} />
                </View>

            </ScrollView>
            <View style={[ms.wh(windowWidth, 110), ms.pdH(10), ms.bdTw(5), ms.bdC('#F5F5F5')]}>
                <View>
                    <View style={[ms.row, ms.pdT(20)]}>
                        <View style={[ms.width('75%')]}>
                            <Text style={[ms.fzBCLh(12, '400', '#000000', 20)]}>Subtotal</Text>
                        </View>
                        <View style={[ms.width('25%')]}>
                            <Text style={[ms.fzBCLh(16, '700', '#000000', 20), ms.txA('right')]}><Number number={checkout?.total_pembayaran} /></Text>
                        </View>
                    </View>
                    <View style={[ms.aiJc(),ms.height(80)]}>
                        <ButtonL onPress={() => {
                            onPembayaran()
                        }} label='Terima Pembayaraan' width={'90%'} height={40} backgroundColor={'#41A3F0'} color={colors?.white} borderRadius={12} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CashierDetailPesanan

const styles = StyleSheet.create({

})