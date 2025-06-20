// App.js
import React, { useRef, useState } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { colors, wp } from '../../services';

const { width } = Dimensions.get('window');

const images = [
    require('../../assets/images/car.png'), // Add your images here
    require('../../assets/images/bike.png'), // Add your images here
    require('../../assets/images/car.png'), // Add your images here
];

export default function CarDetailImageSlider() {
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScroll = (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index);
    };

    const goToSlide = (index) => {
        flatListRef.current.scrollToOffset({ offset: index * width });
        setCurrentIndex(index);
    };

    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            <Image source={item} style={styles.image} />
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={images}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.pagination}>
                {images.map((_, index) => (
                    <TouchableOpacity key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} onPress={() => goToSlide(index)} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide: {
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        margin: wp(2),
        width: wp(95),
        height: wp(48.9),
        resizeMode: 'cover',
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: -10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#DBDBDB',
        margin: 2,
    },
    activeDot: {
        backgroundColor: colors.primary,
        width: 20,
    },
});
