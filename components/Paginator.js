import React from 'react'
import { View, StyleSheet } from 'react-native'
import theme from '../utils/theme'

const Paginator = ({ data, currentIndex }) => {
  return (
    <View style={{ flexDirection: 'row', height: 64 }}>
      {data.map((_, i) => {
        return (
          <View
            style={[
              styles.dot,
              {
                opacity: currentIndex === i ? 1 : 0.3,
              },
            ]}
            key={i.toString()}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: theme.colors.primary,
  },
})

export default Paginator
