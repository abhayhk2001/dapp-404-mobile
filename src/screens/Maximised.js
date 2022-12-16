import { ScrollView, Text, StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import theme from '../static/theme'
import { Button, Icon } from '@rneui/base'
import { ReportPostContext } from '../context/ReportPostContext'

const Maximised = ({ navigation }) => {
	const { postData } = useContext(ReportPostContext)
	const { title, description, truthPercentage, tagName } = postData
	return (
		<ScrollView style={styles.container}>
			<Text style={styles.header}>{title}</Text>
			<Text style={styles.text}>{description}</Text>
			<View style={styles.options}>
				<View style={{ paddingHorizontal: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
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
				<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
					<Icon
						color={theme.darkColors.secondary}
						name="label"
						size={25}
						type="material"
					/>
					<Text style={{ color: theme.darkColors.white, marginLeft: 20, fontSize: 25 }}>{tagName}</Text>
				</View>
				<Button type="solid" color={theme.darkColors.error} onPress={() => {
					navigation.navigate("New Report Post")
				}}  >
					Report Post
				</Button>
			</View>
		</ScrollView>
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
		marginTop: 40,
		marginBottom: 30
	}
})

export default Maximised