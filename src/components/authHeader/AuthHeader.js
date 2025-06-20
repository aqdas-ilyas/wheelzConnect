import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { appIcons, appImages, colors, fontFamily, hp, wp } from '../../services'
import { useSelector } from 'react-redux'

export default function AuthHeader({ appLogo, leftIcon, onleftIconPress }) {
    const darModeValue = useSelector(state => state.user.darkMode)

    return (
        <View>
            {
                leftIcon
                    ? <TouchableOpacity onPress={onleftIconPress}>
                        <Image source={appIcons.back} style={[styles.back]} />
                    </TouchableOpacity>
                    : null
            }

            {
                appLogo && (
                    <Image
                        source={darModeValue ? appImages.splashLogo : appImages.appLogo}
                        style={{
                            width: wp(40),
                            height: wp(23.5),
                            alignSelf: 'center',
                        }} />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    back: {
        width: wp(8),
        height: wp(8),
        position: 'absolute',
        left: 0,
        top: 0
    },
})