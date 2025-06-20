import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, I18nManager, FlatList, Alert, StatusBar } from 'react-native'
import { colors, hp, fontFamily, wp, routes, heightPixel, widthPixel, emailFormat, passwordFormat } from '../../../services'
import { appIcons, appImages } from '../../../services/utilities/assets'
import appStyles from '../../../services/utilities/appStyles'
import Button from '../../../components/button';
import { Input } from '../../../components/input'
import { Loader } from '../../../components/loader/Loader'
import AuthHeader from '../../../components/authHeader/AuthHeader'
import CallModal from '../../../components/modal'
import { useTheme } from '@react-navigation/native'

export default function ResetPassword(props) {
    const { colors } = useTheme()
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(true)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [modalShow, setModalShow] = useState(false)

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <View style={{ flex: 1, margin: wp(4) }}>
                <Loader loading={isLoading} />

                <AuthHeader appLogo leftIcon onleftIconPress={() => props.navigation.goBack()} />

                <View style={{ flex: 1, marginTop: wp(10) }}>
                    <Text style={[styles.mainTitle, { color: colors.primary }]}>Change Password</Text>

                    <Input
                        placeholder={'●●●●●●●'}
                        secureTextEntry={showPassword}
                        onPressEye={() => setShowPassword(!showPassword)}
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                        eye={true}
                        leftIcon={appIcons.password}
                    >
                        Password
                    </Input>

                    <Input
                        placeholder={'●●●●●●●'}
                        secureTextEntry={showConfirmPassword}
                        onPressEye={() => setShowConfirmPassword(!showConfirmPassword)}
                        value={confirmPassword}
                        onChangeText={(value) => setConfirmPassword(value)}
                        eye={true}
                        leftIcon={appIcons.password}
                    >
                        Confirm Password
                    </Input>
                </View>
                <Button onPress={() => setModalShow(!modalShow)}>Done</Button>
            </View>

            <CallModal
                modalShow={modalShow}
                setModalShow={() => setModalShow(!modalShow)}
                title={'Password Created'}
                subTitle={'Lorem ipsum dolor sit amet consectetur. Maecenas nisi vitae a mattis sed dignissim.'}
            />
        </View>
    )
}



const styles = StyleSheet.create({
    mainTitle: {
        fontSize: hp(2.2),
        lineHeight: hp(3.3),
        fontFamily: fontFamily.PoppinsSemiBold,
    },
})