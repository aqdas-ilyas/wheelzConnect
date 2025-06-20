import React, { useState, useRef, useEffect } from 'react';
import { View, Text, useWindowDimensions, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { colors, hp, fontFamily, wp, routes, heightPixel, widthPixel, appIcons, appImages } from '../../../services';
import appStyles from '../../../services/utilities/appStyles';
import Header from '../../../components/header';
import { Loader } from '../../../components/loader/Loader';
import CarDetailImageSlider from '../../../components/carDetailImageSlider/CarDetailImageSlider';
import { useIsFocused, useTheme } from '@react-navigation/native';
import { getLocationPermission } from '../../../common/HelpingFunc';
import Geolocation from '@react-native-community/geolocation';
import Button from '../../../components/button';
import { useSelector } from 'react-redux';

const CarDetailData = [
    { id: 1, title: 'Company', type: 'Audi' },
    { id: 2, title: 'Model', type: 'E-Tron-GT' },
    { id: 3, title: 'Year', type: '2023' },
    { id: 4, title: 'Vehicle Type', type: 'Sedan' },
    { id: 5, title: 'Interior Color', type: 'Black' },
    { id: 6, title: 'Exterior Color', type: 'Grey' },
    { id: 7, title: 'Transmission', type: 'Automatic' },
    { id: 8, title: 'Doors', type: '4' },
    { id: 9, title: 'Fuel Type', type: '4' },
    { id: 10, title: 'Mileage', type: '4' },
]

const RequestProfile = (props) => {
    const { colors } = useTheme()
    const darModeValue = useSelector(state => state.user.darkMode)
    const [isLoading, setIsLoading] = useState(false)

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <Loader loading={isLoading} />
            <View style={{ margin: wp(4) }}>
                <Header leftIcon onleftIconPress={() => props.navigation.goBack()} title={'Sarah Johnson'} />

                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View style={styles.imageTopView}>
                            <View style={styles.imageView}>
                                <Image source={appImages.userImage} style={[styles.imageStyle, { resizeMode: 'cover' }]} />
                            </View>
                        </View>

                        <Text style={[styles.mainTitle, { color: colors.lable, }]}>Driving License</Text>

                        <View>
                            <Text style={[styles.headerText, { color: colors.lable, }]}>Front</Text>
                            <Image source={appImages.frontCard} style={styles.cardImage} />
                        </View>
                        <View style={{ marginTop: wp(2) }}>
                            <Text style={[styles.headerText, { color: colors.lable, }]}>Back</Text>
                            <Image source={appImages.backCard} style={styles.cardImage} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default RequestProfile;

const styles = StyleSheet.create({
    imageTopView: {
        marginTop: hp(4),
        alignSelf: 'center',
        justifyContent: 'center'
    },
    imageView: {
        width: wp(25),
        height: wp(25),
        borderRadius: widthPixel(100),
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: widthPixel(100)
    },
    headerText: {
        fontSize: hp(1.6),
        lineHeight: 24,
        fontFamily: fontFamily.PoppinsMedium,
        marginVertical: wp(1)
    },
    cardImage: {
        height: wp(59),
        width: wp(90),
        // resizeMode: 'contain'
    },
    editIcon: {
        width: wp(8),
        height: wp(8),
    },
    mainTitle: {
        marginTop: wp(6),
        marginBottom: wp(2),

        fontSize: hp(2),
        lineHeight: hp(3),
        fontFamily: fontFamily.PoppinsSemiBold,
    },
});

