import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

function ProfileScreen({ navigation }) {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Profile screen</Text>
			<Button
				title="Go to Details"
				onPress={() => navigation.navigate('Details')}
			/>
		</View>
	);
}

const styles = StyleSheet.create({})

export default ProfileScreen;
