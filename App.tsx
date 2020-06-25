import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { HomeView, ImagePreview, Photo, AddFriends, RegisterView, LoginView, ShowFriend, Profile, UserPictures, ProfileEdit, SubscribeRequests } from './src/pages';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { userService, locationService } from './src/services';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import { Text } from 'react-native-elements';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = (message: string | string[]) => {
	if (message.indexOf('Setting a timer') <= -1) {
		_console.warn(message);
	}
};

const Stack = createStackNavigator();

export default function App() {

	const [initialRoute, setInitialRoute] = useState(userService.isAuthenticated() ? 'Home' : 'Login');

	const [location, setLocation] = useState({})

	setInterval(() => {
		setLocation(locationService.getCurrentLocation());
	}, 1000)

	// optimise l'utilisation de la mémoire de chaque <Stack.Screen/>
	enableScreens();

	return (
		<NavigationContainer>
      <Text>{locationService.location.coords.latitude};{locationService.location.coords.longitude}</Text>
			<Stack.Navigator 
			initialRouteName={initialRoute} 
			screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}
			>
				<Stack.Screen
					name="Home"
					component={HomeView}
					// On cache le header car on en a déjà un personnalisé
					options={{ headerShown: false }}
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
					name="SubscribeRequests"
					component={SubscribeRequests}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Profile"
					component={Profile}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="ProfileEdit"
					component={ProfileEdit}
					options={{ headerShown: false }} />
				<Stack.Screen
					name="ShowFriend"
					component={ShowFriend}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="UserPictures"
					component={UserPictures}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Register"
					component={RegisterView}
					// On cache le header car on en a déjà un personnalisé
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Login"
					component={LoginView}
					// On cache le header car on en a déjà un personnalisé
					options={{ headerShown: false }}
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