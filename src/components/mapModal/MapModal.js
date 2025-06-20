import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Image, StyleSheet, Pressable, Modal, TouchableOpacity, Platform } from 'react-native'
import MapView from 'react-native-maps';
import { getLocationPermission } from '../../common/HelpingFunc';
import { appIcons, appImages, colors, fontFamily, fontPixel, GOOGLE_API_KEY, heightPixel, hp, widthPixel, wp } from '../../services'
import Button from '../button';
import { Loader } from '../loader/Loader';
import Geolocation from '@react-native-community/geolocation';

export default function MapModal({ modalShow, setModalShow, setMapLocation, }) {
    const mapRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    const setMapAddress = async (data) => {
        setIsLoading(true);

        await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${[
                data?.latitude,
                data?.longitude,
            ]}&key=${GOOGLE_API_KEY}`,
            {
                method: 'GET',
            },
        )
            .then(response => response.json())
            .then(result => {
                console.log('Fetch Address: ', JSON.stringify(result?.results[0]?.formatted_address),);
                setMapLocation({
                    coordinates: data,
                    address: result?.results[0]?.formatted_address.includes('+')
                        ? result?.results[0]?.formatted_address
                            .split('+')[1]
                            .split(' ')
                            .slice(1)
                            .join(' ')
                        : result?.results[0]?.formatted_address,
                });
            })
            .catch(error => {
                console.log('errorqq', error);
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        getMyLocation()
    }, []);

    const getMyLocation = async () => {
        let permission = await getLocationPermission();
        if (permission) {
            Geolocation.getCurrentPosition(
                async (position) => {
                    var coords = position?.coords;
                    if (coords.latitude != undefined || coords != '') {
                        var userLocation = {
                            latitude: coords.latitude,
                            longitude: coords.longitude,
                        };
                        setRegion({
                            latitude: coords.latitude,
                            longitude: coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        })
                        await setMapAddress(userLocation);
                    }
                },
                error => {
                    console.log(error)
                },
                { enableHighAccuracy: false, timeout: 20000, maximumAge: 3600000 },
            );
        }
    }

    return (
        <Modal style={{ flex: 1 }} animationType="slide" transparent={true} visible={modalShow} onRequestClose={() => setModalShow(false)}>
            <Loader loading={isLoading} />

            <View style={[styles.container, { backgroundColor: colors.wheatWhite, }]}>
                <TouchableOpacity onPress={() => setModalShow(false)} style={{ position: 'absolute', top: Platform.OS == 'ios' ? wp(15) : wp(5), left: wp(5), zIndex: 1 }}>
                    <Image source={appIcons.back} style={{ width: wp(8), height: wp(8) }} />
                </TouchableOpacity>

                <MapView
                    ref={mapRef}
                    style={{ ...StyleSheet.absoluteFillObject }}
                    customMapStyle={styles.customMapStyle}
                    initialRegion={region}
                    onRegionChangeComplete={data => {
                        setMapAddress(data);
                    }}
                />

                <View style={{ height: hp(7), width: '10%', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '45%', left: '45%', }}>
                    <Image style={{ height: hp(7), width: hp(4), resizeMode: 'contain' }} source={appIcons.redmarkerIcon} />
                </View>

                <View style={{ position: 'absolute', bottom: wp(2), left: 0, right: 0 }}>
                    <Button onPress={() => setModalShow(false)}>Done</Button>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        paddingTop: Platform.OS == 'ios' ? wp(12) : 0,
    },
    customMapStyle: [
        {
            "featureType": "administrative",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "color": "#b2b2b2"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#b2b2b2"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#b2b2b2"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#b2b2b2"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        }
    ]
})
