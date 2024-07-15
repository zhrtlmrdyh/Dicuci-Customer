import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Checkbox} from 'react-native-paper';
import ms from '../../../utils/ms';
import {IconVerify, IconTrash} from '../../../assets/icon';
import Number from '../Number';
import {ButtonL, Gap} from '../../atoms';
import {sum, windowHeight, windowWidth} from '../../../utils/constants';
import {colors} from '../../../utils';
import RBSheet from 'react-native-raw-bottom-sheet';
import Feather from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useState} from 'react';
import {showMessage} from 'react-native-flash-message';
import {
  deleteLaundryBag,
  getLaundryBagList,
  UpdateLaundryBag
} from '../../../redux/action/laundry';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import CheckBox from '@react-native-community/checkbox';

const Laundry = ({
  laundryBag,
  onPress,
  onPressMinus,
  onPressPlus,
  ...props
}) => {
  const refSheet = useRef();
  const dispatch = useDispatch();
  const navigation =  useNavigation()
  const {checkoutPaket, laundryBagList, selected, checkoutList} = useSelector(state => state.laundryBagReducer);

  const [newPaket, setNewPaket] = useState(laundryBagList);
  const [btn, setBtn] = useState({
    qty: laundryBag.qty,
    biaya: laundryBag.biaya,
    fk_laundry: laundryBag._id,
    biaya_satuan: laundryBag.biaya,
    total_biaya_satuan: laundryBag.biaya,
  });

  // console.log('laundryyyyy', laundryBagList);

  const [datas, setData] = useState([]);
  // console.log('cek aja udah', datas)
  const [list, setList] = useState([])
  console.log('cek aja list', list)
  const [laundryBags, setLaundryBags] = useState([]);
  const [isSelected, setIsSelected] = useState(false)
  // console.log('isSelcted', selected)

  const [param, setParam] = useState({
    page: 0,
    limit: 10,
  });

  // delete paket
  const deleteLaundry = async (id, parfum) => {
    alert(1)
    console.log('id', id)
    console.log('parfum', parfum)
    console.log('length', laundryBag?.list_paket?.length)
    if(laundryBag?.list_paket?.length == 1) {
      alert('satu array')

      const onSuccess = async res => {
        showMessage('Paket telah di hapus');
      };
      const onError = async err => {
        // navigation.goBack()
      };

      await dispatch(deleteLaundryBag(laundryBag?._id, laundryBagList, onSuccess, onError));

      const param = {
        page: 0,
        limit: 10,
      };

      await dispatch(getLaundryBagList(param, laundryBagList, onSuccess, onError));
    } else if (laundryBag?.list_paket?.length >= 1) {
      alert('beberapa array')

      const datast = laundryBag?.list_paket
      const index = datast.findIndex((x) => {
        return x._id == id && x.parfum == parfum
      });
      console.log('index', index);
      
      datast.splice(index, 1)
      console.log('data', datast);
      console.log('length', laundryBag?.list_paket?.length)

      const formData = {
        ...laundryBag,
        list_paket : datast
      }

      console.log("form delete laundry", formData)
      // console.log("id", laundryMitra?._id)
      await dispatch(UpdateLaundryBag(laundryBag?._id, formData, laundryBagList))
      await dispatch(getLaundryBagList(param, laundryBagList));
    }    
  };

  // checkbox
  const onChecked = (id, parfum) => {
    console.log('id', id)
    console.log('parfum', parfum)
    const data = laundryBag?.list_paket 
    const cek = [];
    const index = data.findIndex((x) => {
      return x._id == id && x.parfum == parfum
    });
    const find = data.find((x) => {
      console.log('x', x._id)
      console.log('id', id)
      console.log('cek', x.parfum)
      console.log('id', parfum)
      return x._id == id && x.parfum == parfum
    });

    console.log('index', index);
    data[index].checked = !data[index].checked;
    setData({
    ...datas,
    ...data[index].checked
    });

    if(data[index].checked) {
      list.push(find)
    } else {
      list.splice(find?._id, 1)
    }
    
    dispatch({ type: 'SET_CHECKOUT_LIST', value: list})
    // setList(cek)
    console.log('data', data);
    
    console.log('index', data[index].checked);
  };

  // checkbox
  const onCheckeds = (id) => {
    alert(1)
    console.log('id', id)
    const data = laundryBagList 
    let checked = true;
    let cek = false;
    const index = data.findIndex((x) => {
      return x._id == id
    });

    console.log('index', index);
    console.log('length', laundryBag?.list_paket?.length)
    data[index].checked = !data[index].checked;
    setData(data[index].checked);

    const find = data.find((x) => {
      return x._id == id && x.checked == checked
    });

    const find2 = data.find((x) => {
      return x._id == id && x.checked == cek
    });

    if(find) {
      laundryBag?.list_paket?.forEach((lb) => {
        if(lb?.fk_mitra == find?.fk_mitra){
          lb.checked = true
        }
        list.push(lb)
        console.log('lb', lb)
      })
    } 

    if(find2) {
      laundryBag?.list_paket?.forEach((lb) => {
        if(lb?.fk_mitra == find2?.fk_mitra){
          lb.checked = false
        }
        list.splice(lb?.fk_mitra, 1)
        console.log('lb', lb)
      })
    } 

    dispatch({ type: 'SET_CHECKOUT_LIST', value: list})
    console.log('data', data);
    console.log('find', find);
    console.log('find2', find2);
    console.log('index', data[index].checked);
  };

  const onSelected = (id, parfum) => {
    console.log('id', id)
    console.log('parfum', parfum)
    const find = list?.find((x) => {
      console.log('x', x._id)
      console.log('id', id)
      console.log('cek', x.parfum)
      console.log('id', parfum)
      return x._id == id && x.parfum == parfum
    });
    console.log('find', find);
    if(find) {
      setIsSelected(true)
      dispatch({ type: 'SET_SELECT', value: true})
    } else {
      setIsSelected(false)
      dispatch({ type: 'SET_SELECT', value: false});
    }
  }

  const onSelecteds = (mitra) => {
    console.log('mitra', mitra)
    let cek = true
    
    const find = list?.find((x) => {
      return x.fk_mitra == mitra && x.checked == cek
    });

    console.log('find', find);
    if(find) {
      setIsSelected(true)
      dispatch({ type: 'SET_SELECT', value: true})
    } else {
      setIsSelected(false)
      dispatch({ type: 'SET_SELECT', value: false});
    }
  }

  const min = async (value, parfum) => {
    console.log('cek min', value)
    const minCek = laundryBag?.list_paket?.find((lb) => {
      return lb?._id == value && lb?.parfum == parfum
    })
    console.log('mincek', minCek)

    const list_paket =[]
    if(minCek) {
      laundryBag?.list_paket?.forEach((ll) => {
        if (ll?._id == value && ll?.parfum == parfum) {
          ll.qty--
          ll.biaya_satuan = ll.biaya * ll.qty
          ll.checked = false
        }
        list_paket.push(ll)
        console.log('cek2', list_paket)
      })
      
      const formData = {
        ...laundryBag,
        checked : false,
        list_paket : list_paket
      }

      console.log("form data parfum ada", formData)
      // console.log("id", laundryMitra?._id)
      await dispatch(UpdateLaundryBag(laundryBag?._id, formData, laundryBagList))
      await dispatch(getLaundryBagList(param, laundryBagList));
    }
  }

  const plus = async (value, parfum) => {
    console.log('cek plus', value)
    console.log('cek parfum', parfum)
    const minPlus = laundryBag?.list_paket?.find((lb) => {
      return lb?._id == value && lb?.parfum == parfum
    })
    console.log('minPlus', minPlus)

    const list_paket =[]
    if(minPlus) {
      laundryBag?.list_paket?.forEach((ll) => {
        if (ll?._id == value && ll?.parfum == parfum) {
          ll.qty++
          ll.biaya_satuan = ll.biaya * ll.qty
        }
        list_paket.push(ll)
        console.log('cek2', list_paket)
      })
      
      const formData = {
        ...laundryBag,
        checked : false,
        list_paket : list_paket
      }

      console.log("form data parfum ada", formData)
      // console.log("id", laundryMitra?._id)
      await dispatch(UpdateLaundryBag(laundryBag?._id, formData, laundryBagList))
      await dispatch(getLaundryBagList(param, laundryBagList));
    }
    
  }

  const init = async () => {
    await dispatch(getLaundryBagList(param, laundryBagList));
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View>
      <View>
        <View style={[ms.pdB(14)]}>
          <Gap height={4} backgroundColor={'#F5F5F5'} />
        </View>
        {/* Mitra Laundry */}
        <View style={[ms.row, ms.ai('center'), ms.mgB(16), ms.pdH(16)]}>
          <TouchableOpacity onPress={() => {}}>
            <Checkbox
              status={laundryBag.checked ? 'checked' : 'unchecked'}
              color="#222222"
              uncheckedColor="#222222"
              onPress={() => {
                onCheckeds(laundryBag?._id);
                onSelecteds(laundryBag?.fk_mitra);
                // onSelected(lp?._id, lp?.parfum);
                // tryMap(laundryBag?._id);
              }}
            />
          </TouchableOpacity>
          <View>
            <TouchableOpacity>
              <View style={[ms.mgL(16), ms.row, ms.ai('center')]}>
                <Image source={IconVerify} style={[ms.mgR(8)]} />
                <Text style={[ms.fzBC(14, '700', '#000000')]}>
                  {laundryBag?.Mitra?.name}
                </Text>
              </View>
              <Text style={[ms.pdL(16), ms.fzBC(10, '400', '#9DA8B1')]}>
                0.5 km dari lokasi Anda
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* laundry */}
        {laundryBag?.list_paket?.map((lp, index) => {
            // console.log('cek', lp?.name)
            return(
            <View key={index} style={[ms.pdH(16)]}>
              <View style={[ms.pdB(14), ms.row, ms.ai('center')]}>
                <TouchableOpacity
                  style={[ms.width((14 / 100) * windowWidth)]}
                  onPress={() => {}}>
                  <Checkbox
                    status={lp.checked ? 'checked' : 'unchecked'}
                    color="#222222"
                    uncheckedColor="#222222"
                    onPress={() => {
                      onChecked(lp?._id, lp?.parfum);
                      onSelected(lp?._id, lp?.parfum);
                      // tryMap(laundryBag?._id);
                    }}
                  />
                </TouchableOpacity>

                <View style={[ms.width((76 / 100) * windowWidth)]}>
                  <TouchableOpacity
                    style={[ms.row, ms.width((20 / 100) * windowWidth)]}
                    onPress={()=>{
                      dispatch({type: 'SET_PAKET', value:lp})
                      navigation.navigate('DetailPaket');
                    }}>
                    <Image
                      source={{
                        uri: lp?.image_url1,
                      }}
                      style={[ms.width((windowWidth * 18) / 100), ms.height(60)]}
                    />

                    <View style={[ms.pdL(14), ms.width((56 / 100) * windowWidth)]}>
                      <View style={[ms.width((46 / 100) * windowWidth)]}>
                        <Text style={[ms.fzBC(12, '700', '#000000')]}>
                          {lp?.name}
                        </Text>
                      </View>
                      <View
                        style={[
                          ms.row,
                          ms.ai('center'),
                          ms.width((46 / 100) * windowWidth),
                        ]}>
                        <View style={[ms.width((13 / 100) * windowWidth)]}>
                          <Text style={[ms.fzBC(12, '400', '#9DA8B1')]}>
                            Parfum :
                          </Text>
                        </View>
                        <View
                          style={[
                            ms.cardParfum,
                            ms.width((24 / 100) * windowWidth),
                          ]}>
                          <Text
                            style={[
                              ms.fzBC(10, '400', colors.primary),
                              ms.txA('center'),
                            ]}>
                            {lp?.parfum}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={[
                          ms.pdT(14),
                          ms.width((windowWidth * 46) / 100),
                          ms.row,
                        ]}>
                        <View style={[ms.width((25 / 100) * windowWidth)]}>
                          <Text style={[ms.fzBC(10, '700', '#FFAA00')]}>
                            <Number
                              number={
                                lp?.biaya_satuan
                              }
                            />
                          </Text>
                        </View>

                        <View
                          style={[
                            ms.row,
                            ms.aiJc('center'),
                            ms.width((36 / 100) * windowWidth),
                            // ms.pdL(58),
                          ]}>
                          <TouchableOpacity
                            style={[ms.mgR(8), ms.width((windowWidth * 5) / 100)]}
                            onPress={() => {
                              deleteLaundry(lp?._id, lp?.parfum);
                            }}>
                            <Image source={IconTrash} />
                          </TouchableOpacity>

                          <View
                            style={[
                              ms.aiJc('center'),
                              // ms.row,
                              ms.bdW(1),
                              ms.bdR(4),
                              ms.bdC('#222222'),
                              ms.width((18 / 100) * windowWidth),
                              ms.height((2.6 / 100) * windowHeight),
                            ]}>
                            <View style={[ms.row]}>
                              <TouchableOpacity
                                onPress={() => {
                                  min(lp?._id, lp?.parfum)
                                  // onBtnAdd('minus', laundryBag);
                                }}
                                style={[
                                  ms.height((windowHeight * 5) / 100),
                                  ms.width((windowWidth * 5) / 100),
                                  ms.aiJc(),
                                ]}>
                                <Feather name="minus" size={12} color={'#000000'} />
                              </TouchableOpacity>
                              <View
                                style={[
                                  ms.height((windowHeight * 5) / 100),
                                  ms.width((windowWidth * 5) / 100),
                                  ms.aiJc(),
                                ]}>
                                <Text style={[ms.fzBC, (12, '400', '#000000')]}>
                                  {lp?.qty}
                                </Text>
                              </View>
                              <TouchableOpacity
                                onPress={() => {
                                  plus(lp?._id, lp?.parfum)
                                  // onBtnAdd(laundryBag);
                                }}
                                style={[
                                  ms.height((windowHeight * 5) / 100),
                                  ms.width((windowWidth * 5) / 100),
                                  ms.aiJc(),
                                ]}>
                                <Feather name="plus" size={12} color={'#000000'} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={[ms.width((20 / 100) * windowWidth), ms.pdB(14)]}
                onPress={() => refSheet.current.open()}>
                <Text style={[ms.fzBC(12, '400', '#41A3F0')]}>Tulis Catatan</Text>
              </TouchableOpacity>
            </View>
            )
          })}
        

        {/* <View style={[ms.pdV(14)]}>
              <Gap height={1} backgroundColor={'#F5F5F5'} />
            </View> */}
      </View>

      {/* Total Bayar */}
      {/* {!isSelected && (
        <View style={[ms.pdH(16), ms.row, ms.aiJc('center', 'space-between')]}>
        <View>
          <Text style={[ms.fzBC(12, '400', '#000000')]}>Total Bayar</Text>
          <Text style={[ms.fzBC(12, '400', '#000000')]}>-</Text>
        </View>

        <View>
          <ButtonL
            label="Lanjut"
            onPress={() => {}}
            color={colors.white}
            fontSize={14}
            height={40}
            borderRadius={12}
            borderColor={'#E0E4EB'}
            width={(windowWidth * 40) / 100}
            backgroundColor={'#E0E4EB'}
          />
        </View>
      </View>
      )} */}

      {/* {!cek ? (
        <View style={[ms.pdH(16), ms.row, ms.aiJc('center', 'space-between')]}>
          <View>
            <Text style={[ms.fzBC(12, '400', '#000000')]}>Total Bayar</Text>
            <Text style={[ms.fzBC(12, '400', '#000000')]}>-</Text>
          </View>

          <View>
            <ButtonL
              label="Lanjut"
              onPress={() => {}}
              color={colors.white}
              fontSize={14}
              height={40}
              borderRadius={12}
              borderColor={'#E0E4EB'}
              width={(windowWidth * 40) / 100}
              backgroundColor={'#E0E4EB'}
            />
          </View>
        </View>
      ) : (
        <View style={[ms.pdH(16), ms.row, ms.aiJc('center', 'space-between')]}>
          <View>
            <Text style={[ms.fzBC(12, '400', '#000000')]}>Total Bayar</Text>
            <Text style={[ms.fzBC(12, '400', '#000000')]}>
              {laundryBag.qty}
            </Text>
          </View>

          <View>
            <ButtonL
              label="Lanjut"
              onPress={() => {}}
              color={colors.white}
              fontSize={14}
              height={40}
              borderRadius={12}
              borderColor={'#E0E4EB'}
              width={(windowWidth * 40) / 100}
              backgroundColor={'#41A3F0'}
            />
          </View>
        </View>
      )} */}

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
            height: (30 / 100) * windowHeight,
            borderTopWidth: 1,
            borderColor: colors.silverLight,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        height={90}>
        <View>
          <View style={[ms.cardTx('90%', 40), ms.mgL(18)]}>
            <TextInput placeholder="Misal, Jeans luntur warna biru" />
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 20,
                marginTop: -10,
                backgroundColor: 'white',
                paddingHorizontal: 5,
              }}>
              <Text style={[ms.fzBC(10, '400', '#9DA8B1')]}>
                Catatan untuk paket ini
              </Text>
            </View>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

{
  /* <Checkbox
              status={isSelected ? 'checked' : 'unchecked'}
              color="#222222"
              uncheckedColor="#222222"
              onPress={() => {
                // onPressCheckboxs
                // setChecked2(!checked2)
              }}
              style={[ms.wh(16, 16)]}
            /> */
}
export default Laundry;
