import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Platform, SafeAreaView, Image, ImageBackground, TouchableOpacity, StatusBar, Text, FlatList, Pressable, Dimensions } from "react-native";
import { heightPixel, hp, routes, widthPixel, wp } from "../../../services/constants";
import { appIcons, appImages } from "../../../services/utilities/assets";
import { fontFamily } from "../../../services";
import HomeHeader from "../../../components/homeHeader/HomeHeader";
import { Input } from "../../../components/input";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AntDesign from 'react-native-vector-icons/AntDesign'
import CarList from '../../../components/carList';
import { useTheme } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

export default Book = (props) => {
    const { colors } = useTheme()
    const [search, setSearch] = useState("")

    const Reserved = () => {
        return (
            <FlatList
                data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => {
                    return (
                        <CarList booking item={item} key={index} navigation={props.navigation} onpress={() => props.navigation.navigate(routes.checkout)} />
                    )
                }}
            />
        );
    };

    const Picked = () => {
        return (
            <FlatList
                data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => {
                    return (
                        <CarList booking item={item} key={index} navigation={props.navigation} onpress={() => props.navigation.navigate(routes.historyDetail, { key: 'return' })} />
                    )
                }}
            />
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.wheatWhite }}>
            <HomeHeader title={'Bookings'} />
            <View style={{ flex: 1, margin: wp(4) }}>
                <View style={styles.tabTopView}>
                    <Tab.Navigator
                        sceneContainerStyle={{ backgroundColor: colors.wheatWhite }}
                        initialRouteName={'Reserved'}
                        initialLayout={'Picked'}
                        screenOptions={{
                            tabBarIndicatorContainerStyle: {
                                backgroundColor: colors.wheatWhite,
                                borderBottomWidth: 0.5,
                                borderBottomColor: colors.inActiveText
                            },
                            tabBarPressColor: 'transparent',
                            tabBarScrollEnabled: true,
                            tabBarItemStyle: styles.tabBarItemHeight,
                            tabBarActiveTintColor: colors.primary,
                            tabBarInactiveTintColor: colors.placeholder,
                            tabBarIndicatorStyle: [styles.indicatorStyle, { backgroundColor: colors.primary, borderColor: colors.primary }],
                            tabBarLabelStyle: styles.tabBarTextStyle,
                        }}>
                        <Tab.Screen name={'Reserved'} component={Reserved} />
                        <Tab.Screen name={'Picked'} component={Picked} />
                    </Tab.Navigator>
                </View>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    tabTopView: {
        flex: 1,
        width: wp(94),
        alignSelf: 'center'
    },
    tabBarItemHeight: {
        width: wp(47),
    },
    tabBarTextStyle: {
        fontFamily: fontFamily.PoppinsRegular,
        fontSize: hp(2),
        lineHeight: hp(2.4),
        textTransform: "none",
    },
    indicatorStyle: {
        borderWidth: 1,
    },
});