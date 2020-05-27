import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HomeView, ImagePreview, Photo, AddFriends, ShowFriend } from './src/pages';
import {  } from './src/pages';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

const Stack = createStackNavigator();

export default function App() {

	useEffect(() => {
		
	}, []);

	// optimise l'utilisation de la mémoire de chaque <Stack.Screen/>
	enableScreens();

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen
					name="Home"
					component={HomeView}
					// On cache le header car on en a déjà un personnalisé
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="Photo"
					component={Photo}
					options={{
						headerTransparent: true,
						headerTitle: '',
						headerTintColor: 'white',
					}}
				/>
				<Stack.Screen
					name="ImagePreview"
					component={ImagePreview}
					options={{
						headerTransparent: true,
						headerTitle: '',
						headerTintColor: 'white',
					}}
				/>
				<Stack.Screen
					name="AddFriends"
					component={AddFriends}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="ShowFriend"
					component={ShowFriend}
					options={{headerShown: false}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
    photoHeader: {
		position: 'absolute',
		top: 0,
		right: 0,
		left: 0
	},
});