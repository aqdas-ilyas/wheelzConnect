import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { appIcons, appImages, fontFamily, hp, wp } from '../../services'
import { useTheme } from '@react-navigation/native'
import { useSelector } from 'react-redux'

export default function HomeHeader({ home, setting, title, leftIcon, onleftIconPress, rightIcon1, rightIcon1Press, rightIcon2, rightIcon2Press }) {
    const { colors } = useTheme()
    const darModeValue = useSelector(state => state.user.darkMode)

    return (
        <View style={{ paddingTop: Platform.OS == 'android' ? wp(4) : 0, flexDirection: "row", justifyContent: 'space-between', alignItems: "center", paddingHorizontal: setting ? wp(2) : wp(5) }}>
            {
                leftIcon
                    ? <TouchableOpacity activeOpacity={0.9} onPress={onleftIconPress}>
                        <Image source={leftIcon} style={[styles.leftIconStyle, { tintColor: colors.IconColor }]} />
                    </TouchableOpacity>
                    : null
            }

            {
                home ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Image source={appImages.userImage} style={{ width: wp(12), height: wp(12) }} />
                        <View style={{ marginLeft: wp(3) }}>
                            <Text style={[styles.homeWelcome, { color: colors.WhiteOrblack }]}>Welcome!</Text>
                            <Text style={[styles.mainTitle, { color: colors.placeholder }]}>John Doe</Text>
                        </View>
                    </View>
                )
                    : null
            }

            {
                title
                    ? <Text style={[styles.mainTitle, { color: colors.lable }]}>{title}</Text>
                    : null
            }

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                {
                    rightIcon1 && (
                        <TouchableOpacity activeOpacity={0.9} onPress={rightIcon1Press} style={[styles.rightIconview, { borderWidth: 1, borderColor: colors.inActiveText, backgroundColor: darModeValue ? 'transparent' : 'white' }]}>
                            <Image source={rightIcon1} style={[styles.rightIconStyle, { tintColor: colors.inActiveText }]} />
                        </TouchableOpacity>
                    )
                }

                {
                    rightIcon2 && (
                        <TouchableOpacity activeOpacity={0.9} onPress={rightIcon2Press} style={[styles.rightIconview, { marginLeft: wp(5), borderWidth: 1, borderColor: colors.inActiveText, backgroundColor: darModeValue ? 'transparent' : 'white' }]}>
                            <Image source={rightIcon2} style={[styles.rightIconStyle, { tintColor: colors.inActiveText }]} />
                        </TouchableOpacity>
                    )
                }

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    leftIconStyle: {
        width: wp(6.5),
        height: wp(8),
    },
    rightIconview: {
        borderRadius: 50,
        padding: wp(2),
    },
    rightIconStyle: {
        width: wp(4),
        height: wp(4),
    },
    mainTitle: {
        fontSize: hp(2),
        lineHeight: hp(3),
        fontFamily: fontFamily.PoppinsSemiBold,
    },
    homeWelcome: {
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        fontFamily: fontFamily.PoppinsMedium,
    }
})