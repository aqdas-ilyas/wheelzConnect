import React, { useState, useRef, useEffect } from 'react';
import { View, Text, useWindowDimensions, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { colors, hp, fontFamily, wp, routes, heightPixel, widthPixel, appIcons } from '../../../services';
import appStyles from '../../../services/utilities/appStyles';
import Header from '../../../components/header';
import { Loader } from '../../../components/loader/Loader';
import Button from '../../../components/button';
import { useTheme } from '@react-navigation/native';

const Currency = (props) => {
    const { colors } = useTheme()
    const [isLoading, setIsLoading] = useState(false)
    const [mode, setMode] = useState([
        { id: 1, value: 'PHP (Philippine Peso)', status: true },
        { id: 2, value: 'EUR (Euro)', status: false },
        { id: 3, value: 'USD (U.S Dollar)', status: false },
        { id: 4, value: 'DKK (Danish Krone)', status: false },
        { id: 5, value: 'SEk (Swedish Krone)', status: false },
        { id: 6, value: 'Nok (Norwegian krone)', status: false },
        { id: 7, value: 'PKR (Pakistani Rupee)', status: false },
        { id: 8, value: 'INR (Indian Rupee)', status: false },
        { id: 9, value: 'IDR (Indonesian Rupee)', status: false },
        { id: 10, value: 'VND (Vitenamese Dong)', status: false },
        { id: 11, value: 'CNY (Chinese Renminbi)', status: false },
        { id: 12, value: 'THB (Thai)', status: false },
        { id: 13, value: 'GBP ( British pound)', status: false },
        { id: 13, value: 'Cop (Colombian Peso)', status: false },
    ]);

    const handleCheckboxChange = (id, type) => {
        if (type === 'anyExtra') {
            setChecked(checked.map(item => ({
                ...item,
                status: item.id === id,
            })));
        } else if (type === 'mode') {
            setMode(mode.map(item => ({
                ...item,
                status: item.id === id,
            })));
        }
    };

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <Loader loading={isLoading} />
            <View style={{ flex: 1, margin: wp(4) }}>
                <Header leftIcon onleftIconPress={() => props.navigation.goBack()} title={'Currencies'} />
                <View>
                    <FlatList
                        data={mode}
                        contentContainerStyle={{ marginTop: wp(5) }}
                        ListHeaderComponent={
                            <Text style={[styles.headerTitle, { color: colors.secondaryBlack }]}>Currencies</Text>
                        }
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity key={index} activeOpacity={1} onPress={() => handleCheckboxChange(item.id, 'mode')} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: wp(4) }}>
                                    <Text style={[styles.itemTitle, { color: colors.secondaryBlack }]}>{item.value}</Text>
                                    <View style={[styles.dotComponentActiveStyle, { borderWidth: 1, borderColor: colors.primary, }]}>
                                        <View style={[styles.dotComponentStyle, { backgroundColor: item.status ? colors.primary : 'transparent' }]} />
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </View>
            <Button>Done</Button>
        </View>
    );
};

export default Currency;

const styles = StyleSheet.create({
    headerTitle: {
        fontFamily: fontFamily.PoppinsBold,
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
    },
    itemTitle: {
        fontFamily: fontFamily.PoppinsBold,
        fontSize: hp(1.4),
        lineHeight: hp(2.1),
    },
    dotComponentActiveStyle: {
        width: wp(5),
        height: wp(5),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dotComponentStyle: {
        width: wp(3),
        height: wp(3),
        borderRadius: 50,
    },
});
