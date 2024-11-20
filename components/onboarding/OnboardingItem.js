import React from 'react'
import { View, StyleSheet, useWindowDimensions } from 'react-native'
import { Text } from 'react-native-paper'
import { Image } from 'expo-image'

const OnboardingItem = ({ item }) => {
  const { width, height } = useWindowDimensions()

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        style={[styles.image, { width }]}
        contentFit="contain"
      />

      <View style={{ flex: 0.3 }}>
        <Text style={styles.title} variant="titleLarge">
          {item.title}
        </Text>
        <Text style={styles.description} variant="bodyLarge">
          {item.description}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    paddingHorizontal: 64,
  },
})

export default OnboardingItem
