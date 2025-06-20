import React, { useState, useRef, useEffect } from 'react';
import { View, Text, useWindowDimensions, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Dimensions, Platform, Linking } from 'react-native';
import { colors, hp, fontFamily, wp, routes, heightPixel, widthPixel, appIcons, appImages } from '../../../services';
import appStyles from '../../../services/utilities/appStyles';
import Header from '../../../components/header';
import { Loader } from '../../../components/loader/Loader';
import CarDetailImageSlider from '../../../components/carDetailImageSlider/CarDetailImageSlider';
import { useIsFocused, useTheme } from '@react-navigation/native';
import { getLocationPermission } from '../../../common/HelpingFunc';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker, Polyline, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps'
import Button from '../../../components/button';
import { useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign'

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
    { id: 10, title: 'Mileage', type: '39.249' },
]

const GEOCODING_API_KEY = 'AIzaSyBtZvFNCnri83OeZ3ydvlkcIG-0ZrytGFI';
const GEOCODING_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

const getAddress = async (lat, lng) => {
    try {
        const response = await fetch(`${GEOCODING_API_URL}?latlng=${lat},${lng}&key=${GEOCODING_API_KEY}`);
        const data = await response.json();
        if (data.status === 'OK') {
            const address = data.results[0].formatted_address;
            return address;
        } else {
            console.log('Geocoding API error: ' + data.status);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const CarDetail = (props) => {
    const { key } = props?.route?.params ?? {}
    const mapRef = useRef();
    const { colors } = useTheme()
    const darModeValue = useSelector(state => state.user.darkMode)
    const [isLoading, setIsLoading] = useState(false)
    const IsFocused = useIsFocused()
    const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 })
    const [address, setAddress] = useState('')
    const [region, setRegion] = useState({
        latitude: userLocation?.latitude,
        longitude: userLocation?.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    useEffect(() => {
        getMyLocation()
    }, [IsFocused]);

    const getMyLocation = async () => {
        let permission = await getLocationPermission();
        if (permission) {
            Geolocation.getCurrentPosition(
                async (position) => {
                    var coords = position?.coords;
                    if (coords.latitude != undefined || coords != '') {
                        var userLocation = {
                            latitude: coords.latitude,
                            longitude: coords.longitude,
                        };
                        const address = await getAddress(coords.latitude, coords.longitude);
                        console.log('get Address: ', address)
                        setAddress(address)
                        setUserLocation(userLocation)
                        setRegion({
                            latitude: coords.latitude,
                            longitude: coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        })
                    }
                },
                error => {
                    console.log(error)
                },
                { enableHighAccuracy: false, timeout: 20000, maximumAge: 3600000 },
            );
        }
    }

    const OpenMap = () => {
        const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
        const url = Platform.select({
            ios: `${scheme}`,
            android: `${scheme}`,
        });

        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                return Linking.openURL(url);
            } else {
                return Linking.openURL(url);
            }
        });
    };

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <Loader loading={isLoading} />
            <View style={{ margin: wp(4) }}>
                <Header leftIcon onleftIconPress={() => props.navigation.goBack()} title={'Car Detail'} />
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

                    {/* <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginTop: wp(3) }}>
                        <Text style={[styles.userName, { color: colors.secondaryBlack }]}>Rental T & C</Text>
                        <AntDesign onPress={() => props.navigation.navigate(routes.rentalTermsAndConditions)} name='rightcircle' color={colors.fullBlack} size={wp(6)} />
                    </View> */}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: wp(5) }}>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => props.navigation.navigate(routes.myReview)} style={{ flexDirection: 'row' }}>
                            <Image source={appImages.userImage} style={{ width: wp(12), height: wp(12) }} />
                            <View style={{ justifyContent: 'space-evenly', marginLeft: wp(3) }}>
                                <Text style={[styles.userName, { color: colors.secondaryBlack }]}>Sarah Johnson</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={appImages.starContainer} style={{ width: wp(21), height: wp(3.1) }} />
                                    <Text style={[styles.reviewPoint, { color: colors.lable }]}>  (4.5)</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => props.navigation.navigate(routes.message)} style={[styles.rightIconview, { borderRadius: 50, padding: wp(2), marginLeft: wp(5), borderWidth: 1, borderColor: colors.inActiveText, backgroundColor: darModeValue ? 'transparent' : 'white' }]}>
                            <Image source={appIcons.chatIconTransparent} style={{ width: wp(5), height: wp(5) }} />
                        </TouchableOpacity>

                        {/* <Image source={appIcons.chatIcon} style={{ width: wp(12), height: wp(12) }} /> */}
                    </View>

                    <View style={{ marginTop: wp(5) }}>
                        <Text style={[styles.descrption, { color: colors.secondaryBlack }]}>Description</Text>
                        <Text style={[styles.shortDescrption, { color: colors.lable }]}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</Text>
                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: wp(5) }}>
                            <Text style={[styles.leftText, { color: colors.lable }]}>Insurance</Text>
                            <Text style={[styles.rightText, { color: colors.lable }]}>Third Party</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: wp(5) }}>
                            <Text style={[styles.leftText, { color: colors.lable }]}>Minimum Rental Day</Text>
                            <Text style={[styles.rightText, { color: colors.lable }]}>01</Text>
                        </View>

                        <View>
                            <Text style={[styles.leftText, { color: colors.lable }]}>Specification</Text>
                            <FlatList
                                data={CarDetailData}
                                contentContainerStyle={{
                                    marginTop: wp(4),
                                    backgroundColor: '#1F1F1F',
                                    padding: wp(2),
                                    borderRadius: 20
                                }}
                                keyExtractor={(item, index) => index}
                                renderItem={({ item, index }) => {
                                    return (
                                        index == 1 ? (
                                            <View key={index} style={{ borderTopColor: 'white', borderTopWidth: index > 0 ? 0.5 : 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: wp(4), paddingHorizontal: wp(2) }}>
                                                <Text style={[styles.listTitle, { color: 'white' }]}>{item.title}</Text>
                                                <Text style={[styles.listTitle, { color: 'white' }]}>{item.type}</Text>
                                            </View>
                                        )
                                            : (
                                                <View key={index} style={{ borderTopColor: 'white', borderTopWidth: index > 0 ? 0.5 : 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: wp(4), paddingHorizontal: wp(2) }}>
                                                    <Text style={[styles.listTitle, { color: 'white' }]}>{item.title}</Text>
                                                    <Text style={[styles.listTitle, { color: 'white' }]}>{item.type}</Text>
                                                </View>
                                            )
                                    )
                                }}
                            />
                        </View>

                        <View style={{ marginTop: wp(5) }}>
                            <Text style={[styles.leftText, { color: colors.lable }]}>Location</Text>
                            <Text style={[styles.locationDesc, { color: colors.lable }]}>{address}</Text>

                            <TouchableOpacity activeOpacity={1} onPress={() => OpenMap()} style={styles.container}>
                                <View style={styles.mapWrapper}>
                                    <MapView
                                        ref={mapRef}
                                        showsCompass={false}
                                        showsIndoors={false}
                                        zoomEnabled={true}
                                        zoomTapEnabled={true}
                                        style={styles.map}
                                        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
                                        region={region}>
                                        {userLocation?.latitude !== 0 &&
                                            <Marker
                                                coordinate={{
                                                    latitude: userLocation?.latitude,
                                                    longitude: userLocation?.longitude,
                                                }}>
                                                <View style={[styles.dotComponentActiveStyle, { borderWidth: 2 }]}>
                                                    <View style={[styles.dotComponentStyle, { backgroundColor: 'red' }]} />
                                                </View>
                                            </Marker>
                                        }
                                    </MapView>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {
                key != 'disableButton' && (
                    <Button onPress={() => props.navigation.navigate(routes.rentalTermsAndConditions)}>Book A Car</Button>
                )
            }
        </View>
    );
};

export default CarDetail;

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
    container: {
        marginTop: wp(2),
        height: Dimensions.get('screen').height / 5,
        position: 'relative',
        zIndex: 100,
    },
    mapWrapper: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 15, // Adjust the border radius as needed
        overflow: 'hidden',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

    dotComponentActiveStyle: {
        width: wp(5),
        height: wp(5),
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'red',
    },
    dotComponentStyle: {
        width: wp(3),
        height: wp(3),
        borderRadius: 50,
    },
});

