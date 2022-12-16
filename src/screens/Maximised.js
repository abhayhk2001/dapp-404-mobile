import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import theme from '../static/theme'
import { Button, Icon } from '@rneui/base'

const Maximised = ({ route }) => {
	const { title, description, truthPercentage } = route.params
	return (
		<View style={styles.container}>
			<Text style={styles.header}>{title}</Text>
			<Text style={styles.text}>{description}</Text>
			<View style={styles.options}>
				<View style={{ paddingHorizontal: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
					<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
						<Icon
							color={theme.darkColors.secondary}
							name="visibility"
							size={30}
							type="material"
						/>
						<Text style={{ color: theme.darkColors.white, }}> Views 123</Text>
					</View>
					<View style={{
						height: "100%",
						// flex: 1
					}}>
						<Text style={{
							fontSize: 23,
							paddingTop: 1,
							fontWeight: "bold",
							color: truthPercentage > 50 ? theme.darkColors.success : theme.darkColors.error
						}}>
							{truthPercentage}
						</Text>
					</View>
				</View>
				<Button type="solid" color={theme.darkColors.error}>
					Report Post
				</Button>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		display: "flex",
		alignContent: 'center',
		paddingHorizontal: 20,
		backgroundColor: theme.darkColors.background,
		height: "100%"
	},
	header: {
		color: theme.darkColors.white,
		textAlign: "center",
		marginVertical: 20,
		fontSize: 40
	},
	text: {
		color: theme.darkColors.white,
		textAlign: "justify",
		fontSize: 18
	},
	options: {
		display: 'flex',
		marginTop: 20
	}
})

export default Maximised