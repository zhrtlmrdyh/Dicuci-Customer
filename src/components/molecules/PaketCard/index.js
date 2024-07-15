import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
// import { IconBaju, IconDress, IconVerifikasi } from '../../../assets/icon';
// import { colors } from '../../../utils';
import ms from '../../../utils/ms';
import { ButtonL, Gap } from '../../atoms';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Number from '../Number';
import { getData } from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { PostLaundryBag, UpdateLaundryBag, getLaundryBagList } from '../../../redux/action/laundry';
import { showMessage } from 'react-native-flash-message';

const PaketCard = ({paket,onPress, width=140, height=200}) => {
  const dispatch = useDispatch();
  const { checkoutPaket, laundryBagList } = useSelector((state) => state.laundryBagReducer);
  console.log('laundry', paket)
  const [parfum, setParfum] = useState({
    id: 1,
    name: "Tanpa Parfum",
    code: "TAN",
    status: false,
  })

  const onSave = async () => {
    getData('authUser').then((resAuthUser)=>{
        if(resAuthUser?._id){
          alert(1)
          const laundryMitra = laundryBagList?.find((lb) => {
            return lb?.fk_mitra == paket?.fk_mitra
          })
          console.log('laundry mitra', laundryMitra)

          if(laundryMitra) {
            const laundryParfum = laundryMitra?.list_paket?.find((lb) => {
              return lb?._id == paket?._id && lb?.parfum == paket?.parfum
            })
            console.log('laundry bag', laundryParfum)

            if(laundryParfum) {
            
            alert('laundry ada')
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
                  ...laundryMitra,
                  updated_at: new Date(),
                  list_paket : list_paket
                }

                const onSuccess = async (res) => {
                  showMessage('Berhasil update paket', 'success')
                }   
                const onError = (err) => {
                }
        
                console.log("form data", formData)
                
                dispatch(UpdateLaundryBag(laundryMitra?._id, formData, onSuccess, onError))
                dispatch(getLaundryBagList(param, laundryBagList));
            } else {
              alert('laundry tidak ada')
              const formData = (
                {
                  fk_user: resAuthUser?._id,
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
      
              dispatch(PostLaundryBag(formData, onSuccess, onError))
              dispatch(getLaundryBagList(param, laundryBagList));
              alert('sudah ditambah ke dalam laundry bag')
              
              navigation.navigate("PaketDipesan")
             }
          }  
        }
    })
}
  
   return (
      <TouchableOpacity onPress={onPress} style={[ms.wh(width, height)]}>
        <View style={[ms.card]}>
            <View>
                <Image source={{uri : paket?.image_url1}} resizeMode={'stretch'} style={{width:130, height:52, borderTopLeftRadius:8, borderTopRightRadius: 8}}/>
            </View>
            <View>
              <View style={[ms.pdV(5)]}>
                <Text numberOfLines={1} style={[ms.fzBCLh(11,'400','#000000', 13)]}>{paket?.name}</Text>
              </View>
              <View style={[ms.pdV(5)]}>
                <Text style={[ms.fzBCLh(12,'700','#222222', 14)]}><Number number={paket?.biaya}/></Text>
              </View>
              <View style={[ms.pdV(5)]}>
                <Text style={[ms.fzBCLh(12,'700','#222222', 14)]}><Icon name="star" solid color="#FFAA00"/> 4.7</Text>
              </View>
              <View style={[ms.pdV(5)]}>
                <ButtonL 
                onPress={() => {
                  onSave()
                }}
                label="+ Laundri Bag" 
                borderColor='#41A3F0' 
                color='#41A3F0'
                borderRadius={4}/>
              </View>
            </View>
        </View>
              
      </TouchableOpacity>
  );
};

export default PaketCard;

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
 
});
