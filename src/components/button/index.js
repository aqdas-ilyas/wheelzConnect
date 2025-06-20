import { useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { colors, fontFamily, hp, wp } from '../../services'
import appStyles from '../../services/utilities/appStyles'

const Button = props => {
    const { whiteColor, resetButton, filterButton, events, style, disable, containerStyle, onPress, borderWidth, skip, deleteButton } = props
    const { colors } = useTheme()

    return (
        <View style={[appStyles.mb15]}>
            <TouchableOpacity
                activeOpacity={0.8}
                disabled={disable}
                style={
                    {
                        ...styles.container,
                        ...containerStyle,
                        borderColor: colors.primary,
                        borderWidth: borderWidth ? borderWidth : 0,
                        height: hp(6),
                        backgroundColor: skip ? colors.skipButton : colors.primary
                    }}
                onPress={onPress}>
                <View style={[appStyles.rowCenter]}>
                    <Text style={{ ...styles.label, ...style, color: skip ? colors.primary : colors.fullWhite }}>
                        {props.children}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: wp(92),
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    label: {
        fontSize: hp(2),
        lineHeight: hp(3),
        fontFamily: fontFamily.PoppinsMedium,
        color: colors.wheatWhite
    },
})

export default Button
