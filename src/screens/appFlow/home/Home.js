import React, { useEffect, useRef, useState } from "react";
import { useIsFocused, useNavigation, useTheme } from "@react-navigation/native";
import { View, StyleSheet, Platform, SafeAreaView, Image, ImageBackground, TouchableOpacity, StatusBar, Text, FlatList, Pressable, Dimensions } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps'
import { heightPixel, hp, routes, widthPixel, wp } from "../../../services/constants";
import Geolocation from '@react-native-community/geolocation';
import { getLocationPermission } from "../../../common/HelpingFunc";
import { appIcons, appImages } from "../../../services/utilities/assets";
import { colors, fontFamily } from "../../../services";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../../components/loader/Loader";
import HomeHeader from "../../../components/homeHeader/HomeHeader";
import { Input } from "../../../components/input";
import FilterModal from "../../../components/filter";
import RentalCard from "../../../components/carItem/CarItem";

const MarkerArray = [
    {
        id: 1,
        data: { latitude: 31.4697, longitude: 74.2728 },
    },
    {
        id: 2,
        data: { latitude: 31.4511, longitude: 74.2925 },
    },
    {
        id: 3,
        data: { latitude: 31.4469, longitude: 74.2682 },
    },
    // {
    //     id: 4,
    //     data: { latitude: 31.4496, longitude: 74.2804 },
    // },
    {
        id: 5,
        data: { latitude: 31.4312, longitude: 74.2644 },
    },
    {
        id: 6,
        data: { latitude: 31.4433, longitude: 74.2597 },
    },
]

export default Home = (props) => {
    const { colors } = useTheme()
    const darModeValue = useSelector(state => state.user.darkMode)
    const mapRef = useRef();
    const IsFocused = useIsFocused()
    const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 })
    const [isLoading, setIsLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [option, setOption] = useState("Map")
    const [modalShow, setModalShow] = useState(false)

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
                position => {
                    var coords = position?.coords;
                    if (coords.latitude != undefined || coords != '') {
                        var userLocation = {
                            latitude: coords.latitude,
                            longitude: coords.longitude,
                        };
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

    const Markers = React.memo(({ markers }) => {
        return markers.map((item, index) => {
            return (
                <Marker
                    key={index}
                    coordinate={{
                        latitude: item?.data?.latitude,
                        longitude: item?.data?.longitude,
                    }}>
                    <View style={{ backgroundColor: colors.fullWhite, paddingHorizontal: wp(3), paddingVertical: wp(2), borderRadius: 8 }}>
                        <Text style={{ fontFamily: fontFamily.PoppinsMedium, fontSize: hp(1.4), lineHeight: hp(2.1), color: colors.fullBlack }}>$307</Text>
                    </View>
                </Marker>
            );
        });
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle={darModeValue ? 'light-content' : 'dark-content'} backgroundColor={colors.wheatWhite} />

            <Loader loading={isLoading} />

            {
                option === 'Map' && (
                    <MapView
                        ref={mapRef}
                        // showsUserLocation={true}
                        // showsMyLocationButton={true}
                        showsCompass={false}
                        showsIndoors={false}
                        zoomEnabled={true}
                        zoomTapEnabled={true}
                        style={styles.map}
                        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
                        region={region}>

                        {
                            MarkerArray.length > 0 && (
                                <Markers markers={MarkerArray} />
                            )
                        }

                        {userLocation?.latitude !== 0 &&
                            <Marker
                                coordinate={{
                                    latitude: userLocation?.latitude,
                                    longitude: userLocation?.longitude,
                                }}>
                                <View style={[styles.dotComponentActiveStyle, { borderWidth: 2 }]}>
                                    <View style={[styles.dotComponentStyle, { backgroundColor: colors.primary }]} />
                                </View>
                            </Marker>
                        }
                    </MapView>
                )
            }

            <SafeAreaView style={{ flex: option === 'Map' ? 0 : 1, backgroundColor: colors.wheatWhite }}>
                <HomeHeader home leftIcon={appIcons.appLogo} rightIcon1={appIcons.homeDollarIconTransparent} rightIcon1Press={() => props.navigation.navigate(routes.currency)} rightIcon2={appIcons.notificationTransparent} rightIcon2Press={() => props.navigation.navigate(routes.notification)} />
                <View>
                    <Input
                        placeholder={' Search'}
                        value={search}
                        leftIcon={appIcons.search}
                        rightIcon
                        onPressIcon={() => setModalShow(!modalShow)}
                        eyeValue={appIcons.filter}
                        onChangeText={(e) => setSearch(e)}
                        containerStyle={{
                            borderRadius: 15,
                            backgroundColor: colors.wheatWhite
                        }}
                        WholeContainer={{
                            borderRadius: 5,
                            width: wp(90),
                            alignSelf: "center",
                            marginTop: -hp(3),
                            marginBottom: hp(2),
                        }}
                    />

                    {
                        option === 'List' && (
                            <View style={{ marginBottom: Platform.OS == 'android' ? hp(45) : hp(34) }}>
                                <FlatList
                                    data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item, index) => index}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <RentalCard item={item} key={index} navigation={props.navigation} />
                                        )
                                    }}
                                />
                            </View>
                        )
                    }
                </View>
            </SafeAreaView>

            <View style={{ backgroundColor: 'transparent', flex: 1, flexDirection: "row", justifyContent: 'center', position: 'absolute', bottom: Platform.OS == 'android' ? wp(40) : wp(30), left: 0, right: 0, zIndex: 1 }}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => setOption('Map')} style={[styles.listView, { backgroundColor: option == 'Map' ? colors.primary : '#DCE8D6', borderTopLeftRadius: 12, borderBottomLeftRadius: 12, }]}>
                    <Image source={appIcons.mapOutline} style={[styles.listStyle, { tintColor: option == 'Map' ? colors.fullWhite : colors.primary }]} />
                    <Text style={[styles.listTextStyle, { color: option == 'Map' ? colors.fullWhite : colors.primary }]}>Map</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.9} onPress={() => setOption('List')} style={[styles.listView, { backgroundColor: option == 'List' ? colors.primary : '#DCE8D6', borderTopRightRadius: 12, borderBottomRightRadius: 12 }]}>
                    <Image source={appIcons.list} style={[styles.listStyle, { tintColor: option == 'List' ? colors.fullWhite : colors.primary }]} />
                    <Text style={[styles.listTextStyle, { color: option == 'List' ? colors.fullWhite : colors.primary }]}>List</Text>
                </TouchableOpacity>
            </View>

            <FilterModal
                modalShow={modalShow}
                setModalShow={() => setModalShow(!modalShow)}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    dotComponentActiveStyle: {
        width: wp(7),
        height: wp(7),
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.primary,
    },
    dotComponentStyle: {
        width: wp(5),
        height: wp(5),
        borderRadius: 50,
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        height: Dimensions.get('screen').height / 1.01,
        width: wp(100),
        zIndex: 100,
        position: 'absolute',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    listView: {
        flexDirection: "row",
        alignItems: 'center',
        padding: wp(1),
    },
    listStyle: {
        width: wp(7),
        height: wp(7),
        resizeMode: 'contain'
    },
    listTextStyle: {
        fontFamily: fontFamily.PoppinsRegular,
        fontSize: hp(1.8),
        lineHeight: hp(2.4),
        marginLeft: wp(2)
    },
});