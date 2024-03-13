import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import FlatListRestaurant from './components/FlatListRestaurants';
import { collection, getFirestore, getDocs } from "firebase/firestore";


export default function Home() {
  const [restaurants, setRestaurants] = useState(null);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const arrayRestaurants = [];
    const db = getFirestore();
    (async () => {
      const querySnapshot = await getDocs(collection(db, "restaurants"));
      querySnapshot.forEach((doc) => {
        arrayRestaurants.push({
          id: doc.id,
          title: doc.data()['title'],
          description: doc.data()['description'],
          rating: doc.data()['rating'],
          image: doc.data()['image']
        });
      });
      console.log(arrayRestaurants);
      setRestaurants(arrayRestaurants);
    })()
  }, [])

  return (

    <View style={styles.container}>
      <FlatList
        data={restaurants}
        renderItem={({ item }) =>
          <FlatListRestaurant
            image={item.image}
            title={item.title}
            description={item.description}
            rating={item.rating}
          />
        }
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  storiesContainer: {
    flexDirection: 'row',
    padding: 8,
  },
  storyItem: {
    marginRight: 12,
    alignItems: 'center',
  },
  avatarContainer: {
    borderWidth: 3,
    borderColor: 'tomato',
  },
});