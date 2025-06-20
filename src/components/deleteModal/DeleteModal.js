import React from 'react'
import { View, Text, Image, StyleSheet, Pressable, Modal } from 'react-native'
import { appIcons, appImages, colors, fontFamily, fontPixel, heightPixel, hp, widthPixel, wp } from '../../services'
import Button from '../button'

export default function DeleteModal({ modalShow, setModalShow, title, subTitle }) {
    return (
        <Modal style={{ flex: 1 }} animationType="slide" transparent={true} visible={modalShow} onRequestClose={() => setModalShow(false)}>
            <Pressable style={styles.container} onPress={() => setModalShow(false)}>
                <View style={[styles.doneWrapper]}>
                    <Image source={appImages.tick} style={{ resizeMode: "contain", alignSelf: "center", width: wp(40), height: wp(40) }} />
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.desc}>{subTitle}</Text>

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: wp(5) }}>
                        <Button onPress={() => setModalShow(false)} containerStyle={{ width: wp(45), borderRadius: 50 }}>Yes</Button>
                        <Button onPress={() => setModalShow(false)} containerStyle={{ width: wp(45), borderRadius: 50 }} borderWidth={1} skip>No</Button>
                    </View>
                </View>
            </Pressable>
        </Modal>
    )
}

const styles = StyleSheet.create({
    title: {
        color: colors.primary,
        fontFamily: fontFamily.PoppinsBold,
        fontSize: hp(2.2),
        lineHeight: hp(3.3),
        textAlign: "center",
        marginVertical: wp(5),
        marginHorizontal: wp(5)
    },
    desc: {
        color: colors.placeholder,
        fontFamily: fontFamily.PoppinsMedium,
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        textAlign: "center",
    },
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    doneWrapper: {
        backgroundColor: "#ffffff",
        width: wp(75),
        borderRadius: 30,
        paddingVertical: wp(8),
        paddingHorizontal: wp(4),
    },
})
