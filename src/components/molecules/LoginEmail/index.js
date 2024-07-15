import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { colors } from "../../../utils";
import ms from "../../../utils/ms";
import Icon from 'react-native-vector-icons/Feather';
import { showMessage } from "react-native-flash-message";
import { signInActionLB } from "../../../redux/action";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";


const LoginEmail = ({ onPress, onPressPass }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const [isSecureEntry, setIsSecureEntry] = useState(true)
    const [icon, setIcon] = useState("eye-off");

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const onLogin = async () => {
        // alert('1')
        let isValid = true;

        if (!inputs?.email) {
            showMessage('Email Anda belum diisi', 'danger');
            isValid = false;
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            showMessage('Please input a valid email', 'danger');
            isValid = false;
        }
        if (!inputs?.password) {
            showMessage('password Anda belum diisi', 'danger');
            isValid = false;
        }

        if (isValid) {
            const formData = (
                {
                    email: inputs?.email.toLowerCase(),
                    password: inputs?.password,
                }
            )

            console.log("form data", formData)

            await dispatch(signInActionLB(formData, navigation));

            // onPress();
        }
    }

    return (
        <View>
            <View style={[ms.pdV(32)]}>
                <View style={[ms.pdB(16)]}>
                    <View style={{ borderRadius: 10, borderWidth: 1, borderColor: '#B3B3B3', paddingHorizontal: 16, height: 48 }}>
                        <TextInput
                            value={inputs?.email}
                            onChangeText={(value) => {
                                setInputs({
                                    ...inputs,
                                    email: value,
                                })
                            }}
                            placeholder="Email"
                            autoCapitalize='none'
                            placeholderTextColor={colors.silverNormal}
                            style={[ms.fzBCLh(14, '400', colors.silverDark, 16)]}
                        />
                    </View>
                </View>
                <View>
                    <View style={{ borderRadius: 10, borderWidth: 1, borderColor: '#B3B3B3', paddingHorizontal: 16, height: 48, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={[ms.width('92%')]}>
                            <TextInput
                                value={inputs?.password}
                                onChangeText={(value) => {
                                    setInputs({
                                        ...inputs,
                                        password: value,
                                    })
                                }}
                                placeholder="Password"
                                autoCapitalize='none'
                                placeholderTextColor={colors.silverNormal}
                                style={[ms.fzBCLh(14, '400', colors.silverDark, 16)]}
                                secureTextEntry={isSecureEntry} />
                        </View>
                        <View style={[ms.width('8%')]}>
                            <TouchableOpacity onPress={() => setIsSecureEntry((prev) => !prev)}>
                                <Icon name={isSecureEntry ? "eye-off" : "eye"} style={[ms.txC('#9DA8B1'), ms.fz(18)]} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            <View>
                <TouchableOpacity
                    onPress={() => {
                        onLogin()
                    }}
                >
                    <View style={[ms.wh('100%', 48), ms.bc(colors.primary), ms.br(10), ms.aiJc(), ms.bdC(colors.primary)]}>
                        <Text style={[ms.fzBC(14, '700', colors.white)]}>Login</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={[ms.aiJc(), ms.pdT(20)]}>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('GantiPassword')
                }}>
                    <Text style={[ms.fzBC(14, '400', colors.primary)]}>Forgot Password ?</Text>
                </TouchableOpacity>
            </View>

            <View style={[ms.aiJc(), ms.pdT(40), ms.row]}>
                <View>
                    <Text style={[ms.fzBC(14, '400', '#6C6C6C')]}>Don't have an account ? </Text>
                </View>
                <View>
                    <TouchableOpacity onPress={onPress}>
                        <Text style={[ms.fzBC(14, '400', colors.primary)]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default LoginEmail