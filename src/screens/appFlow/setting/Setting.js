import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, StyleSheet, Platform, SafeAreaView, Image, ImageBackground, Text, FlatList, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { heightPixel, hp, routes, widthPixel, wp } from "../../../services/constants";
import { appIcons, appImages } from "../../../services/utilities/assets";
import appStyles from "../../../services/utilities/appStyles";
import { fontFamily } from "../../../services";
import AntDesign from "react-native-vector-icons/AntDesign";
import ToggleSwitch from 'toggle-switch-react-native';
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../../components/loader/Loader";
import HomeHeader from "../../../components/homeHeader/HomeHeader";
import { _saveDarkMode } from "../../../store/reducers/userDataSlice";
import { useTheme } from "@react-navigation/native";

export default Setting = (props) => {
    const darModeValue = useSelector(state => state.user.darkMode)
    const seletAccount = useSelector(state => state.user.seletAccount)
    const dispatch = useDispatch()
    const { colors } = useTheme()
    const [toggle, setToggle] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    console.log("darModeValue: ", darModeValue)

    useLayoutEffect(() => {
        props.navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: 'none',
            },
        });
        return () => {
            props.navigation.getParent()?.setOptions({
                tabBarStyle: {
                    display: 'flex',
                },
            });
        };
    }, [darModeValue]);

    const settingsArray = [
        { id: 1, img: appIcons.profile, name: 'Profile', onpress: () => props.navigation.navigate(routes.viewProfile) },
        ...((seletAccount !== 'user') ? [{ id: 2, img: appIcons.homeDollarIconTransparent, name: 'Payout', onpress: () => console.log('PayOut') }] : []),
        { id: 3, img: appIcons.changePassword, name: 'Change Password', onpress: () => props.navigation.navigate(routes.changePassword) },
        { id: 4, img: appIcons.history, name: 'History', onpress: () => props.navigation.navigate(routes.history) },
        { id: 5, img: appIcons.notification, name: 'Notifications', onpress: (e) => setToggle(e) },
        { id: 6, img: appIcons.mode, name: 'Dark Mode', onpress: (e) => dispatch(_saveDarkMode(e)) },
        { id: 7, img: appIcons.review, name: 'My Reviews', onpress: () => props.navigation.navigate(routes.myReview) },
        { id: 8, img: appIcons.privacy_policy, name: 'Privacy Policy', onpress: () => props.navigation.navigate(routes.privacy) },
        { id: 9, img: appIcons.terms, name: 'Terms of Use', onpress: () => props.navigation.navigate(routes.term) },
        { id: 10, img: appIcons.aboutApp, name: 'About App', onpress: () => props.navigation.navigate(routes.aboutApp) },
        { id: 11, img: appIcons.ratingStar, name: 'Rate App', onpress: () => props.navigation.navigate(routes.review) },
        { id: 12, img: appIcons.helpCenter, name: 'Help Center', onpress: () => props.navigation.navigate(routes.helpCenter) },
        { id: 13, img: appIcons.logout, name: 'Log Out', onpress: () => props.navigation.replace(routes.auth, { screen: routes.selectedAccount }) },
        { id: 14, img: appIcons.delete, name: 'Delet My Account', onpress: () => props.navigation.navigate(routes.deletAccount) },
    ]

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.wheatWhite }}>
            <Loader loading={isLoading} />
            <View style={{ flex: 1, margin: wp(4) }}>
                <HomeHeader setting leftIcon={appIcons.appLogo} onleftIconPress={() => props.navigation.goBack()} title={'Settings'} rightIcon1={appIcons.Notification} rightIcon1Press={() => props.navigation.navigate(routes.notification)} />

                <ScrollView bounces={false} style={{ flex: 1, marginTop: wp(2) }} showsVerticalScrollIndicator={false}>
                    <FlatList
                        data={settingsArray}
                        keyExtractor={(item, index) => index}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return (
                                <View key={index}>
                                    <TouchableOpacity key={index} activeOpacity={0.9} onPress={item.onpress} style={[appStyles.rowBtw, { marginTop: index > 0 ? wp(6) : wp(3) }]}>
                                        <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                            <Image source={item.img} style={[styles.iconImage, { tintColor: (item.name === 'Log Out' || item.name === 'Delet My Account') ? 'red' : colors.IconColor }]} />
                                            <Text style={[styles.mainText, { marginLeft: wp(2), color: (item.name === 'Log Out' || item.name === 'Delet My Account') ? 'red' : colors.lable }]}>{item.name}</Text>
                                        </View>
                                        {
                                            item.name === 'Notifications'
                                                ? <ToggleSwitch
                                                    isOn={toggle}
                                                    onColor={colors.primary}
                                                    offColor={colors.inActiveText}
                                                    labelStyle={{ display: 'none' }}
                                                    size="small"
                                                    onToggle={item.onpress}
                                                />
                                                : item.name === 'Dark Mode'
                                                    ?
                                                    <ToggleSwitch
                                                        isOn={darModeValue}
                                                        onColor={colors.primary}
                                                        offColor={colors.inActiveText}
                                                        labelStyle={{ display: 'none' }}
                                                        size="small"
                                                        onToggle={item.onpress}
                                                    />
                                                    : (item.name === 'Log Out' || item.name === 'Delet My Account')
                                                        ? null
                                                        : <AntDesign name={'rightcircleo'} color={colors.IconColor} size={wp(6)} />
                                        }
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    mainText: {
        fontSize: hp(1.8),
        lineHeight: hp(2.7),
        fontFamily: fontFamily.PoppinsRegular,
        textAlign: "center"
    },
    iconImage: {
        width: wp(7),
        height: wp(7),
        resizeMode: 'contain',
    },
})