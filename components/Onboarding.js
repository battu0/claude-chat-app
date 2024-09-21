import React, { useState, useRef } from 'react'
import { View, StyleSheet, FlatList, useWindowDimensions } from 'react-native'

import slides from '../slides'
import OnboardingItem from './OnboardingItem'
import Paginator from './Paginator'
import theme from '../utils/theme'

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const slidesRef = useRef(null)
  const { width } = useWindowDimensions()

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index)
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.content}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
          style={{ flexGrow: 0 }}
        />
        <View>
          <Paginator data={slides} currentIndex={currentIndex} />
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 16,
  },
})

export default Onboarding
