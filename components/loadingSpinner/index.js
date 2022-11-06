
import { ActivityIndicator ,StyleSheet} from 'react-native';

export function LoadingSpinner(loading) {
    if (loading) {
        return (
            <ActivityIndicator size={'large'} color='#42b0f5' style={styles.loadingStyle} />
        )
    }
    return null
}

export function fetchMoreSpinner(loading) {
    if (loading) {
        return (
            <ActivityIndicator size={'small'} color='#42b0f5' style={styles.loadingStyle} />
        )
    }
    return null
}

const styles = StyleSheet.create({
    loadingStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        zIndex:99
    }
});

