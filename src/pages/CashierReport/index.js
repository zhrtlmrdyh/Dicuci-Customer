import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, PermissionsAndroid, Platform } from 'react-native';

import React, { useEffect, useState } from 'react'
import ms from '../../utils/ms'
import { colors, InvoiceSchema, ProductCheckoutSchema, showMessage } from '../../utils';
import { ButtonL, Gap, NavigationTop, Number, Product } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { sum, windowWidth } from '../../utils/constants';
import { IconLineBottom } from '../../assets/icon';

import Realm from "realm";
import { useDispatch, useSelector } from 'react-redux';
// var RNFS = require('react-native-fs');
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import realm from '../../utils/realm';

const CashierReport = ({ navigation }) => {
    const dispatch = useDispatch();
    const { invoiceList } = useSelector((state) => state.cashierReducer);
    // console.log('invoiceList', invoiceList);
    const [filter, setFilter] = useState({
        name: "",
        sortType : "Desc",
        isDate: true,
        created_at: null
    })
    // const [date, setDate] = useState(filter?.created_at);
  //const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
//   const [showTime, setShowTime] = useState(false);
  // const idLocale = require('moment/locale/id'); 
  // moment.locale('id', idLocale);
//   const dateNow = new Date();
  const onChange = (event, selectedDate) => {
    setShow(false)
    const currentDate = selectedDate || filter?.created_at;
    const paramsNew = {
        ...filter,
        isDate: true,
        created_at : currentDate,
    }
    onFilter(paramsNew)
    
    // setShow(Platform?.OS === 'ios');
    // setDate(currentDate);
  };
  const showMode = (currentMode) => {

    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };
    const onFilter = async (paramNew) => {
        setFilter(paramNew)
        try{
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
        //     schema: [InvoiceSchema, ProductCheckoutSchema],
        //     deleteRealmIfMigrationNeeded: true,
        // });

        // realm.write(async () => {
            const invoiceListRMNew = []
            const invoiceListRM = realm.objects("Invoice");
            console.log('invoice', invoiceListRM)
            invoiceListRM.map((p) => {
                invoiceListRMNew.push(p)
            })
            let invoiceListRMFilter;
             console.log('invoiceListRMNew',invoiceListRMNew)
             if(filter.isDate){
                 invoiceListRMFilter = invoiceListRMNew?.filter(function (i) {
                    return moment(i?.created_at).format('DD-MM-YYYY') == moment(paramNew?.created_at).format('DD-MM-YYYY');
                })
             }else{
                 invoiceListRMFilter = invoiceListRMNew
             }
             console.log('invoiceListRMFilter',invoiceListRMFilter)
             console.log('paramNew',paramNew)
        if(paramNew?.sortType == 'Desc'){
            const invoiceListNewSort = invoiceListRMFilter?.sort(function (a, b) {
                return new Date(b.created_at) - new Date(a.created_at);
            })
            dispatch({
                type: 'SET_CASHIER_INVOICE_LIST', value: invoiceListNewSort
            });
        }else{
            const invoiceListNewSort = invoiceListRMFilter?.sort(function (a, b) {
                return new Date(a.created_at) - new Date(b.created_at);
            })
            dispatch({
                type: 'SET_CASHIER_INVOICE_LIST', value: invoiceListNewSort
            });
        }
        
       }catch(err){
        console.log('err',err)
       }
    }
    const exportDataToExcel = () => {

        // Created Sample data
        // let sample_data_to_export = [{id: '1', name: 'First User'},{ id: '2', name: 'Second User'}];

        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(invoiceList)
        XLSX.utils.book_append_sheet(wb, ws, "Users")
        const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });

        // Write generated excel to Storage
        RNFS.writeFile(RNFS.ExternalStorageDirectoryPath + '/cashier-invoice-report.xlsx', wbout, 'ascii').then((r) => {
            console.log('Success');
            showMessage('dicuci-invoice-report.xlsx , Berhasil diexport di store data anda', 'success')
        }).catch((e) => {
            showMessage('Gagal mengexport data', 'danger')

            console.log('Error', e);
        });

    }
    const handleClick = async () => {

        try {
            // Check for Permission (check if permission is already given or not)
            let isPermitedExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

            if (!isPermitedExternalStorage) {

                // Ask for permission
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: "Storage permission needed",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );


                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Permission Granted (calling our exportDataToExcel function)
                    exportDataToExcel();
                    console.log("Permission granted");
                } else {
                    // Permission denied
                    console.log("Permission denied");
                }
            } else {
                console.log('all ready')
                // Already have Permission (calling our exportDataToExcel function)
                exportDataToExcel();
            }
        } catch (e) {
            console.log('Error while checking permission');
            console.log(e);
            return
        }

    };
    const init = async () => {
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
        // // (async () => {
        // const realm = await Realm.open({
        //     path: "cashierInvoice",
        //     schema: [TaskSchema],
        //     deleteRealmIfMigrationNeeded: true,
        // });

        // realm.write(async () => {
            const invoiceListRMNew = []
            const invoiceListRM = realm.objects("Invoice");
            // console.log('invoice', invoiceListRM)
            invoiceListRM.map((p) => {
                invoiceListRMNew.push(p)
            })
             console.log('invoiceListRMNew',invoiceListRMNew)

        const invoiceListNewSort = invoiceListRMNew?.sort(function (a, b) {
            return new Date(b.created_at) - new Date(a.created_at);
        })
        dispatch({
            type: 'SET_CASHIER_INVOICE_LIST', value: invoiceListNewSort
        });
    }
    useEffect(() => {
        if(navigation.isFocused()){
            init()
        }
        return ()=>{
            init
        }
    }, [navigation])
    // const [invoiceList, setInvoiceList] = useState([
    //     {
    //         id: 1,
    //         image: IconCar1,
    //         code: 'INV-0001',
    //         total_pembayaran: 25000,
    //         total_qty: 2,
    //         is_stock: true,
    //         created_at: new Date(),
    //         MetodePembayaran: {
    //             id: 3,
    //             name: 'Cash'
    //         },
    //         fk_metode_pembayaran: 3,
    //         status: 'LUNAS'

    //     },
    // ])
    return (
        <View style={[ms.containerPage]}>
            <NavigationTop
                onPressStart={() => {
                    // dispatch({
                    //     type: 'SET_CASHIER_CHECKOUT', value: {
                    //         total_pembayaran: 0,
                    //     }
                    // });
                    navigation.goBack()
                }}
                title="Report"
                titleFontSize={24}
                titleFontWeight="700"
                titleLineHeight={29}
                // onPressEnd={() => {
                //     // dispatch({
                //     //     type: 'SET_CASHIER_PRODUCT', value: {
                //     //         harga_beli: 0,
                //     //         is_stock: true,
                //     //         stock_jumlah: 0,
                //     //         stock_minimum: 0,
                //     //     }
                //     // });
                //     navigation.replace('Cashier');
                // }}
            />
            <View style={[ms.pd(10)]}>
                <View style={[ms.pd(10), ms.bdW(1), ms.bdC(colors.silverLight), ms.bdR(5)]}>
                    
                     <TouchableOpacity onPress={()=>showDatepicker()}>
                          <View style={[ms.row]}>
                            <View style={[ms.width('85%')]}>
                              <Text style={[ms.fzBCLh(14,'400','#222222',17)]}><Icon
                                name="calendar-alt"
                                size={14}
                                color={colors.dark}
                              /> {filter?.created_at ? moment(filter?.created_at).format('DD/MM/YYYY') : 'Pilih tanggal'}</Text>
                            </View>
                            {
                                filter?.created_at && (
                                    <TouchableOpacity onPress={()=>{
                                        setFilter({
                                            ...filter,
                                            created_at : null
                                        })

                                        init()
                                    }} style={[ms.width('15%'), ms.aiJc()]}>
                              <Icon
                                name="window-close"
                                size={20}
                                color={colors.red}
                              />
                            </TouchableOpacity>
                                )
                            }
                            
                          </View>
                        </TouchableOpacity>
                    {show && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={filter?.created_at ? filter?.created_at : new Date()}
                          mode={mode}
                          is24Hour={false}
                          display="calendar"
                          onChange={onChange}
                        />
                      )}
                </View>
            </View>
            <ScrollView style={[ms.height('100%')]}>
                <View style={[ms.pd(5), ms.height('100%')]}>
                    {
                        invoiceList.map((invoice, index) => {
                            return (
                                <View key={index} style={[ms.pdH(10), ms.pdV(3)]}>
                                    <TouchableOpacity onPress={()=>{
                                        dispatch({
                                            type: 'SET_CASHIER_INVOICE', value: invoice
                                        });
                                        navigation.navigate('CashierNota')
                                    }} style={[ms.cardA()]}>
                                        <View style={[ms.row, ms.pdV(5)]}>
                                            <View style={[ms.width('20%')]}>
                                                <Text style={[ms.fzBCLh(12, '400', '#222222', 14)]}>Date : </Text>
                                            </View>
                                            <View style={[ms.width('50%')]}>
                                                <Text style={[ms.fzBCLh(12, '400', '#222222', 14)]}>{moment(invoice?.created_at).format('DD MMMM YYYY , HH:mm:ss')}  </Text>
                                            </View>
                                            <View style={[ms.width('30%')]}>
                                                <Text style={[ms.fzBCLh(12, '400', '#222222', 14), ms.txA('right')]}>Baju </Text>
                                            </View>
                                        </View>
                                        <View style={[ms.row, ms.pdV(5)]}>
                                            <View style={[ms.width('20%')]}>
                                                <Text style={[ms.fzBCLh(12, '400', '#222222', 14)]}>Invoice : </Text>
                                            </View>
                                            <View style={[ms.width('50%')]}>
                                                <Text style={[ms.fzBCLh(12, '400', '#222222', 14)]}>{invoice?.code}</Text>
                                            </View>
                                            <View style={[ms.width('30%')]}>
                                                <Text style={[ms.fzBCLh(12, '400', '#222222', 14), ms.txA('right')]}>Lunas </Text>
                                            </View>
                                        </View>
                                        <View style={[ms.pdV(10), ms.width('100%')]}>
                                            <Image source={IconLineBottom} style={[ms.wh('100%', 1)]} />
                                        </View>
                                        <View style={[ms.row, ms.pdV(5)]}>
                                            <View style={[ms.width('50%')]}>
                                                <Text style={[ms.fzBCLh(12, '400', '#222222', 14)]}>Jumlah <Text style={[ms.fzBCLh(12, '400', '#FFAA00', 14)]}>{invoice?.total_qty}</Text> item </Text>
                                            </View>
                                            <View style={[ms.width('50%')]}>
                                                <Text style={[ms.fzBCLh(12, '400', '#222222', 14), ms.txA('right')]}>Total Bayar: <Number number={invoice?.total_pembayaran} style={[ms.fzBCLh(14, '700', '#222222', 17)]}/> </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }

                </View>
            </ScrollView>

            <View >
                <View style={[ms.aiJc()]}>
                    <View style={[ms.wh('70%', 80)]}>
                        <View style={[ms.row, ms.width('100%')]}>
                            <View style={[ms.width('50%')]}>
                                <ButtonL
                                    label="Urutkan"
                                    onPress={() => {
                                        // showDatepicker()
                                        const paramSort = {
                                            ...filter,
                                            isDate : false,
                                            sortType : filter?.sortType == 'Desc' ? 'Asc' : 'Desc'
                                        }
                                        onFilter(paramSort)
                                    }}
                                    iconStartFAName='sort'
                                    iconStartFAColor={colors.white}
                                    color={colors.white}
                                    fontSize={14}
                                    fontWeight='600'

                                    // width={windowWidth * 30 / 100}
                                    backgroundColor={colors.primary}
                                    style={[ms.wh('100%', 40), ms.bdRTLR(8), ms.bdRBLR(8), ms.bc('#41A3F0'), ms.aiJc(), ms.bdC(colors.silverLight)]}
                                />

                            </View>
                            <View style={[ms.wh('50%', 40)]}>
                                <ButtonL
                                    label="Export"
                                    onPress={() => {
                                        handleClick()
                                    }}
                                    iconStartFAName='download'
                                    iconStartFAColor={colors.silver}
                                    color={colors.silver}
                                    fontSize={14}
                                    fontWeight='600'
                                    borderWidth={1}
                                    // width={'100%'}
                                    backgroundColor={colors.primary}
                                    style={[ms.wh('100%', 40), ms.pd(0), ms.mg(0), ms.bdRTRR(8), ms.bdRBRR(8), ms.bc(colors.white), ms.aiJc(), ms.bdC(colors.silver), ms.bdW(0.5)]}
                                />

                            </View>
                        </View>
                    </View>



                </View>
            </View>

        </View>
    )
}

export default CashierReport

const styles = StyleSheet.create({

})