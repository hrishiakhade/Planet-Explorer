import React, { useEffect, useState, useCallback } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    TextInput,
    FlatList,
    Image,
    ImageBackground
} from 'react-native';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import { getNASAMedia, getNASAMediaFromJSON } from '../../utils/api-helper';
import ModalComponent from '../../components/modal';
import { StatusBar } from 'expo-status-bar';

function RenderSearchPanel(props) {
    return (
        <View style={styles.headerContainer} >
            <AntDesign name="search1" size={24} color="black" style={{ marginLeft: 10, marginRight: 5 }} />
            <TextInput
                style={styles.textInput}
                placeholder="Type here to explore the space..."
                onChangeText={(value) => props.setText(value)}
                value={props.text}
                maxLength={50}
                autoFocus
            />
            {props.text.length ? <EvilIcons name="close-o" size={30} color="black" style={{ padding: 5 }} onPress={() => { props.setText(''); props.setShowSearchBar(false) }} /> : null}
        </View>
    )
}

function RenderHeader(props) {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.header}>Explore Space</Text>
            <AntDesign name="search1" size={24} color="black" style={styles.searchIcon} onPress={() => props.setShowSearchBar(true)} />
        </View>
    )
}

renderMediaCard = (item, setModalVisible, setCurrentIndex, index) => {     // show thumbnail of media
    return (
        <TouchableOpacity style={styles.cardView} activeOpacity={0.9} onPress={() => { setCurrentIndex(index), setModalVisible(true) }}>
            <Image style={styles.cardImage} source={{ uri: item?.links[0]?.href }} resizeMode='cover' />
        </TouchableOpacity>
    )
}


function RenderData(data, setModalVisible, setCurrentIndex) {
    return (
        <FlatList
            data={data}
            renderItem={({ item, index }) => renderMediaCard(item, setModalVisible, setCurrentIndex, index)}
            keyExtractor={item => item?.data[0]?.nasa_id}
            numColumns={2}
            contentContainerStyle={styles.flatlistContainer}
            style={{ flex: 1, paddingHorizontal: 5 }}
            ListEmptyComponent={() => <Text style={{ textAlign: 'center', marginTop: 20 }}>No Data Found</Text>}
            keyboardShouldPersistTaps='handled'
        />
    )
}
const HomeScreen = ({ navigation }) => {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [pageNo, setPageNo] = useState(1);
    const [text, setText] = useState("");
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const minIndex = 0;
    const maxIndex = data.length - 1;

    function callAPI() {
        getNASAMedia(text.length ? text : 'carina', pageNo).then(result => {
            setData(result.collection.items)
            // getNASAMediaFromJSON(result.collection.items[0].href).then(output=>{
            //     console.log("output-------",output);
            // })

        }).catch(error => {
            console.log("------------error-------------", error);
        })
    }

    useEffect(() => {
        callAPI();
    }, [text]);

    function changeModalDataIndex(direction) {

        if (direction === 'next') {
            setCurrentIndex((currentIndex + 1) > maxIndex ? maxIndex : (currentIndex + 1));
        } else {
            setCurrentIndex((currentIndex - 1) >= minIndex ? (currentIndex - 1) : minIndex);
        }
    }


    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../../assets/homescreen/2.jpg')} style={{ flex: 1, justifyContent: 'center' }}>
            <StatusBar  style='light' hidden={false} animated backgroundColor="#000" translucent={false}/>
                {showSearchBar ? <RenderSearchPanel setShowSearchBar={setShowSearchBar} setText={setText} text={text} /> : <RenderHeader setShowSearchBar={setShowSearchBar} />}
                {RenderData(data, setModalVisible, setCurrentIndex)}
                <ModalComponent
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    modalData={data[currentIndex]}
                    setCurrentIndex={changeModalDataIndex}
                    hidePrevButton={currentIndex === minIndex}
                    hideNextButton={currentIndex === maxIndex}
                />
            </ImageBackground >

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    searchPanel: {
        flexDirection: "row",
        justifyContent: 'center',
        color: 'grey',
        width: '100%',
        backgroundColor: 'red',
        borderBottomWidth: 1
    },
    textInput: {
        flex: 1,
        padding: 3,
        margin: 5,
        borderWidth: 0
    },
    searchButton: {
        backgroundColor: 'transparent',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#fff',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#888888',
        flexDirection: 'row'
    },
    header: {
        fontSize: 18,
        fontWeight: '500',
    },
    searchIcon: {
        right: 5,
        position: 'absolute',
        padding: 5,
        zIndex: 99,
    },
    cardView: {
        flex: 1,
        height: 175,
        margin: 5,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardImage: {
        height: '100%',
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#c3d1d6',
        elevation: 6
    },
    flatlistContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 20,
        paddingTop: 5,
        backgroundColor: 'transparent'
    }
});
export default HomeScreen;