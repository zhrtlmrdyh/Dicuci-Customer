import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, Switch } from 'react-native'
import React, { useRef, useState } from 'react'
import ms from '../../utils/ms'
import { colors } from '../../utils';
import { ButtonL, Gap, InputLabel, MetodePembayaran, NavigationTop, Number, Product } from '../../components';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import { sum, windowWidth } from '../../utils/constants';
import { IconClose, IconLineBottom, IconMoney, IconPrint, IconQris, IconShare, IconTransferBank, IconWhatsapp } from '../../assets/icon';
import { useDispatch, useSelector } from 'react-redux';
import CurrencyInput from 'react-native-currency-input';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
const CashierDetailPesananId = ({ navigation }) => {
    const dispatch = useDispatch();
    const { checkout, invoice, productCheckout } = useSelector((state) => state.cashierReducer);
    console.log('productCheckout', productCheckout)
    // const onMetodePembayaran = (metodePembayaran) => {
    //     dispatch({
    //         type: 'SET_CASHIER_CHECKOUT', value: {
    //             ...checkout,
    //             MetodePembayaran: metodePembayaran,
    //         }
    //     });
    // }
    // const onBackCashier = () => {
    //     dispatch({
    //         type: 'SET_CASHIER_INVOICE', value: {}
    //     });
    //     navigation?.goBack()
    // }
    // const onBtnQty = (status = 'plus', product) => {
    //     if (status == 'minus' && productCheckout?.qty == 1) {
    //         return
    //     }
    //     if (pc.qty > 0) {
    //         if (status == 'plus') {
    //             pc.qty++
    //             return pc.harga_jual_total = pc.qty * pc?.harga_jual

    //         } else {

    //         }
    //     }

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
    //                         return pc.harga_jual_total = pc.qty * pc?.harga_jual

    //                     } else {
    //                         if (pc.qty == 1) {
    //                             // pc.qty = 0//
    //                             // delete productcheckout   
    //                             return checkout?.ProductCheckout?.splice(pc?.index, 1)

    //                         } else {
    //                             pc.qty--
    //                             return pc.harga_jual_total = pc.qty * pc?.harga_jual

    //                         }
    //                     }
    //                 } else {
    //                     pc.qty = 0
    //                     return pc.harga_jual_total = pc.qty * pc?.harga_jual
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
        let productCheckoutListNew;
        const productFind = checkout?.ProductCheckout?.find((pc) => {
            return pc.fk_product == productCheckout.fk_product
        })
        if (productFind) {
            checkout?.ProductCheckout?.forEach((pc, index) => {
                pc.index = index
            })
            checkout?.ProductCheckout?.forEach((pc) => {
                if (pc.fk_product == productCheckout.fk_product) {
                    return checkout?.ProductCheckout?.splice(pc?.index, 1)
                }
            })
            productCheckoutListNew = checkout?.ProductCheckout
            console.log('productCheckoutListNew', productCheckoutListNew)
            dispatch({
                type: 'SET_CASHIER_CHECKOUT', value: {
                    ...checkout,
                    ProductCheckout: productCheckoutListNew,
                    total_pembayaran: sum(productCheckoutListNew, 'harga_jual_total')

                }
            });
            dispatch({
                type: 'SET_CASHIER_CHECKOUT_PRODUCT_ID', value: {}
            });
            navigation.goBack()
        }
    }
    const onSave = () => {
        let productCheckoutListNew;
        const productFind = checkout?.ProductCheckout?.find((pc) => {
            return pc.fk_product == productCheckout.fk_product
        })
        if (productFind) {
            checkout?.ProductCheckout?.forEach((pc, index) => {
                pc.index = index
            })
            // const onDeleteCheckoutProduct = ()
            checkout?.ProductCheckout?.forEach((pc) => {
                if (pc.fk_product == productCheckout.fk_product) {
                    console.log('valid')
                    // pc = { ...productCheckout}
                    pc.qty = productCheckout.qty
                    if (productCheckout.harga_diskon) pc.harga_diskon = productCheckout.harga_diskon
                    if (productCheckout.harga_diskon_persentase) pc.harga_diskon_persentase = productCheckout.harga_diskon_persentase
                    pc.harga_jual_total = productCheckout.harga_jual_total
                    if (productCheckout.keterangan) pc.keterangan = productCheckout.keterangan
                }

            })
            productCheckoutListNew = checkout?.ProductCheckout
            console.log('productCheckoutListNew', productCheckoutListNew)
            dispatch({
                type: 'SET_CASHIER_CHECKOUT', value: {
                    ...checkout,
                    ProductCheckout: productCheckoutListNew,
                    total_pembayaran: sum(productCheckoutListNew, 'harga_jual_total')

                }
            });
            dispatch({
                type: 'SET_CASHIER_CHECKOUT_PRODUCT_ID', value: {}
            });


        }
        navigation?.goBack()
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
                    <View style={[ms.width('85%'), ms.jc()]}>
                        <Text style={[ms.fzBCLh(16, '600', '#000000', 19)]}>Edit Barang</Text>
                    </View>
                </View>
            </View>
            <ScrollView>
                <View style={[ms.pdH(20)]}>
                    <View style={[ms.pdV(8)]}>
                    <View style={[ms.row, ms.pdV(5)]}>
                            <View style={[ms.width('65%')]}>
                                <Text style={[ms.fzBCLh(14, '400', '#222222', 17)]}>Nama Barang</Text>
                            </View>
                            <View style={[ms.width('35%')]}>
                                <Text style={[ms.fzBCLh(14, '400', '#222222', 17), ms.txA('right')]}>{productCheckout?.Product?.name}</Text>
                            </View>
                        </View>
                        <View style={[ms.row, ms.pdV(5)]}>
                            <View style={[ms.width('65%')]}>
                                <Text style={[ms.fzBCLh(14, '400', '#222222', 17)]}>Harga</Text>
                            </View>
                            <View style={[ms.width('35%')]}>
                                <Text style={[ms.fzBCLh(14, '400', '#222222', 17), ms.txA('right')]}><Number number={productCheckout?.harga_jual_total_awal} /></Text>
                            </View>
                        </View>

                        <View style={[ms.pdV(10)]}>
                            <Image source={IconLineBottom} style={[ms.wh('100%', 1)]} />
                        </View>
                        <View style={[ms.row, ms.pdV(5)]}>
                            <View style={[ms.width('55%')]}>
                                <Text style={[ms.fzBCLh(14, '400', '#222222', 17)]}>Qty</Text>
                            </View>
                            <View style={[ms.width('45%')]}>
                                <View style={[ms.row, ms.height(20), ms.bdW(0.5), ms.bdC('#222222'), ms.bdR(2)]}>
                                    <TouchableOpacity onPress={() => {
                                        if (productCheckout?.qty > 0) {
                                            const qty = productCheckout.qty - 1
                                            const harga_jual_total_awal = productCheckout.Product.harga_jual * qty
                                            const harga_diskon = productCheckout.harga_diskon ? productCheckout.harga_diskon : 0
                                            const harga_jual_total = harga_jual_total_awal - harga_diskon
                                            dispatch({
                                                type: 'SET_CASHIER_CHECKOUT_PRODUCT_ID', value: {
                                                    ...productCheckout,
                                                    qty: qty,
                                                    harga_jual_total_awal: harga_jual_total_awal,
                                                    harga_jual_total: harga_jual_total

                                                }
                                            });
                                        }

                                        // onBtnQty('minus', productCheckout?.Product)
                                    }} style={[ms.width('30%'), ms.aiJc()]}>
                                        <Icon name="minus" size={12} color={'#000000'} />
                                    </TouchableOpacity>
                                    <View style={[ms.width('30%'), ms.aiJc()]}>
                                        <Text style={[ms.fzBCLh(10, '400', '#000000', 10)]}>{productCheckout?.qty}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        const qty = productCheckout.qty + 1
                                        const harga_jual_total_awal = productCheckout.Product.harga_jual * qty
                                        const harga_diskon = productCheckout.harga_diskon ? productCheckout.harga_diskon : 0
                                        const harga_jual_total = harga_jual_total_awal - harga_diskon
                                        dispatch({
                                            type: 'SET_CASHIER_CHECKOUT_PRODUCT_ID', value: {
                                                ...productCheckout,
                                                qty: qty,
                                                harga_jual_total_awal: harga_jual_total_awal,
                                                harga_jual_total: harga_jual_total

                                            }
                                        });
                                        // onBtnQty('plus', productCheckout?.Product)
                                    }} style={[ms.width('30%'), ms.aiJc()]}>
                                        <Icon name="plus" size={12} color={'#000000'} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={[ms.pdH(10)]}>
                            {/* <View>
                                <Text style={[ms.fzBCLh(14, '400', '#222222', 17)]}>Harga Nego & Duskon</Text>
                            </View>
                            <View style={[ms.pdV(10)]}>
                                <CurrencyInput
                                    value={productCheckout?.harga_nego}
                                    onChangeValue={(value)=>{
                                        dispatch({
                                            type: 'SET_CASHIER_CHECKOUT_PRODUCT_ID', value: {
                                                ...productCheckout,
                                                harga_nego: value,
                            
                                            }
                                        });
                                    }}
                                    prefix="Rp "
                                    delimiter="."
                                    separator=","
                                    precision={0}
                                    borderWidth={0.5}
                                    borderRadius={5}
                                    paddingHorizontal={5} placeholder="Harga Nego" style={[ms.height(45), ms.height(45), ms.pdH(10), ms.bdW(1), ms.bdR(4), ms.bdC(colors.silver)]} />

                            </View> */}
                            <View style={[ms.pdV(10), ms.row]}>
                                <View style={[ms.width('65%')]}>
                                    {
                                        productCheckout?.is_current_diskon_persentase ? (
                                            <>
                                                <TextInput value={productCheckout?.harga_diskon_persentase} keyboardType='numeric'
                                                    onChangeText={(value) => {
                                                        const harga_diskon_persentase = value ? value : 0
                                                        const harga_diskon = harga_diskon_persentase / 100 * productCheckout.harga_jual_total_awal
                                                        const harga_jual_total = productCheckout?.harga_jual_total_awal - harga_diskon
                                                        dispatch({
                                                            type: 'SET_CASHIER_CHECKOUT_PRODUCT_ID', value: {
                                                                ...productCheckout,
                                                                harga_diskon_persentase: value,
                                                                harga_diskon: harga_diskon,
                                                                harga_jual_total: harga_jual_total,
                                                            }
                                                        });

                                                    }}
                                                    style={[ms.height(45), ms.height(45), ms.pdH(10), ms.bdW(1), ms.bdR(4), ms.bdC(colors.silver)]} />
                                                <View style={[ms.post(), ms.wh(80, 20), ms.l(20), ms.jc(), ms.mgT(-10)]}>
                                                    <Text style={[ms.fzBCLh(10, '400', colors.silver, 14), ms.bc(colors.white)]}>Diskon Product</Text>
                                                </View>
                                            </>
                                        ) : (
                                            <>
                                                <CurrencyInput
                                                    value={productCheckout?.harga_diskon}
                                                    onChangeValue={(value) => {


                                                        const harga_diskon = value ? value : 0
                                                        const harga_jual_total = productCheckout?.harga_jual_total_awal - harga_diskon
                                                        dispatch({
                                                            type: 'SET_CASHIER_CHECKOUT_PRODUCT_ID', value: {
                                                                ...productCheckout,
                                                                harga_diskon: value,
                                                                harga_jual_total: harga_jual_total,
                                                            }
                                                        });

                                                    }}
                                                    prefix="Rp "
                                                    delimiter="."
                                                    separator=","
                                                    precision={0}
                                                    borderWidth={0.5}
                                                    borderRadius={5}
                                                    paddingHorizontal={5} style={[ms.height(45), ms.height(45), ms.pdH(10), ms.bdW(1), ms.bdR(4), ms.bdC(colors.silver)]} />
                                                <View style={[ms.post(), ms.wh(80, 20), ms.l(20), ms.jc(), ms.mgT(-10)]}>
                                                    <Text style={[ms.fzBCLh(10, '400', colors.silver, 14), ms.bc(colors.white)]}>Diskon Product</Text>
                                                </View>
                                            </>
                                        )
                                    }

                                </View>
                                <View style={[ms.width('35%'), ms.pdH('5%')]}>
                                    <View style={[ms.row]}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                const harga_diskon = productCheckout.harga_diskon ? productCheckout.harga_diskon : 0
                                                const harga_jual_total = productCheckout?.harga_jual_total_awal - harga_diskon

                                                dispatch({
                                                    type: 'SET_CASHIER_CHECKOUT_PRODUCT_ID', value: {
                                                        ...productCheckout,
                                                        is_current_diskon_persentase: false,
                                                        harga_diskon: harga_diskon,
                                                        harga_jual_total: harga_jual_total,

                                                    }
                                                });
                                            }}
                                            style={[ms.wh('47%', 45), ms.aiJc(), ms.bc(!productCheckout?.is_current_diskon_persentase ? '#FFAA00' : colors.silverLight), ms.bdR(5), ms.pd(5)]}>
                                            <Text style={[ms.fzBCLh(18, '400', !productCheckout?.is_current_diskon_persentase ? colors.white : colors.silver, 18)]}>Rp</Text>
                                        </TouchableOpacity>
                                        <Gap width={'5%'} />
                                        <TouchableOpacity
                                            onPress={() => {
                                                const harga_diskon = productCheckout.harga_diskon ? productCheckout.harga_diskon : 0
                                                const harga_jual_total = productCheckout?.harga_jual_total_awal - harga_diskon

                                                dispatch({
                                                    type: 'SET_CASHIER_CHECKOUT_PRODUCT_ID', value: {
                                                        ...productCheckout,
                                                        is_current_diskon_persentase: true,
                                                        harga_diskon: harga_diskon,
                                                        harga_jual_total: harga_jual_total,

                                                    }
                                                });

                                            }}
                                            style={[ms.wh('47%', 45), ms.aiJc(), ms.bc(productCheckout?.is_current_diskon_persentase ? '#FFAA00' : colors.silverLight), ms.bdR(5)]}>
                                            <Text style={[ms.fzBCLh(18, '400', productCheckout?.is_current_diskon_persentase ? colors?.white : colors.silver, 18)]}>%</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={[ms.pdV(10)]}>
                                <TextInput
                                    value={productCheckout?.keterangan}
                                    onChangeValue={(value) => {
                                        dispatch({
                                            type: 'SET_CASHIER_CHECKOUT_PRODUCT_ID', value: {
                                                ...productCheckout,
                                                keterangan: value,

                                            }
                                        });
                                    }}
                                    style={[ms.height(45), ms.bdW(1), ms.bdR(4), ms.bdC(colors.silver)]} />
                                <View style={[ms.post(), ms.wh(100, 20), ms.l(20), ms.jc(), ms.mgT(0)]}>
                                    <Text style={[ms.fzBCLh(10, '400', colors.silver, 14), ms.bc(colors.white)]}>Deskripsi (Opsional)</Text>
                                </View>
                            </View>
                        </View>




                    </View>

                </View>
                <Gap height={8} backgroundColor={colors.bgColor} />

                <View style={[ms.pd(20)]}>
                    <View >
                        <View style={[ms.pdB(20)]}>
                            <Text style={[ms.fzBCLh(14, '700', '#222222', 17)]}>Harga setelah diskon</Text>
                        </View>
                        <View style={[ms.aiJc()]}>
                            <Text style={[ms.fzBCLh(32, '700', '#41A3F0', 38)]}><Number number={productCheckout?.harga_jual_total} /></Text>
                        </View>
                    </View>
                    <View style={[ms.pdV(10), ms.aiJc()]}>
                        <ButtonL
                            iconStartFAName='window-close'
                            iconStartFAColor={colors.red}
                            iconStartFASolid={true}
                            onPress={() => {
                                onDeletePesanan()
                            }} label='Hapus dari keranjang' borderWidth={0} width={'90%'} height={40} backgroundColor={colors?.white} color={colors?.orange} borderRadius={12} />
                    </View>
                    
                    <Gap height={100} />
                </View>

            </ScrollView>
            <View style={[ms.row, ms.pdV(5), ms.pdH(20)]}>
                <ButtonL
                    onPress={() => {
                        onSave()

                    }}
                    label='Simpan'
                    width={"100%"}
                    backgroundColor={colors.primary}
                    color={colors.white}
                    height={40}
                    titleFontWeight={"500"}
                    titleLineHeight={20}
                />
            </View>
        </View>
    )
}

export default CashierDetailPesananId
