import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Header, Button, Text } from 'react-native-elements';
import ProfilePicture from '../../components/ProfilePicture';
import 'react-native-gesture-handler';
import CardContainer from '../../components/CardContainer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { userService } from '../../services';

export default function ShowFriend({route, navigation}:any, ) {
    const [user, setUser] = React.useState<any>({
        created_at: {
            nanoseconds: "000000001",
            seconds: "000000001",
          },
          indiana_jones: false,
          mail: "",
          name: "NautilusJungle",
          profile_picture: null,
          updated_at: {
            nanoseconds: "684000000",
            seconds: "1591695851",
          },
          uuid: "",
    });

    const user_uuid = route.params.userId;

    useEffect(() => {
        getUser();
    }, []);

    function getUser(){
        userService.getUserById(user_uuid)
        .then((res) => {
            setUser(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function deleteFriend(friend_uuid: string){
        userService.deleteFriend(friend_uuid)
        .then((res) => {
            console.log(res);
            navigation.navigate('AddFriends');
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function stringDate(timestamp:any){
        let date = new Date(timestamp.seconds*1000);
        return date.toLocaleDateString('fr-FR');
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
                    shadowColor: 'transparent',
				}}
			/>
			<View style={styles.paddedContainer}>
                <ProfilePicture 
                customStyle={{ alignSelf: "center" }} 
                size="big"
                uri={user.profile_picture}
                title={user.name[0]}
                ></ProfilePicture>
				<CardContainer>
					<TouchableOpacity onPress={() => navigation.navigate('UserPictures')}>
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
					<Text style={{ alignSelf: "center", marginBottom: 8 }}>{user.mail}</Text>
					<Text style={{ alignSelf: "flex-start" }}>Photos prises: 123</Text>
					<Text style={{ alignSelf: "flex-start" }}>Photos trouvées: 123</Text>
					<Text style={{ alignSelf: "flex-start" }}>Inscrit le: {stringDate(user.created_at)}</Text>
					<Button
						containerStyle={{ marginTop: 16 }}
						buttonStyle={{ borderColor: "red" }}
						titleStyle={{ color: "red" }}
						title="Supprimer"
						type="outline"
						onPress={() => deleteFriend(user.uuid)}
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
	}
});

