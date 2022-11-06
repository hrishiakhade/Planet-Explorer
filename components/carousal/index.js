import React from 'react'
import { useSharedValue } from 'react-native-reanimated';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Platform,
    Image,
    Linking
} from 'react-native';
import { PaginationItem } from '../../components/carousal/pagination';
import Carousel from 'react-native-reanimated-carousel';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export function CarousalComponent(props) {
    const progressValue = useSharedValue(0);
    const { data ,playSound} = props;
    return (
        <>
            <Carousel
                loop
                width={width}
                height={width}
                snapEnabled
                mode='parallax'
                autoPlay={false}
                pagingEnabled={true}
                data={data}
                scrollAnimationDuration={1000}
                onProgressChange={(_, absoluteProgress) =>{
                    (progressValue.value = absoluteProgress);
                }
                }
                onScrollBegin={() => playSound()}
                style={{ flex: 1, backgroundColor: 'transparent', marginTop: 50 }}
                renderItem={({ item, index }) => (
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: item?.imgSrc[0]?.img }} />
                        <View style={styles.infoView}>
                            <Text style={styles.caption}>Picture: {item?.imgSrc[0]?.imgDescription}</Text>
                            <Text style={styles.title}>
                                {item.name}
                            </Text>
                            <Text style={styles.description}>{item.description}</Text>
                            <View style={{ height: 4 }} />
                            <Text style={styles.description}><Text style={styles.fontWeightBold}>Planet Order:</Text> {item.planetOrder}</Text>
                            <Text style={styles.description}><Text style={styles.fontWeightBold}>Mass:</Text> {item.basicDetails[0].mass}</Text>
                            <Text style={styles.description}><Text style={styles.fontWeightBold}>Volume:</Text> {item.basicDetails[0].volume}</Text>
                            <Text style={styles.textLink} onPress={() => Linking.openURL(item.wikiLink)}>Click here for the more details..</Text>
                        </View>
                    </View>
                )}
            />
            {data?.length ? <View style={styles.paginationView}>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => {
                    return (
                        <PaginationItem
                            backgroundColor={'#2561c2'}
                            animValue={progressValue}
                            index={index}
                            key={index}
                            length={8}             // number o planets
                        />
                    );
                })}
            </View> : null}
        </>
    );
}

const styles = StyleSheet.create({
    item: {
        width: width - 60,
        height: height,
    },
    imageContainer: {
        flex: 1,
        // height:height-100,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: '#000',
        borderRadius: 8
    },
    paginationView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100,
        alignSelf: 'center',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    caption: {
        textAlign: 'center',
        fontSize: 12,
        color: '#fff',
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '500',
        color: '#fff',
        marginVertical: 5
    },
    description: {
        textAlign: 'justify',
        fontSize: 16,
        color: '#fff'
    },
    textLink: {
        color: 'blue',
        textDecorationLine: 'underline',
        textDecorationColor: 'blue',
        textDecorationStyle: 'solid',
        textAlign: 'center',
        marginVertical: 5
    },
    infoView: {
        backgroundColor: '#111212',
        paddingHorizontal: 10,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        paddingBottom: 10
    },
    fontWeightBold: {
        fontWeight: 'bold'
    }
});