import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { signInActionLB } from "../../../redux/action";
import { colors } from "../../../utils";
import ms from "../../../utils/ms";
import Icon from 'react-native-vector-icons/Feather';

const LoginPhone = ({onPress, onPressRegis}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const [isSecureEntry, setIsSecureEntry] = useState(true)
    const [icon, setIcon] = useState("eye-off");

    const [inputs, setInputs] = useState({
        hp: '',
        password: '',
    });

    const onLogin = async () => {
        // alert('1')
        let isValid = true;

        if (!inputs?.hp) {
            return showMessage('Phone Number Anda belum diisi', 'danger');
            isValid = false;
        }
        if (!inputs?.password) {
            return showMessage('password Anda belum diisi', 'danger');
            isValid = false;
        }

        if (isValid) {
            const formData = (
                {
                    hp: inputs?.hp,
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
                <View style={{ borderRadius: 10, borderWidth: 1, borderColor: '#B3B3B3', paddingHorizontal: 16, height: 48, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={[ms.width('10%')]}>
                        <Text style={[ms.fzBC(14, '700', '#B3B3B3')]}>+62</Text>
                    </View>
                    <View style={[ms.width('90%')]}>
                        <TextInput 
                        placeholder="Phone Number"
                        keyboardType='phone-pad'
                        autoCapitalize='none'
                        placeholderTextColor={colors.silverNormal}
                        value={inputs?.hp}
                        onChangeText={(value) => {
                            setInputs({
                                ...inputs,
                                hp: value,
                            })
                        }}
                        style={[ms.fzBCLh(14,'400',colors.silverDark,16)]}
                        />
                    </View>
                </View>
                <View style={[ms.wh('100%',16)]}/>
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
                <TouchableOpacity onPress={onLogin}>
                    <View style={[ms.wh('100%', 48), ms.bc(colors.primary), ms.br(10), ms.aiJc(), ms.bdC(colors.primary)]}>
                        <Text style={[ms.fzBC(14, '700', colors.white)]}>Login</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={[ms.aiJc(), ms.pdT(30), ms.row]}>
                <View>
                    <Text style={[ms.fzBC(14, '400', '#6C6C6C')]}>Don't have an account ? </Text>
                </View>
                <View>
                    <TouchableOpacity onPress={onPressRegis}>
                        <Text style={[ms.fzBC(14, '400', colors.primary)]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default LoginPhone;