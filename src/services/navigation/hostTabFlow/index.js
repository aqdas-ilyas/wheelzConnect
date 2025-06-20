import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Platform, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { appIcons, fontFamily } from '../../utilities';
import { hp, wp } from '../../constants';
import { HomeNavigation } from '../homeFlow';
import { BookNavigation } from '../bookFlow';
import { ChatNavigation } from '../chatFlow';
import { FavoriteNavigation } from '../FavouriteFlow';
import { InvitationNavigation } from '../invitationFlow';
import { SettingNavigation } from '../settingFlow';
import { useTheme } from '@react-navigation/native';
import { VehicleNavigation } from '../vehicleFlow';
import { HostHomeNavigation } from '../hostHomeFlow';
import { HostBookNavigation } from '../hostBookFlow';

const Tab = createBottomTabNavigator();

const TabButton = props => {
    const { colors } = useTheme()

    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;

    return (
        <TouchableOpacity disabled={item.disabled} onPress={() => [onPress()]} activeOpacity={1} style={[styles.container,]}>
            <View style={[styles.btn]}>
                <View style={{ alignItems: 'center' }}>
                    <Image source={focused ? item.iconfill : item.iconUnfill} style={[styles.tabIcon, { tintColor: focused ? colors.primaryColor : colors.inActiveText }]} />
                    <Text style={[styles.bottomText, { color: focused ? colors.primary : colors.inActiveText }]}>{item.route}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export function HostTabNavigation() {
    const { colors } = useTheme()

    const tabArray = [
        {
            route: 'Home',
            iconfill: appIcons.fillHome,
            iconUnfill: appIcons.home,
            component: HostHomeNavigation,
            color: colors.primaryColor,
            disabled: false,
        },
        {
            route: 'Bookings',
            iconfill: appIcons.fillBooking,
            iconUnfill: appIcons.booking,
            component: HostBookNavigation,
            color: colors.theme,
            disabled: false,
        },
        {
            route: 'Chat',
            iconfill: appIcons.chat,
            iconUnfill: appIcons.chat,
            component: ChatNavigation,
            color: colors.theme,
            disabled: false,
        },
        {
            route: 'Vehicles',
            iconfill: appIcons.fillVehicle,
            iconUnfill: appIcons.vehicle,
            component: VehicleNavigation,
            color: colors.theme,
            disabled: false,
        },
        {
            route: 'Setting',
            iconfill: appIcons.setting,
            iconUnfill: appIcons.setting,
            component: SettingNavigation,
            color: colors.theme,
            disabled: false,
        },
    ];

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: [styles.barStyle, { backgroundColor: colors.fullWhite }],
                tabBarHideOnKeyboard: true,
            }}>
            {tabArray.map((item, index) => {
                return (
                    <Tab.Screen
                        key={index}
                        name={item.route}
                        component={item.component}
                        options={{
                            tabBarButton: props => <TabButton {...props} item={item} />,
                        }}
                    />
                );
            })}
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    barStyle: {
        height: hp(10),
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingTop: Platform.OS == 'ios' ? wp(5) : 0,
        borderTopWidth: 0,
    },
    tabIcon: {
        width: wp(7),
        height: wp(7),
        resizeMode: 'contain',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp(2),
        paddingVertical: wp(2),
    },
    bottomText: {
        fontFamily: fontFamily.NunitoMedium,
        fontSize: hp(1.4),
        marginTop: wp(2)
    }
});