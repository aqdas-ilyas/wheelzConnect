import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { colors, fontFamily, hp, wp } from '../../services';
import Button from '../button';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

export default function DrivingLicense({ setDrivingModalOnly, userType, drivingModal, setDrivingModal }) {
    const seletAccount = useSelector(state => state.user.seletAccount)

    const cameraRef = useRef(null)
    const device = useCameraDevice('back')
    const { hasPermission } = useCameraPermission()
    const [backCard, setBackCard] = useState(false)

    if (!hasPermission) return null
    if (device == null) return null

    return (
        <Modal
            style={{ flex: 1 }}
            animationType="slide"
            transparent={true}
            visible={drivingModal}
            onRequestClose={() => setDrivingModalOnly()}>
            <View style={styles.container}>
                <View style={styles.overlay}>
                    <Text style={styles.topProfileText}>{seletAccount == 'user' ? (userType[0]?.title == 'Self Drive' && userType[0]?.checked) ? 'Driver License' : 'Any Valid Government ID' : 'Any Valid Government ID'}</Text>
                    <Text style={styles.overlayText}>Place {backCard ? 'back side' : 'front side'} of your card on the blue box</Text>
                    <Text style={styles.number}>{`${backCard ? 2 : 1}/2`}</Text>

                    <View style={styles.outerCircle}>
                        <Camera
                            ref={cameraRef}
                            style={[StyleSheet.absoluteFill]}
                            device={device}
                            isActive={true}
                            photo={true}
                        />
                    </View>
                </View>

                <View style={styles.continueButton}>
                    <Button onPress={() => backCard ? [setDrivingModal(false), setBackCard(false)] : setBackCard(true)}>Continue</Button>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        height
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(135, 155, 189, 1)', // Blackish color with transparency
        alignItems: 'center',
        paddingTop: wp(30)
    },
    topProfileText: {
        color: colors.fullWhite,
        fontSize: hp(2.2),
        lineHeight: hp(3.3),
        fontFamily: fontFamily.PoppinsSemiBold,
    },
    overlayText: {
        marginTop: wp(8),
        color: colors.fullWhite,
        fontSize: hp(1.6),
        lineHeight: hp(2),
        fontFamily: fontFamily.PoppinsSemiBold,
    },
    number: {
        marginTop: wp(8),
        color: colors.fullWhite,
        fontSize: hp(2.4),
        fontFamily: fontFamily.PoppinsRegular,
    },
    outerCircle: {
        width: wp(85),
        height: wp(60),
        borderRadius: 20,
        marginTop: wp(20),
        borderWidth: 3,
        borderColor: colors.primary,
        overflow: 'hidden', // Ensures the child elements adhere to the border radius
        justifyContent: 'center', // Center the camera within the view
        alignItems: 'center', // Center the camera within the view
    },
    innerCircle: {
        width: 190,
        height: 190,
        borderRadius: 95,
        backgroundColor: 'transparent', // No color, transparent
    },
    continueButton: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
    },
});
