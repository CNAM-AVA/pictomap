import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon, Input, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import ProfilePicture from '../../../components/ProfilePicture';
import CardContainer from '../../../components/CardContainer';
import { userService } from '../../../services';

export default function ProfileEdit() {

	const navigation = useNavigation();

	let user = userService.getUser();

	const [pseudo, setPseudo] = useState(user.name);
	const [courriel, setCourriel] = useState(user.mail);
	const [newPass, setNewPass] = useState("");
	const [confirmPass, setConfirmPass] = useState("");

	function save() {
		let data = {
			name: pseudo,
			mail: courriel
		};
		if (newPass && newPass === confirmPass) {
			data = { ...data, ...{ password: newPass } }
		}
		userService.updateCurrentUser(data);
	}

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
					placeholder="Pseudo"
					label="Pseudo"
					onChangeText={value => setPseudo(value)}
				/>
				<Input
					containerStyle={styles.inputContainerStyle}
					defaultValue={courriel}
					placeholder="Courriel"
					label="Courriel"
					onChangeText={value => setCourriel(value)}
				/>
				<Input
					containerStyle={styles.inputContainerStyle}
					defaultValue={newPass}
					placeholder="Mot de passe"
					label="Mot de passe"
					onChangeText={value => setNewPass(value)}
				/>
				<Input
					containerStyle={styles.inputContainerStyle}
					defaultValue={confirmPass}
					placeholder="Confirmation"
					label="Confirmation"
					onChangeText={value => setConfirmPass(value)}
				/>
				<Button
					containerStyle={{ marginTop: 16 }}
					buttonStyle={{ borderColor: "green" }}
					titleStyle={{ color: "green" }}
					title="Sauvegarder"
					type="outline"
					onPress={save}
				/>
			</CardContainer>
		</View >
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#27466A",
	},
	inputContainerStyle: {
		marginTop: 16
	},
	paddedContainer: {
		padding: 10,
	}
});
