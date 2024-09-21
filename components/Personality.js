import React from 'react'
import { View, StyleSheet, Image, useWindowDimensions } from 'react-native'
import { Button, Text } from 'react-native-paper'
import theme from '../utils/theme'

const Personality = ({ item }) => {
  const { width } = useWindowDimensions()

  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.contentWrapper}>
        <View style={styles.content}>
          <Image source={item.image} style={{ width: 120, height: 120 }} />
          <Text style={styles.title} variant="titleMedium">
            {item.title}
          </Text>
          <Text style={styles.description} variant="bodyMedium">
            {item.description}
          </Text>
        </View>
      </View>
      <Button mode="outlined" onPress={() => console.log('Pressed')}>
        Select {item.name}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 56,
    // backgroundColor: 'aqua',
  },
  contentWrapper: {
    // flex: 1,
    flexDirection: 'row',
    // columnGap: 24,
    // backgroundColor: 'black',
  },
  content: {
    width: '60%',
    rowGap: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: theme.colors.onSurface,
    textAlign: 'center',
  },
  description: {
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
})

export default Personality
