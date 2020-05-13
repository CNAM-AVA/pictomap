import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { userService } from './src/services'
import { HomeView } from './src/pages';

export default function App() {

	useEffect(() => {
		
	}, []);

	return (
		<HomeView/>
	);
}