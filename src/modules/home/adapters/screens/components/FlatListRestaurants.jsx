import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image, AirbnbRating } from '@rneui/base';

export default function FlatListRestaurants(props) {
    const {image, title, description, rating} = props;
  return (
    <View style={styles.row}>
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
        <View style={{flex: 1, flexDirection: 'column', marginLeft: 2}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.title}>{title}</Text>
          <AirbnbRating 
            count={5}
            defaultRating={rating}
            size={12}
            isDisabled={true}
            showRating ={false}
          />
          </View>
          <Text style={styles.description}>
            {description}
          </Text>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        elevation: 3,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 8,
        marginBottom: 9
      },
    
      image: {
        width: 124,
        height: 124,
        borderRadius: 12
      },
    
      title: {
        fontSize: 14,
        fontWeight: "bold",
      },
    
      description: {
        fontSize: 12,
      },
})