import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, Switch } from 'react-native'
import React, { useRef, useState } from 'react'
import ms from '../../utils/ms'
import { colors, InvoiceSchema, ProductCheckoutSchema, showToast } from '../../utils';
import { ButtonL, Gap, InputLabel, MetodePembayaran, NavigationTop, Number, Product } from '../../components';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import { sum, windowWidth } from '../../utils/constants';
import { IconMoney, IconQris, IconTransferBank } from '../../assets/icon';
import { useDispatch, useSelector } from 'react-redux';
import CurrencyInput from 'react-native-currency-input';

import Realm from "realm";
import realm from '../../utils/realm';
import moment from 'moment';

const CashierPembayaran = ({ navigation }) => {
    const refDibayar = useRef();
    const dispatch = useDispatch();
    const { checkout } = useSelector((state) => state.cashierReducer);

    const [metodePembayaranList, setMetodePembayaranList] = useState([
        {
            id: 1,
            name: "QRIS",
            icon: IconQris,
        },
        {
            id: 2,
            name: "Transfer Bank",
            icon: IconTransferBank,
        },
        {
            id: 3,
            name: "Cash",
            icon: IconMoney,
        }
    ])
    const onMetodePembayaran = (metodePembayaran) => {
        if (metodePembayaran?.id != 3) {
            dispatch({
                type: 'SET_CASHIER_CHECKOUT', value: {
                    ...checkout,
                    total_dibayar: checkout?.total_pembayaran,
                    uang_kembali: checkout?.total_pembayaran - checkout?.total_pembayaran,
                    // total_dibayar: 0,
                    // uang_kembali: 0 - checkout?.total_pembayaran,
                    metode_pembayaran : metodePembayaran?.name,
                    MetodePembayaran: metodePembayaran,
                    fk_metode_pambayaran: metodePembayaran?.id,
                }
            });
        } else {
            dispatch({
                type: 'SET_CASHIER_CHECKOUT', value: {
                    ...checkout,
                    total_dibayar: 0,
                    uang_kembali: 0 - checkout?.total_pembayaran,
                    MetodePembayaran: metodePembayaran,
                    fk_metode_pambayaran: metodePembayaran?.id,
                }
            });
        }


    }
    const onSubmit = async () => {
        if (!checkout?.MetodePembayaran) {
            return showToast('Metode pembayaran belum dipilih')
        }
         console.log('checkout',checkout)
        // const TaskSchema = {
        //     name: "Invoice",
        //     properties: {
        //         id: "int",
        //         code: "string",
        //         fk_metode_pembayaran: "int",
        //         total_qty: "int",
        //         total_dibayar: "int",
        //         total_pembayaran: "int",
        //         uang_kembali: "int",
        //         nama_product: "string",
        //         created_at: "date",
        //         updated_at: "date",
        //         // status: "string?",
        //     },
        //     primaryKey: "id",
        // };
        // (async () => {
        // const realm = await Realm.open({
        //     path: "cashierInvoice",
        //     schema: [InvoiceSchema,ProductCheckoutSchema],
        //     deleteRealmIfMigrationNeeded: true,
        // });

        realm.write(async () => {
            // const invoiceListRMNew = []
            // const invoiceListRM = realm.objects("Invoice");
            // // console.log('invoice', invoiceListRM)
            // invoiceListRM.map((p) => {
            //     invoiceListRMNew.push(p)
            // })
            // // try{
            //  console.log('invoiceListRMNew',invoiceListRMNew)
            // //  return
            // let id = invoiceListRMNew?.length + 1
            const lastId = realm.objects('Invoice').sorted('id');
            const id = lastId.length > 0 ? lastId[lastId.length - 1].id + 1 : 1;
            checkout.ProductCheckout.forEach((p)=>{
                p._id =  moment().format('DDMMYYYYHHmmss') + (Math.random() + 1).toString(36).substring(7) 
            })
            const invoiceCreate = {
                id: id,
                code: `INV-${id}`,
                fk_metode_pembayaran: checkout?.fk_metode_pambayaran,
                total_qty: sum(checkout?.ProductCheckout, 'qty'),
                total_dibayar: checkout?.total_dibayar,
                total_pembayaran: checkout?.total_pembayaran,
                uang_kembali: checkout?.uang_kembali,
                nama_product: checkout?.ProductCheckout?.length > 0 ? checkout?.ProductCheckout[0]?.Product?.name : "",
                metode_pembayaran: checkout?.MetodePembayaran?.name,
                ProductCheckout: checkout?.ProductCheckout,
                created_at: new Date(),
                updated_at: new Date()
            }
            console.log('invoiceCreate',invoiceCreate)
            const invoiceNew = realm.create("Invoice", invoiceCreate);
            console.log('invoiceNew', invoiceNew);
           

           


            // const invoiceListRMNext = realm.objects("Invoice");
            // console.log('invoice', invoiceListRMNext)
            // console.log(`The lists of tasks are => ${tasks.map((task) => { return task?.name + " " + task?._id + ",\n "})}`);
            // const invoiceListNew = []
            // invoiceListRMNext.map((p) => {
            //     console.log(p);
            //     invoiceListNew.push(p)
            // })
            // const invoiceListNewSort = invoiceListNew?.sort(function (a, b) {
            //     return new Date(b.updated_at) - new Date(a.updated_at);
            // })
            // dispatch({
            //     type: 'SET_CASHIER_INVOICE_LIST', value: invoiceListNewSort
            // });
            // navigation.goBack();

            // }catch(err){
            //     console.log('err',err)
            //     showToast('Terjadi kesalahan, hubungi admin')
            // }
            dispatch({
                type: 'SET_CASHIER_INVOICE', value: {
                    ...checkout,
                    code:  `INV-${id}`
                }
            });
            dispatch({
                type: 'SET_CASHIER_CHECKOUT', value: {
                    total_pembayaran: 0
                }
            });
            navigation.replace('CashierNota')
        });
        // realm.write(async () => {
        //     const TaskSchemaProduct = {
        //         name: "ProductCheckout",
        //         properties: {
        //             id: "int",
        //             harga_diskon: "int",
        //             harga_diskon_persentase: "int",
        //             fk_product: "int",
        //             fk_invoice: "int",
        //             qty: "int",
        //             harga_jual: "int",
        //             harga_jual_total: "int",
        //             keterangan: "string",
        //             created_at: "date",
        //             updated_at: "date",

        //             // status: "string?",
        //         },
        //         primaryKey: "id",
        //     };
        //     // (async () => {
        //     const realmPC = await Realm.open({
        //         path: "cashierProductCheckout",
        //         schema: [TaskSchemaProduct],
        //     });
        //     checkout?.ProductCheckout?.forEach(async (pc, index) => {
              
        //         const productCheckoutListRMNew = []
        //         const productCheckoutListRM = realmPC.objects("ProductCheckout");
        //         // console.log('productCheckout', productCheckoutListRM)
        //         productCheckoutListRM.map((p) => {
        //             productCheckoutListRMNew.push(p)
        //         })
        //         // try{
    
        //         let idPC = productCheckoutListRMNew?.length + 1
        //         const productCheckoutCreate = {
        //             id: idPC,
        //             harga_diskon: pc?.harga_diskon,
        //             harga_diskon_persentase: pc?.harga_diskon_persentase,
        //             fk_product: pc?.fk_product,
        //             // fk_invoice: id,
        //             qty: pc?.qty,
        //             harga_jual: pc?.harga_jual,
        //             harga_jual_total: pc?.harga_jual_total,
        //             keterangan: pc.keterangan ? pc?.keterangan : "",
        //             created_at: new Date(),
        //             updated_at: new Date()
        //         }
        //         console.log('productCheckoutCreate',productCheckoutCreate)
        //         const productCheckoutNew = realmPC.create("ProductCheckout", productCheckoutCreate);
        //         console.log('productCheckoutNew', productCheckoutNew);
    
        //     })
        //     })

       
       
    }
    const onUangPas = () => {
        dispatch({
            type: 'SET_CASHIER_CHECKOUT', value: {
                ...checkout,
                total_dibayar: checkout?.total_pembayaran,
            }
        });
    }
    return (
        <View style={[ms.containerPage]}>
            <NavigationTop
                onPressStart={() => {
                    navigation.goBack()
                }}
                title="Pembayaran"
                titleFontSize={16}
                titleFontWeight="600"
                titleLineHeight={19}
            // onPressEnd={()=>{
            //     onSubmit()
            // }}
            // iconEnd={"check"}
            // iconEndColor={colors?.success}
            />
            <ScrollView>
                <View style={[ms.pdH(20)]}>
                    <View style={[ms.pdV(8)]}>
                        <Text style={[ms.fzBCLh(14, '700', '#000000', 17)]}>Total yang harus dibayarkan</Text>
                    </View>
                    <View style={[ms.pdV(8), ms.aiJc()]}>
                        <Text style={[ms.fzBCLh(32, '700', '#41A3F0', 38)]}><Number number={checkout?.total_pembayaran} /></Text>
                    </View>
                    <View style={[ms.pdV(8)]}>
                        <Text style={[ms.fzBCLh(14, '700', '#000000', 17)]}>Pilih Metode Pembayaran</Text>
                    </View>
                    <View>
                        {
                            metodePembayaranList.map((metodePembayaran, index) => {
                                return (
                                    <MetodePembayaran
                                        onPress={() => {
                                            onMetodePembayaran(metodePembayaran)
                                            // setTimeout(()=>{
                                            //     refDibayar?.current?.focus()
                                            // },500)
                                        }}
                                        metodePembayaran={metodePembayaran}
                                        key={index}
                                        isSelected={metodePembayaran?.id == checkout?.MetodePembayaran?.id ? true : false}
                                    />
                                )
                            })
                        }
                    </View>
                    {
                        checkout?.MetodePembayaran?.id == 3 && (
                            <View style={[ms.bdW(1), ms.bdR(8), ms.bdC(colors.primary)]}>
                                <View style={[ms.pd(13)]}>
                                    <ButtonL
                                        onPress={() => {
                                            onUangPas()
                                        }}
                                        label='Terima Uang Pas'
                                        width={"100%"}
                                        backgroundColor={colors.primary}
                                        color={colors.white}
                                        height={40}
                                        titleFontWeight={"500"}
                                        titleLineHeight={20}
                                    />
                                </View>
                                <View style={[ms.pdH(13)]}>
                                    <Text style={[ms.fzBCLh(14, '500', '#000000', 20)]}>Atau masukan Nominal</Text>
                                </View>
                                <View style={[ms.pdH(13)]}>
                                    {/* <TextInput 

                                        placeholder="Rp0" 
                                        keyboardType='numeric' 
                                    /> */}
                                    <CurrencyInput
                                        ref={refDibayar}
                                        value={String(checkout?.total_dibayar ? checkout?.total_dibayar : "")}
                                        placeholder="Rp0"
                                        onChangeValue={(value) => {
                                            dispatch({
                                                type: 'SET_CASHIER_CHECKOUT', value: {
                                                    ...checkout,
                                                    total_dibayar: value,
                                                    uang_kembali: value - checkout?.total_pembayaran,
                                                }
                                            });

                                        }}
                                        prefix="Rp "
                                        delimiter="."
                                        separator=","
                                        precision={0}
                                        borderWidth={0.5}
                                        borderRadius={5}
                                        paddingHorizontal={5}
                                        borderColor={colors.silverLight}
                                        fontSize={11}
                                        style={[ms.fzBCLh(32, '700', '#222222', 38)]}
                                    />
                                </View>
                                <View style={[ms.pdH(13), ms.mgT(-10), ms.aiJc()]}>
                                    <Text style={[ms.fzBCLh(12, '400', '#9DA8B1', 20)]}>Uang kembalian akan dihitung secara otomatis</Text>
                                </View>
                                <Gap height={16} />
                            </View>
                        )
                    }
                    <Gap height={100} />
                </View>

            </ScrollView>
            <View style={[ms.height(80), ms.pdH(20)]}>
                <ButtonL
                    onPress={() => {
                        onSubmit()
                    }}
                    label='Buat Invoice'
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

export default CashierPembayaran

const styles = StyleSheet.create({

})