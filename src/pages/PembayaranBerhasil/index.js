import React, {useState} from "react";
import { Image, SafeAreaView, ScrollView, Text, View, TouchableOpacity } from "react-native";
import ms from "../../utils/ms";
import { IconCheckGif } from "../../assets/icon";
import { windowHeight, windowWidth } from "../../utils/constants";
import { ButtonL, PaketDibayar } from "../../components";
import { colors } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import Number from "../../components/molecules/Number";
import moment from 'moment';
import { UpdateMyOrder } from "../../redux/action/myorders";
import { PrintService } from "../PembayaranBerhasil"

const PembayaranBerhasil = ({navigation, onPress}) => {
    const {myorder, myorders} = useSelector(state => state.myorderReeducer);
    const dispatch = useDispatch();
    console.log('orders', myorders);

    const handlePrint = () => {
        // Mengambil data dari tampilan
        const dataToPrint = { ...myorder };
        PrintService.printData(dataToPrint);
      };
      

    return (
        <SafeAreaView style={[ms.containerPage]}>
            <ScrollView>
                <View style={[ ms.height('100%')]}>
                    <View style={[ms.height('88%')]}>
                        <View style={[ms.width(windowWidth)]}>
                            <View style={[ms.aiJc()]}>
                                <View style={[ms.pdT(64)]}>
                                    <Image source={IconCheckGif} style={[ms.wh(100, 100)]}/>
                                </View>
                                <View style={[ms.mgT(23)]}>
                                    <Text style={[ms.fzBC(16, '700', '#222222')]}>PEMBAYARAN BERHASIL</Text>
                                </View>
                            </View>
                        </View>

                        <View style={[ms.width(windowWidth), ms.pdH(18), ms.pdT(48), ms.pdB(50)]}>
                            <View 
                            style= {[ms.cardPB, ms.height('auto')]}
                            >
                                <View style={[ms.row, ms.pdH(16), ms.pdT(16)]}>
                                    <View style={[ms.width('50%')]}>
                                        <Text style={[ms.fzBC(12, '400', '#222222')]}>Dibayar oleh</Text>
                                    </View>
                                    <View style={[ms.width('50%')]}>
                                        <Text style={[ms.fzBC(12, '700', '#222222'), ms.txA('right')]}>{myorder?.Customer?.name}</Text>
                                    </View>
                                </View>

                                <View style={[ms.row, ms.pdH(16)]}>
                                    <View style={[ms.width('50%')]}>
                                        <Text style={[ms.fzBC(12, '400', '#222222')]}>Tanggal Pembayaran</Text>
                                    </View>
                                    <View style={[ms.width('50%')]}>
                                        <Text style={[ms.fzBC(12, '700', '#222222'), ms.txA('right')]}>{moment(myorder?.tgl_bayar).format("DD MMMM YYYY")}</Text> 
                                    </View>
                                </View>

                                <View style={[ms.row, ms.pdH(16), ms.pdB(16)]}>
                                    <View style={[ms.width('50%')]}>
                                        <Text style={[ms.fzBC(12, '400', '#222222')]}>Metode Pembayaran</Text>
                                    </View>
                                    <View style={[ms.width('50%')]}>
                                        <Text style={[ms.fzBC(12, '700', '#222222'), ms.txA('right')]}>{myorder?.metode_bayar}</Text>
                                    </View>
                                </View>

                                <View style={{backgroundColor: '#F5F5F5', width: '100%', height:1}}></View>

                                <View>
                                    {myorder.list_paket.map((pk, index) => {
                                        return (
                                            <PaketDibayar
                                            key={index}
                                            myorder={pk}
                                            />        
                                        )
                                    })}
                                </View>

                                <View style={[ms.row, ms.pdT(55), ms.pdH(16)]}>
                                    <View style={[ms.width('50%')]}>
                                        <Text style={[ms.fzBC(12, '400', '#222222')]}>Ongkos Kirim</Text>
                                    </View>
                                    <View style={[ms.width('50%')]}>
                                        <Text style={[ms.fzBC(12, '700', '#222222'), ms.txA('right')]}><Number number={myorder?.ongkos_kirim} />,-</Text>
                                    </View>
                                </View>

                                <View style={[ms.row, ms.pdH(16), ms.pdB(16)]}>
                                    <View style={[ms.width('50%')]}>
                                        <Text style={[ms.fzBC(12, '400', '#222222')]}>Discount Voucher</Text>
                                    </View>
                                    <View style={[ms.width('50%')]}>
                                        <Text style={[ms.fzBC(12, '700', '#222222'), ms.txA('right')]}>-<Number number={myorder?.discount_voucher} />,-</Text>
                                    </View>
                                </View>

                                <View style={{backgroundColor: '#F5F5F5', width: '100%', height:1}}></View>

                                <View style={[ms.row, ms.pdH(16), ms.pdT(16), ms.pdB(16)]}>
                                    <View style={[ms.width('50%')]}>
                                        <Text style={[ms.fzBC(12, '700', '#222222')]}>Total Bayar</Text>
                                    </View>
                                    <View style={[ms.width('50%')]}>
                                        <Text style={[ms.fzBC(12, '700', '#222222'), ms.txA('right')]}><Number number={myorder?.total_biaya} />,-</Text>
                                    </View>
                                </View>
                               
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>


            <TouchableOpacity onPress={handlePrint}>
                <View style={[ms.width('100%'), ms.pdV(17), ms.aiJc()]}>
                    <ButtonL
                    onPress={() => {
                        navigation.navigate("Diorder");
                    }}
                    width={307}
                    height={44}
                    label="Selesai"
                    fontSize={14}
                    color={colors.white}
                    borderColor={colors.primary}
                    borderWidth={2}
                    backgroundColor={colors.primary}
                    borderRadius={8}
                    />
                </View>
            </TouchableOpacity>


            <View style={{width:windowWidth, height:'12%', borderTopLeftRadius:42,borderTopRightRadius:42,}}>
            
                <View 
                style= {{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    backgroundColor:'white',
                    borderTopLeftRadius:42,
                    borderTopRightRadius:42,
                    shadowColor: "black",
                    shadowOffset: {
                    width: -10,
                    height: 9,
                    },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation:5}}
                >
                    <View style={[ms.width('100%'), ms.pdV(17), ms.aiJc()]}>
                        <ButtonL
                        onPress={() => {
                            navigation.navigate("Diorder")
                        }} 
                            width={307} 
                            height={44} 
                            label="Selesai" 
                            fontSize={14} 
                            color={colors.white} 
                            borderColor={colors.primary} 
                            borderWidth={2} 
                            backgroundColor={colors.primary} 
                            borderRadius={8}/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PembayaranBerhasil;