import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, SafeAreaView } from 'react-native'
import React, { useState, useRef } from 'react'
import RBSheet from 'react-native-raw-bottom-sheet';
import ms from '../../utils/ms'
import { useDispatch, useSelector } from 'react-redux';
import { IconBack, IconBaju, IconDress, IconSepatu, IconVerifikasi, IconDicuci} from '../../assets/icon';
import { colors } from '../../utils';
import { Gap, PaketDipilih } from '../../components';
import next from '../../assets/icon/next.png'
import { windowWidth } from '../../utils/constants';
import { windowHeight } from '../../utils/constants';
import { ButtonL } from '../../components';
import IconX from '../../assets/icon/x.png'
import diskon from '../../assets/icon/discount.png'
import gojek from '../../assets/icon/gojek.png'
import dicuci2 from '../../assets/icon/dicuci2.png'
import { getData } from '../../utils';
import { showMessage } from '../../utils';
import { PostOrder } from '../../redux/action/paket';
import { sum } from '../../utils/constants';
import { deleteLaundryBag, getLaundryBagList, UpdateLaundryBag } from '../../redux/action/laundry';

const KonfirmasiPesanan = ({navigation, onPress}) => {
    const { paket } = useSelector((state) => state.homeReducer);
    const { user } = useSelector((state) => state.userReducer);
    const { checkoutList, checkoutPaket, mitradicuci, laundryBagList } = useSelector((state) => state.laundryBagReducer);
    console.log('konfirmasi paket', checkoutList)
    console.log('paket', checkoutPaket)
    console.log('user', user)
    console.log('mitra', mitradicuci)
    const dispatch = useDispatch();
    const refSheet = useRef();
    const [metode, setmetode] = useState({
        id: 1,
        name : 'Diantar - Jemput Sendiri',
        _id: "62e76ce099b8110730e9446a",
        ongkos: 0,
    });
    
    const sendiri = () => {
        setmetode({
            id: 1,
            name : 'Diantar - Jemput Sendiri',
            _id: "62e76ce099b8110730e9446a",
            ongkos: 0,
        });
    }

    // const driver = () => {
    //     setmetode({
    //         id: 2,
    //         name : 'Diantar - Jemput Driver',
    //         _id: "62e76ccc99b8110730e94469",
    //         ongkos: 7000,
    //     })
    // }


    const mitra = () => {
        setmetode({
            id: 3,
            name : 'Diantar - Jemput Driver Mitra',
            _id: "62e76cb599b8110730e94468",
            ongkos: 7000,
        })
    }

    const deleteLaundry = async (id) => {

        const param = {
          page: 0,
          limit: 10,
        };
        
        const deleteList = laundryBagList.find((lb)=>{
          return lb.fk_mitra == id 
        })
        
        const data = deleteList?.list_paket
        const cek = []
        console.log('list', deleteList)
        

        if(deleteList) {
            deleteList?.list_paket?.forEach((lp) =>{
                
                checkoutList?.forEach((ck) => {
                    console.log('cek2', lp?._id)
                    console.log('cek2', ck?._id)
                    
                    if(lp?._id == ck?._id && lp?.parfum == ck?.parfum) {
                        cek.push(lp)
                        // console.log('cekList',cekList)
                        console.log('lp',lp)
                    }  
                })
            })

            console.log('length', cek?.length)
            console.log('length2', deleteList?.list_paket?.length)
            if(deleteList?.list_paket?.length == cek?.length) {
                const onSuccess = async res => {
                    showMessage('Paket telah di hapus');
                };
                
                const onError = async err => {
                // navigation.goBack()
                };
            
                await dispatch(deleteLaundryBag(deleteList?._id, laundryBagList, onSuccess, onError));
                await dispatch(getLaundryBagList(param, laundryBagList, onSuccess, onError));

            } else {
                data.splice(cek, cek?.length)

                const formData = {
                    ...deleteList,
                    list_paket : data
                  }
            
                  console.log("form delete laundry", formData)
                  console.log("id", laundryMitra?._id)
                  await dispatch(UpdateLaundryBag(deleteList?._id, formData, laundryBagList))
                  await dispatch(getLaundryBagList(param, laundryBagList));
            }
            
            console.log('cek', cek)
            console.log('data', data)
        }

        
        
      };

    const onSave = async () => {
        getData('authUser').then((resAuthUser)=>{
            if(resAuthUser?._id){
                console.log('id', resAuthUser?._id)
                if (resAuthUser?._id == paket?.fk_mitra) {
                    return showMessage('Tidak boleh sama', 'danger')
                }

                const biaya = ({
                    total_berat: 0,
                    sub_total: sum(checkoutList, 'biaya_satuan'),
                    ongkos_kirim: metode?.ongkos,
                    diskon: 0,
                    // total: sum(checkoutList, 'total_biaya_satuan')
                })

                // const addDays = (date, days) => {
                //     const copy = new Date(Number(date))
                //     copy.setDate(date.getDate() + )
                //     return copy
                //   }
                  
                //   console.log('days', addDays)

                const formData = (
                    {
                        fk_customer: resAuthUser?._id,
                        fk_mitra: mitradicuci?._id,
                        fk_status: "62e764b899b8110730e94461",
                        tgl_pesanan: new Date(),
                        tgl_pesanan_akhir: new Date(),
                        fk_metode_pengiriman: metode?._id,
                        alamat: user[0]?.alamat_lengkap,
                        ...biaya,
                        total_biaya: biaya?.sub_total + biaya?.ongkos_kirim + biaya?.diskon,
                        list_paket: checkoutList,
                        tracking_status: [],
                        created_at: new Date(),
                        updated_at: new Date(),
                    }  
                )
        
                const onSuccess = async (res) => {
                    showMessage('Berhasil update paket', 'success')
                }   
                const onError = (err) => {
                }
        
                console.log("form data", formData)
        
                dispatch(PostOrder(formData))
                
                navigation.navigate("PaketDipesan")  
            }
        })
    }

  return (
    <SafeAreaView style={[ms.containerPage]}>
        <View style={[ms.wh(windowWidth, '80%'), ms.aiJc()]}>
            
            <View style={[ms.row, ms.pdV(14), ms.width(windowWidth)]}>
                <View style={[ms.aiJc]}>
                    <TouchableOpacity 
                        onPress={() => {navigation.goBack()}} 
                        style={[ms.post(), ms.pdH(16)]}>
                        <Image 
                        source={IconBack} 
                        style={[ms.wh(35,35)]}
                        />
                    </TouchableOpacity>
                </View>

                <View style={[ms.l(60), ms.t(5)]}>
                    <View style={[ms.aiJc]}>
                        <Text style={[ms.fzBC(16, '600', colors.dark)]}>Konfirmasi Pesanan</Text>
                    </View>
                </View>
            </View>

            <View style={[ms.t(5)]}>
                <Gap height={4} backgroundColor={colors.dark} />
            </View>

            <ScrollView >
                <View style={[ms.wh(windowWidth, 48), ms.pd(16)]}>
                    <Text style={[ms.fzBCLh(14, '700', '#222222', 17)]}>Paket yang dipilih</Text>
                </View>

                <View style={[ms.row, ms.wh(windowWidth, 35)]}>
                    <View style={[ms.width('10%'), ms.l(16), ms.t(5)]}>
                        <Image 
                        source={IconVerifikasi}
                        style={[ms.wh(11,15.51)]}/>
                    </View>
                    <View style={[ms.width('80%')]}>
                        <Text 
                            style={[ms.fzBC(14, '700', '#222222')]}>{mitradicuci?.name},  
                            <Text 
                                style={[ms.fzBC(12, '400', '#222222')]}> {mitradicuci?.alamat_lengkap}
                            </Text>
                        </Text>
                    </View>
                </View>

                {checkoutList.map((ck, index)=> {
                    return (
                        <PaketDipilih 
                            key={index}
                            paket={ck}
                            onPress={()=>{
                                dispatch({type: 'SET_PAKET', value: paket});
                                navigation.goBack()
                                navigation.navigate("DetailPaket")
                            }}
                        />
                    )
                })}

                <Gap height={4} backgroundColor={colors.bgColor} />

                <View style={[ms.wh(windowWidth, 40), ms.pd(16), ms.pdB(5)]}>
                    <Text style={[ms.fzBCLh(14, '700', '#222222', 17)]}>Metode Pengiriman</Text>
                </View>

                <View style={[ms.wh(windowWidth, 300)]}>
                {
                    metode?.id != 2 && (
                        <View style={[ms.wh(windowWidth, '38%'), ms.pdH(16)]}>
                            <View style={styles.CardMp1}>

                                <TouchableOpacity onPress={onPress} >
                                    <View style={[ms.row]}>

                                        <View style={[ms.width('80%'), ms.height('100%'), ms.pd(10)]}>
                                            <View style={[ms.row, ms.t(4)]}>
                                                <View style={styles.alamat}>
                                                    <Text style={[
                                                        ms.fzBC(10, '400', '#222222'), 
                                                        ms.txA('center')]}
                                                    >Utama</Text>
                                                </View>

                                                <Text style={[
                                                    ms.fzBC(12, '400', colors.dark), 
                                                    ms.l(8), 
                                                    ms.width('90%')]}
                                                >Rumah - {user[0]?.name} (+6289878782...</Text>  
                                            </View>

                                            <View>
                                                <Text numberOfLines={2} style={[
                                                    ms.fzBC(10, '400', '#9DA8B1'), 
                                                    ms.l(4) , 
                                                    ms.t(3)]}
                                                >{user[0]?.alamat_lengkap}</Text>
                                            </View>
                                        </View>

                                        <View style={{ width: '20%', alignItems: 'center', justifyContent:'center'}}>
                                            <Image source={next} style={{width: 4, height: 8}}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <View style={{backgroundColor: '#F5F5F5', width: '100%', height:1}}></View>

                                <TouchableOpacity onPress={() => refSheet .current.open()} >
                                    <View style={[ms.row]}>
                                        <View style={[ms.width('80%'), ms.height('100%'), ms.pd(10)]}>
                                            <Text style={[
                                                ms.fzBC(12, '600', '#222222'), 
                                                ms.l(4), 
                                                ms.t(3)]}
                                            >{metode?.name}</Text>
                                        </View>

                                        <View style={{ alignItems: 'center', justifyContent:'center', width:'20%'}}>
                                            <Image source={next} style={{width: 4, height: 8}}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>
                    )
                }

                {
                    metode?.id == 2 && (
                        <View style={[ms.wh(windowWidth, '38%'), ms.pdH(16)]}>
                            <View style={styles.CardMp2}>

                                <TouchableOpacity onPress={onPress} >
                                    <View style={[ms.row]}>

                                        <View style={[ms.width('80%'), ms.height('100%'), ms.pd(10)]}>
                                            <View style={[ms.row, ms.t(4)]}>
                                                <View style={styles.alamat}>
                                                    <Text style={[
                                                        ms.fzBC(10, '400', '#222222'), 
                                                        ms.txA('center')]}
                                                    >Utama</Text>
                                                </View>

                                                <Text style={[
                                                    ms.fzBC(12, '400', colors.dark), 
                                                    ms.l(8), 
                                                    ms.width('90%')]}
                                                >Rumah - {user[0]?.name} (+6289878782...</Text>
                                            </View>

                                            <View>
                                                <Text numberOfLines={2} style={[
                                                    ms.fzBC(10, '400', '#9DA8B1'), 
                                                    ms.l(4), 
                                                    ms.t(3)]}
                                                >{user[0]?.alamat_lengkap}</Text>
                                            </View>

                                        </View>

                                        <View style={{ width: '20%', alignItems: 'center', justifyContent:'center'}}>
                                            <Image source={next} style={{width: 4, height: 8}}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <View style={{backgroundColor: '#F5F5F5', width: '100%', height:1}}></View>

                                <TouchableOpacity onPress={() => refSheet .current.open()} >
                                    <View style={[ms.row]}>
                                        
                                        <View style={[ms.width('80%'), ms.height('100%'), ms.pd(10)]}>
                                            <Text style={[
                                                ms.fzBC(12, '600', '#222222'), 
                                                ms.l(4), , ms.t(3)]}
                                            >{metode?.name} <Image 
                                            source={IconDicuci} 
                                            style={[ms.wh(50, 14), ms.aiJc()]}
                                            resizeMode={'contain'}/>
                                            </Text>
                                        </View>

                                        <View style={{ alignItems: 'center', justifyContent:'center', width:'20%'}}>
                                            <Image source={next} style={{width: 4, height: 8}}/>
                                        </View>

                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={onPress} >
                                    <View style={[ms.row]}>
                                        
                                        <View style={[
                                            ms.row,
                                            ms.ai(), 
                                            ms.width('80%'), 
                                            ms.pd(10), 
                                            ms.height('100%')
                                            ]}>
                                            <Image source={gojek} style={{width: 55, height: 14.24, left: 4}}/>
                                            
                                            <Text style={
                                                {
                                                    fontWeight: '700', 
                                                    fontSize:12,  
                                                    alignItems: 'center',
                                                    color: '#222222', 
                                                    left: 20,
                                                }}>Rp.7000</Text>
                                        </View>

                                        <View style={{ alignItems: 'center', justifyContent:'center', width:'20%'}}>
                                            <Image source={next} style={{width: 4, height: 8}}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>
                    )
                }
                </View>
            </ScrollView>
        </View>
        

        <View style={[ms.wh(windowWidth, '20%'), ms.aiJc()]}>
            <View>
                <View style={{backgroundColor: '#F5F5F5', width: windowWidth, height:8}}></View>
            </View>

            <TouchableOpacity onPress={onPress} >
                <View style={[ms.wh(windowWidth, 66), ms.pd(16), ms.pdB(10)]}>
                    <View style={
                        {
                            height: 40, 
                            borderColor:'#E7E7E7', 
                            borderWidth: 1, 
                            borderRadius: 8, 
                        }}>
                        <View style={[ms.row, ms.ai()]}>
                            <View style={[ms.row, ms.ai(), ms.width('80%')]}>
                                <Image source={diskon} style={{width: 24, height: 24, left: 16}}/>
                                <Text style={styles.TxP}>Yuk pakai promo kamu !</Text>
                            </View>
                            <View style={{ width: '20%', alignItems: 'center', justifyContent:'center'}}>
                                <Image source={next} style={{width: 4, height: 8}}/>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

            <View >
                <View style={[ms.wh(windowWidth, 45), ms.aiJc()]}>
                    <View style={[ms.width('100%'), ms.aiJc()]}>
                        <ButtonL 
                        onPress={() => {
                            deleteLaundry(checkoutList[0]?.fk_mitra)
                            onSave()
                        }} 
                            width={"90%"} 
                            height={44} 
                            label="Konfirmasi Pesanan" 
                            fontSize={14} 
                            color={colors.white} 
                            borderColor={colors.primary} 
                            borderWidth={2} 
                            backgroundColor={colors.primary} 
                            borderRadius={8}/>
                    </View>
                </View>
            </View>

        </View>

        <RBSheet
            ref={refSheet}
            closeOnDragDown={true}
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
                height: 60 / 100 * windowHeight,
                borderTopWidth: 1,
                borderColor: colors.silverLight,
            },
            draggableIcon: {
                backgroundColor: "#000"
            }
            }}
            height={366}
        >
        <View style={[ms.containerPage]}>
            
            <View style={[ms.row, ms.pdV(14), ms.width(windowWidth)]}>

                <View style={[ms.aiJc]}>
                    <TouchableOpacity 
                        onPress={() => refSheet .current.close()} 
                        style={[ms.post(), ms.pdH(16)]}>
                        <Image 
                        source={IconX} 
                        style={[ms.wh(35,35)]}
                        />
                    </TouchableOpacity>
                </View>

                <View style={[ms.l(60), ms.t(5)]}>
                    <View style={[ms.aiJc]}>
                        <Text style={[ms.fzBC(16, '600', colors.dark)]}>Pilih Metode Kirim / Jemput</Text>
                    </View>
                </View>

            </View>

            <TouchableOpacity onPress={()=>{
                mitra()
                refSheet.current.close()
                }}>
                <View style={[ms.wh(windowWidth, 80), ms.pdH(16), ms.pdV(10)]}>
                    <Text 
                    style={[ms.fzBC(14, '600', colors.dark)]}
                    >Diantar - Jemput Driver Mitra</Text>

                    <Text 
                    style={[ms.fzBC(10, '400', colors.dark)]}
                    >Pesananmu akan dijemput oleh driver dari pihak mitra. Perhitungan Tarif ongkir dari tiap mitra bisa berbeda beda, tergantung lokasi penjemputan dan kebijakan masing masing mitra</Text>
                </View>
            </TouchableOpacity>

            <View style={{backgroundColor: '#E7E7E7', width: '100%', height:1}}></View>
            
            {/* <TouchableOpacity onPress={()=>{
                driver()
                refSheet.current.close()
                }}>
                <View style={[ms.wh(windowWidth, 80), ms.pdH(16), ms.pdV(10)]}>
                    <Text 
                    style={[ms.fzBC(14, '600', colors.dark)]}
                    >Diantar - Jemput Driver <Image source={IconDicuci} style={[ms.wh(50, 14)]} /></Text>
                    
                    <Text 
                    style={[ms.fzBC(10, '400', colors.dark)]}
                    >Pesananmu akan dijemput langsung oleh driver dari pihak dicuci. Tarif ongkir dari tiap mitra bisa berbeda beda, tergantung lokasi penjemputan.</Text>
                </View>
            </TouchableOpacity> */}

            <View style={{backgroundColor: '#E7E7E7', width: '100%', height:1}}></View>
            
            <TouchableOpacity onPress={()=>{
                sendiri()
                refSheet.current.close()
                }}>
                <View style={[ms.wh(windowWidth, 80), ms.pdH(16), ms.pdV(10)]}>
                    <Text 
                    style={[ms.fzBC(14, '600', colors.dark)]}
                    >Diantar - Jemput Driver Sendiri</Text>

                    <Text 
                    style={[ms.fzBC(10, '400', colors.dark)]}
                    >Kamu harus mengantarkan pesananmu sendiri ke lokasi pihak mitra dicuci, yang sesuai dengan pesananmu.</Text>
                </View>
            </TouchableOpacity>

            <View style={{backgroundColor: '#E7E7E7', width: '100%', height:1}}></View>
        
        </View>
      </RBSheet>
      
    </SafeAreaView>
  )
}



export default KonfirmasiPesanan;

const styles = StyleSheet.create({
    CardMp1 : {
        // paddingBottom: 4,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
        },
        shadowOpacity: 1.27,
        shadowRadius: 4.65,
        height: 110,
        elevation: 6,
    },
    CardMp2 : {
        // paddingBottom: 4,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
        },
        shadowOpacity: 1.27,
        shadowRadius: 4.65,
        height: 140,
        elevation: 6,
    },
    alamat: {
        width: 40, 
        height: 15, 
        justifyContent: 'center', 
        alignContent:'center', 
        backgroundColor:'#E3F4FF', 
        borderRadius:4, 
        left: 4, 
    },
    TxP : {
        fontWeight: '700', 
        fontSize:12, 
        lineHeight: 20, 
        display: 'flex', 
        alignItems: 'center', 
        letterSpacing: 0.1, 
        color: '#222222', 
        paddingVertical: 8, 
        left: 25,
    },
})