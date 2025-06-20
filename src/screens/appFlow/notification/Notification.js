import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Pressable, Modal, SafeAreaView, ScrollView, FlatList, ImageBackground, TouchableOpacity } from 'react-native'
import { appIcons, appImages, colors, fontFamily, fontPixel, heightPixel, hp, widthPixel, wp } from '../../../services'
import Header from '../../../components/header'
import { useTheme } from '@react-navigation/native'
import appStyles from '../../../services/utilities/appStyles'

const newdata = [
    {
        id: 1,
        src: appIcons.notificationIcon,
        title: 'Reminder Notifications',
        date: '6 days ago | 09:24 AM',
    },
    {
        id: 2,
        src: appIcons.tickIcon,
        title: 'New Updates Available!',
        date: '2 days ago | 09:24 AM',
    },
    {
        id: 3,
        src: appIcons.notificationIcon,
        title: 'Reminder Notifications',
        date: '6 days ago | 09:24 AM',
    },
    {
        id: 4,
        src: appIcons.tickIcon,
        title: 'Security Updates!',
        date: 'Today | 09:24 AM',
    },
    {
        id: 5,
        src: appIcons.notificationIcon,
        title: 'Reminder Notifications',
        date: '6 days ago | 09:24 AM',
    }]

export default function Notification(props) {
    const { colors } = useTheme()

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <View style={{ flex: 1, marginHorizontal: wp(4) }}>
                <View style={{ paddingVertical: wp(3) }}>
                    <Header leftIcon onleftIconPress={() => props.navigation.goBack()} title={'Notifications'} />
                </View>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={newdata}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => {
                        return (
                            <View key={index} style={styles.box}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={item.src} style={{ width: wp(12), height: wp(12) }} />
                                    <View style={{ marginLeft: wp(3), justifyContent: 'space-between' }}>
                                        <Text style={[styles.reminderText, { color: colors.secondaryBlack }]}>{item.title}</Text>
                                        <Text style={[styles.dateText]}>{item.date}</Text>
                                    </View>
                                </View>
                                <Text style={styles.descriptionStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</Text>
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box: {
        margin: wp(2)
    },
    reminderText: {
        fontFamily: fontFamily.PoppinsMedium,
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
    },
    dateText: {
        fontFamily: fontFamily.PoppinsRegular,
        fontSize: hp(1.4),
        lineHeight: hp(2.1),
        color: '#838383'
    },
    descriptionStyle: {
        fontFamily: fontFamily.PoppinsRegular,
        fontSize: hp(1.4),
        lineHeight: hp(2.1),
        color: colors.placeholder,
        marginTop: wp(2)
    },
})
