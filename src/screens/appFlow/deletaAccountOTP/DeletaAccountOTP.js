import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { colors, hp, fontFamily, wp, routes, heightPixel, widthPixel, fontPixel } from '../../../services'
import { appIcons, appImages } from '../../../services/utilities/assets'
import appStyles from '../../../services/utilities/appStyles'
import Button from '../../../components/button';
import Header from '../../../components/header'
import { CodeField, Cursor } from "react-native-confirmation-code-field"
import BackgroundTimer from 'react-native-background-timer';
import { Loader } from '../../../components/loader/Loader'
import { useTheme } from '@react-navigation/native'

const DeleteAccountOTP = (props) => {
    const { key } = props?.route?.params ?? {}
    const { colors } = useTheme()
    const [otpValue, setOtpValue] = useState('')
    const [seconds, setCountDown] = useState(59);
    const [isLoading, setIsLoading] = useState(false)

    // *********************** Timer Start ***********************
    React.useEffect(() => {
        const intervalId = BackgroundTimer.setInterval(() => {
            if (seconds > 0) {
                setCountDown(seconds - 1);
            }
        }, 1000);

        // Cancel the timer when you are done with it
        return () => BackgroundTimer.clearInterval(intervalId);
    }, [seconds]);

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <Loader loading={isLoading} />
            <View style={{ flex: 1, justifyContent: 'space-between', margin: wp(4) }}>
                <View>
                    <Header leftIcon onleftIconPress={() => props.navigation.goBack()} title='Delete Account' />
                    <Text style={[styles.mainTitle, { color: colors.secondaryBlack }]}>Enter OTP That You Receive On Email</Text>
                </View>

                <View>
                    <View style={{ width: '100%', justifyContent: 'center', alignSelf: 'center', marginTop: hp(5) }}>
                        <CodeField
                            value={otpValue}
                            onChangeText={(txt) => setOtpValue(txt)}
                            cellCount={4}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={({ index, symbol, isFocused }) => (
                                <View style={[styles.cell, { color: colors.primary, backgroundColor: colors.fullWhite, }]}>
                                    <Text key={index} style={[styles.textCell, { color: colors.primary, }]}>
                                        {symbol || (isFocused ? <Cursor /> : null)}
                                    </Text>
                                </View>
                            )}
                        />
                    </View>
                    <Text disabled={seconds != 0 ? true : false} style={[styles.resendText, { color: colors.placeholder }]}>Didn’t get code? - <Text style={[styles.resendCode, { color: colors.primary }]}>Resend code</Text></Text>
                </View>

                <View>
                    <Button>Delete Account</Button>
                </View>
            </View>
        </View>
    )
}

export default DeleteAccountOTP

const styles = StyleSheet.create({
    mainTitle: {
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        fontFamily: fontFamily.PoppinsRegular,
        textAlign: "left",
        marginTop: wp(5)
    },
    cell: {
        width: wp(18),
        height: wp(18),
        borderRadius: 36,
        borderWidth: 1,
        borderColor: '#9E9E9E',
        fontSize: hp(2.6),
        fontFamily: fontFamily.PoppinsSemiBold,
        textAlign: "center",
        paddingTop: wp(5)
    },
    textCell: {
        fontSize: hp(2.6),
        fontFamily: fontFamily.PoppinsSemiBold,
        textAlign: "center",
    },
    resendText: {
        fontSize: hp(1.6),
        lineHeight: hp(2.6),
        fontFamily: fontFamily.PoppinsRegular,
        marginTop: wp(15),
        textAlign: "center"
    },
    resendCode: {
        fontSize: hp(1.6),
        lineHeight: hp(2.6),
        fontFamily: fontFamily.PoppinsRegular,
        marginTop: wp(15),
        textAlign: "center",
        textDecorationLine: 'underline'
    }
})