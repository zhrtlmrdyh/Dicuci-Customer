import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, Switch } from 'react-native'
import React, { useState } from 'react'
import ms from '../../utils/ms'
import { colors, ProductSchema, showToast, showToasty } from '../../utils';
import { ButtonL, Gap, InputLabel, NavigationTop, Product } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { windowWidth } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import Realm from "realm";
import realm from '../../utils/realm';

const CashierForm = ({ navigation }) => {
    const dispatch = useDispatch();
    const { product, productList } = useSelector((state) => state.cashierReducer);
    const onSave = async () => {
        if (!product?.name) {
            return showToast('Nama product harus diisi', 'warning')
        } else if (!product?.harga_jual) {
            return showToast('Harga jual harus diisi', 'warning')
        }
        //     {
        //         id:1,
        //         image: IconCar1,
        //         name: 'Cuci Mobil City Car [MANUAL]',
        //         harga_jual: 25000,
        //         harga_beli: 25000,
        //         is_stock : true,
        //         stock_jumlah: 20,
        //         stock_minimum: 2,

        //     },
        // const TaskSchema = {
        //     name: "Product",
        //     properties: {
        //         id: "int",
        //         name: "string",
        //         harga_jual: "int",
        //         harga_beli: "int",
        //         is_stock: "bool",
        //         stock_jumlah: "int",
        //         stock_minimum: "int",
        //         created_at: "date",
        //         updated_at: "date",

        //         // status: "string?",
        //     },
        //     primaryKey: "id",
        // };
        // (async () => {
            // const realm = await Realm.open({
            //     path: "cashier",
            //     schema: [ProductSchema],
            // });

            realm.write(() => {
                const productListRMNew  = []
                const productListRM = realm.objects("Product");
                // console.log('product', productListRM)
                productListRM.map((p)=>{
                    productListRMNew.push(p)
                })
            // try{
                const productNew = realm.create("Product", {
                    ...product,
                    id: productListRMNew?.length + 1,
                    is_stock : product.is_stock ? product.is_stock : false,
                    created_at : new Date(),
                    updated_at : new Date()
                  });
                  console.log('productNew',productNew);
                  const productListRMNext = realm.objects("Product");
                  console.log('product', productListRMNext)
                  // console.log(`The lists of tasks are => ${tasks.map((task) => { return task?.name + " " + task?._id + ",\n "})}`);
                  const productListNew = []
                  productListRMNext.map((p) => {
                      console.log(p);
                      productListNew.push(p)
                  })
                  const productListNewSort = productListNew?.sort(function(a,b){
                       return new Date(b.updated_at) - new Date(a.updated_at);
                    })
                   dispatch({
                      type: 'SET_CASHIER_PRODUCT_LIST', value: productListNewSort
                  });
                    navigation.goBack();
                
            // }catch(err){
            //     console.log('err',err)
            //     showToast('Terjadi kesalahan, hubungi admin')
            // }
        });

            //#read record from database
            
            // console.log(`The lists of tasks are => ${tasks.map((task) => { return task?.name + " " + task?._id + ",\n "})}`);
            // productListRM.map((p) => {
            //     console.log(p)
            // })
            // // read one record from database
            // const myTask = realm.objectForPrimaryKey("Task", 1)
            // //   console.log(`created 1 tasks: ${myTask?.name} & ${myTask?.name}`);
            // //#modife one data from database
            // realm.write(() => {
            //     let myTask = realm.objectForPrimaryKey("Task", 1)
            //     console.log(`created 1 tasks: ${myTask?.name} & ${myTask?.name} & ${myTask?.status}`);
            //     myTask.status = "Open"

            // })

            // //#delete one data from database
            // try {
            //     realm.write(() => {
            //         let myTask = realm.objectForPrimaryKey("Task", 2);
            //         console.log('mytask', myTask)
            //         if (myTask) {
            //             console.log(`deleted 1 tasks: ${myTask?.name} & ${myTask?.name} & ${myTask?.status}`);
            //             realm.delete(myTask)
            //         }


            //     })
            // } catch (err) {
            //     console.log('err', err)
            // }

        // })();
        // const productNew = {
        //     ...product,
        //     id: productList.length + 1
        // }
        // dispatch({
        //     type: 'SET_CASHIER_PRODUCT_LIST', value: [
        //         ...productList,
        //         productNew,
        //     ]
        // });
    }
    return (
        <View style={[ms.containerPage]}>
            <NavigationTop
                onPressStart={() => {
                    navigation.goBack()
                }}
                title="Tambah product"
                titleFontSize={16}
                titleFontWeight="600"
                titleLineHeight={19}
            />
            <ScrollView>
                <View style={[ms.pdH(20)]}>
                    <InputLabel
                        label="Isi nama paket"
                        required
                        placeholder="Nama paket"
                        value={product?.name}
                        onChangeText={(value) => {
                            dispatch({
                                type: 'SET_CASHIER_PRODUCT', value: {
                                    ...product,
                                    name: value,
                                }
                            });
                        }}
                    />
                    <View style={[ms.row]}>
                        <View style={[ms.width('47%')]}>
                            <InputLabel
                                label="Harga Jual"
                                required
                                isCurrency
                                placeholder="Rp."
                                keyboardType='numeric'
                                value={product?.harga_jual ? String(product?.harga_jual) : "0"}
                                onChangeText={(value) => {
                                    dispatch({
                                        type: 'SET_CASHIER_PRODUCT', value: {
                                            ...product,
                                            harga_jual: Number(value),
                                        }
                                    });
                                }}
                            />
                        </View>
                        <Gap width={'4%'} />
                        <View style={[ms.width('47%')]}>
                            <InputLabel
                                label="Harga Modal"
                                isCurrency
                                placeholder="Rp."
                                keyboardType='numeric'
                                value={product?.harga_beli ? String(product?.harga_beli) : "0"}
                                onChangeText={(value) => {
                                    dispatch({
                                        type: 'SET_CASHIER_PRODUCT', value: {
                                            ...product,
                                            harga_beli: Number(value),
                                        }
                                    });
                                }}
                            />
                        </View>
                    </View>
                    <View>
                        <View style={[ms.row, ms.height(50), ms.aiJc()]}>
                            <View style={[ms.width('80%')]}>
                                <Text style={[ms.fzBCLh(14, '700', '#000000', 17)]}>Kelola Stock <Text style={[ms.fzBCLh(14, '700', colors.red, 17)]}>*</Text></Text>
                            </View>
                            <View style={[ms.width('20%')]}>
                                <Switch
                                    value={product?.is_stock}
                                    onValueChange={(value) => {
                                        dispatch({
                                            type: 'SET_CASHIER_PRODUCT', value: {
                                                ...product,
                                                is_stock: value,
                                            }
                                        });
                                    }}
                                />
                            </View>
                        </View>

                        <View style={[ms.row]}>
                            <View style={[ms.width('47%')]}>
                                <InputLabel
                                    placeholder="Jumlah Stok"
                                    keyboardType='numeric'
                                    value={product?.stock_jumlah ? String(product?.stock_jumlah) : "0"}
                                    onChangeText={(value) => {
                                        dispatch({
                                            type: 'SET_CASHIER_PRODUCT', value: {
                                                ...product,
                                                stock_jumlah: Number(value),
                                            }
                                        });
                                    }}
                                    editable={product?.is_stock ? true : false}
                                    backgroundColor={product?.is_stock ? colors?.white : colors?.silverLight}
                                />
                            </View>
                            <Gap width={'4%'} />
                            <View style={[ms.width('47%')]}>
                                <InputLabel
                                    placeholder="Stock Minimum"
                                    keyboardType='numeric'
                                    value={product?.stock_minimum ? String(product?.stock_minimum) :"0"}
                                    onChangeText={(value) => {
                                        dispatch({
                                            type: 'SET_CASHIER_PRODUCT', value: {
                                                ...product,
                                                stock_minimum: Number(value),
                                            }
                                        });
                                    }}
                                    editable={product?.is_stock ? true : false}
                                    backgroundColor={product?.is_stock ? colors?.white : colors?.silverLight}
                                    onSubmitEditing={() => {
                                        onSave()
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView>
            <View style={[ms.aiJc()]}>
                <ButtonL
                    label="Tambah"
                    color={colors.white}
                    fontSize={14}
                    height={45}
                    borderRadius={12}
                    width={windowWidth - 40}
                    backgroundColor={colors.primary}
                    onPress={() => {
                        onSave()
                    }}
                    
                />
            </View>
        </View>
    )
}

export default CashierForm

const styles = StyleSheet.create({

})