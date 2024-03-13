import { StyleSheet, Text, View } from "react-native";
import React, {useState} from "react";
import UsuarioAvatar from "../../../../../../assets/usuario.png";
import { Avatar } from "@rneui/base";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import {auth, storage} from "../../../../../config/util/firebaseConnection";
import {updateProfile} from 'firebase/auth';
import {ref, getDownloadURL, uploadBytes} from "firebase/storage";
import Loading from "../../../../../kernel/components/Loading";

export default function InfoProfile(props) {
    const {infoUser:{photoURL, displayName, email, uid}} = props;
    const [showLoading, setShowLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const uploadImage = async (uri) => {
        setShowLoading(true);
        const response = await fetch(uri);
        const {_bodyBlob} = response;
        const storageRef = ref(storage, `avatar/${uid}`)
        return uploadBytes(storageRef, _bodyBlob)
    };

    const uploadPhotoUrl = async () => {
        getDownloadURL(ref(storage, `avatar/${uid}`)).then((url) => {
            updateProfile(auth.currentUser, {
                photoURL: url,
            }). catch((error) => {
                console.error(error);
                alert("Ocurrió un error al actualizar la foto de perfil")
            }). finally(() => {
                setShowLoading(false);
            });
        });
    };

    const changeAvatar = async () => {
      const resultPermission = await MediaLibrary.requestPermissionsAsync();
      if(resultPermission.status !== "denied"){
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4,3],
          quality: 1,
          //base64: true, --> El ImagePicker ya convierte a base 64, por defecto es FALSE. Solo se debe agregar la propiedad y ponerla en TRUE
        });
        if(!result.canceled){
          setIsVisible(true);
          try {
            await uploadImage(result.assets[0].uri); // --> si tuviera el base64, entonces pongo .base64 en vez de .uri
            await uploadPhotoUrl();
            alert("Foto de perfil actualizada")
          } catch (error) {
            alert("Error al subir la imagen")
          }finally{
            setIsVisible(false);
          }
        }
      }else{
        alert ("Es necesario aceptar los permisos de la galeria");
      }
    }

  return (
    <View style={styles.row}>
      <Avatar
        size={64}
        rounded
        source={photoURL ? {uri: photoURL} : UsuarioAvatar }
        title="Bj"
        containerStyle={{ backgroundColor: "grey" }}
      >
        <Avatar.Accessory size={23} onPress={changeAvatar}/>
      </Avatar>
      <View style={{ flexDirection: "column", marginLeft: 16 }}>
        <Text style={{ fontSize: 14, fontWeight: "bold" }}>
          {displayName || "Anónimo"}
        </Text>
        <Text style={{ fontSize: 12 }}>
          {email || "No hay correo electrónico"}
        </Text>
      </View>
      <Loading visible={isVisible} title='Cargando...'/>
    </View>
  );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        padding: 16,
      },
});
