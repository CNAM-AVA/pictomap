import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import { userService } from '../../services'
import TriangleBackground from '../../components/TriangleBackground';
import { Avatar } from 'react-native-elements';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DropdownAlert from 'react-native-dropdownalert';

export default function Register() {

    const [email, setEmail] = useState<string>('');
    const [pseudo, setPseudo] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const navigation = useNavigation();
    const dropDown = useRef<DropdownAlert>(null);

    function handleRegister() {

        let credentials = {
            email: email,
            password: password,
            password_confirm: confirmPassword,
            pseudo: pseudo
        }

        userService.register(credentials)
            .then(res => {
                console.log('authenticated !');
                console.log(res);
                navigation.navigate("Home");
            })
            .catch(err => {
                console.log(err);
                dropDown.current!.alertWithType('error', 'Erreur', err.message);
            });
    }

    return (
        <TriangleBackground style={styles.container}>
            <DropdownAlert ref={dropDown} />
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.keyboardAvoid}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <Avatar
                            rounded
                            title="PM"
                            size="medium"
                            containerStyle={{ alignSelf: 'center', marginBottom: 35 }}
                        />

                        <Input
                            labelStyle={styles.input}
                            label="Email"
                            onChangeText={value => setEmail(value)}
                            keyboardType="email-address"
                            inputStyle={{ color: "white" }}
                        />
                        <Input
                            labelStyle={styles.input}
                            label="Pseudo"
                            onChangeText={value => setPseudo(value)}
                            inputStyle={{ color: "white" }}
                        />
                        <Input

                            labelStyle={styles.input}
                            label="Mot de passe"
                            secureTextEntry
                            onChangeText={value => setPassword(value)}
                            inputStyle={{ color: "white" }}
                        />
                        <Input
                            labelStyle={styles.input}
                            label="Confirmation"
                            secureTextEntry
                            onChangeText={value => setConfirmPassword(value)}
                            inputStyle={{ color: "white" }}
                        />

                        <Button
                            title="Inscription"
                            type="outline"
                            style={styles.button}
                            titleStyle={{ color: 'white' }}
                            buttonStyle={{ borderColor: 'white' }}
                            onPress={handleRegister}
                        />
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={styles.text}>J'ai un compte !</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </TriangleBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 70
    },
    keyboardAvoid: {
        width: '100%'
    },
    inner: {
        padding: 24,

    },
    input: {
        marginTop: 20,
        color: 'white',
    },
    button: {
        marginTop: 25,
        width: '50%',
        alignSelf: 'center',
    },
    text: {
        color: 'white',
        alignSelf: 'center',
        marginTop: 20
    }
});
