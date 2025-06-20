import React, { useContext, useState } from 'react';
import { Text, StyleSheet, View, TextInput, Image, TouchableOpacity, ScrollView, Pressable, Platform } from 'react-native';
import { appIcons, appImages, colors, fontFamily, heightPixel, hp, widthPixel, wp } from '../../services';
import appStyles from '../../services/utilities/appStyles';
import CheckBox from '@react-native-community/checkbox';
import { useTheme } from '@react-navigation/native';

export const Input = props => {
    const { colors } = useTheme()
    const [borderColor, setBorderColor] = useState(false)

    const onFocus = () => {
        setBorderColor(true)
    }
    const onBlur = () => {
        setBorderColor(false)
    }

    const getMultipleText = () => {
        return (
            props.dropdownArray.filter(item => item.checked).map((item, index) => item.title).join(', ')
        )
    }

    return (
        <View style={[styles.formInput, props.WholeContainer, { paddingTop: 15 }]}>
            <View style={[appStyles.rowBtw]}>
                <View style={[appStyles.row]}>
                    <Text style={[styles.titleStyle, { color: colors.secondaryBlack }]}>{props.children}</Text>
                    {props.star &&
                        <Text style={{ color: colors.errorColor, paddingLeft: 3 }}>*</Text>
                    }
                </View>
                <Text onPress={props.onrightTextPress} style={[styles.rightTitleStyle, { color: colors.descriptionColor }]}>{props.rghtText}</Text>
            </View>
            {
                !props?.hideInput && (
                    <TouchableOpacity disabled={props.touchable ? false : true} activeOpacity={0.9} onPress={() => props.onPressIcon()} style={[styles.input, props.shadow && styles.shadow, props.containerStyle, { backgroundColor: colors.fullWhite, }]} >
                        {props.leftIcon && <Image source={props.leftIcon} style={[styles.icon, props.leftIconStyle, { tintColor: colors.checBoxColor }]} />}
                        {
                            props.checkBoxes
                                ? (
                                    <Text style={[styles.inputTextStyle, { color: colors.secondaryBlack, textAlign: 'left' }]}>{getMultipleText().length > 50 ? `${getMultipleText().slice(0, 50)}...` : getMultipleText()}</Text>
                                )
                                : (
                                    <TextInput
                                        style={[styles.inputTextStyle, props.inputStyle, { color: colors.secondaryBlack, textAlign: 'left', marginLeft: wp(2) }]}
                                        selectionColor={colors.black}
                                        value={props.value}
                                        onFocus={onFocus}
                                        placeholder={props.placeholder}
                                        placeholderTextColor={colors.placeholder}
                                        secureTextEntry={props.secureTextEntry}
                                        keyboardType={props.keyboardType}
                                        onBlur={onBlur}
                                        editable={props.editable}
                                        onChangeText={props.onChangeText}
                                        multiline={props.multiline}
                                        maxLength={props.maxLength}
                                    />
                                )
                        }

                        {props.eye &&
                            <TouchableOpacity onPress={props.onPressEye}>
                                <Image source={props.secureTextEntry ? appIcons.hide : appIcons.show} style={[styles.icon, { tintColor: colors.checBoxColor }]} />
                            </TouchableOpacity>
                        }

                        {props.rightIcon &&
                            <TouchableOpacity onPress={props.onPressIcon}>
                                <Image source={props.eyeValue} style={[styles.icon, { tintColor: colors.checBoxColor }]} />
                            </TouchableOpacity>
                        }
                    </TouchableOpacity>
                )
            }

            {props.dropDownShow && (
                <View style={[styles.dropContainer, { shadowColor: colors.secondaryBlack, backgroundColor: colors.fullWhite, }]}>
                    <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
                        {props.dropdownArray.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        paddingVertical: wp(3),
                                        borderBottomWidth: 0.5,
                                        borderBottomColor: 'rgba(0,0,0,0.1)',
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginHorizontal: wp(1)
                                    }}
                                    onPress={() => {
                                        if (props.checkBoxes) {
                                            props.onPressValue(item.id)
                                        } else {
                                            props.onPressValue(item)
                                        }
                                    }}
                                >
                                    <Text style={{
                                        fontSize: hp(1.6),
                                        color: colors.secondaryBlack,
                                        fontFamily: fontFamily.PoppinsRegular
                                    }}>
                                        {item.title}
                                    </Text>
                                    {
                                        props.checkBoxes
                                            ? (
                                                <CheckBox
                                                    disabled={false}
                                                    onFillColor={colors.primary}
                                                    onCheckColor='white'
                                                    value={item.checked}
                                                    onValueChange={() => Platform.OS == 'android' ? props.onPressValue(item.id) : console.log('Ok IOS hai yeh! Double Click hota hai is liyai')}
                                                    boxType='square'
                                                    onTintColor={colors.primary}
                                                    style={styles.checbox}
                                                    hitSlop={{ top: 10, bottom: 10, left: 0, right: 0 }}
                                                    tintColors={{ true: colors.primary, false: colors.placeholder }} // Change tint colors if needed
                                                />
                                            )
                                            : (
                                                <Pressable onPress={() => props.onPressValue(item)} style={[styles.dotComponentActiveStyle, { borderColor: colors.primary, backgroundColor: colors.fullWhite, borderWidth: 1 }]}>
                                                    <View style={[styles.dotComponentStyle, { backgroundColor: props.value == item.title ? colors.primary : 'transparent' }]} />
                                                </Pressable>
                                            )
                                    }

                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            )}
            <View>
                {props.errorText && props.errorText ? (
                    <View style={appStyles.pt5}>
                        <Text style={[styles.errorText, { color: colors.errorColor, }]} >{props.errorText}</Text>
                    </View>
                ) : null}
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    dotComponentActiveStyle: {
        width: wp(4),
        height: wp(4),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dotComponentStyle: {
        width: wp(3),
        height: wp(3),
        borderRadius: 50,
    },
    dropContainer: {
        width: '100%',
        height: hp(20),
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        elevation: 2,
        paddingHorizontal: widthPixel(10),
        paddingVertical: heightPixel(10),
        marginTop: heightPixel(2),
        borderRadius: 10
    },
    inputTextStyle: {
        flex: 1,
        fontFamily: fontFamily.PoppinsRegular,
        fontSize: hp(1.4),
    },
    icon: {
        width: 18,
        height: 18,
        resizeMode: 'contain'
    },
    sendIcon: {
        width: 22,
        height: 22,
        resizeMode: 'contain'
    },
    formInput: {
        width: '100%',
    },
    titleStyle: {
        paddingVertical: wp(2),
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        fontFamily: fontFamily.PoppinsMedium,
    },
    rightTitleStyle: {
        paddingVertical: wp(2),
        fontSize: hp(1.4),
        fontFamily: fontFamily.PoppinsSemiBold,
        textDecorationLine: 'underline'
    },
    errorText: {
        fontSize: 12,
        fontFamily: fontFamily.appTextRegular,
        paddingLeft: wp(4)
    },
    input: {
        borderRadius: 10,
        height: wp(12),
        paddingLeft: 10,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#E9EAEB',
        borderWidth: 1
    },
    bankIconStyle: {
        width: 40,
        height: 40,
        resizeMode: 'contain'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    fileIconStyle: {
        width: wp(4),
        height: hp(4),
        resizeMode: 'contain',
    },
    checbox: {
        height: Platform.OS == 'ios' ? heightPixel(15) : heightPixel(20),
        width: Platform.OS == 'ios' ? widthPixel(15) : widthPixel(30),
    },
})