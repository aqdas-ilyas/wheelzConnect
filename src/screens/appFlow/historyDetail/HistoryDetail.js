import React, { useState, useRef, useEffect } from 'react';
import { View, Text, useWindowDimensions, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { colors, hp, fontFamily, wp, routes, heightPixel, widthPixel, appIcons, appImages } from '../../../services';
import appStyles from '../../../services/utilities/appStyles';
import Header from '../../../components/header';
import { Loader } from '../../../components/loader/Loader';
import CarList from '../../../components/carList';
import Button from '../../../components/button';
import { useTheme } from '@react-navigation/native';

const HistoryDetail = (props) => {
    const { key } = props?.route?.params ?? {}
    const { colors } = useTheme()
    const [isLoading, setIsLoading] = useState(false)
    const [clickReturn, setClickReturn] = useState(false)

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <Loader loading={isLoading} />

            <View style={{ flex: 1, margin: wp(4) }}>
                <Header leftIcon onleftIconPress={() => props.navigation.goBack()} title={key == 'enableBottomButton' ? 'Check Out' : 'Detail'} />

                <CarList navigation={props.navigation} onpress={() => props.navigation.navigate(routes.carDetail, { key: 'disableButton' })} />

                <View style={styles.priceBox}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.leftTitle}>$35.33 X 3 Days</Text>
                        <Text style={styles.rightTitle}>$106.00</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: wp(3) }}>
                        <Text style={styles.leftTitle}>Extras</Text>
                        <Text style={styles.rightTitle}>$55.15</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: wp(3) }}>
                        <Text style={styles.leftTitle}>Protection</Text>
                        <Text style={styles.rightTitle}>$30.15</Text>
                    </View>
                    {/* Minimum Protection */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.leftTitle}>Discount</Text>
                        <Text style={styles.rightTitle}>$30.00</Text>
                    </View>
                </View>

                <View style={styles.priceBox}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.leftTotalTitle}>Total</Text>
                        <Text style={styles.rightTotalTitle}>$185.85</Text>
                    </View>
                </View>
            </View>
            {
                key == 'enableBottomButton' && (
                    <Button>Pay Now</Button>
                )
            }

            {
                key == 'return' && (
                    <Button onPress={() => props.navigation.navigate(routes.review, { key: 'return' })}>Return</Button>
                )
            }
        </View>
    );
};

export default HistoryDetail;

const styles = StyleSheet.create({
    priceBox: {
        backgroundColor: colors.brownish,
        padding: wp(4),
        borderRadius: wp(3),
        marginTop: wp(5)
    },
    leftTitle: {
        fontFamily: fontFamily.PoppinsRegular,
        fontSize: hp(1.4),
        lineHeight: hp(2.1),
        color: colors.fullWhite
    },
    rightTitle: {
        fontFamily: fontFamily.PoppinsSemiBold,
        fontSize: hp(1.4),
        lineHeight: hp(2.1),
        color: colors.fullWhite
    },
    leftTotalTitle: {
        fontFamily: fontFamily.PoppinsBold,
        fontSize: hp(1.8),
        lineHeight: hp(2.7),
        color: colors.fullWhite
    },
    rightTotalTitle: {
        fontFamily: fontFamily.PoppinsBold,
        fontSize: hp(1.8),
        lineHeight: hp(2.7),
        color: colors.fullWhite
    }
});

