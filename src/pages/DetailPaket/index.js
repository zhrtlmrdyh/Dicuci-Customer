import { StyleSheet, Text, View, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef  } from 'react'
import ms from '../../utils/ms'
// import { windowWidth } from '../../utils/constants'
// import { IconAll, IconBaju, IconBarnner, IconBell, IconCar, IconCart, IconDelivery, IconDicuci, IconDress, IconFastDelivery, IconFreeDelivery, IconLocation, IconPromo, IconStarMitra, IconUser } from '../../assets/icon'
import Icon from 'react-native-vector-icons/FontAwesome5';
// import { colors } from '../../utils'
// import { Gap, MainFeature, Paket } from '../../components'
// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { colors} from '../../utils';
import { ButtonL, Gap, Mitra, Number, PaketCard } from '../../components';
import { IconBack, IconBaju, IconCart, IconDress, IconSepatu, IconShare } from '../../assets/icon';
import { windowWidth } from '../../utils/constants';
import Icons from 'react-native-vector-icons/AntDesign';
import { getPaketMitratList } from '../../redux/action/paket';
import { getData } from '../../utils';
import { PostLaundryBag, UpdateLaundryBag, getLaundryBagList } from '../../redux/action/laundry';
import { showMessage } from 'react-native-flash-message';

