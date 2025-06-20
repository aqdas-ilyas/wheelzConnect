import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { appIcons, appImages } from '../../services/utilities/assets';
import { colors, fontFamily, hp, routes, wp } from '../../services'

const RentalCard = (props) => {
    return (
        <TouchableOpacity activeOpacity={1} onPress={() => props.onpress ? props.onpress() : props.navigation.navigate(routes.carDetail, { key: 'home' })} style={styles.cardContainer}>
            <Image
                source={appImages.bike} // Replace with your image URL
                style={styles.image}
            />
            <View style={styles.infoContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>Royal Bullet</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>$50</Text>
                        <Text style={styles.perDay}>/Day</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: wp(1) }}>
                    <Text style={styles.location}>Johar Town, Lahore</Text>
                    <View style={{ backgroundColor: '#4E4E4E', paddingHorizontal: wp(2), paddingVertical: wp(1), borderRadius: 50 }}>
                        <Text style={styles.minimum}>01 Day Minimum</Text>
                    </View>
                </View>

                <Text style={styles.daysAgo}>4 Days Ago</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: wp(1) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={appIcons.starBadge} style={{ width: wp(4), height: wp(4), resizeMode: 'contain' }} />
                        <Text style={styles.badge}>All Star Badge</Text>
                    </View>
                    {
                        !props.noFavorite && (
                            <Image source={props.isFavourite ? appIcons.redHeart : appIcons.heart} style={{ width: wp(6), height: wp(6), resizeMode: 'contain' }} />
                        )
                    }
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 25,
        backgroundColor: colors.bluishColor,
        overflow: 'hidden',
        marginHorizontal: wp(4),
        marginTop: wp(4),
        padding: wp(3.5)
    },
    image: {
        width: wp(85),
        height: wp(43),
    },
    infoContainer: {
        paddingTop: wp(5),
    },
    title: {
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        color: colors.wheatWhite,
        fontFamily: fontFamily.PoppinsMedium,
    },
    location: {
        fontSize: hp(1.4),
        lineHeight: hp(2.1),
        color: colors.wheatWhite,
        fontFamily: fontFamily.PoppinsRegular,
    },
    daysAgo: {
        fontSize: hp(1.2),
        lineHeight: hp(2),
        color: colors.wheatWhite,
        fontFamily: fontFamily.PoppinsRegular,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    price: {
        fontSize: hp(1.4),
        color: colors.primary,
        fontFamily: fontFamily.PoppinsSemiBold,
    },
    perDay: {
        fontSize: hp(1.4),
        color: colors.wheatWhite,
        fontFamily: fontFamily.PoppinsRegular,
    },
    minimum: {
        fontSize: hp(1.2),
        color: colors.wheatWhite,
        fontFamily: fontFamily.PoppinsRegular,
    },
    badge: {
        fontSize: hp(1.2),
        color: colors.wheatWhite,
        fontFamily: fontFamily.PoppinsRegular,
        marginLeft: wp(2)
    },
    iconContainer: {
        position: 'absolute',
        right: 15,
        bottom: 15,
    },
    icon: {
        fontSize: 24,
        color: '#FFFFFF',
    },
});

export default RentalCard;
