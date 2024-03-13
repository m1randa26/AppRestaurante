import { StyleSheet, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Button } from '@rneui/themed';
import InfoProfile from './components/InfoProfile';
import { getAuth } from 'firebase/auth';

export default function Profile() {
  const [user, setUser] = useState(null);
    const auth = getAuth();
    //Forma básica de un UseEffect
    useEffect(() => {
      const profile = auth.currentUser;
      if(profile!=null){
        setUser(profile);
      }
    },[]);
  
  return (
    <View style={styles.container}>
      
      {
        user && (
          <InfoProfile 
          infoUser={user}
          />
        )
      }

      <Button
        title={"Cerrar Sesión"}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnStyle}
        titleStyle={{color: 'black'}}
        onPress={() => auth.signOut()}
      />

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    btnContainer: {
        width: '80',
        borderRadius: 16,
    },
    btnStyle: {
        backgroundColor: '#fcd562'
    },
    row: {
      flexDirection: 'row',
      padding: 16,
    }
})