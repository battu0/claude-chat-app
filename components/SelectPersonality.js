import React, { useRef, useState } from 'react'
import { View, StyleSheet, FlatList, useWindowDimensions } from 'react-native'
import { IconButton } from 'react-native-paper'
import personalities from '../personalities'

import Personality from './Personality'
import theme from '../utils/theme'

const SelectPersonality = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef(null)
  const { width } = useWindowDimensions()

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index)
    }
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const goToPreviousSlide = () => {
    if (currentIndex > 0) {
      flatListRef.current.scrollToIndex({ index: currentIndex - 1 })
    }
  }

  const goToNextSlide = () => {
    if (currentIndex < personalities.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 })
    }
  }

  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.flatListContainer}>
        <FlatList
          ref={flatListRef}
          data={personalities}
          renderItem={({ item }) => <Personality item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />
        <View style={styles.navigationContainer}>
          <IconButton
            icon="chevron-left"
            iconColor={theme.colors.onSurface}
            size={48}
            onPress={goToPreviousSlide}
            style={styles.iconButton}
            disabled={currentIndex === 0}
          />
          <IconButton
            icon="chevron-right"
            iconColor={theme.colors.onSurface}
            size={48}
            onPress={goToNextSlide}
            style={styles.iconButton}
            disabled={currentIndex === personalities.length - 1}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  flatListContainer: {
    flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
  },
  iconButton: {
    alignSelf: 'center',
  },
  // flatList: {
  //   flex: 1,
  // },
  // iconButton: {
  //   marginHorizontal: 8,
  // },
})

export default SelectPersonality
