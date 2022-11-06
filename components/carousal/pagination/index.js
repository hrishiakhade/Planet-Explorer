import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';

const width = 10;


export const PaginationItem = (props) => {
    const { animValue, index, length, backgroundColor } = props;

    const animStyle = useAnimatedStyle(() => {
        let inputRange = [index - 1, index, index + 1];
        let outputRange = [-width, 0, width];

        if (index === 0 && animValue?.value > length - 1) {
            inputRange = [length - 1, length, length + 1];
            outputRange = [-width, 0, width];
        }

        return {
            transform: [
                {
                    translateX: interpolate(
                        animValue?.value,
                        inputRange,
                        outputRange,
                        Extrapolate.CLAMP
                    ),
                },
            ],
        };
    }, [animValue, index, length]);
    return (
        <View style={styles.container} >
            <Animated.View style={[styles.animatedView, { backgroundColor }, animStyle]} />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width,
        height: width,
        borderRadius: 50,
        overflow: 'hidden',
        transform: [{ rotateZ: '0deg' }],
    },
    animatedView: {
        borderRadius: 50,
        flex: 1,
    }
});