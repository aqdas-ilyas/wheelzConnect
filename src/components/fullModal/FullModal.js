import { useTheme } from '@react-navigation/native'
import React from 'react'
import { View, Text, Image, StyleSheet, Pressable, Modal } from 'react-native'
import { appIcons, appImages, colors, fontFamily, fontPixel, heightPixel, hp, widthPixel, wp } from '../../services'

export default function FullModal({ imgSRC, modalShow, setModalShow, topTitle, title, subTitle }) {
    const { colors } = useTheme()

    return (
        <Modal style={{ flex: 1 }} animationType="slide" transparent={true} visible={modalShow} onRequestClose={() => setModalShow(false)}>
            <Pressable style={[styles.container, { backgroundColor: colors.wheatWhite }]} onPress={() => setModalShow(false)}>
                <Text style={[styles.topTitle, { color: colors.primary }]}>{topTitle}</Text>
                <View style={[styles.innerContainer, { backgroundColor: colors.wheatWhite }]}>
                    <View style={[styles.doneWrapper, { backgroundColor: colors.wheatWhite }]}>
                        <View style={{ height: title == 'Please Wait' ? wp(80) : wp(70) }}>
                            <Image source={imgSRC} style={{ resizeMode: "contain", alignSelf: "center", width: title == 'Please Wait' ? wp(80) : wp(50), height: 'Please Wait' ? wp(80) : wp(10) }} />
                        </View>
                        <Text style={[styles.title, { color: title == 'Something wrong' ? 'red' : colors.primary }]}>{title}</Text>
                        <Text style={[styles.desc, { color: colors.placeholder }]}>{subTitle}</Text>
                    </View>
                </View>
            </Pressable>
        </Modal>
    )
}

const styles = StyleSheet.create({
    topTitle: {
        fontFamily: fontFamily.PoppinsSemiBold,
        fontSize: hp(2.2),
        lineHeight: hp(3.3),
        textAlign: "center",
    },
    title: {
        fontFamily: fontFamily.PoppinsBold,
        fontSize: hp(2.2),
        lineHeight: hp(3.3),
        textAlign: "center",
        marginBottom: wp(5),
        marginHorizontal: wp(5)
    },
    desc: {
        fontFamily: fontFamily.PoppinsMedium,
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        textAlign: "center",
    },
    innerContainer: {
        height: '70%',
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
    },
    doneWrapper: {
        width: wp(75),
        borderRadius: 30,
        paddingVertical: wp(8),
        paddingHorizontal: wp(4),
    },
})
