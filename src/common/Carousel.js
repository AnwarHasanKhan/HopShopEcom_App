import { View, Text, FlatList, Dimensions, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

const Carousel = () => {
  const screenWidth = Dimensions.get('window').width;

  const carouselData = [
    {
      id: '01',
      image: require('../assets/6560450.png'),
    },
    {
      id: '02',
      image: require('../assets/6560451.png'),
    },
    {
      id: '03',
      image: require('../assets/6560452.png'),
    },
    {
      id: '04',
      image: require('../assets/6560453.png'),
    },
  ];

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex =
        currentIndex === carouselData.length - 1 ? 0 : currentIndex + 1;

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <Image
          source={item.image}
          style={{ height: 160, width: screenWidth }}
        />
      </View>
    );
  };

  const handleScroll = event => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentIndex(index);
  };

  const renderDotIndicators = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        gap: 8,
        alignSelf: 'center',
      }}
    >
      {carouselData.map((_, index) => (
        <View
          key={index}
          style={{
            height: 8,
            width: 8,
            borderRadius: 4,
            marginHorizontal: 5,
            backgroundColor: currentIndex === index ? '#ffffffff' : '#000000ff',
          }}
        />
      ))}
    </View>
  );
  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={carouselData}
        horizontal
        pagingEnabled
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        onScroll={handleScroll}
        keyExtractor={item => item.id}
        initialNumToRender={3}
        windowSize={3}
      />
      {renderDotIndicators()}
    </View>
  );
};

export default Carousel;
