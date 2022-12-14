import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Constants from 'expo-constants'
import theme from '../static/theme'

const Navigation = (props) => {
	console.log(props)
	return (
		<View style={styles.container}>
			<Text style={styles.header}>{props.route.name}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: Constants.statusBarHeight,
		paddingVertical: 15,
		justifyContent: "center",
		backgroundColor: theme.darkColors.background,
		marginBottom: -20,
		paddingLeft: 30
	},
	header: {
		fontSize: 25,
		color: "white"
	}
})

export default Navigation