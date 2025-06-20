import React, { useState, useRef, useEffect } from 'react';
import { View, Text, useWindowDimensions, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { colors, hp, fontFamily, wp, routes, heightPixel, widthPixel, appIcons } from '../../../services';
import appStyles from '../../../services/utilities/appStyles';
import Header from '../../../components/header';
import { Loader } from '../../../components/loader/Loader';
import { useTheme } from '@react-navigation/native';

const AboutApp = (props) => {
    const { colors } = useTheme()
    const [isLoading, setIsLoading] = useState(false)

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite, }]}>
            <Loader loading={isLoading} />

            <View style={{ flex: 1, margin: wp(4) }}>
                <Header leftIcon onleftIconPress={() => props.navigation.goBack()} title={'About App'} />

                <ScrollView bounces={false} style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <Text style={[styles.mainDesc, { color: colors.descText }]}>Lorem ipsum dolor sit amet consectetur. Quis suspendisse eu eget ultrices nisl risus lobortis. Aliquam in ipsum dignissim accumsan ut vitae maecenas in. Cras mi id diam rhoncus in fringilla. Elementum nulla at mattis tellus ac dignissim nisl. Nibh nunc nunc tincidunt sed id et gravida. Eget aliquam ultricies volutpat amet quam ultricies cras turpis ornare. Pharetra magna nunc malesuada dignissim eget at risus pulvinar pellentesque.</Text>
                    <Text style={[styles.mainDesc, { color: colors.descText }]}>Habitant ut erat volutpat congue risus sit fusce. Faucibus tristique sit erat lectus turpis quis feugiat egestas pretium. Eget luctus consectetur eu aliquam volutpat facilisis arcu. Et nunc pulvinar orci molestie pretium vitae scelerisque. Hac blandit tellus interdum consectetur. Egestas eleifend id est egestas auctor viverra. Eu malesuada amet interdum consectetur at. Sed in fringilla ultrices malesuada. Ultrices erat massa adipiscing adipiscing augue dui.</Text>
                    <Text style={[styles.mainDesc, { color: colors.descText }]}>Lacinia morbi arcu pellentesque suspendisse vitae facilisis adipiscing nunc nec. Vitae morbi amet mattis velit amet vestibulum. Vehicula.</Text>
                </ScrollView>
            </View>
        </View>
    );
};

export default AboutApp;

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
