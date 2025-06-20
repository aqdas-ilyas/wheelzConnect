import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { appIcons, appImages, colors, fontFamily, hp, routes, wp } from '../../services'
import Button from '../button'

export default function CarList(props) {
    return (
        <TouchableOpacity disabled={props.disable} activeOpacity={1} style={styles.box} onPress={() => props.onpress ? props.onpress() : props.booking ? props.navigation.navigate(routes.checkout) : props.navigation.navigate(routes.historyDetail)}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <Image source={appImages.carImage} style={{ width: wp(20), height: wp(20), resizeMode: 'contain' }} />
                    <View style={{ marginLeft: wp(3) }}>
                        <Text style={styles.itemTitle}>Audi E-Tron GT</Text>
                        <Text style={[styles.itemLoction, { marginVertical: wp(1) }]}>Johar Town, Lahore</Text>
                        <Text style={styles.itemday}>4 days Ago</Text>

                        <View style={{ flexDirection: 'row', alignItems: "flex-start", marginVertical: wp(1) }}>
                            <Image source={appIcons.starBadge} style={{ width: wp(3), height: wp(3), resizeMode: 'contain' }} />
                            <Text style={[styles.itemday, { marginLeft: wp(2) }]}>All Star Badge</Text>
                        </View>
                    </View>
                </View>
                <Text style={[styles.itemPriceDay, { fontFamily: fontFamily.PoppinsSemiBold, color: colors.primary, }]}>$50/<Text style={{ fontFamily: fontFamily.PoppinsSemiBold, color: '#DBDBDB' }}>Day</Text></Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: wp(2) }}>
                <View>
                    <Text style={styles.itemBottomDate}>Sat, Apr 6</Text>
                    <Text style={styles.itemBottomTime}>10:00 Am</Text>
                </View>

                <Image source={appIcons.star} style={{ width: wp(8), height: wp(8), resizeMode: 'contain', tintColor: colors.primary }} />

                <View>
                    <Text style={styles.itemBottomDate}>Tue, Apr 6</Text>
                    <Text style={styles.itemBottomTime}>10:00 Am</Text>
                </View>
            </View>

            {
                props.hostRequest && (
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', marginTop: wp(2) }}>
                        <Button containerStyle={{ width: wp(40) }} borderWidth={1} skip>Decline</Button>
                        <Button containerStyle={{ width: wp(40) }}>Accept</Button>
                    </View>
                )
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: colors.bluishColor,
        padding: wp(4),
        borderRadius: wp(5),
        marginTop: wp(3)
    },
    itemTitle: {
        fontFamily: fontFamily.PoppinsMedium,
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        color: colors.fullWhite
    },
    itemLoction: {
        fontFamily: fontFamily.PoppinsRegular,
        fontSize: hp(1.4),
        lineHeight: hp(2.1),
        color: colors.wheatWhite
    },
    itemday: {
        fontFamily: fontFamily.PoppinsRegular,
        fontSize: hp(1.2),
        lineHeight: hp(2),
        color: colors.wheatWhite
    },
    itemPriceDay: {
        fontSize: hp(1.4),
        lineHeight: hp(2.1),
    },
    itemBottomDate: {
        fontFamily: fontFamily.PoppinsBold,
        fontSize: hp(1.8),
        lineHeight: hp(2.7),
        color: colors.fullWhite
    },
    itemBottomTime: {
        fontFamily: fontFamily.PoppinsMedium,
        fontSize: hp(1.8),
        lineHeight: hp(2.7),
        color: colors.wheatWhite
    }
})