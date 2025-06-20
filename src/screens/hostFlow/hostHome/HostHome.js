import React, { useEffect, useRef, useState } from "react";
import { useIsFocused, useNavigation, useTheme } from "@react-navigation/native";
import { View, StyleSheet, Platform, SafeAreaView, Image, ImageBackground, TouchableOpacity, StatusBar, Text, FlatList, Pressable, Dimensions } from "react-native";
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
import CarList from "../../../components/carList";

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

export default HostHome = (props) => {
    const { colors } = useTheme()
    const darModeValue = useSelector(state => state.user.darkMode)
    const mapRef = useRef();
    const IsFocused = useIsFocused()
    const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 })
    const [isLoading, setIsLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [option, setOption] = useState("Map")
    const [modalShow, setModalShow] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.wheatWhite }}>
            <StatusBar barStyle={darModeValue ? 'light-content' : 'dark-content'} backgroundColor={colors.wheatWhite} />

            <Loader loading={isLoading} />

            <View style={{ flex: 1, backgroundColor: colors.wheatWhite }}>
                <HomeHeader home leftIcon={appIcons.appLogo} rightIcon2={appIcons.notificationTransparent} rightIcon2Press={() => props.navigation.navigate(routes.notification)} />

                <View style={{ flex: 1, margin: wp(4) }}>
                    <FlatList
                        data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => {
                            return (
                                <CarList hostRequest item={item} key={index} navigation={props.navigation} onpress={() => props.navigation.navigate(routes.requestDetail)} />
                            )
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
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
        flex: 1
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