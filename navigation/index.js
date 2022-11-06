import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView ,Image} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import APODScreen from '../screens/APODScreen';
import NewsScreen from '../screens/NewsScreen';
import SearchScreen from '../screens/SearchScreen';
import { StatusBar } from 'expo-status-bar';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function NewsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="News"
        component={NewsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function APODStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="APOD"
        component={APODScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 ,backgroundColor:'#000'}} >
      <StatusBar style='light'/>
        <Tab.Navigator
          initialRouteName="Feed"
          screenOptions={{
            tabBarActiveTintColor: '#42b0f5',
            headerShown: false,
            tabBarAllowFontScaling:true
          }}
        >
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              tabBarLabel: 'Home',
              tabBarLabelStyle: {'fontSize':13},
              tabBarIcon: ({ size, focused}) => {
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={focused ? require('../assets/bottom-tab-bar/home_active.png') : require('../assets/bottom-tab-bar/home_inactive.png')}
                  />
                );
              }
            }}
          />
          <Tab.Screen
            name="SearchStack"
            component={SearchStack}
            options={{
              tabBarLabel: 'Explore',
              tabBarLabelStyle: {'fontSize':13},
              tabBarIcon: ({ size, focused}) => {
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={focused ? require('../assets/bottom-tab-bar/explore_active.png') : require('../assets/bottom-tab-bar/explore_inactive.png')}
                  />
                );
              }
            }}
          />
          <Tab.Screen
            name="NewsStack"
            component={NewsStack}
            options={{
              tabBarLabel: 'News',
              tabBarLabelStyle: {'fontSize':13},
              tabBarIcon: ({ size, focused}) => {
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={focused ? require('../assets/bottom-tab-bar/news_active.png') : require('../assets/bottom-tab-bar/news_inactive.png')}
                  />
                );
              }
            }}
          />
          <Tab.Screen
            name="APODStack"
            component={APODStack}
            options={{
              tabBarLabel: 'APOD',
              tabBarLabelStyle: {'fontSize':13},
              tabBarIcon: ({ size, focused}) => {
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={focused ? require('../assets/bottom-tab-bar/apod_active.png') : require('../assets/bottom-tab-bar/apod_inactive.png')}
                  />
                );
              }
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default Navigation;