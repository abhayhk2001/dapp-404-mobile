import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

function Dashboard({ navigation }) {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Dashboard screen</Text>
			<Button
				title="Maximize"
				onPress={() => navigation.navigate('Maximised')}
			/>
		</View>
	);
}


const styles = StyleSheet.create({})

export default Dashboard;
