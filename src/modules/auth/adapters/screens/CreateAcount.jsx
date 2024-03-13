import React, {useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import {Input, Button, Image, Icon} from '@rneui/base';
import Logo from '../../../../../assets/restaurant.png';
import Loading from "../../../../kernel/components/Loading";
import Login from "./Login";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function CreateAcount(props){
    const {navigation} = props;
    const [showPassword, setShowPassword] = useState(true);
    const [showMessage, setShowMessage] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const auth = getAuth();

    const CreateNewAccount = async () => {
        if (email.trim() !== '' && password.trim() !== '') {
          setVisible(true);
          try {
            const response = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );
    
          } catch (error) {
            console.log('error', error);
          } finally {
            setVisible(false);
          }
        } else {
          setShowMessage("Campos Obligatorios");
        }
      };

      const confirmarPass = () => {
        if (!isEmpty(password)){
          setShowMessage("Password incorrecto");
        }
      };

    return(

        <View style={styles.container}>
            <Image 
            source={Logo}
            style={styles.logo}
            resizeMode="auto"
            />

            <Input
            placeholder="user@gmail.com"
            label='Ingresa un correo electrónico'
            keyboardType="email-address"
            onChange={({nativeEvent: {text}}) => setEmail(text)}
            labelStyle={styles.label}
            containerStyle={styles.input}
            rightIcon={
                <Icon
                type="material-community"
                name={'email-outline'}
                color={'#cfac47'}
                />
            }
            errorMessage={showMessage}
            />

            <Input
            placeholder="******"
            label='Crea tu nueva contraseña'
            labelStyle={styles.label}
            onChange={({nativeEvent: {text}}) => setPassword(text)}
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
            errorMessage={showMessage}
            />

            <Input
            placeholder="******"
            label='Confirma tu contraseña'
            labelStyle={styles.label}
            onChange={({nativeEvent: {text}}) => setPassword(text)}
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
            errorMessage={showMessage}
            />

            <Button
            title={'Crear cuenta'}
            containerStyle={styles.btncontainer}
            buttonStyle={styles.btnstyle}
            onPress={CreateNewAccount}
            errorMessage={showMessage}
            />

            <Button
            title={'Volver al inicio de sesión'}
            type="clear"
            onPress={() => navigation.navigate(Login)}
            />
            <Loading
            visible={visible}
            title='Creando Cuenta'
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