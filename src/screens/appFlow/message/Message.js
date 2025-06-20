// import React, { useEffect, useRef, useState } from "react";
// import { View, StyleSheet, Platform, TextInput, SafeAreaView, Image, ImageBackground, TouchableOpacity, StatusBar, Text, FlatList, Pressable, Dimensions, KeyboardAvoidingView } from "react-native";
// import { heightPixel, hp, routes, widthPixel, wp } from "../../../services/constants";
// import { appIcons, appImages } from "../../../services/utilities/assets";
// import { colors, fontFamily } from "../../../services";
// import HomeHeader from "../../../components/homeHeader/HomeHeader";
// import { Input } from "../../../components/input";
// import Header from "../../../components/header";
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import appStyles from "../../../services/utilities/appStyles";
// import { useTheme } from "@react-navigation/native";

// const messages = [
//     { id: '1', text: "What's up, dude?", time: '12:01', type: 'received', date: 'May 29' },
//     { id: '2', text: 'Good, I finally finished this work, starting to work on the next one', time: '12:01', type: 'sent' },
//     { id: '3', text: 'Hey, guys, all is good 😊', time: '12:01', type: 'received' },
//     { id: '4', text: 'Nice 👌', time: '12:01', type: 'sent' },
//     { id: '5', text: 'Hey, all is good 😊', time: '12:01', type: 'received' },
//     { id: '6', text: 'Hey, guys, all is good 😊', time: '12:01', type: 'received', date: 'Today' },
// ];

// export default Message = (props) => {
//     const { colors } = useTheme()
//     const [message, setMessage] = useState('');
//     const renderItem = ({ item, index }) => (
//         <View key={index}>
//             {
//                 item.date && (
//                     <View style={[appStyles.rowCenter, { marginVertical: wp(5) }]}>
//                         <View style={styles.line} />
//                         <Text style={[styles.orTextStyle, { color: '#A8A8A8' }]}>{item.date}</Text>
//                         <View style={styles.line} />
//                     </View>
//                 )
//             }
//             <View style={{ flexDirection: item.type === 'sent' ? 'row-reverse' : 'row', alignItems: 'center', marginTop: wp(2) }}>
//                 <Image source={appIcons.userChatIcon} style={{ width: wp(5), height: wp(5) }} />
//                 <View style={[styles.messageContainer, item.type === 'sent' ? { ...styles.sentMessage, backgroundColor: colors.primary } : [styles.receivedMessage, { backgroundColor: colors.lable }]]}>
//                     <Text style={[styles.messageText, { color: item.type === 'sent' ? 'white' : colors.blackOrWhite }]}>{item.text}</Text>
//                 </View>
//                 <Text style={[styles.messageTime, { color: '#666666' }]}>{item.time}</Text>
//             </View>
//         </View>
//     );

//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: colors.wheatWhite }}>
//             <Header leftIcon onleftIconPress={() => props.navigation.goBack()} message title={'Royal Palm Golf Club'} />

//             <FlatList
//                 data={messages}
//                 renderItem={renderItem}
//                 keyExtractor={item => item.id}
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={styles.messageList}
//             />

//             <View style={styles.inputContainer}>
//                 <Input
//                     placeholder="Type Message"
//                     value={message}
//                     onChangeText={(e) => setMessage(e)}
//                     containerStyle={{
//                         borderRadius: 10,
//                         borderWidth: 0,
//                         backgroundColor: colors.fullWhite
//                     }}
//                     WholeContainer={{
//                         borderRadius: 5,
//                         width: wp(80),
//                         alignSelf: "center",
//                         marginTop: Platform.OS == 'android' ? -hp(5) : 0,
//                     }}
//                 />

//                 <TouchableOpacity activeOpacity={0.8} style={[styles.sendButton, { backgroundColor: colors.fullWhite, marginBottom: Platform.OS == 'android' ? -wp(0.5) : -wp(5), padding: wp(4), marginLeft: wp(1) }]}>
//                     <Image source={appIcons.sendTransparent} style={{ width: wp(5), height: wp(5) }} />
//                 </TouchableOpacity>
//             </View>
//         </SafeAreaView>
//     )
// };

// const styles = StyleSheet.create({
//     messageList: {
//         padding: 10,
//     },
//     messageContainer: {
//         maxWidth: '70%',
//         borderRadius: 10,
//         padding: 10,
//         marginVertical: 5,
//     },
//     sentMessage: {
//         alignSelf: 'flex-end',
//         marginHorizontal: wp(2)
//     },
//     receivedMessage: {
//         alignSelf: 'flex-start',
//         // backgroundColor: '#f1f0f0',
//         marginHorizontal: wp(2)
//     },
//     messageText: {
//         fontSize: hp(1.6),
//         lineHeight: hp(2.4),
//         fontFamily: fontFamily.PoppinsRegular,
//     },
//     messageTime: {
//         fontSize: hp(1.4),
//         lineHeight: hp(2.1),
//         fontFamily: fontFamily.PoppinsRegular,
//     },
//     inputContainer: {
//         flexDirection: 'row',
//         alignItems: 'flex-end',
//         padding: 10,
//         height: wp(20),
//     },
//     input: {
//         flex: 1,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 20,
//         paddingHorizontal: 15,
//         marginRight: 10,
//     },
//     sendButton: {
//         borderRadius: 50,
//     },
//     orTextStyle: {
//         textAlign: 'center',
//         fontSize: hp(1.2),
//         fontFamily: fontFamily.PoppinsLight,
//     },
//     line: {
//         borderColor: '#DCDCDC',
//         borderWidth: 0.5,
//         width: wp(39),
//         marginHorizontal: wp(3)
//     },
// });

