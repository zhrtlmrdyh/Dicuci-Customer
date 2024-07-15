import React, { useState } from "react";
import { SafeAreaView, Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import ms from "../../utils/ms";
import { colors } from "../../utils";
import { IconTextDicuci, IconTextMitra } from "../../assets/icon";
import { LoginEmail, LoginPhone } from "../../components";

const Login = ({ navigation }) => {
    const [Type, setType] = useState([
        {
            id:1,
            login: "Phone Number", 
        },
        {
            id:0,
            login: "Email", 
        }
    ])

    const [clickedId, setClickedId] = useState(1);

    const handleClick = (value) => {
        console.log(value)
        setClickedId(value)
    }

    return (
        <SafeAreaView style={[ms.containerPage, ms.pdH(39)]}>
            <View style={[ms.pdT(65), ms.aiJc()]}>
                <Image
                    source={IconTextDicuci}
                />
            </View>
            {/* <View style={[ms.pdT(5), ms.aiJc(), ms.l(15)]}>
                <Image
                    source={IconTextMitra}
                />
            </View> */}

            <View style={[ms.pdT(73)]}>
                <Text style={[ms.fzBC(18, '400', '#6C6C6C')]}>Login to your Account</Text>
            </View>

            <View style={[ms.row, ms.pdT(15), ms.ai()]}>
            {Type.map((tp, index) => {
                return (
                    <TouchableOpacity 
                    onPress={() => {
                        handleClick(index)
                    }}
                    key={index} style={[ms.pdH(15)]}>
                        <View
                        
                        style={[
                            index === clickedId ? styles.buttonOn : styles.buttonOff,
                        ]}
                        >
                            <Text key={index} style={[
                                index === clickedId ? styles.textOn : styles.textOff
                            ]}
                            >{tp.login}</Text>
                        </View>
                    </TouchableOpacity>
                )
            })}
            </View>

            {
                clickedId == 0 && (
                    <LoginPhone 
                    // onPress={() => {
                    //     navigation.navigate("VerificationCode")
                    // }}
                    onPressRegis={() => {
                        navigation.navigate("Register")
                    }}
                    />
                )
            }

            {
                clickedId == 1 && (
                    <LoginEmail 
                    onPress={() => {
                        navigation.navigate("Register")
                    }}
                    // onPressPass={() => {
                    //     navigation.navigate("ForgotPassword")
                    // }}
                    />
                )
            }
        </SafeAreaView>
    )
}

export default Login;

const styles = StyleSheet.create({
    buttonOff:{
        
    },
    buttonOn:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        borderRadius: 6,
        borderColor: colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
    textOff: {
        fontSize:12,
        color: '#B1B1B1',
        fontWeight: '700',
        lineHeight: 14
    },
    textOn:{
        fontSize:12,
        color: colors.white,
    },
})