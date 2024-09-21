import React from 'react'
import { View, StyleSheet, useWindowDimensions } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { Image } from 'expo-image'
import theme from '../utils/theme'

const OnboardingItem = ({ item }) => {
  const { width, height } = useWindowDimensions()

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.image}
        contentFit="contain"
        style={[styles.image, { width: width * 0.6, height: height * 0.21 }]}
      />

      <View style={{ rowGap: 56, alignItems: 'center' }}>
        <View style={styles.textContainer}>
          <Text style={styles.title} variant="titleLarge">
            {item.title}
          </Text>
          <Text style={styles.description} variant="bodyLarge">
            {item.description}
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <Button mode="contained-tonal" style={styles.btn}>
            GET STARTED
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    rowGap: 64,
  },
  textContainer: {
    rowGap: 26,
  },
  title: {
    color: theme.colors.onSurface,
    textAlign: 'center',
  },
  description: {
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  btnContainer: {},
  btn: {},
})

export default OnboardingItem
