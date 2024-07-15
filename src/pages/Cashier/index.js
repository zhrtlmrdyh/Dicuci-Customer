import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import ms from '../../utils/ms'
import { colors, ProductSchema } from '../../utils';
import { ButtonL, Gap, NavigationTop, Number, Product } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { sum, windowWidth } from '../../utils/constants';
import { IconCar1, IconCar2, IconCart } from '../../assets/icon';

// import Realm from "realm";
import { useDispatch, useSelector } from 'react-redux';
import realm from '../../utils/realm';

const Cashier = ({ navigation }) => {
    const dispatch = useDispatch();
    const { checkout, productList } = useSelector((state) => state.cashierReducer);
    console.log('checkout', checkout);
    const [filter, setFilter] = useState({
        name: ""
    })
    const onAddCheckout = (product) => {
        const productCheckout = {
            qty: 1,
            Product: product,
            fk_product: product.id,
            nama_product: product.name,
            harga_jual: product.harga_jual,
            harga_jual_sub_total: product.harga_jual,
            harga_diskon_persentase: 0,
            harga_diskon: 0,
            harga_jual_total: product.harga_jual
        }
        let productCheckoutList = []
        if (!checkout?.ProductCheckout || checkout?.ProductCheckout?.length == 0) {
            // productCheckout.qty = 1
            productCheckoutList = [productCheckout];

        } else {
            const productFind = checkout?.ProductCheckout.find((pc) => {
                return pc.fk_product == product.id
            })
            if (productFind) {
                checkout?.ProductCheckout?.forEach((pc) => {
                    if (pc.fk_product == product.id) {
                        pc.qty++
                        pc.harga_jual_total = pc.qty * pc?.harga_jual
                    }
                })
                productCheckoutList = checkout?.ProductCheckout
            } else {
                productCheckoutList = [...checkout?.ProductCheckout, productCheckout];
            }

        }
        console.log('productCheckoutList', productCheckoutList)
        productCheckoutList.forEach((p, i) => {
            p.index = i
        })
        dispatch({
            type: 'SET_CASHIER_CHECKOUT', value: {
                ...checkout,
                ProductCheckout: productCheckoutList,
                total_pembayaran: sum(productCheckoutList, 'harga_jual_total')
            }
        });
    }
    const onBtnCheckout = (status = 'plus', product) => {
        let productCheckoutListNew;
        const productFind = checkout?.ProductCheckout?.find((pc) => {
            return pc.fk_product == product.id
        })
        if (productFind) {
            checkout?.ProductCheckout?.forEach((pc, index) => {
                pc.index = index
            })
            // const onDeleteCheckoutProduct = ()
            checkout?.ProductCheckout?.forEach((pc) => {

                if (pc.fk_product == product.id) {
                    console.log('else')
                    if (pc.qty > 0) {
                        if (status == 'plus') {
                            pc.qty++
                            return pc.harga_jual_total = pc.qty * pc?.harga_jual

                        } else {
                            if (pc.qty == 1) {
                                // pc.qty = 0//
                                // delete productcheckout   
                                return checkout?.ProductCheckout?.splice(pc?.index, 1)

                            } else {
                                pc.qty--
                                return pc.harga_jual_total = pc.qty * pc?.harga_jual

                            }
                        }
                    } else {
                        pc.qty = 0
                        return pc.harga_jual_total = pc.qty * pc?.harga_jual
                    }

                }
                // else{
                //     console.log('else')
                //     pc.qty = 0
                //     pc.harga_jual_total = 0
                // }
            })
            productCheckoutListNew = checkout?.ProductCheckout
            dispatch({
                type: 'SET_CASHIER_CHECKOUT', value: {
                    ...checkout,
                    ProductCheckout: productCheckoutListNew,
                    total_pembayaran: sum(productCheckoutListNew, 'harga_jual_total')

                }
            });
        } else {

        }
    }
    const onCheckSelected = (product) => {
        const productFindSelected = checkout?.ProductCheckout?.find((pc) => {
            return pc.fk_product == product.id
        })
        if (productFindSelected) {
            return true
        } else {
            return false
        }
    }
    const onCheckQty = (product) => {
        const productFindQty = checkout?.ProductCheckout?.find((pc) => {
            return pc.fk_product == product.id
        })
        if (productFindQty) {
            return productFindQty.qty
        } else {
            return 0
        }
    }
    const onFilter = async () => {
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
        //     schema: [TaskSchema],
        // });
        //#read record from database
        const productListRM = realm.objects("Product");
        // console.log('product', productListRM)
        // console.log(`The lists of tasks are => ${tasks.map((task) => { return task?.name + " " + task?._id + ",\n "})}`);
        const productListNew = []
        productListRM.map((p) => {
            console.log(p);
            productListNew.push(p)
        })
        const productListNewSort = productListNew?.sort(function (a, b) {
            return new Date(b.updated_at) - new Date(a.updated_at);
        })
        const productListNewFilter = productListNewSort?.filter(function (p) {
            return p.name.includes(filter?.name);
        })
        dispatch({
            type: 'SET_CASHIER_PRODUCT_LIST', value: productListNewFilter
        });
    }
    const init = async () => {
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

        // realm.write(() => {

        // const productNew = realm.create("Product", {
        //     ...product,
        //     id: 2,
        //     created_at : new Date(),
        //     updated_at : new Date()
        //   });
        //   console.log('productNew',productNew)

        // });

        //#read record from database
        const productListRM = realm.objects("Product");
        console.log('product', productListRM)
        // console.log(`The lists of tasks are => ${tasks.map((task) => { return task?.name + " " + task?._id + ",\n "})}`);
        const productListNew = []
        productListRM.map((p) => {
            console.log(p);
            productListNew.push(p)
        })
        const productListNewSort = productListNew?.sort(function (a, b) {
            return new Date(b.updated_at) - new Date(a.updated_at);
        })
        dispatch({
            type: 'SET_CASHIER_PRODUCT_LIST', value: productListNewSort
        });
    }
    useEffect(() => {
        if(navigation?.isFocused()){
            init()
        }
        
    }, [navigation])
   
    return (
        <View style={[ms.containerPage]}>
            <NavigationTop
                onPressStart={() => {
                    dispatch({
                        type: 'SET_CASHIER_CHECKOUT', value: {
                            total_pembayaran: 0,
                        }
                    });
                    navigation.goBack()
                }}
                title="Cashier Mode"
                titleFontSize={24}
                titleFontWeight="700"
                titleLineHeight={29}
                onPressEnd={() => {
                    dispatch({
                        type: 'SET_CASHIER_PRODUCT', value: {
                            harga_beli: 0,
                            is_stock: true,
                            stock_jumlah: 0,
                            stock_minimum: 0,
                        }
                    });
                    navigation.navigate('CashierForm');
                }}
            />
            <View style={[ms.pdH(10)]}>
                <View style={[ms.pdV(10)]}>
                    <TextInput
                        placeholder='Cari Barang Saya'
                        value={filter?.name}
                        onChangeText={(value) => {
                            setFilter({
                                ...filter,
                                name: value
                            })
                        }}
                        onSubmitEditing={() => {
                            onFilter()
                        }}
                        style={[ms.pdL(40), ms.height(40), ms.bdW(0.5), ms.bdC(colors.silverLight), ms.bdR(20), ms.fzBCLh(12, '400', '#9DA8B1', 14)]} />
                    <View style={[ms.wh(45, 40), ms.post(), ms.l(0), ms.t(10), ms.aiJc()]}>
                        <Icon name="search" size={16} color={'#9DA8B1'} />
                    </View>
                </View>
            </View>
            <ScrollView style={[ms.height('100%')]}>
                <View style={[ms.pd(5), ms.height('100%')]}>
                    {
                        productList.map((product, index) => {
                            return (
                                <Product
                                    product={product}
                                    key={index}
                                    onPress={() => {
                                        onAddCheckout(product)
                                    }}
                                    onPressMinus={() => {
                                        onBtnCheckout('minus', product)
                                    }}
                                    onPressPlus={() => {
                                        onBtnCheckout('plus', product)
                                    }}
                                    isSelected={onCheckSelected(product)}
                                    qtyCheckout={onCheckQty(product)}
                                />
                            )
                        })
                    }

                </View>
            </ScrollView>
            {
                checkout?.ProductCheckout?.length > 0 && (
                    <View >
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('CashierDetailPesanan')
                        }} style={[ms.row, ms.pdH(20)]}>
                            <View style={[ms.width('100%'), ms.row, ms.ai()]}>
                                <View style={[ms.row, ms.width('75%'), ms.ai()]}>
                                    <Image source={IconCart} style={[ms.wh(30, 30)]} />
                                    <Text style={[ms.fzBCLh(12, '400', colors.dark, 14)]}> {checkout?.ProductCheckout?.length} Paket dalam Keranjang</Text>
                                </View>
                                <View>
                                    <Text style={[ms.fzBCLh(12, '400', colors.silver, 14)]}>lihat detail  <Icon name="angle-right" size={12} color={colors.silver} /></Text>
                                </View>
                            </View>

                        </TouchableOpacity>
                        <View style={[ms.row, ms.pdB(10)]}>
                            <View style={[ms.width('47%')]}>
                                <View style={[ms.pdH(15)]}>
                                    <View style={[ms.pdV(5)]}>
                                        <Text style={[ms.fzBCLh(12, '200', colors.dark, 14)]}>Total Bayar</Text>
                                    </View>
                                    <View>
                                        <Text style={[ms.fzBCLh(12, '700', colors.dark, 14)]}><Number number={checkout?.total_pembayaran} />,-</Text>
                                    </View>
                                </View>

                            </View>
                            <Gap width="4%" />
                            <View style={[ms.width('47%')]}>
                                <ButtonL
                                    label="Bayar"
                                    onPress={() => {
                                        navigation.navigate('CashierPembayaran')
                                    }}
                                    color={colors.white}
                                    fontSize={14}
                                    height={40}
                                    borderRadius={12}
                                    width={windowWidth * 45 / 100}
                                    backgroundColor={colors.primary}
                                />
                            </View>

                        </View>
                    </View>
                )
            }


        </View>
    )
}

export default Cashier

const styles = StyleSheet.create({

})