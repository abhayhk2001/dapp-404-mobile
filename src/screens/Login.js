import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import theme from '../static/theme';
import { Button } from '@rneui/base';
import { AuthContext } from '../context/AuthContext';

const Login = (props) => {
	const { login } = useContext(AuthContext);
	const onPress = () => {
		login("Hello");
	}
	return (
		<View style={styles.container}>
			<Text style={{ color: "white", marginBottom: 20, fontSize: 40 }}>Welcome Back</Text>
			<Button title='Connect to Wallet' buttonStyle={styles.button} onPress={() => {
				onPress();
			}} />
			<View style={{ flexDirection: 'row', marginTop: 100 }}>
				<Text style={{ color: "white", marginBottom: 20, fontSize: 10 }}>New Here ...</Text>
				<Button title='Connect to Wallet' buttonStyle={{}} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: theme.darkColors.primary,
	},
	button: {
		backgroundColor: theme.darkColors.secondary,
		height: 50,
		width: 200,
		fontSize: 40
	}
})

export default Login;
