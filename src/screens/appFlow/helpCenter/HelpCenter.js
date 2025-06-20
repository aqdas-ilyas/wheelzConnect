import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import { colors, hp, fontFamily, wp, routes, heightPixel, widthPixel, appIcons, appImages } from '../../../services'
import appStyles from '../../../services/utilities/appStyles'
import Header from '../../../components/header'
import { useTheme } from '@react-navigation/native'

const HelpCenter = (props) => {
    const { colors } = useTheme()
    const contactUsList = [
        { id: 1, mainTitle: 'Chat to us', desc: 'Our friendly team is here to help.', email: 'help@apparelhub.com', img: appIcons.chatToUs },
        { id: 2, mainTitle: 'Call to us', desc: 'Our friendly team is here to help.', email: '+555586868969', img: appIcons.callToUs },
    ]

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <View style={{ flex: 1, margin: wp(4) }}>
                <Header leftIcon onleftIconPress={() => props.navigation.goBack()} title={'Help Center'} />

                <FlatList
                    data={contactUsList}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <View key={index} style={{ flexDirection: "row", alignItems: "flex-start", marginTop: wp(4) }}>
                                <Image source={item.img} style={styles.ImageStyle} />
                                <View style={{ marginLeft: wp(3) }}>
                                    <Text style={[styles.mainTitle, { color: colors.secondaryBlack }]}>{item.mainTitle}</Text>
                                    <Text style={[styles.mainDesc]}>{item.desc}</Text>
                                    <Text style={[styles.emailText, { color: colors.secondaryBlack }]}>{item.email}</Text>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    )
}

export default HelpCenter

const styles = StyleSheet.create({
    mainTitle: {
        fontSize: hp(1.4),
        lineHeight: hp(2.2),
        fontFamily: fontFamily.PoppinsSemiBold,
        textAlign: 'left'
    },
    mainDesc: {
        fontSize: hp(1.4),
        lineHeight: hp(2.2),
        fontFamily: fontFamily.PoppinsRegular,
        color: '#9A9893',
        textAlign: 'left',
        marginVertical: wp(1.5)
    },
    emailText: {
        fontSize: hp(1.4),
        lineHeight: hp(2.2),
        fontFamily: fontFamily.PoppinsMedium,
        color: '#282626',
        textAlign: 'left'
    },
    ImageStyle: {
        width: wp(10),
        height: wp(10),
        resizeMode: 'contain',
    }
})