import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Platform, TextInput, SafeAreaView, Image, TouchableOpacity, StatusBar, Text, FlatList, KeyboardAvoidingView, Keyboard } from "react-native";
import { heightPixel, hp, routes, widthPixel, wp } from "../../../services/constants";
import { appIcons } from "../../../services/utilities/assets";
import { colors, fontFamily } from "../../../services";
import Header from "../../../components/header";
import { Input } from "../../../components/input";
import appStyles from "../../../services/utilities/appStyles";
import { useTheme } from "@react-navigation/native";

const initialMessages = [
    { id: '1', text: "What's up, dude?", time: '12:01', type: 'received', date: 'May 29' },
    { id: '2', text: 'Good, I finally finished this work, starting to work on the next one', time: '12:01', type: 'sent' },
    { id: '3', text: 'Hey, guys, all is good 😊', time: '12:01', type: 'received' },
    { id: '4', text: 'Nice 👌', time: '12:01', type: 'sent' },
    { id: '5', text: 'Hey, all is good 😊', time: '12:01', type: 'received' },
    { id: '6', text: 'Hey, guys, all is good 😊', time: '12:01', type: 'received', date: 'Today' },
];

export default Message = (props) => {
    const { colors } = useTheme();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(initialMessages);
    const flatListRef = useRef();

    const handleSend = () => {
        if (message.trim()) {
            const newMessage = {
                id: (messages.length + 1).toString(),
                text: message,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: 'sent'
            };
            setMessages([...messages, newMessage]);
            setMessage('');
            scrollToEnd();
        }
    };

    const scrollToEnd = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', scrollToEnd);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', scrollToEnd);

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const renderItem = ({ item, index }) => (
        <View key={index}>
            {
                item.date && (
                    <View style={[appStyles.rowCenter, { marginVertical: wp(5) }]}>
                        <View style={styles.line} />
                        <Text style={[styles.orTextStyle, { color: '#A8A8A8' }]}>{item.date}</Text>
                        <View style={styles.line} />
                    </View>
                )
            }
            <View style={{ flexDirection: item.type === 'sent' ? 'row-reverse' : 'row', alignItems: 'center', marginTop: wp(2) }}>
                <Image source={appIcons.userChatIcon} style={{ width: wp(5), height: wp(5) }} />
                <View style={[styles.messageContainer, item.type === 'sent' ? { ...styles.sentMessage, backgroundColor: colors.primary } : [styles.receivedMessage, { backgroundColor: colors.lable }]]}>
                    <Text style={[styles.messageText, { color: item.type === 'sent' ? 'white' : colors.blackOrWhite }]}>{item.text}</Text>
                </View>
                <Text style={[styles.messageTime, { color: '#666666' }]}>{item.time}</Text>
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: colors.wheatWhite }}
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <Header leftIcon onleftIconPress={() => props.navigation.goBack()} message title={'Royal Palm Golf Club'} />

                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.messageList}
                    onContentSizeChange={scrollToEnd}
                />

                <View style={styles.inputContainer}>
                    <Input
                        placeholder="Type Message"
                        value={message}
                        onChangeText={(e) => setMessage(e)}
                        containerStyle={{
                            borderRadius: 10,
                            borderWidth: 0,
                            backgroundColor: colors.fullWhite
                        }}
                        WholeContainer={{
                            borderRadius: 5,
                            width: wp(80),
                            alignSelf: "center",
                            marginTop: Platform.OS == 'android' ? -hp(5) : 0,
                        }}
                    />

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.sendButton, { backgroundColor: colors.fullWhite, marginBottom: Platform.OS == 'android' ? -wp(0.5) : -wp(5), padding: wp(4), marginLeft: wp(1) }]}
                        onPress={handleSend}
                    >
                        <Image source={appIcons.sendTransparent} style={{ width: wp(5), height: wp(5) }} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    messageList: {
        padding: 10,
    },
    messageContainer: {
        maxWidth: '70%',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
    },
    sentMessage: {
        alignSelf: 'flex-end',
        marginHorizontal: wp(2)
    },
    receivedMessage: {
        alignSelf: 'flex-start',
        marginHorizontal: wp(2)
    },
    messageText: {
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        fontFamily: fontFamily.PoppinsRegular,
    },
    messageTime: {
        fontSize: hp(1.4),
        lineHeight: hp(2.1),
        fontFamily: fontFamily.PoppinsRegular,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 10,
        height: wp(20),
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 15,
        marginRight: 10,
    },
    sendButton: {
        borderRadius: 50,
    },
    orTextStyle: {
        textAlign: 'center',
        fontSize: hp(1.2),
        fontFamily: fontFamily.PoppinsLight,
    },
    line: {
        borderColor: '#DCDCDC',
        borderWidth: 0.5,
        width: wp(39),
        marginHorizontal: wp(3)
    },
});

