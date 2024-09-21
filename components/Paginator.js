import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import theme from '../utils/theme'

const Paginator = ({ data, currentIndex }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {data.map((_, i) => {
        return (
          <View
            style={[
              styles.dot,
              {
                backgroundColor:
                  currentIndex === i
                    ? theme.colors.primary
                    : theme.colors.primaryFixed,
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
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 4,
  },
})

export default Paginator
