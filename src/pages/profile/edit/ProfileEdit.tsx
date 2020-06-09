import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Header, Icon, Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import ProfilePicture from '../../../components/ProfilePicture';
import CardContainer from '../../../components/CardContainer';
import { userService } from '../../../services';

export default function ProfileEdit() {

	const navigation = useNavigation();

	let user = userService.getUser();

	const [pseudo, setPseudo] = useState(user.name);

	return (
		<View style={styles.container}>
			<Header
				leftComponent={<Icon
					name='arrow-left'
					type='font-awesome'
					color='white'
					underlayColor='transparent'
					size={40}
					onPress={() => navigation.goBack()}
				/>}
				centerComponent={
					<ProfilePicture />
				}
				containerStyle={{
					backgroundColor: '#27466A',
					height: 70,
					paddingBottom: 25,
					shadowColor: 'transparent'
				}}
			/>
			<CardContainer>
				<Input
					defaultValue={pseudo}
					placeholder="email@addresse.com"
					label="Pseudo"
					onChangeText={value => setPseudo(value)}
				/>
				<Text>{pseudo}</Text>
			</CardContainer>
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
