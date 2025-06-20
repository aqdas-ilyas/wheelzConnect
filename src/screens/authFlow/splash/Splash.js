// import { useTheme } from '@react-navigation/native'
// import React, { useEffect } from 'react'
// import { Image, StatusBar, StyleSheet, View } from 'react-native'
// // import { colors } from '../../../services'
// import { hp, routes, wp } from '../../../services/constants'
// import { appImages } from '../../../services/utilities/assets'

// export default function Splash(props) {
//     const { colors } = useTheme()

//     useEffect(() => {
//         setTimeout(() => {
//             props.navigation.navigate(routes.selectedLanguage)
//         }, 2000);
//     }, [])

//     return (
//         <View style={[styles.backgroundImage, { backgroundColor: colors.splashBackgroundColor }]}>
//             <StatusBar barStyle={'light-content'} backgroundColor={colors.splashBackgroundColor} />
//             <Image source={appImages.splashLogo} style={styles.imageLogo} />
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     backgroundImage: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     imageLogo: {
//         width: wp(74),
//         height: wp(44)
//     },
// })


import { useTheme } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, StatusBar, StyleSheet, View } from 'react-native';
import { hp, routes, wp } from '../../../services/constants';
import { appImages } from '../../../services/utilities/assets';

export default function Splash(props) {
    const { colors } = useTheme();
    const translateY = useRef(new Animated.Value(hp(50))).current; // Start the image off the bottom of the screen
    const scale = useRef(new Animated.Value(0.5)).current; // Start the image at half size
    const opacity = useRef(new Animated.Value(0)).current; // Start the image fully transparent

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]),
            Animated.delay(1000),
        ]).start(() => {
            props.navigation.navigate(routes.selectedLanguage);
        });
    }, []);

    return (
        <View style={[styles.backgroundImage, { backgroundColor: colors.splashBackgroundColor }]}>
            <StatusBar barStyle={'light-content'} backgroundColor={colors.splashBackgroundColor} />
            <Animated.View style={{ transform: [{ translateY }, { scale }], opacity }}>
                <Image source={appImages.splashLogo} style={styles.imageLogo} />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageLogo: {
        width: wp(74),
        height: wp(44)
    },
});



// import { useTheme } from '@react-navigation/native';
// import React, { useEffect, useRef } from 'react';
// import { Animated, Image, StatusBar, StyleSheet, View } from 'react-native';
// import { hp, routes, wp } from '../../../services/constants';
// import { appImages } from '../../../services/utilities/assets';

// export default function Splash(props) {
//     const { colors } = useTheme();
//     const translateY = useRef(new Animated.Value(hp(100))).current; // Start the image off the bottom of the screen

//     useEffect(() => {
//         Animated.timing(translateY, {
//             toValue: 0,
//             duration: 1000,
//             useNativeDriver: true,
//         }).start(() => {
//             setTimeout(() => {
//                 props.navigation.navigate(routes.selectedLanguage);
//             }, 1000);
//         });
//     }, []);

//     return (
//         <View style={[styles.backgroundImage, { backgroundColor: colors.splashBackgroundColor }]}>
//             <StatusBar barStyle={'light-content'} backgroundColor={colors.splashBackgroundColor} />
//             <Animated.View style={{ transform: [{ translateY }] }}>
//                 <Image source={appImages.splashLogo} style={styles.imageLogo} />
//             </Animated.View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     backgroundImage: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     imageLogo: {
//         width: wp(74),
//         height: wp(44)
//     },
// });
