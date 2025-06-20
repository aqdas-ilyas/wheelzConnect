import React, { useState, useRef, useEffect } from 'react';
import { Platform } from 'react-native';
import { View, Image, StyleSheet, Text } from 'react-native';
import { appIcons, colors, fontFamily, hp, wp } from '../../services';
import PhoneInput from "react-native-phone-number-input";
import appStyles from '../../services/utilities/appStyles';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useTheme } from '@react-navigation/native'
import { useSelector } from 'react-redux';

const CountryInput = (props) => {
    const { colors } = useTheme()
    const phoneInput = useRef(null);
    const darModeValue = useSelector(state => state.user.darkMode)

    return (
        <View style={{ marginVertical: hp(1) }}>
            <View style={[appStyles.rowStart, { paddingVertical: wp(2) }]}>
                <Text style={[styles.titleStyle, { color: colors.secondaryBlack }]}>{props.placeholder}</Text>
                {
                    props.shortPlaceholder && (
                        <Text style={[styles.shortPlaceholderStyle, { color: colors.secondaryBlack, marginLeft: wp(2) }]}>{props.shortPlaceholder}</Text>
                    )
                }
            </View>

            <PhoneInput
                containerStyle={[styles.inputBox, { width: '100%' }]}
                textInputStyle={{
                    height: hp(7),
                    fontFamily: fontFamily.PoppinsMedium,
                    fontSize: hp(1.6),
                    color: colors.secondaryBlack,
                }}
                codeTextStyle={{
                    fontFamily: fontFamily.PoppinsMedium,
                    fontSize: hp(1.6),
                    color: colors.secondaryBlack,
                    height: Platform.OS == 'android' ? hp(3) : hp(2.2),
                }}
                countryPickerButtonStyle={{
                    width: wp(25),
                    height: hp(6),
                    backgroundColor: colors.fullWhite,
                    borderRadius: 10,
                    borderColor: '#E9EAEB',
                    borderWidth: 1,
                }}
                textContainerStyle={{
                    flex: 2,
                    backgroundColor: colors.fullWhite,
                    height: hp(6),
                    marginLeft: wp(3),
                    borderRadius: 10,
                    borderColor: '#E9EAEB',
                    borderWidth: 1,
                }}
                renderDropdownImage={
                    <AntDesign name='down' size={wp(4)} color={colors.placeholder} />
                }
                ref={phoneInput}
                defaultCode={'PH'} // Set default country code to the Philippines
                value={''} // Set current phone number value
                layout={props.layout}
                placeholder='XXXXXXXXX'
                textInputProps={{
                    placeholderTextColor: colors.placeholder
                }}
                onChangeText={(text) => {
                    console.log("onChangeText: ", text)
                    props.setValue(`${text}`)
                }}
                onChangeFormattedText={(text) => {
                    console.log("onChangeFormattedText: ", text)
                }}
                onChangeCountry={(text) => {
                    console.log("onChangeCountry: ", `+${text?.callingCode}`)
                    props.setSelectedCode(`${text?.callingCode}`)
                }}
                withDarkTheme={darModeValue}
            // withShadow
            // autoFocus
            />
        </View>
    );
};

export default CountryInput;

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        fontFamily: fontFamily.PoppinsMedium,
    },
    shortPlaceholderStyle: {
        fontSize: hp(1.2),
        lineHeight: hp(2),
        fontFamily: fontFamily.PoppinsRegular,
    },
    inputBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: 'transparent'
    },
});
