import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { appIcons, appImages, colors, fontFamily, hp, wp } from '../../services'
import { useTheme } from '@react-navigation/native'

export default function Header({ rightIcon, onRightIconPress, noHeaderPadding, message, title, leftIcon, onleftIconPress }) {
    const { colors } = useTheme()

    return (
        <View style={{ paddingTop: Platform.OS == 'android' ? noHeaderPadding ? 0 : wp(0) : 0, flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {
                    leftIcon
                        ? <TouchableOpacity onPress={onleftIconPress}>
                            <Image source={appIcons.back} style={[styles.back]} />
                        </TouchableOpacity>
                        : null
                }

                {
                    message && (
                        <Image source={appIcons.userChatIcon} style={{ width: wp(12), height: wp(12), marginHorizontal: wp(2) }} />
                    )
                }

                {
                    title
                        ? <Text style={message ? { ...styles.chatStyle, color: colors.lable } : { ...styles.mainTitle, color: colors.lable }}>{title}</Text>
                        : null
                }
            </View>

            {
                rightIcon
                    ? <TouchableOpacity onPress={onRightIconPress} style={{ alignSelf: 'flex-end' }}>
                        <Image source={rightIcon} style={[styles.back]} />
                    </TouchableOpacity>
                    : null
            }
        </View >
    )
}

const styles = StyleSheet.create({
    back: {
        width: wp(8),
        height: wp(8),
    },
    mainTitle: {
        fontSize: hp(2),
        lineHeight: hp(3),
        fontFamily: fontFamily.PoppinsSemiBold,
        marginLeft: wp(2)
    },
    chatStyle: {
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        fontFamily: fontFamily.PoppinsMedium,
        color: colors.lable,
        marginLeft: wp(2)
    }
})