import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Platform, SafeAreaView, Image, ImageBackground, Text, FlatList, ScrollView, TouchableOpacity, Pressable, BackHandler } from "react-native";
import { colors, hp, fontFamily, wp, routes, heightPixel, widthPixel, fontPixel, GOOGLE_API_KEY } from '../../../services'
import { appIcons, appImages } from '../../../services/utilities/assets'
import appStyles from '../../../services/utilities/appStyles'
import Header from '../../../components/header'
import DrivingLicense from '../../../components/drivingLicense/DrivingLicense';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const ViewProfile = (props) => {
    const { colors } = useTheme()
    const seletAccount = useSelector(state => state.user.seletAccount)

    const [drivingModal, setDrivingModal] = React.useState(false)

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <View style={{ flex: 1, margin: wp(4) }}>
                <Header rightIcon={appIcons.editProfile} onRightIconPress={() => props.navigation.navigate(routes.editProfile)} leftIcon onleftIconPress={() => props.navigation.goBack()} title={'Profile'} />

                <ScrollView keyboardShouldPersistTaps={"always"} bounces={false} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={{ marginVertical: wp(5) }}>
                        <View style={styles.imageTopView}>
                            <View style={styles.imageView}>
                                <Image source={appImages.userImage} style={[styles.imageStyle, { resizeMode: 'cover' }]} />
                            </View>
                            <Text style={[styles.mainTitle, { color: colors.lable, textAlign: 'center' }]}>John Doe</Text>
                            <Text style={[styles.mainDes, { color: colors.lable, textAlign: 'center' }]}>+41-9800-00807</Text>
                        </View>
                        <View style={{ marginTop: wp(5) }}>
                            <View>
                                <Text style={[styles.mainTitle, { color: colors.lable, }]}>Date Of Birth</Text>
                                <Text style={[styles.mainDes, { color: colors.lable }]}>22-02-2024</Text>
                            </View>

                            <View>
                                <Text style={[styles.mainTitle, { color: colors.lable, }]}>Phone Number</Text>
                                <Text style={[styles.mainDes, { color: colors.lable }]}>+21-8081471775</Text>
                            </View>

                            <View>
                                <Text style={[styles.mainTitle, { color: colors.lable, }]}>Address</Text>
                                <Text style={[styles.mainDes, { color: colors.lable }]}>Address Here</Text>
                            </View>
                            {
                                seletAccount == 'user' && (
                                    <View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={[styles.mainTitle, { color: colors.lable, }]}>Driving Lincence</Text>
                                            <TouchableOpacity onPress={() => setDrivingModal(!drivingModal)} style={{ alignSelf: 'flex-end' }}>
                                                <Image source={appIcons.editProfile} style={[styles.editIcon]} />
                                            </TouchableOpacity>
                                        </View>

                                        <View>
                                            <Text style={[styles.headerText, { color: colors.lable, }]}>Front</Text>
                                            <Image source={appImages.frontCard} style={styles.cardImage} />
                                        </View>
                                        <View style={{ marginTop: wp(2) }}>
                                            <Text style={[styles.headerText, { color: colors.lable, }]}>Back</Text>
                                            <Image source={appImages.backCard} style={styles.cardImage} />
                                        </View>
                                    </View>
                                )
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>

            <DrivingLicense
                setDrivingModalOnly={() => setDrivingModal(false)}
                drivingModal={drivingModal}
                setDrivingModal={() => setDrivingModal(!drivingModal)}
            />
        </View>
    )
}

export default ViewProfile

const styles = StyleSheet.create({
    mainTitle: {
        fontSize: hp(2),
        lineHeight: hp(3),
        fontFamily: fontFamily.PoppinsSemiBold,
        marginVertical: wp(2)
    },
    mainDes: {
        fontSize: hp(1.4),
        lineHeight: hp(2.1),
        fontFamily: fontFamily.PoppinsRegular,
    },
    imageTopView: {
        marginTop: hp(2),
        alignSelf: 'center',
        justifyContent: 'center'
    },
    imageView: {
        width: wp(25),
        height: wp(25),
        borderRadius: widthPixel(100),
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: widthPixel(100)
    },
    headerText: {
        fontSize: hp(1.6),
        lineHeight: 24,
        fontFamily: fontFamily.PoppinsMedium,
        marginVertical: wp(1)
    },
    cardImage: {
        height: wp(59),
        width: wp(90),
        // resizeMode: 'contain'
    },
    editIcon: {
        width: wp(8),
        height: wp(8),
    },
})