const DetailPaket = ({ navigation }) => {
  const { paket, paketMitra } = useSelector((state) => state.homeReducer);
  const { checkoutPaket, laundryBagList, checkoutList } = useSelector((state) => state.laundryBagReducer);
  const { user } = useSelector((state) => state.userReducer);
  console.log('paket', paket);
  console.log('laundry', laundryBagList)
  // console.log('user', user)

  const [desk, setDesk] = useState(paket?.keterangan)
  const [isRead, setIsRead] = useState(false)
  const ReadBtn = () => {
    setIsRead(prevState => !prevState)
  }

  const [isSecureEntry, setIsSecureEntry] = useState(true)
  const [icon, setIcon] = useState("eye-off");
  const dispatch =  useDispatch();

  const [param, setParam] = useState({
    page: 0,
    limit: 10
  })

  const [paketList, setPaketList] = useState([])

  const init = async () => {
    await dispatch(getPaketMitratList(param, paket?.fk_mitra));
    await dispatch(getLaundryBagList(param, laundryBagList));
    const listParfum = paket?.parfum;
    console.log("list Parfum", ListParfum);
  }

  const [clickedId, setClickedId] = useState(0);
  const [list, setList] = useState([])
  console.log('list', list)
  console.log('checkout List', checkoutList)

  const [listParfum, setListParfum] = useState([
    
  ])

  const handleClick = (value) => {
    setClickedId(value)
    console.log('parfum', value)
  }


  const onLaundry = async () => {
    // getData('authUser').then((resAuthUser)=>{
    //     if(resAuthUser?._id){
          let isValid = true;
          if (!paket?.parfum) {
            showMessage('Parfum kosong', 'danger');
            isValid = false;
          }

          if (isValid) {
            const laundryMitra = laundryBagList?.find((lb) => {
              return lb?.fk_mitra == paket?.fk_mitra
            })
            console.log('laundry mitra', laundryMitra)

            if(laundryMitra) {
              // setPaketList(laundryMitra)
              alert('Mitra ada')
              const laundryPaket = laundryBagList.find((lb) => {
                lb.list_paket.map((lp) => {
                  lb.fk = lp?._id
                })
                return lb?.fk_mitra == paket?.fk_mitra && lb.fk == paket?._id
              })
              console.log('laundry paket', laundryPaket)

              if(laundryPaket) {
                alert('laundry ada')

                const laundryParfum = laundryMitra?.list_paket?.find((lb) => {
                  return lb?._id == paket?._id && lb?.parfum == paket?.parfum
                })
                console.log('laundry parfum', laundryParfum)
                
                if(laundryParfum) {
                  alert('parfum ada')
                  
                  console.log('coba terosss', paketList)
                  const list_paket =[]
                  laundryMitra?.list_paket?.forEach((lp)=>{
                    if(lp?._id == paket?._id && lp?.parfum == paket?.parfum){
                      lp.qty++
                      lp.biaya_satuan = lp.biaya * lp.qty
                    }
                    
                    list_paket.push(lp)
                    console.log('cek2', list_paket)
                  })

                  const formData = {
                    ...laundryPaket,
                    updated_at: new Date(),
                    list_paket : list_paket
                  }

                  const onSuccess = async (res) => {
                    showMessage('Berhasil update paket', 'success')
                  }   
                  const onError = (err) => {
                  }
          
                  console.log("form data parfum ada", formData)
                  // console.log("id", laundryMitra?._id)
                  await dispatch(UpdateLaundryBag(laundryPaket?._id, formData, laundryBagList, onSuccess, onError))
                  await dispatch(getLaundryBagList(param, laundryBagList));

                } else {
                  alert('parfum nggak ada')

                  const productListNew = []

                  laundryPaket?.list_paket.forEach((lp)=> {
                    productListNew.push(lp)
                  })

                  productListNew.push(paket)

                  console.log('product', productListNew)

                  const formData = (
                    {
                      ...laundryPaket,
                      updated_at: new Date(),
                      list_paket: productListNew,
                    }  
                  )
                  const onSuccess = async (res) => {
                    showMessage('Berhasil update paket', 'success')
                  }   
                  const onError = (err) => {
                  }
          
                  console.log("form data paket ada", formData)
                  await dispatch(UpdateLaundryBag(laundryPaket?._id, formData, laundryBagList, onSuccess, onError))
                  await dispatch(getLaundryBagList(param, laundryBagList));
                }

              } else {
                alert('laundry nggak ada')

                const productListNew = []

                laundryMitra?.list_paket.forEach((lp)=> {
                  productListNew.push(lp)
                })

                productListNew.push(paket)

                console.log('product', productListNew)

                const formData = (
                  {
                    ...laundryMitra,
                    updated_at: new Date(),
                    list_paket: productListNew,
                  }  
                )
                const onSuccess = async (res) => {
                  showMessage('Berhasil update paket', 'success')
                }   
                const onError = (err) => {
                }
          
                console.log("form data paket nggak ada", formData)
                await dispatch(UpdateLaundryBag(laundryMitra?._id, formData, laundryBagList, onSuccess, onError))
                await dispatch(getLaundryBagList(param, laundryBagList));
              }

            } else {
              alert('Mitra nggak ada')

              const productListNew = []

              laundryBagList?.forEach((lp)=> {
                console.log('apa we lah', lp)
                // productListNew.push(lp)
              })

              // productListNew.push(paket)

              // console.log('product', productListNew)

              const formData = (
                {
                  fk_user: user[0]?._id,
                  fk_mitra: paket?.fk_mitra,
                  list_paket: [
                    {
                      ...paket,
                    }
                  ],
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
        
              await dispatch(PostLaundryBag(formData, laundryBagList, onSuccess, onError))
              await dispatch(getLaundryBagList(param, laundryBagList));
            }
          } 
  }
  

  useEffect(() => {
    init();
  },[])


  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const currentIndex = Math.round(contentOffset.x / Dimensions.get('window').width);
    // Lakukan sesuatu berdasarkan indeks slide saat ini
  };


  return (
    <View style={[ms.containerPage]}>
      <ScrollView>
        <View >
          <View>
            <View style={{ height: 210 }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {paket.foto.map((foto, index) => (
                  <View key={index} style={{ marginRight: 10 }}>
                    <Image
                      source={{ uri: foto.foto_path }}
                      resizeMode={'center'}
                      style={{ width: 300, height: '100%' }}
                    />
                  </View>
                ))}
              </ScrollView>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={[ms.post(), ms.l('5%'), ms.t('5%')]}
            >
              <Image source={IconBack} style={[ms.wh(35, 35)]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.navigate('LaundryBag')
            }} style={[ms.post(), ms.r('20%'), ms.t('5%')]}>
              <Image source={IconCart} style={[ms.wh(35, 35)]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {

            }} style={[ms.post(), ms.r('6%'), ms.t('5%')]}>
              <Image source={IconShare} style={[ms.wh(35, 35)]} />
            </TouchableOpacity>
          </View>

          <View style={[ms.pdH(18)]}>
            <View style={[ms.pdV(12), ms.row, ms.ai()]}>
              <View style={[ms.width('92%')]}>
                <Text style={[ms.fzBCLh(20, '700', '#FFAA00', 24)]}><Number number={paket?.biaya} /></Text>
              </View>
              <View style={[ms.width('8%')]}>
                <TouchableOpacity onPress={() => setIsSecureEntry((prev) => !prev)}>
                  <Icons name={isSecureEntry ? "hearto" : "heart"} style={[isSecureEntry ? styles.textOff : styles.textOn]} />
                </TouchableOpacity>
              </View>
            </View>

            <View >
              <Text style={[ms.fzBCLh(14, '500', '#222222', 17)]}>{paket?.name}</Text>
            </View>

            <View style={[ms.row, ms.pdV(9)]}>
              <View style={[ms.aiJc(), ms.pdR(10)]}>
                <Text style={[ms.fzBCLh(12, '500', '#9DA8B1', 14)]}>Terpercaya</Text>
              </View>
              <View>
                <View style={[ms.wh(80, 20), ms.aiJc()]}>
                  <TouchableOpacity style={[ms.width(80),ms.pd(5), ms.bdW(0.5), ms.bdR(12), ms.pd(1), ms.aiJc()]}>
                    <Text style={[ms.fzBCLh(12, '700', '#222222', 14)]}><Icon name="star" solid color={colors.yellow} /> {paket?.rating} (53)</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <Gap height={4} backgroundColor={colors.bgColor} />
          
          <View style={[ms.pdH(18)]}>
            <View>
              <Text style={[ms.fzBCLh(12, '700', '#222222', 14)]}>Pilih Parfum: </Text>
            </View>
            <View style={[ms.pdV(5)]}>
              <View style={{flexDirection:"row", flexWrap:'wrap'}}>
                {paket?.list_parfum?.map((pr, index) => {
                console.log('pr:', pr)
                return (
                  <View key={index}>
                    <TouchableOpacity
                    onPress={()=>[
                      handleClick(pr?.name),
                      dispatch({
                        type: 'SET_PAKET', value: {
                            ...paket,
                            parfum: pr?.name,
                        }
                      }),
                      dispatch({
                        type: 'SET_CHECKOUT_PAKET', value: {
                            ...checkoutPaket,
                            parfum: pr?.name,
                        }
                      })
                    ]}
                    // key={index} 
                    // style={styles.buttonOff}
                    style={[
                        pr?.name === clickedId ? styles.buttonOn : styles.buttonOff,
                    ]}
                    >
                    <Text
                    style={[
                        pr?.name === clickedId ? styles.textsOn : styles.textsOff,
                    ]}
                    >{pr?.name}</Text>
                    </TouchableOpacity>
                  </View>
                )})}
              </View>
            </View>
          </View>

          <Gap height={4} backgroundColor={colors.bgColor} />
          
          <View style={ms.pd(18)}>
            <View style={[ms.pdV(5)]}>
              <Text style={[ms.fzBCLh(14, '700', '#222222', 14)]}>Detail Paket</Text>
            </View>
            <View style={[ms.row, ms.pdV(4)]}>
              <View style={[ms.width('30%')]}>
                <Text style={[ms.fzBCLh(12, '400', '#222222', 14)]}>Durasi Cuci</Text>
              </View>
              <View style={[ms.width('70%')]}>
                <Text style={[ms.fzBCLh(12, '400', '#222222', 14)]}>{paket?.durasi_cuci} {paket?.TypeDurasi?.deskripsi}</Text>
              </View>
            </View>
            <Gap height={1} backgroundColor={colors.bgColor} />
            <View style={[ms.row, ms.pdV(4)]}>
              <View style={[ms.width('30%')]}>
                <Text style={[ms.fzBCLh(12, '400', '#222222', 14)]}>Min Berat</Text>
              </View>
              <View style={[ms.width('70%')]}>
                <Text style={[ms.fzBCLh(12, '400', '#222222', 14)]}>{paket?.min_berat} Kg</Text>
              </View>
            </View>

            <Gap height={1} backgroundColor={colors.bgColor} />
            
            <View style={[ms.pdV(10)]}>
              <Text style={[ms.fzBCLh(14, '700', '#222222', 17)]}>Deskripsi Paket</Text>
            </View>
            <View>
              <Text numberOfLines={isRead ? 0 : 2} style={[ms.fzBCLh(12, '400', '#222222', 14)]}>{isRead ? desk : desk}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={ReadBtn}>
                <Text style={[ms.fzBC(12, '700', '#41A3F0')]}>{isRead ? 'Baca Lebih Sedikit' : 'Baca Selengkapnya'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Gap height={4} backgroundColor={colors.bgColor} />
          
          <View style={[ms.pd(14)]}>
            <Mitra mitra={paket?.Mitra} Press={()=>{navigation.navigate('MitraCuci')}}/>
          </View>

          <Gap height={4} backgroundColor={colors.bgColor} />
          
          <View style={[ms.pd(14)]}>
            <View>
              <Text style={[ms.fzBCLh(14, '700', '#222222', 17)]}>Paket Lainnya di mitra ini</Text>
            </View>
            <View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                >
                  {
                    paketMitra?.slice(0,10).map((paket,index)=>{
                      return (
                        <PaketCard 
                          key={index} 
                          paket={paket}
                          onPress={()=>{
                            dispatch({type: 'SET_PAKET', value: {
                              ...paket,
                              fk_status: "62e764b899b8110730e94461",
                              Status: {
                                _id: "62e764b899b8110730e94461",
                                code: "SOOD",
                                type: "status_order",
                                deskripsi: "Order Diterima",
                                no: 1,
                              },
                              qty: 1,
                              biaya_satuan: paket?.biaya * 1,
                              berat: 1,
                              tracking_status: [],
                              parfum: "Tanpa Parfum"
                            }})
                            dispatch({ type: 'SET_CHECKOUT_PAKET', value: {
                              ...checkoutPaket,
                              paket: paket,
                            }})
                            navigation.goBack()
                            navigation.navigate("DetailPaket")
                          }}
                        />
                      )
                    })
                  }
               
              </ScrollView>
            </View>
          </View>
        </View>

      </ScrollView>
      <View style={[ms.wh(windowWidth, 80), ms.aiJc()]}>
        <View style={[ms.row]}>
          <View style={[ms.width('50%'), ms.aiJc()]}>
            <ButtonL
            onPress={() => {
              onLaundry()
            }}  
            width={"90%"} height={44} label="+ Laundry Bag" fontSize={14} color={colors.primary} borderColor={colors.primary} borderWidth={2} />
          </View>
          <View style={[ms.width('50%'), ms.aiJc()]}>
            <ButtonL onPress={()=>{
              getData('authUser').then((resAuthUser)=>{
                if(resAuthUser?._id){
                    console.log('user', resAuthUser?._id)
                    dispatch({
                      type: 'SET_CHECKOUT_PAKET', value: {
                        ...checkoutPaket,
                          _id: paket?._id,
                          fk_mitra: paket?.fk_mitra,
                          fk_status: "62e764b899b8110730e94461",
                          name: paket?.name,
                          image_url1: paket?.image_url1,
                          image_url2: null,
                          image_url3: null,
                          biaya: paket?.biaya,
                          min_berat: 2,
                          qty: 1,
                          biaya_satuan: paket?.biaya * 1,
                          berat: 1,
                          tracking_status: [],
                      }
                    })
                    const data = {
                      ...paket,
                      fk_status: "62e764b899b8110730e94461",
                      Status: {
                        _id: "62e764b899b8110730e94461",
                        code: "SOOD",
                        type: "status_order",
                        deskripsi: "Order Diterima",
                        no: 1,
                      },
                      qty: 1,
                      biaya_satuan: paket?.biaya * 1,
                      berat: 1,
                      tracking_status: [],
                    }

                    list.push(data)

                    dispatch({
                      type: 'SET_CHECKOUT_LIST', value: list})
                    dispatch({type: 'SET_MITRA', value: paket?.Mitra})
                }
              })
              let isValid = true;
              if (!paket?.parfum) {
                showMessage('Parfum kosong', 'danger');
                isValid = false;
              }
              if (isValid) {
                navigation.navigate("KonfirmasiPesanan")
              }
              // showToasty('Tes','show')
            }} 
            width={"90%"} height={44} label="Pesan Sekarang" fontSize={14} color={colors.white} borderColor={colors.primary} borderWidth={2} backgroundColor={colors.primary}/>
          </View>
        </View>

      </View>
    </View>
  )
}

export default DetailPaket

const styles = StyleSheet.create({
  textOff: {
    fontSize:18,
    color: '#9DA8B1',
  },  
  textOn:{
    fontSize:18,
    color: colors.primary,
  },
  buttonOff:{
    width:100, 
    height:20, 
    backgroundColor:colors.white, 
    margin:2,
    borderColor:'#222222',
    borderRadius:12,
    borderWidth:0.5,
  },
  buttonOn:{
      width:100, 
      height:20, 
      backgroundColor:'#41A3F033', 
      margin: 2,
      borderColor:colors.primary,
      borderRadius:12,
      borderWidth:0.5,
  },
  textsOff: {
      textAlign: "center",
      fontSize:12, 
      fontWeight:"400" ,
      color:'#222222',
  },
  textsOn:{
      fontSize:12, 
      fontWeight:"400" ,
      color:colors.primary,
      textAlign: "center",
  },
})