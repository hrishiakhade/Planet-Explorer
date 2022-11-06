import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const renderInfo = (title, data) => {
    if (data) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.titleText}>{title}: </Text>
                    <Text style={styles.infoText}>{data}</Text>
                </View>
            </View>
        )
    }
    return null
}
const renderFloatingButton = (isHide, setCurrentIndex, direction) => {
    if (!isHide) {
        return (
            <Pressable
                style={direction == 'next' ? styles.buttonRight : styles.buttonLeft}
                onPress={() => setCurrentIndex(direction)}>
                <Ionicons name="ios-chevron-back" size={24} color="white" style={{ transform: [{ rotateY: direction == 'next' ? '180deg' : '0deg' }] }} />
            </Pressable>
        )
    }
}
const ModalComponent = (props) => {
    const { modalVisible, setModalVisible, modalData, setCurrentIndex, hidePrevButton, hideNextButton } = props;
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}

            statusBarTranslucent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Image style={styles.pictureStyle} source={{ uri: modalData?.links[0]?.href }} />
                    <Text style={styles.captionStyle}>Picture: {modalData?.data[0]?.title}</Text>
                    {renderFloatingButton(hidePrevButton, setCurrentIndex, 'previous')}
                    {renderFloatingButton(hideNextButton, setCurrentIndex, 'next')}
                    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 7, alignItems: 'flex-start' }}>
                        {renderInfo('Location', modalData?.data[0]?.location)}
                        {renderInfo('Photographer', modalData?.data[0]?.photographer)}
                        {renderInfo('Secondary Creator', modalData?.data[0]?.secondary_creator)}
                        <Text style={styles.descriptionText} >{modalData?.data[0]?.description}</Text>
                    </ScrollView>
                    <Pressable
                        style={styles.buttonClose}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Ionicons name="close" size={24} color="white" />
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
        marginTop: StatusBar.currentHeight || 0,
    },
    modalView: {
        backgroundColor: 'black',
        borderRadius: 20,
        // padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        alignSelf: 'center',
        width: '90%',
        height: '90%',
        paddingBottom: 10
    },
    buttonClose: {
        backgroundColor: 'grey',
        opacity: 0.8,
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 5,
        top:5,
        zIndex: 1
    },
    buttonLeft: {
        backgroundColor: 'grey',
        opacity: 0.6,
        width: 30,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        position: 'absolute',
        top: '48%',
        left: 0,
        zIndex: 1
    },
    buttonRight: {
        backgroundColor: 'grey',
        opacity: 0.6,
        width: 30,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        position: 'absolute',
        top: '48%',
        right: 0,
        zIndex: 1
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    descriptionText: {
        textAlign: 'justify',
        flex: 1,
        fontSize: 14,
        color: '#fff',
        marginTop: 4
    },
    pictureStyle: {
        width: '100%',
        aspectRatio: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    captionStyle: {
        textAlign: 'center',
        fontSize: 12,
        color: '#fff',
        marginTop: 2,
        marginBottom: 5,
        paddingHorizontal: 5
    },
    infoText: {
        fontSize: 14,
        color: '#fff',
        flex: 1
    },
    titleText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '700'
    }
});

export default ModalComponent;