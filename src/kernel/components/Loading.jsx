import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { Overlay } from '@rneui/base'

export default function Loading(props) {
    const {visible, title} = props
  return (
    <Overlay isVisible={visible} 
        windoswBackgroundColor='rgb(0,0,0,0.5)'
        overlayBackgroundColor='transparent'
        overlayStyle={styles.overlay}
        >
        <View style={styles.container}>
            <ActivityIndicator size='large' color={'green'}/>
            <Text style={styles.title}>{title}</Text>
        </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
    overlay: {
        height: 160,
        width: 250,
        backgroundColor: '#fff',
        borderColor: 'tomato',
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: 'tomato',
        textTransform: 'uppercase',
        marginTop: 10,
        textAlign: 'center'

    },
    container: {

    }
})