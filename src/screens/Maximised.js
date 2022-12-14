import { View, Text } from 'react-native'
import React from 'react'

const Maximised = ({ route }) => {
	const { title, description } = route.params
	console.log(title, description)
	return (
		<View>
			<Text>Maximised</Text>
		</View>
	)
}

export default Maximised