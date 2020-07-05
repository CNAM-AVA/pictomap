import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Header, Button, Text, Divider } from 'react-native-elements';
import ProfilePicture from '../../components/ProfilePicture';
import 'react-native-gesture-handler';
import CardContainer from '../../components/CardContainer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { userService, friendService, pictureService } from '../../services';
import StringDate from '../../services/StringDate';

export default function ShowFriend({route, navigation}:any, ) {
	const friend = JSON.parse(route.params.user);
	const [user, setUser] = React.useState<any>(friend);
	const [stats, setStats]:any = useState({});

	const friend_uuid = friend.uuid;
    const user_uuid = userService.getUser().uuid;

    useEffect(() => {
        getUserStats();
    }, []);
	
	function getUserStats(){
		pictureService.getUserStats(user.uuid)
		.then((res:any) => {
			setStats(res);
		})
		.catch((err) => {
			console.log(err);
		})
	}

    function deleteFriend(friend_uuid: string){
        friendService.deleteFriend(user_uuid, friend_uuid)
        .then((res) => {
            console.log(res);
            navigation.navigate('AddFriends');
        })
        .catch((err) => {
            console.log(err);
        })
    }
	
	function showFriendPictures(friend_uuid: string){
		navigation.navigate('UserPictures', {userId: friend_uuid, userName: friend.name});
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
				containerStyle={{
					backgroundColor: '#27466A',
					height: 70,
					paddingBottom: 25,
                    borderBottomWidth: 0
				}}
			/>
			<View style={styles.paddedContainer}>
                <ProfilePicture 
                customStyle={{ alignSelf: "center" }} 
				size={110}
                uri={user.profile_picture}
                title={user.name[0]}
                ></ProfilePicture>
				<CardContainer>
					<TouchableOpacity onPress={() => showFriendPictures(friend_uuid)}>
						<View style={{ flexDirection: "row" }}>
							<View style={{
								flex: 2, flexDirection: "row", alignItems: 'center'
							}}>
								<Icon
									size={30}
									name='camera'
									type='font-awesome'
								/>
								<Text
									style={{ marginLeft: 10 }}
								>Photos</Text>
							</View>
							<View style={{ flexDirection: "row", alignItems: 'center' }}>
								<Icon
									size={30}
									name='chevron-right'
									type='font-awesome'
								/>
							</View>
						</View>
					</TouchableOpacity>
				</CardContainer>
				<CardContainer>
				<Text h3 style={{ alignSelf: "center" }}>{user.name}</Text>
					<Text style={{ alignSelf: "center", marginTop: 8, marginBottom: 8 }}>{user.mail}</Text>
					<Divider style={{marginTop: 8, marginBottom: 8 }}/>
					<Text style={styles.stats_text}>Photos prises: {stats?.taken_pictures}</Text>
					<Text style={styles.stats_text}>Photos trouvées: {stats?.found_pictures}</Text>
					<Text style={styles.stats_text}>Nombre d'abonnés: {stats?.nb_follower}</Text>
					<Text style={styles.stats_text}>Inscrit le: {StringDate.stringDate(user.created_at)}</Text>
					<Button
						containerStyle={{ marginTop: 16 }}
						buttonStyle={{ borderColor: "red" }}
						titleStyle={{ color: "red" }}
						title="Supprimer"
						type="outline"
						onPress={() => deleteFriend(friend_uuid)}
					/>
				</CardContainer>
			</View>
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
	},
	stats_text:{
		alignSelf: 'flex-start',
		marginBottom: 7,
		marginTop: 7,
	},
});

