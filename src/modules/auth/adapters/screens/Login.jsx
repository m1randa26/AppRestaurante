import React, { useState } from "react";
import {View, StyleSheet, Text} from 'react-native';
import {Input, Button, Image, Icon} from '@rneui/base'
import Logo from '../../../../../assets/restaurant.png'
import {isEmpty} from 'lodash'
import CreateAcount from "./CreateAcount";
import Loading from "../../../../kernel/components/Loading";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login(props){
    const {navigation} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [showMessage, setShowMessage] = useState({email:'', password:''});
    const [visible, setVisible] = useState(false);
    const auth = getAuth();
    const login = async() => {
        if (!isEmpty(email) && !isEmpty(password)) {
            setShowMessage({email:"", password:""})
            setVisible(true);
            try {
                const response = await signInWithEmailAndPassword(auth, email, password);
                navigation.navigate("UserLogged");
                console.log(response.user);
            } catch (error) {
                console.log("error", error)
                setShowMessage({email:"", password:"Usuario o contrasena incorrectos"});
            }finally{
                setVisible(false);
            }
        }else{
            setShowMessage({email:"Campo obligatorio", password:"Campo obligatorio"})
        }
    }
    // const [count, setCounter] = useState(1);
    // <Button onPress={setCounter(count + 1)}>Sumar</Button>
    // <Text>{count}</Text>
    
    return(
        <View style={styles.container}>
            <Image 
            source={Logo}
            style={styles.logo}
            resizeMode="contain"
            />
            <Input
            placeholder="user@gmail.com"
            label='Correo electronico'
            keyboardType="email-address"
            onChange={({nativeEvent: {text}}) => setEmail(text)}
            labelStyle={styles.label}
            containerStyle={styles.input}
            errorMessage={showMessage.email}
            rightIcon={
                <Icon
                type="material-community"
                name={'email-outline'}
                color={'#cfac47'}
                />
            }
            />

            <Input
            placeholder="******"
            label='Contraseña'
            onChange={({nativeEvent: {text}}) => setPassword(text)}
            labelStyle={styles.label}
            containerStyle={styles.input}
            secureTextEntry={showPassword}
            rightIcon={
                <Icon
                type="material-community"
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                color={'#cfac47'}
                onPress={()=> setShowPassword(!showPassword)}
                />
            }
            errorMessage={showMessage.password}
            />
            
            <Button
            title={'Iniciar sesion'}
            onPress={login}
            containerStyle={styles.btncontainer}
            buttonStyle={styles.btnstyle}
            />
            <Button
            title={'Registrate'}
            type="clear"
            onPress={() => navigation.navigate(CreateAcount)}
            />
            <Loading
            visible={visible}
            title='Iniciando sesion'
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        padding: 16
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 25
    },
    label: {
        color: '#cfac47'
    },
    input: {
        paddingHorizontal: 20,
        marginVertical: 8
    },
    btnstyle: {
        backgroundColor: '#cfac47'
    },
    btncontainer: {
        width: '80%',
    }
})