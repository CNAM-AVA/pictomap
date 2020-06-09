import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function ProfileEdit() {

	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Text>Mamamoo</Text>
		</View >
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#27466A",
	},
	paddedContainer: {
		padding: 10,
	}
});
