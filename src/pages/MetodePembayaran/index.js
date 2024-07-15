import React, { useState } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { windowHeight, windowWidth } from "../../utils/constants";
import ms from "../../utils/ms";
import { IconBack, IconQRIS, IconBank, IconCash } from "../../assets/icon";
import { colors } from "../../utils";
import { ButtonL, Gap } from "../../components";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from 'react-redux';
import Number from "../../components/molecules/Number";
import { UpdateMyOrder } from "../../redux/action/myorders";

const MetodePembayaran = ({navigation, onPress}) => {
    const {myorder, myorders} = useSelector(state => state.myorderReeducer);
    const dispatch = useDispatch();
    console.log('metode', myorder?.metode_bayar)
    const [metode, setMetode] = useState ([
        // {_id: "630ee52fa03bdd3c4d8079fb", pembayaran:'QRIZ', image: IconQRIS },
        // {_id: "630ee552a03bdd3c4d8079fc", pembayaran:'Trasfer Bank', image: IconBank },
        {_id: "630ee565a03bdd3c4d8079fd", pembayaran:'Cash/Tunai', image: IconCash },
    ])

    const [metodeIndex, setMetodeIndex] = useState(0);

    const handleClick = (value) => {
        setMetodeIndex(value)
        console.log('pembayaran', value)
      }
    
      const [param, setParam] = useState({
        page: 0,
        limit: 10,
    });

    const onSave = async (id) => {
        // alert(1)
        console.log("id:", id) 
        // alert(1)
        const formData = (
            {
                fk_status: "62e764d599b8110730e94462",
                fk_metode_pembayaran: myorder?.fk_metode_pembayaran,
                tgl_bayar: new Date(),
            }
        )

        const onSuccess = async (res) => {
            showMessage('Berhasil update paket', 'success')
        }
        const onError = (err) => {
            // navigation.goBack()
        }

        console.log("form data", formData)

        await dispatch(UpdateMyOrder(id, formData, myorders, onSuccess, onError))

        navigation.navigate("PembayaranBerhasil")
    }
    
    return (
        <SafeAreaView style={[ms.containerPage]}>
            <View style={[ms.height('88%')]}>
            <View style={[ms.row, ms.pdV(16), ms.pdH(18), ms.width(windowWidth)]}>
                <View style={[ms.aiJc]}>
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <Image
                        source={IconBack}
                        style={[ms.wh(35,35)]}
                        />
                    </TouchableOpacity>
                </View>
                <View style={[ms.mg(5), ms.mgL(16)]}>
                    <View style={[ms.aiJc]}>
                        <Text style={[ms.fzBC(16, '600', colors.dark)]}>Pembayaran</Text>
                    </View>
                </View>
            </View>
            <View>
                <Gap height={4} backgroundColor={colors.bgColor} />
            </View>

            <ScrollView>
                <View  style={[ms.width(windowWidth)]}>
                    <Text style={[ms.fzBC(14, '700', colors.dark), ms.pd(16)]}>Pilih Metode Pembayaran</Text>

                    {metode.map((metode, index) => (
                    <TouchableOpacity key={index} 
                        onPress={() => {
                            handleClick(metode?.pembayaran)
                            dispatch({type: 'SET_ORDER', value: {
                                ...myorder,
                                metode_bayar: metode?.pembayaran,
                                fk_metode_pembayaran: metode?._id
                                }
                            });
                            console.log('metode',metode?.pembayaran)
                            }}>
                        <View style={[ms.wh(windowWidth, 66), ms.pdH(18)]}>
                                <View style={[
                                    metode?.pembayaran === metodeIndex ? styles.cardP2 : styles.cardP,
                                    ]}>
                                    <View style={[ms.row, ms.ai()]}>
                                        <View style={[ms.row, ms.ai(), ms.width('80%'), ms.pdL(16), ms.pdV(20)]}>
                                            <Text style={ms.fzBC(16, '600', colors.dark)}>{metode?.pembayaran}</Text>
                                        </View>
                                        <View style={{ width: '20%', alignItems: 'center', justifyContent:'center'}}>
                                            <Image source={metode?.image} style={{width: 48, height: 48}}/>
                                        </View>
                                    </View>
                                </View> 
                        </View>
                    </TouchableOpacity>
                    ))}

                </View>
            </ScrollView>

            </View>
            <View style={[ms.wh(windowWidth, '12%'), ms.aiJc()]}>
                <View>
                    <View style={{backgroundColor: '#F5F5F5', width: windowWidth, height:8}}></View>
                </View>
                <View style={[ms.row, ms.pdH(18), ms.pdV(16)]}>
                    <View style={[ms.width('60%'), ms.jc()]}>
                        <Text style={[ms.fzBCLh(12, '400', '#000000', 12), ms.mgB(8)]}>
                        Total Bayar
                        </Text>
                        <Text
                        style={[
                            ms.fzBCLh(16, '700', colors.dark, 20),
                        ]}>
                        <Number number={myorder?.total_biaya} />,-
                        </Text>
                    </View>
                    <View style={[ms.width('40%'), ms.aiJc()]}>
                        <ButtonL 
                        myorder={myorder}
                        onPress={() => {
                            dispatch({type: 'SET_ORDER', value: {
                                ...myorder,
                                tgl_bayar: new Date()
                                }
                            });
                            onSave(myorder?._id)
                            }} 
                            width={153} 
                            height={44} 
                            label="Bayar" 
                            fontSize={14}
                            color={colors.white} 
                            borderColor={colors.primary} 
                            backgroundColor={colors.primary} 
                            borderRadius={8}
                        />
                    </View>
                </View>
            </View>
            
        </SafeAreaView>
    )
}

export default MetodePembayaran;

const styles = StyleSheet.create({
    cardP: {
        height: 60, 
        borderColor:'#E7E7E7', 
        borderWidth: 1, 
        borderRadius: 8, 
    },
    cardP2 : {
        height: 60, 
        borderColor: '#41A3F0', 
        borderWidth: 1, 
        borderRadius: 8, 
        backgroundColor: 'rgba(65, 163, 240, 0.1)',
    }
});