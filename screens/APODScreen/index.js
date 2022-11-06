import React, { useEffect, useState } from 'react';
import {
    Modal,
    StyleSheet,
    View,
    Platform,
    TouchableOpacity,
    Image,
    ToastAndroid,
    Alert,
    Text,
    ScrollView,
} from 'react-native';
import { LoadingSpinner } from '../../components/loadingSpinner';
import { Screenheader } from '../../components/screenHeader';
import { getNasaAPOD } from '../../utils/api-helper';
import ImageViewer from 'react-native-image-zoom-viewer';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library'
import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';
import WebView from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';

const statusBarHeight = Constants.statusBarHeight;

function FullScreenButtons(changeVisibility, imageUri, saveImage) {
    return (
        <View style={styles.fullscreenContainer}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { changeVisibility(false) }} activeOpacity={0.8}>
                    <Ionicons name="arrow-back-circle-outline" size={40} color="white" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => { saveImage(imageUri) }} activeOpacity={0.8}>
                <MaterialCommunityIcons name="download-circle-outline" size={40} color="white" />
            </TouchableOpacity>
        </View>
    )
}


const saveImage = async (uri) => {

    let { status } = await MediaLibrary.requestPermissionsAsync()
    if (status === 'denied' || status === 'undetermined') {
        alert('Dear User , you previously denied local storage permission.Please grant the permission manually by going to App Settings.')
    } else {
        const filename = uri.toString().substring(uri.lastIndexOf('/') + 1);
        const localuri = await FileSystem.downloadAsync(uri, FileSystem.documentDirectory + filename);
        const asset = await MediaLibrary.createAssetAsync(localuri.uri);
        const copyAsset = false;
        const album = await MediaLibrary.createAlbumAsync("Planet Explorer", asset, copyAsset);
        const msg = "Picture has been downloaded to your device's local storage.";

        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
            Alert.alert(msg);
        }
    }
};

function openFullScreenImage(imageUri, visible = false, changeVisibility) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={() => changeVisibility(false)}
        >
            <ImageViewer
                imageUrls={[{ url: imageUri }]}
                onCancel={() => changeVisibility(false)}
                onSwipeDown={() => changeVisibility(false)}
                enableSwipeDown={true}
                renderIndicator={() => null}
                renderHeader={() => FullScreenButtons(changeVisibility, imageUri, saveImage)}
                //loadingRender={() => LoadingSpinner(true)}
                preloadImage={false}
                menuContext={{
                    saveToLocal: "Save Image",
                    cancel: "Cancel"
                }}
                onSave={imageUri => {
                    saveImage(imageUri);
                }}
            />
        </Modal>
    )
}


function RenderImage(imageUri, changeVisibility) {
    return (
        <TouchableOpacity activeOpacity={0.9} onPress={() => changeVisibility(true)} style={styles.imageStyle}>
            <Image source={{ uri: imageUri }} style={styles.imageStyle} />
        </TouchableOpacity>
    )
}

function RenderVideo(videoUrl) {
    return (
        <View style={styles.videoStyle}>
            <WebView
                source={{ uri: videoUrl }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                style={styles.videoStyle}
                allowsFullscreenVideo
                userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
                scrollEnabled={false}
            />
        </View>
    )
}

function renderDescription(description) {
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Text style={styles.descriptionText}>{description}</Text>
        </ScrollView>
    )
}

const APODScreen = ({ navigation }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [zoomImage, setZoomImage] = useState(false);

    useEffect(() => {
        getNasaAPOD().then(res => {
            setData(res)
            setLoading(false)
        }).catch(error => {
            setLoading(false);
            setTimeout(() => {
                alert(error)
            }, 1500);
        })
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar  style='light' hidden={false} animated backgroundColor="#000" translucent={false}/>
            {Screenheader('NASA Astronomy Picture of the Day')}
            {LoadingSpinner(loading)}
            {data ?
                <>
                    {data.media_type == 'video' ? RenderVideo(data.url) : RenderImage(data.hdurl, setZoomImage)}
                    {openFullScreenImage(data.hdurl, zoomImage, setZoomImage)}
                    <Text style={styles.captionStyle}>{data.media_type == 'video' ? 'Video' : 'Picture'}: {data.title}</Text>
                    {renderDescription(data.explanation)}
                </>
                : null}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    imageStyle: {
        width: '100%',
        aspectRatio: 1.44,
        backgroundColor: '#c3d1d6'
    },
    videoStyle: {
        width: '100%',
        aspectRatio: 16 / 9,
        backgroundColor: '#c3d1d6'
    },
    fullscreenContainer: {
        flexDirection: 'row',
        zIndex: 99,
        top: statusBarHeight,
        position: 'absolute',
        paddingHorizontal: 15
    },
    activityIndicator: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 999
    },
    captionStyle: {
        textAlign: 'center',
        fontSize: 12,
        color: '#737270',
        marginTop: 2,
        marginBottom: 5
    },
    scrollViewContainer: {
        padding: 15,
        flexGrow: 1,
        paddingBottom: 30
    },
    descriptionText: {
        flex: 1,
        fontSize: 14,
        textAlign: 'justify'
    }

});
export default APODScreen;