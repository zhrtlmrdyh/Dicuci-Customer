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
import { colors, showMessage, showToast, storeData } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { IconDicuci } from '../../assets/icon';
import { windowWidth } from '../../utils/constants';
import Icon from 'react-native-vector-icons/FontAwesome5';

import BackgroundTimer from "react-native-background-timer";
import { useEffect } from 'react';
import { ButtonL, Gap } from '../../components';
import { getAuthUser, sendOtpEmail, signInAction, signInActionLB, updateAuthUser, validationOTP } from '../../redux/action';
const VerifikasiEmail = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userRegister , userValidation} = useSelector((state) => state.authReducer);
  const [formVerifikasi, setFormVerifikasi] = useState({
    code_otp : ''
  });
  const [timerOn, setTimerOn] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(300);
  
  //const [timerOn, setTimerOn] = useState(startTime ? true : false);
  const [statusTimeUpdate, setStatusTimeUpdate] = useState(true);
  const [kodeOtp, setKodeOtp] = useState("");
  const [statusEndTime, setStatusEndTime] = useState(false);
  const clockify = () => {
    //let hours = Math.floor(secondsLeft / 60 / 60)
    let mins = Math.floor((secondsLeft / 60) % 60)
    let seconds = Math.floor(secondsLeft % 60)
   // let displayHours = hours < 10 ? `0${hours}` : hours
    let displayMins = mins < 10 ? `0${mins}` : mins
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds
    return {
      //displayHours,
      displayMins,
      displaySecs,
    }
  }
  const startTimer = () => {
    setTimerOn(true)
    BackgroundTimer.runBackgroundTimer(() => {
     
     
      setSecondsLeft(secs => {
        if (secs > 0) {
         
         if(statusTimeUpdate){
          setStatusTimeUpdate(false)
          
         }
            
          //}
          return secs - 1
        }
        else {
             setTimerOn(false)
              // showMessage('Anda bisa mengirim ulang kode otp')
              BackgroundTimer?.stopBackgroundTimer()
              return 0
        }
      })
    }, 1000)
  }
  const onSendOTP = async () =>{
    const formSendEmail = {
      email : userValidation.email,
      subject : 'Verifikasi OTP Dicuci'
    }
    await dispatch(await sendOtpEmail(formSendEmail))
  }
  const onSubmitOtp = () =>{
    if(!formVerifikasi.code_otp){
      return showToast('Kode OTP belum diisi')
    }
    // const onSuccessUpdateUser = (resAuthUser)=>{
    //   dispatch(signInAction(userRegister,navigation))
    //   // dispatch({ type: 'SET_USER_REGISTER', value: {} });
    // }
    const onErrorUpdateUser = (err)=>{
      
    }
    // dispatch({ type: 'SET_USER_REGISTER', value: userRegister });
    // storeData('authUser', userRegister)
    const onSuccessOTP = async (resOtp)=>{
      await dispatch(signInActionLB(userValidation,navigation))
    }
     const formValidasiEmail = {
      email : userValidation.email,
      code_otp : formVerifikasi.code_otp
     }
    dispatch(validationOTP(formValidasiEmail, onSuccessOTP))
    // navigation?.replace('LokasiUser')
  }
  useEffect(() => {
    if(navigation?.isFocused()){
    //startTimer()
    if (timerOn === true) startTimer();
    }else{

    }
    console.log('timeron',timerOn)
    if (timerOn === false) BackgroundTimer?.stopBackgroundTimer();
    
    return () => {
     
      BackgroundTimer.stopBackgroundTimer();
      //()
    };
    
  }, [navigation])
  return (
    <SafeAreaView style={[ms.containerPage]}>
      <ScrollView>
        <View style={[ms.pd(30)]}>
          <View>
            <View style={[ms.pdV(30), ms.aiJc()]}>
              <Image
                source={IconDicuci}
                style={[ms.wh(180, 50)]}
              />
            </View>

            <View style={[ms.pdV(5)]}>
              <Text style={[ms.fzBCLh(18, '400', '#6C6C6C',22)]}>Verification Code</Text>
            </View>
            <View style={[ms.pdV(5)]}>
              <Text style={[ms.fzBCLh(14, '400', '#6C6C6C',17)]}>Enter the 4 digit send to your phone number</Text>
            </View>
            <View style={[ms.pdV(5)]}>
              <Text style={[ms.fzBCLh(14, '400', '#6C6C6C',17)]}>Kode verifikasi dikirim ke email <Text style={[ms.fzBCLh(14, '700', '#6C6C6C',17)]}>'{userRegister?.email}'</Text> dan nomor Whatsapp ini</Text>
            </View>
          </View>
          <View style={ms.row}>
            <View style={[ms.width(13/100 * windowWidth),ms.bdTw(1),ms.bdLw(1),ms.bdBw(1),ms.bdC('#B3B3B3'),ms.bdRTLR(10),ms.bdRBLR(10), ms.aiJc(),ms.bc(colors.silverLight)]}>
              <Text style={[ms.fzBCLh(14,'700','#B3B3B3',17)]}>+62</Text>
            </View>
            <View style={[ms.width(72/100 * windowWidth)]}>
            <TextInput 
            value={userValidation?.email}
            onChangeText={(value)=>{
              // setFormVerifikasi({
              //   ...formVerifikasi,
              //   code_otp : value
              // })
            }}
            placeholder='878712987433'
            placeholderTextColor={colors.silver} 
            keyboardType='phone-pad'
            style={[ms.width('100%'), ms.bdTw(1),ms.bdRw(1),ms.bdBw(1),ms.bdC('#B3B3B3'), ms.bdRTRR(10), ms.bdRBRR(10),ms.fzBCLh(14,'700','#B3B3B3',17), ms.pdH(10)]}/>
            <View style={[ms.wh(40,30),ms.post(),ms.t('20%'),ms.r('5%'),ms.aiJc()]}>
              <Icon name="edit" size={18} color={colors.silver}/>
            </View>
            </View>
           
          </View>
          <View style={[ms.pdV(10), ms.aiJc()]}>
            <OTPInputView
              style={{ width: '80%', height: 62, color: colors.silver }}
              pinCount={4}
              code={formVerifikasi?.code_otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={value => {
                  setFormVerifikasi({
                    ...formVerifikasi,
                    code_otp : value
                  })
              }}
              autoFocusOnLoad
              placeholderTextColor={colors.silver}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={(code) => {
                console.log(`Code is ${code}, you are good to go!`)
              }}
              onSubmitEditing={() => {
                onSubmitOtp()
                // onValidasiOtp(route?.params?.status)
              }}
            />
          </View>
          <View style={[ms.pdV(5), ms.ai()]}>
            <View style={[ms.aiJc()]}>
              <View style={[ms.wh(50,50), ms.bdW(10), ms.bdR(50),ms.bdC('#F5D33B'),ms.aiJc()]}>
                <Text style={[ms.fzBCLh(14, '400', '#6C6C6C',17)]}>{secondsLeft}</Text>
              </View>
            </View>
            </View>
            <TouchableOpacity onPress={()=>{
              onSendOTP()
            }} style={[ms.pdV(5), ms.wh(150,30),ms.aiJc()]}>
              <Text style={[ms.fzBCLh(16, '600', '#30A5BF',17)]}>Resend Code</Text>
            </TouchableOpacity>
            <Gap height={20}/>
            <View style={[ms.pd(10)]}>
              <ButtonL label='Verifikasi' 
              onPress={()=>{
                onSubmitOtp()
              }}
              backgroundColor={colors.primary} width={'100%'} height={40} color={colors.white} fontSize={14}/>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifikasiEmail;

const styles = StyleSheet.create({
  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  underlineStyleBase: {
    width: windowWidth * 14/100,
    height: 62,
    borderWidth: 1,
    borderRadius: 10,
    color: colors.dark,
    borderColor: colors.gray,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});
