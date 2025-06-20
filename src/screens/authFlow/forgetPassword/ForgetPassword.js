import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, I18nManager, FlatList, Alert, StatusBar } from 'react-native'
import { colors, hp, fontFamily, wp, routes, heightPixel, widthPixel, emailFormat, passwordFormat } from '../../../services'
import { appIcons, appImages } from '../../../services/utilities/assets'
import appStyles from '../../../services/utilities/appStyles'
import Button from '../../../components/button';
import { Input } from '../../../components/input'
import { Loader } from '../../../components/loader/Loader'
import AuthHeader from '../../../components/authHeader/AuthHeader'
import { useTheme } from '@react-navigation/native'

export default function ForgetPassword(props) {
    const { colors } = useTheme()
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <View style={{ flex: 1, margin: wp(4) }}>
                <Loader loading={isLoading} />

                <AuthHeader appLogo leftIcon onleftIconPress={() => props.navigation.goBack()} />

                <View style={{ flex: 1, marginTop: wp(10) }}>
                    <Text style={styles.mainTitle}>Forgot Password</Text>
                    <Input
                        placeholder={'Dummy@gmail.com'}
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                        leftIcon={appIcons.message}
                    >
                        Email
                    </Input>
                </View>
                <Button onPress={() => props.navigation.navigate(routes.otp, { email: email.toLowerCase(), key: 'forget' })}>Next</Button>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    mainTitle: {
        fontSize: hp(2.2),
        lineHeight: hp(3.3),
        fontFamily: fontFamily.PoppinsSemiBold,
        color: colors.primary,
    },
})