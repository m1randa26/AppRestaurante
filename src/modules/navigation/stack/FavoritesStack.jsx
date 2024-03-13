
import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import Favorites from '../../favorites/adapters/screens/Favorites';


const Stack = createStackNavigator();


export default function FavoritesStack(){
  return (
    <Stack.Navigator>
        <Stack.Screen
        name='Favorites'
        component={Favorites}
        options={{title: 'Mis favoritos'}}
        />
    </Stack.Navigator>
  )
}
