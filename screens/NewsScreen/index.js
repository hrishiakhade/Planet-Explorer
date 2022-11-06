import React, { useEffect, useState, useCallback } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    Share
} from 'react-native';
import { LoadingSpinner, fetchMoreSpinner } from '../../components/loadingSpinner';
import { Screenheader } from '../../components/screenHeader';
import { getSpaceNews } from '../../utils/api-helper';
import { convertDate } from '../../utils/common-helper';
import { Feather } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { StatusBar } from 'expo-status-bar';

function RenderNews(data, refreshing, onRefresh, fetchMoreNews, renderFooter) {
    if (data?.length)
        return (
            <FlatList
                data={data}
                keyExtractor={(item, index) => item?.id?.toString() + index.toString()}
                renderItem={renderNewsItem}
                contentContainerStyle={{ paddingBottom: 15, paddingTop: 5 }}
                refreshing={refreshing}
                onRefresh={onRefresh}
                onEndReachedThreshold={.1}
                onEndReached={fetchMoreNews}
                ListFooterComponent={renderFooter}
            />
        )
}

const openInappWebBrowser = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
};

function renderNewsItem({ item, index }) {
    return (
        <TouchableOpacity style={styles.newsView} activeOpacity={0.8} onPress={() => openInappWebBrowser(item.url)} onLongPress={() => Share.share({ title: item.title, message: item.url })}>
            <View style={{ padding: 5 }}>
                <Image source={{ uri: item.imageUrl }} style={styles.imageStyle} />
            </View>
            <View style={{ flex: 1, padding: 5 }}>
                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.titleStyle}>{item.title}</Text>
                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.descriptionStyle}>{item.summary}</Text>
                <View style={styles.dateShareView}>
                    <Text style={styles.dateStyle}>{convertDate(item?.publishedAt)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const HomeScreen = ({ navigation }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [pageNo, setPageNo] = useState(0);
    const [fetchMore, setFetchMore] = useState(false);

    const pageSize = 10;

    const onRefresh = () => {
        setPageNo(0);
        setFetchMore(false);
        callAPI(true);
    }

    const fetchMoreNews = () => {
        setFetchMore(true);
        setPageNo(pageNo + 1);
        callAPI(false);
    }

    function callAPI(isRefreshing = false) {
        if (isRefreshing) {
            setRefreshing(true);
        }
        getSpaceNews(pageSize, pageNo).then(result => {
            setLoading(false);
            if (pageNo == 0) {
                setNews(result);
            } else {
                setNews([...news, ...result]);
            }
            setRefreshing(false);
            setFetchMore(false);
        }).catch(error => {
            setLoading(false);
            setRefreshing(false);
            setTimeout(() => {
                alert(error)
            }, 1500);
        })
    }

    // Render Footer
    const renderFooter = () => {
        return <View style={{ marginVertical: 5 }}>{fetchMoreSpinner(fetchMore)}</View>
    }


    useEffect(() => {
        callAPI();

    }, [])

    return (
        <View style={styles.container}>
            <StatusBar  style='light' hidden={false} animated backgroundColor="#000" translucent={false}/>
            {Screenheader('Space News')}
            {LoadingSpinner(loading)}
            {RenderNews(news, refreshing, onRefresh, fetchMoreNews, renderFooter)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 300,
        marginTop: 16,
    },
    newsView: {
        flexDirection: 'row',
        flex: 1,
        padding: 5
    },
    imageStyle: {
        height: 80,
        width: 80,
        backgroundColor: '#c3d1d6',
        borderRadius: 5
    },
    dateShareView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 2
    },
    titleStyle: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 14
    },
    descriptionStyle: {
        textAlign: 'justify',
        flex: 1,
        fontSize: 13,
    },
    dateStyle: {
        fontSize: 11,
        color: '#737270'
    }
});
export default HomeScreen;