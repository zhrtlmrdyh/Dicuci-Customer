import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  IconBaju,
  IconDress,
  IconSepatu,
  IconBack,
  IconBell,
  IconVerify,
  IconTrash,
} from '../../assets/icon';
import ms from '../../utils/ms';
import {ButtonL, Gap, Laundry, Number, Paket} from '../../components';
import {getPaketList} from '../../redux/action/home';
import {getLaundryBagList, deleteLaundryBag} from '../../redux/action/laundry';
import {colors} from '../../utils';
import {sum, windowWidth, windowHeight} from '../../utils/constants';
import {Checkbox} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import Feather from 'react-native-vector-icons/Entypo';
import {showMessage} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';


const LaundryBag = ({navigation}) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const {checkout, laundryBagList, selected, checkoutList} = useSelector(
    state => state.laundryBagReducer,
  );
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  console.log('isSelcted', selected)
  console.log('check list', checkoutList)

  const [param, setParam] = useState({
    page: 0,
    limit: 10,
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const refSheet = useRef();
  const [checked, setChecked] = useState([]);
  // console.log('check', checked)
  const [checked2, setChecked2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ceklis, setCeklis] = useState('');
  const [data, setData] = useState(laundryBagList);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
    setRefreshing(false)
    init()
    });
  }, []);

  const init = async () => {
    await dispatch(getLaundryBagList(param, laundryBagList));
  };

  useEffect(() => {
    if (!navigation?.isFocused) {
      init();
    }
  }, [navigation]);

  return (
    <View style={[ms.containerPage, ms.pdV(8)]}>
      <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            
          />
      }>
        <View style={[ms.row, ms.ai('center'), ms.pdH(18), ms.pdB(8)]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image source={IconBack} style={[ms.wh(28, 28), ms.mgR(16)]} />
          </TouchableOpacity>

          <Text style={[ms.width('73%'), ms.fzBCLh(24, '700', '#222222', 29)]}>
            Laundry Bag
          </Text>

          <View style={[ms.width('20%')]}>
            <TouchableOpacity>
              <Image source={IconBell} style={[ms.wh(42, 42)]} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[]}>
          {isLoading ? (
            <ActivityIndicator size={'large'} color={colors.blueSky} />
          ) : (
            <View>
              {laundryBagList.map((laundry, index) => {
                return (
                  <Laundry
                    key={index}
                    laundryBag={laundry}
                    onPress={() => {
                      dispatch({type: 'SET_LAUNDRYBAG', value:laundry})
                      navigation.navigate('DetailPaket');
                    }}
                  />
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Total Bayar */}
      {!selected && (
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
      )}
      {
        selected && (
          <View style={[ms.pdH(16), ms.row, ms.aiJc('center', 'space-between')]}>
            <View>
              <Text style={[ms.fzBC(12, '400', '#000000')]}>Total Bayar</Text>
              <Text style={[ms.fzBC(12, '400', '#000000')]}>
                <Number
                  number={
                    sum(checkoutList, 'biaya_satuan')
                  }
                />
              </Text>
            </View>
  
            <View>
              <ButtonL
                label="Lanjut"
                onPress={() => {
                  dispatch({type: 'SET_MITRA', value: checkoutList[0]?.Mitra})
                  dispatch({ type: 'SET_SELECT', value: false});
                  navigation.navigate("KonfirmasiPesanan")
                }}
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
        )
      }
    </View>
  );
};

{
  /* {
        checkout?.LaundryCheckout?.length > 0 && (
          <View style={[ms.pdH(16), ms.row, ms.aiJc('center', 'space-between')]}>
            <View>
              <Text style={[ms.fzBC(12, '400', '#000000')]}>Total Bayar</Text>
              <Text style={[ms.fzBC(12, '400', '#000000')]}><Number number={checkout?.total_biaya} />,-</Text>
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
        )
      } */
}
export default LaundryBag;
