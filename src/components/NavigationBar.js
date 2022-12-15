import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Constants from 'expo-constants'
import theme from '../static/theme'
import { Icon } from "@rneui/base";


const Navigation = (props) => {
	const { route, back, navigation } = props
	return (
		<View style={styles.container}>
			{back == undefined ? <></> :
				<View style={{ left: 0, position: 'absolute', paddingLeft: 20 }} >
					<TouchableOpacity onPress={() => navigation.navigate(back.title)}>
						{/*  */}
						<Icon
							color={theme.darkColors.secondary}
							name="arrow-left"
							size={25}
							type="font-awesome"
						/>
					</TouchableOpacity>
				</View>
			}
			<Text style={styles.header}>{route.name}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: Constants.statusBarHeight,
		paddingVertical: 20,
		backgroundColor: theme.darkColors.background,
		marginBottom: -20,
		paddingHorizontal: 30,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	header: {
		fontSize: 25,
		textAlign: 'center',
		color: "white"
	}
})

export default Navigation