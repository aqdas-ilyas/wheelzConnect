import React, { useState, useRef, useEffect } from 'react';
import { View, Text, useWindowDimensions, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { colors, hp, fontFamily, wp, routes, heightPixel, widthPixel, appIcons } from '../../../services';
import appStyles from '../../../services/utilities/appStyles';
import Header from '../../../components/header';
import { Loader } from '../../../components/loader/Loader';
import Button from '../../../components/button';
import { useTheme } from '@react-navigation/native';

const MoreInfo = (props) => {
    const { colors } = useTheme()
    const [isLoading, setIsLoading] = useState(false)

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <Loader loading={isLoading} />
            <View style={{ flex: 1, margin: wp(4) }}>
                <Header leftIcon onleftIconPress={() => props.navigation.goBack()} title={'More Info'} />

                <FlatList
                    data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }]}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => {
                        return (
                            <Text key={index} style={[styles.mainDesc, { color: colors.fullBlack, marginTop: wp(2) }]}>• L{index + 1} – A two-wheeled vehicle with a maximum design speed not exceeding 50kph</Text>
                        )
                    }}
                />
            </View>
        </View>
    );
};

export default MoreInfo;

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        marginTop: wp(5)
    },
    mainDesc: {
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        fontFamily: fontFamily.PoppinsRegular,
        textAlign: "left"
    },
});
