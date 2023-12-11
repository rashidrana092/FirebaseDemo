import React, { useState, useRef } from 'react';
import { View, Dimensions, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Logo, Toast, Icon, TextInput, Button, ScrollView, Wrapper, Space, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
 import auth from '@react-native-firebase/auth';

const CodeVerification = () => {
    const navigation = useNavigation()
    const [show, setShow] = useState(false);
    const [otpInput,setOtpInput]=useState('');
    const [confirmData,setConfirmData]=useState('');
    const [confirm, setConfirm] = useState(null);

    const confirmOTP = async () =>{
        try{
            await confirm.confirm(otpInput);
            console.log(response);
            Alert.alert('OTP verified');
            navigation.navigate("HomeScreen")
        }catch(err){
            console.log(err);
        }
        
    }

 
    return (
        <View  style={{flex:1,backgroundColor:"#F8F9F9",justifyContent:"center"}}>
            
            <View >
                <View >
                    <Text style={{fontSize:30,fontWeight:"900",color:"#383838",textAlign:"center"}}>
                        Enter Verification{`\n`}Code
                    </Text>
                    <View style={{flexDirection:"row",borderColor:"#DEE1E1",borderWidth:1,borderRadius:8,paddingVertical:10,paddingHorizontal:10}}>
                        <View style={{flex:1,justifyContent:"center"}}>
                            <TextInput
                                inputStyle={{padding:0,height:"auto",paddingHorizontal:10}}
                                onChangeText={value => setOtpInput(value)}
                            />
                        </View>
                    </View>
                    <Text onPress={() => console.log("PRESS")} style={{fontSize:14,fontWeight:"400",textAlign:"center"}}>
                        <Text style={{color:"#586160"}}>
                            Didn’t get it? 
                        </Text>
                        <Text style={{color:"#383838"}}>
                            {" Resend Code"}
                        </Text>
                    </Text>
                    </View>
                    <Button
                        title="Confirm Code"
                        onPress={() => confirmOTP()}
                    />
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    inputStyle: {
        color: "#000000",
        fontWeight: "400",
        fontSize: 14,
        marginLeft: 20,
        textAlign: "center",
        width: 48,
        height: 52,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#DEE1E1",
        borderRadius: 8,
    },
})

export default CodeVerification;
