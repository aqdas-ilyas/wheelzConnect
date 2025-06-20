import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { colors, fontFamily, hp, wp } from '../../services';
import Button from '../button';
import DrivingLicense from '../drivingLicense/DrivingLicense';

const { width, height } = Dimensions.get('window');

export default function CameraModal({ modalShow, setModalVisible, setImage }) {
    const cameraRef = useRef(null)
    const device = useCameraDevice('front')
    const { hasPermission } = useCameraPermission()
    const [active, setActive] = React.useState(true)

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePhoto();
            console.log("Click Picture: ", photo);

            const pathUrl = `file://${photo.path}`;
            setImage(pathUrl);
            setActive(false)

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
                <Camera
                    ref={cameraRef}
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={active}
                    photo={true}
                />

                <View style={styles.overlay}>
                    <Text style={styles.topProfileText}>Profile Picture</Text>
                    <View style={styles.outerCircle}>
                        <View style={styles.innerCircle} />
                    </View>
                    <Text style={styles.overlayText}>Place the face within frame center</Text>
                </View>

                <View style={styles.continueButton}>
                    <Button onPress={takePicture}>Continue</Button>
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
        width: wp(65),
        height: wp(65),
        borderRadius: wp(65) / 2, // Ensures it is a perfect circle
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
    },
});
