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

const RequestDetail = (props) => {
    const { colors } = useTheme()
    const darModeValue = useSelector(state => state.user.darkMode)
    const [isLoading, setIsLoading] = useState(false)
    const [isActive, setIsActive] = useState(true);

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <Loader loading={isLoading} />
            <View style={{ margin: wp(4) }}>
                <Header leftIcon onleftIconPress={() => props.navigation.goBack()} title={'Request Detail'} />
            </View>

            <ScrollView style={{ flex: 1 }}>

                <CarDetailImageSlider />

                <View style={{ margin: wp(4) }}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center" }}>
                        <Text style={[styles.carTitle, { color: colors.lable }]}>Audi E-Tron GT</Text>
                        <Image source={appIcons.heart} style={{ width: wp(5), height: wp(5), tintColor: colors.fullBlack, resizeMode: 'contain' }} />
                    </View>

                    <View style={styles.priceContainer}>
                        <Text style={[styles.price, { color: colors.primary }]}>$50/</Text>
                        <Text style={[styles.perDay, { color: colors.checBoxColor }]}>Hr</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: wp(5) }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => props.navigation.navigate(routes.requestProfile)}>
                                <Image source={appImages.userImage} style={{ width: wp(12), height: wp(12) }} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => props.navigation.navigate(routes.myReview)} style={{ justifyContent: 'space-evenly', marginLeft: wp(3) }}>
                                <Text style={[styles.userName, { color: colors.secondaryBlack }]}>Sarah Johnson</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={appImages.starContainer} style={{ width: wp(21), height: wp(3.1) }} />
                                    <Text style={[styles.reviewPoint, { color: colors.lable }]}>  (4.5)</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity activeOpacity={0.9} onPress={() => props.navigation.navigate(routes.message)} style={[styles.rightIconview, { borderRadius: 50, padding: wp(2), marginLeft: wp(5), borderWidth: 1, borderColor: colors.inActiveText, backgroundColor: darModeValue ? 'transparent' : 'white' }]}>
                            <Image source={appIcons.chatIconTransparent} style={{ width: wp(5), height: wp(5) }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: wp(5) }}>
                        <Text style={[styles.descrption, { color: colors.secondaryBlack }]}>Description</Text>
                        <Text style={[styles.shortDescrption, { color: colors.lable }]}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</Text>
                    </View>

                    <View style={{ marginTop: wp(5) }}>
                        <Text style={[styles.descrption, { color: colors.secondaryBlack }]}>Pick Up Time & Date</Text>
                        <Text style={[styles.day, { color: colors.secondaryBlack }]}>Sat, Apr 6</Text>
                        <Text style={[styles.time, { color: colors.secondaryBlack }]}>10:00 Am</Text>
                    </View>

                    <View style={{ marginTop: wp(5) }}>
                        <Text style={[styles.descrption, { color: colors.secondaryBlack }]}>Return Time & Date</Text>
                        <Text style={[styles.day, { color: colors.secondaryBlack }]}>Tue, Apr 6</Text>
                        <Text style={[styles.time, { color: colors.secondaryBlack }]}>10:00 Am</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: 'center' }}>
                <Button containerStyle={{ width: wp(45) }} borderWidth={1} skip>Decline</Button>
                <Button containerStyle={{ width: wp(45) }}>Accept</Button>
            </View>
        </View>
    );
};

export default RequestDetail;

const styles = StyleSheet.create({
    carTitle: {
        fontSize: hp(1.8),
        lineHeight: hp(2.7),
        fontFamily: fontFamily.PoppinsSemiBold,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: wp(3)
    },
    price: {
        fontSize: hp(1.6),

        fontFamily: fontFamily.PoppinsMedium,
    },
    perDay: {
        fontSize: hp(1.4),
        fontFamily: fontFamily.PoppinsRegular,
    },
    userName: {
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        fontFamily: fontFamily.PoppinsMedium,
    },
    reviewPoint: {
        fontSize: hp(1.2),
        lineHeight: hp(1.7),
        fontFamily: fontFamily.PoppinsRegular,
    },
    descrption: {
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        fontFamily: fontFamily.PoppinsMedium,
        marginBottom: wp(2)
    },
    shortDescrption: {
        fontSize: hp(1.4),
        lineHeight: hp(2.1),
        fontFamily: fontFamily.PoppinsRegular,
    },
    leftText: {
        fontSize: hp(1.8),
        lineHeight: hp(2.7),
        fontFamily: fontFamily.PoppinsMedium,
    },
    rightText: {
        fontSize: hp(1.4),
        lineHeight: hp(2.1),
        fontFamily: fontFamily.PoppinsRegular,
    },
    listTitle: {
        fontSize: hp(1.4),
        lineHeight: hp(2.2),
        fontFamily: fontFamily.PoppinsRegular,
    },
    locationDesc: {
        marginTop: wp(4),
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        fontFamily: fontFamily.PoppinsRegular,
    },
    day: {
        fontSize: hp(1.8),
        lineHeight: hp(2.7),
        fontFamily: fontFamily.PoppinsBold,
    },
    time: {
        fontSize: hp(1.8),
        lineHeight: hp(2.7),
        fontFamily: fontFamily.PoppinsMedium,
    },
});

