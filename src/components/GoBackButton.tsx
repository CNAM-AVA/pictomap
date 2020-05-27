import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function GoBackButton(props: any) {

	const navigation = useNavigation();

	return (
		<Icon
			name='arrow-left'
			type='font-awesome'
			color='white'
			underlayColor='transparent'
			size={40}
			onPress={() => navigation.goBack()}

		/>
	)
}

const styles = StyleSheet.create({

});
