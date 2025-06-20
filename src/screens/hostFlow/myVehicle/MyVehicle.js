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
import AntDesign from 'react-native-vector-icons/AntDesign'

export default MyVehicle = (props) => {
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
        <View style={styles.container}>
            <StatusBar barStyle={darModeValue ? 'light-content' : 'dark-content'} backgroundColor={colors.wheatWhite} />
            <Loader loading={isLoading} />

            <SafeAreaView style={{ flex: 1, backgroundColor: colors.wheatWhite }}>
                <HomeHeader title={'My Vehicle'} />

                <View>
                    <Input
                        placeholder={'Search'}
                        value={search}
                        leftIcon={appIcons.search}
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

                    <View style={{ marginBottom: Platform.OS == 'android' ? hp(45) : hp(34) }}>
                        <FlatList
                            data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item, index }) => {
                                return (
                                    <RentalCard onpress={() => props.navigation.navigate(routes.myVehicleDetail)} noFavorite item={item} key={index} navigation={props.navigation} />
                                )
                            }}
                        />
                    </View>
                </View>
            </SafeAreaView>

            <AntDesign onPress={() => props.navigation.navigate(routes.addVehicle)} name='pluscircle' color={colors.primary} size={wp(12)} style={{ position: 'absolute', right: wp(5), bottom: Platform.OS == 'android' ? wp(40) : wp(30), zIndex: 1 }} />
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