import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import ms from '../../utils/ms';
import {textMitra, textSignUp} from '../../assets/images';
import {colors} from '../../utils';
import Feather from 'react-native-vector-icons/Feather';
import {Checkbox} from 'react-native-paper';
import {ButtonL} from '../../components';
import Login from '../Login';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { sendOtpEmail, signUpActionLB } from '../../redux/action';
import { useDispatch } from 'react-redux';
import { IconTextDicuci } from '../../assets/icon';

const Register = ({navigation}) => {
    const dispatch = useDispatch();
    const [isSecureEntry, setIsSecureEntry] = useState(true);
    const [isSecureEntry2, setIsSecureEntry2] = useState(true)
    const [gender, setGender] = useState('Laki-laki');
    const [genderList, setGenderList] = useState([
        {id: "62e7515387144e25b84dacfa", gender: 'Laki-Laki'},
        {id: "62e7516b87144e25b84dacfb", gender: 'Perempuan'},
    ]);

    const [checked, setChecked] = useState(false);

    const onItemSelected = (g) => {
        setGender(g);
    }

    const [input, setInput] = useState({
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      hp: '',
      fk_gender: '',
      password: '',
      password2: ''
    });

    const onRegister = async () =>{
      let isValid = true;

      if (!input?.first_name){
        showMessage('Nama Anda belum diisi', 'danger');
        return isValid = false;
      }
      else if (!input?.last_name){
        showMessage('Nama Anda belum diisi', 'danger');
        return isValid = false;
      }
      else if(!input?.username){
        showMessage('Username Anda belum diisi', 'danger');
        return isValid = false;
      }
      else if(!input?.hp){
        showMessage('Phone Number Anda belum diisi', 'danger');
        return isValid = false;
      }
      else if(!input?.fk_gender){
        showMessage('Gender Anda belum diisi', 'danger');
        return isValid = false;
      }
      else if(!input?.email){
        showMessage('Email Anda belum diisi', 'danger');
        return isValid = false;
      } if(!input.email.match(/\S+@\S+\.\S+/)){
        showMessage('Masukkan email yang valid', 'danger');
        return isValid = false;
      }
      else if(!input?.password){
        showMessage('Password Anda belum diisi', 'danger');
        return isValid = false;
      } 
      else if(!input?.password2){
        showMessage('Password Anda belum diisi', 'danger');
        return isValid = false;
      } 
      if(input?.password2 != input?.password){
        showMessage('Pastikan password sesuai', 'danger');
        return isValid = false;
      }
      else if(!isValid){
        showMessage('Pastikan semua sudah terisi', 'danger');
        return isValid = false;
      }

      if(isValid){
        const formData =  {
            name: input?.first_name + " " + input?.last_name,
            username: input?.username,
            email: input?.email,
            hp: input?.hp,
            fk_gender: input?.fk_gender,
            password: input?.password,
            code_otp_email : Math.floor(1000 + Math.random() * 9000),
            code_otp_hp : Math.floor(1000 + Math.random() * 9000),
            emailVerified : false,
            hpVerified : false,
            created_at: new Date(),
            updated_at: new Date(),
          }
        console.log("form data", formData)
        const onSuccess = async(resRegister)=>{
          const resRegisterNew = {
            ...resRegister,
            password: input?.password,
          }
          await dispatch({ type: 'SET_USER_VALIDATION', value: resRegisterNew });

          const formSendEmail = {
            email : resRegister.email,
            subject : " Verifikasi Email Dicuci"
          }
        await dispatch(await sendOtpEmail(formSendEmail));

          navigation.navigate('VerifikasiUser');
        }
        await dispatch(signUpActionLB(formData,onSuccess));
        navigation.navigate('Login');
      }
    }

  return (
    <SafeAreaView style={[ms.containerPage]}>
      <ScrollView>
        {/* Logo */}
        <View style={[ms.pdT(37), ms.aiJc()]}>
        <Image source={IconTextDicuci}/>
        </View>

        <View style={[ms.mgT(47), ms.pdL(37)]}>
          <View style={[ms.cardRegister('90%', 48), ms.mgB(18)]}>
            <TextInput
              placeholder="First Name"
              value={input?.first_name}
              onChangeText={(value) => {
                setInput({
                  ...input,
                  first_name: value,
                })
              }}
              autoCapitalize='none'
              placeholderTextColor={colors.silverNormal}
              style={[
                ms.pdL(16),
                ms.pdV(8),
                ms.fzBCLh(12, '400', '#6C6C6C', 14),
              ]}
            />
          </View>
          <View style={[ms.cardRegister('90%', 48), ms.mgB(18)]}>
          <TextInput
              placeholder="Last Name"
              value={input?.last_name}
              onChangeText={(value) => {
                setInput({
                  ...input,
                  last_name: value,
                })
              }}
              autoCapitalize='none'
              placeholderTextColor={colors.silverNormal}
              
              style={[
                ms.pdL(16),
                ms.pdV(8),
                ms.fzBCLh(12, '400', '#6C6C6C', 14),
              ]}
            />
          </View>
          <View style={[ms.cardRegister('90%', 48), ms.mgB(18)]}>
            <TextInput
              placeholder="Username"
              value={input?.username}
              onChangeText={(value) => {
                setInput({
                  ...input,
                  username: value,
                })
              }}
              autoCapitalize='none'
              placeholderTextColor={colors.silverNormal}
              
              style={[
                ms.pdL(16),
                ms.pdV(8),
                ms.fzBCLh(12, '400', '#6C6C6C', 14),
              ]}
            />
          </View>
          <View style={[ms.cardRegister('90%', 48), ms.mgB(18)]}>
            <TextInput
              placeholder="Email"
              value={input?.email}
              onChangeText={(value) => {
                setInput({
                  ...input,
                  email: value,
                })
              }}
              autoCapitalize='none'
              placeholderTextColor={colors.silverNormal}
              
              style={[
                ms.pdL(16),
                ms.pdV(8),
                ms.fzBCLh(12, '400', '#6C6C6C', 14),
              ]}
            />
          </View>
          <View
            style={[
              ms.cardRegister('90%', 48),
              ms.mgB(18),
              ms.row,
              ms.ai('center'),
            ]}>
            <Text
              style={[ms.pdL(16), ms.pdV(8), ms.fzBC(14, '700', '#B3B3B3')]}>
              +62
            </Text>
            <TextInput
              placeholder="Phone Number / Whatsapp"
              value={input?.hp}
              onChangeText={(value) => {
                setInput({
                  ...input,
                  hp: value,
                })
              }}
              autoCapitalize='none'
              placeholderTextColor={colors.silverNormal}
              
              style={[
                ms.pdL(16),
                ms.pdV(8),
                ms.fzBC(14, '400', '#6C6C6C'),
              ]}
            />
          </View>
        </View>

        <View style={[ms.row, ms.jc('space-between'), ms.pdL(37), ms.ai('center')]}>
          <View>
            <Text style={[ms.fzBCLh(14, '400', '#6C6C6C', 17)]}>Gender</Text>
          </View>
          
          <View style={[ms.row, ms.mgR(37)]}>
            {genderList.map((gd, index) => {
                return(
                    <TouchableOpacity
                        key={index}
                        onPress={()=>{
                          onItemSelected(gd.gender)
                          setInput({
                            ...input,
                            fk_gender: gd?.id
                          })}}
                            style={[
                                gd?.gender === gender ? styles.activeButton : styles.inactiveButton,
                                gd?.gender === 'Perempuan'? {borderTopRightRadius: 6,borderBottomRightRadius: 6} : "",
                                gd?.gender === 'Laki-Laki'? {borderTopLeftRadius: 6,borderBottomLeftRadius: 6} : "",
                            ]}>
                        <Text style={[
                            gd?.gender === gender ? styles.activeText : styles.inactiveText,]}>
                                {gd?.gender}
                            </Text>
                    </TouchableOpacity>
                )

                
            })}
            {/* <TouchableOpacity
              style={[
                styles.activeButton,
                {borderTopLeftRadius: 6, borderBottomLeftRadius: 6},
              ]}>
              <Text style={[styles.activeText]}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.inactiveButton,
                {borderTopRightRadius: 6, borderBottomRightRadius: 6},
              ]}>
              <Text style={[styles.inactiveText]}>Female</Text>
            </TouchableOpacity> */}
          </View>
        </View>

        <View style={[ms.mgT(24), ms.pdL(37)]}>
          <View
            style={[
              ms.cardRegister('90%', 48),
              ms.pdH(16),
              ms.mgB(16),
              ms.row,
              ms.ai('center'),
              ms.jc('space-between'),
            ]}>
            <TextInput
              placeholder="Password"
              secureTextEntry={isSecureEntry}
              value={input?.password}
              onChangeText={(value) => {
                setInput({
                  ...input,
                  password: value,
                })
              }}
              autoCapitalize='none'
              placeholderTextColor={colors.silverNormal}
              
              style={[ms.pdV(8), ms.fzBCLh(12, '400', '#6C6C6C', 14)]}
            />
            <TouchableOpacity onPress={()=>setIsSecureEntry((prev) => !prev)}>
              <Feather color={colors.silver} name={isSecureEntry ? "eye-off" : "eye"} style={[ms.fz(18)]}/>
            </TouchableOpacity>
          </View>

          <View
            style={[
              ms.cardRegister('90%', 48),
              ms.pdH(16),
              ms.mgB(14),
              ms.row,
              ms.ai('center'),
              ms.jc('space-between'),
            ]}>
            <TextInput
              placeholder="Password"
              secureTextEntry={isSecureEntry2}
              value={input?.password2}
              onChangeText={(value) => {
                setInput({
                  ...input,
                  password2: value,
                })
              }}
              autoCapitalize='none'
              placeholderTextColor={colors.silverNormal}
              
              style={[ms.pdV(8), ms.fzBCLh(12, '400', '#6C6C6C', 14)]}
            />
            <TouchableOpacity onPress={()=>setIsSecureEntry2((prev) => !prev)}>
              <Feather color={colors.silver} name={isSecureEntry2 ? "eye-off" : "eye"} style={[ms.fz(18)]}/>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[ms.row, ms.mgB(25), ms.ai('flex-end'), ms.pdL(30)]}>
          <Checkbox
            status={checked? 'checked' : 'unchecked'}
            color="#B3B3B3"
            uncheckedColor="#B3B3B3"
            onPress={() => {
                setChecked(!checked);
            }}
          />
          <View style={[ms.width(269)]}>
            <Text
              style={[ms.pdL(12), ms.fzBC(12, '400', '#6C6C6C')]}>
              I agree to dicuci
              <TouchableOpacity style={[ms.pdH(3), ms.mgT(7)]}>
                <Text
                  style={[
                    ms.fzBCLh(11, '700', colors.blueSolid, 12),
                    {textDecorationLine: 'underline'},
                  ]}>
                  Terms of Use
                </Text>
              </TouchableOpacity>
              and acknowledge that i have to read the
              <TouchableOpacity style={[ms.pdH(3)]}>
                <Text
                  style={[
                    ms.fzBC(11, '700', colors.blueSolid),
                    {textDecorationLine: 'underline'},
                  ]}>
                  Privacy Policy
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>

        <View style={[ms.pdH(37)]}>
          <ButtonL
            width={'100%'}
            height={40}
            label="Sign Up"
            fontWeight="500"
            fontSize={14}
            color={'#FFFFFF'}
            backgroundColor={'#41A3F0'}
            borderColor={'#41A3F0'}
            borderRadius={12}
            onPress={() => {onRegister()}}
          />
        </View>

        <View style={[ms.row, ms.aiJc('center'), ms.pdH(37), ms.mgT(11), ms.mgB(54)]}>
          <Text style={[ms.fzBC(14, '400', '#6C6C6C')]}>Already have an account?</Text>
          <TouchableOpacity onPress={()=>{(navigation.navigate("Login"))}}>
            <Text style={[ms.fzBC(14, '700', '#41A3F0')]}> Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  inactiveButton: {
    borderColor: '#B3B3B3',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    width: 65,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    borderWidth: 1,
    width: 65,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveText: {
    color: '#B3B3B3',
    fontWeight: '400',
    fontSize: 12,
  },
  activeText: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 12,
  },
});
