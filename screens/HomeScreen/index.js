import React, { useEffect, useState } from 'react';
import {  View, ImageBackground, Animated, Easing } from 'react-native';
import { fetchPlanetsInfo } from '../../utils/api-helper';
import { HomeScreenHeader } from '../../components/screenHeader';
import { CarousalComponent } from '../../components/carousal';
import { Audio } from 'expo-av';
import { StatusBar } from 'expo-status-bar';


const HomeScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [xValue, setXValue] = useState(new Animated.Value(200));
    const [animationStarted, setAnimationStarted] = useState(true);
    const [showCarousal, setShowCarousal] = useState(false);
    const [sound, setSound] = useState();


    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(require('../../assets/homescreen/page-turn.mp3'), { volume: 0.1, shouldPlay: true });

        setSound(sound);
        await sound.playAsync();
    }

    useEffect(() => {
        moveTop();
        fetchPlanetsInfo().then((data) => {
            setData(data);
        })
            .catch((error) => {
                alert(error);
            });

        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const moveTop = () => {
        Animated.timing(
            xValue,
            {
                toValue: -500,
                duration: 2000, // the duration of the animation
                easing: Easing.linear, // the style of animation
                useNativeDriver: true
            }
        ).start(callback);
    }
    const callback = () => {
        setAnimationStarted(false);
        setTimeout(() => {
            setShowCarousal(true);
        }, 1000);
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../../assets/homescreen/1.jpg')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} resizeMode='cover'>
                <StatusBar  style='light' hidden={false} animated translucent/>
                {animationStarted ? HomeScreenHeader('Planet Explorer', xValue) : null}
                {showCarousal ? <CarousalComponent data={data} playSound={playSound} /> : null}
            </ImageBackground>
        </View>
    );
}

export default HomeScreen;