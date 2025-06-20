import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { colors, fontFamily, hp, wp } from '../../services';
import Button from '../button';
import DrivingLicense from '../drivingLicense/DrivingLicense';
import Header from '../header';

const { width, height } = Dimensions.get('window');

export default function CertificateOfRegistration({ modalShow, setModalVisible, setImage }) {
    const cameraRef = useRef(null)
    const device = useCameraDevice('front')
    const { hasPermission } = useCameraPermission()
    const [active, setActive] = React.useState(true)
    const [officialReceipt, setOfficialReceipt] = React.useState(false)

    const takePicture = async () => {
        if (cameraRef.current) {
            // const photo = await cameraRef.current.takePhoto();
            // console.log("Click Picture: ", photo);

            // const pathUrl = `file://${photo.path}`;
            // setImage(pathUrl);
            // setActive(false)

            setTimeout(() => [setActive(true), setModalVisible(false)], 2000);
        } else {
            alert('No face detected, please align your face in the frame');
        }
    };

    if (!hasPermission) return null
    if (device == null) return null

    return (
        <Modal
            style={{ flex: 1 }}
            animationType="slide"
            transparent={true}
            visible={modalShow}
            onRequestClose={() => {
                setModalVisible(!modalShow)
            }}>
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <Header leftIcon onleftIconPress={() => officialReceipt ? setOfficialReceipt(false) : setModalVisible(!modalShow)} />
                </View>

                <Camera
                    ref={cameraRef}
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={active}
                    photo={true}
                />

                <View style={styles.overlay}>
                    <Text style={styles.topProfileText}>{officialReceipt ? 'Official Receipt' : 'Certificate Of Registration'}</Text>
                    <View style={[styles.outerCircle, { height: officialReceipt ? wp(100) : wp(60) }]}>
                        <View style={styles.innerCircle} />
                    </View>
                </View>

                <View style={styles.continueButton}>
                    <Button onPress={() => officialReceipt ? takePicture() : setOfficialReceipt(true)}>Continue</Button>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height
    },
    headerView: {
        flex: 1,
        margin: wp(5),
        zIndex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Blackish color with transparency
        alignItems: 'center',
        paddingTop: wp(30),
    },
    topProfileText: {
        color: colors.fullWhite,
        fontSize: hp(2.2),
        lineHeight: hp(3.3),
        fontFamily: fontFamily.PoppinsSemiBold,
    },
    overlayText: {
        color: colors.fullWhite,
        fontSize: hp(1.8),
        lineHeight: hp(2.7),
        fontFamily: fontFamily.PoppinsSemiBold,
    },
    outerCircle: {
        width: wp(85),
        borderRadius: wp(2), // Ensures it is a perfect circle
        borderWidth: 3,
        borderColor: 'green',
        overflow: 'hidden', // Ensures the child elements adhere to the border radius
        marginTop: wp(20),
        marginBottom: wp(10),
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
        zIndex: 1,
    },
});
