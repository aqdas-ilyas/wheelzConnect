import { Alert, BackHandler, FlatList, Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { appIcons, appImages, colors, fontFamily, hp, routes, wp } from '../../../services'
import Button from '../../../components/button'
import appStyles from '../../../services/utilities/appStyles'
import { useFocusEffect, useTheme } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { FetchCountryFlag } from '../../../services/helpingMethods'

export default function SelectLanguage(props) {
    const { colors } = useTheme()
    const darModeValue = useSelector(state => state.user.darkMode)

    const [selectPayment, setSelectPayment] = useState(FetchCountryFlag[0]);
    const [dropdownShow, setDropdownShow] = useState(false);

    useEffect(() => {
        const fetchCOuntry = FetchCountryFlag.filter((item) => item.name == 'Philippines')
        setSelectPayment(fetchCOuntry[0])
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            const backAction = () => {
                Alert.alert("Wheelz Connect!", "Are you sure you want to exit the app?", [
                    {
                        text: "Cancel",
                        onPress: () => null,
                        style: "cancel"
                    },
                    { text: "YES", onPress: () => BackHandler.exitApp() }
                ]);
                return true;
            };

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();
        }, [])
    );

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <StatusBar barStyle={darModeValue ? 'light-content' : 'dark-content'} backgroundColor={colors.wheatWhite} />

            <View style={{ flex: 1, margin: wp(4) }}>
                <Image source={darModeValue ? appImages.splashLogo : appImages.appLogo} style={styles.imageLogo} />

                <Text style={[styles.mainTitle, { marginVertical: wp(5) }]}>Please Select Your Language</Text>

                <Text style={[styles.mainDesc, { color: colors.lable }]}>Lorem ipsum dolor sit amet consectetur. At id in quis nunc nunc nunc. Hendrerit.</Text>

                <View style={{ flex: 1, marginTop: wp(4) }}>

                    <TouchableOpacity onPress={() => setDropdownShow(!dropdownShow)} activeOpacity={0.9} style={[appStyles.rowBtw, styles.containerDropDown]}>
                        <Text style={[styles.lableStyle, { color: colors.secondaryBlack }]}>{selectPayment?.name}</Text>
                        <Image source={appIcons.arrowDown} style={[styles.icon, { tintColor: colors.checBoxColor, transform: [{ rotate: dropdownShow ? '180deg' : '0deg' }] }]} />
                    </TouchableOpacity>
                    {
                        dropdownShow && (
                            <View style={{ paddingBottom: wp(2), shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.2, elevation: 1, backgroundColor: colors.wheatWhite, borderRadius: 8, height: wp(80) }}>
                                <FlatList
                                    data={FetchCountryFlag}
                                    contentContainerStyle={{ paddingHorizontal: wp(4), marginHorizontal: wp(1) }}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item, index) => index}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity key={index} activeOpacity={0.9} onPress={() => [setSelectPayment(item), setDropdownShow(!dropdownShow)]} style={[styles.viewStyle]}>
                                                <Text style={[styles.lableStyle, { color: colors.secondaryBlack }]}>{item.name}</Text>
                                                <View style={[styles.dotComponentActiveStyle, { backgroundColor: colors.fullWhite, borderColor: colors.primary, borderWidth: 1 }]}>
                                                    <View style={[styles.dotComponentStyle, { backgroundColor: selectPayment?.name == item?.name ? colors.primary : 'transparent' }]} />
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }}
                                />
                            </View>
                        )
                    }
                </View>
            </View>

            <Button onPress={() => props.navigation.navigate(routes.onboard)}>Continue</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    imageLogo: {
        width: wp(45),
        height: wp(26.5),
        alignSelf: 'center',
        marginVertical: wp(5)
    },
    mainTitle: {
        fontFamily: fontFamily.PoppinsMedium,
        fontSize: hp(2.2),
        lineHeight: hp(3.3),
        color: colors.primary
    },
    mainDesc: {
        fontFamily: fontFamily.PoppinsRegular,
        fontSize: hp(1.8),
        lineHeight: hp(2.7),
    },
    lableStyle: {
        fontFamily: fontFamily.PoppinsMedium,
        fontSize: hp(1.8),
        lineHeight: hp(2),
    },
    dotComponentActiveStyle: {
        width: wp(5),
        height: wp(5),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dotComponentStyle: {
        width: wp(3.6),
        height: wp(3.6),
        borderRadius: 50,
    },
    viewStyle: {
        marginTop: wp(2),
        paddingVertical: wp(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontFamily: fontFamily.NunitoRegular,
        fontSize: hp(1.6),
        lineHeight: hp(2.2),
        color: colors.description
    },
    icon: {
        width: 18,
        height: 18,
        resizeMode: 'contain'
    },
    containerDropDown: {
        borderColor: colors.inActiveText,
        borderWidth: 1,
        borderRadius: 8,
        padding: wp(4),
    }
})