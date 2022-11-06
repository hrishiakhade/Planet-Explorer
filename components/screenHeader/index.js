
import { View, StyleSheet, Text ,Animated} from 'react-native';

export function Screenheader(title) {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.header}>{title}</Text>
        </View>
    )
}


export function HomeScreenHeader(title,xValue) {
    return (
        <View style={styles.homeHeaderContainer}>
            <Animated.Image source={require('../../assets/homescreen/33.png')} style={{height:200,width:100,transform: [{ translateY: xValue }] }} />
            {/* <Text style={styles.header}>{title}</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#fff',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#888888'
    },
    header: {
        fontSize: 18,
        fontWeight: '500'
    },
    homeHeaderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        // height: 50,
        backgroundColor: 'transparent',
        width: '100%',
        borderBottomWidth: 0,
    }
});

