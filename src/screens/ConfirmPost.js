import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import theme from '../static/theme'
import { Button, Icon } from '@rneui/base'
import { PostContext } from '../context/PostContext'
import { ContractContext } from '../context/ContractContext'
import postToBlockchain from '../helper/postToBlockchain'
import getTruthRating from '../helper/getTruthRating'


const ConfirmPost = ({ navigation }) => {
	const { postData } = useContext(PostContext)
	const [isLoading, setIsLoading] = useState(false)
	const { title, description, tagID, newslang, tagName } = postData
	const { backendContract, backendProvider, account } = useContext(ContractContext);
	return (
		<ScrollView style={styles.container}>
			<Text style={{ fontSize: 30, color: theme.darkColors.white }}>
				{title}
			</Text>

			<TextInput
				multiline={true}
				numberOfLines={10}
				style={styles.multilineText}
				placeholderTextColor={"white"}
				value={description}
				autoCapitalize={'none'}
				autoCorrect={false}
			/>
			<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, }}>
				<Icon
					color={theme.darkColors.secondary}
					name="label"
					size={25}
					type="material"
				/>
				<Text style={{ color: theme.darkColors.white, marginLeft: 20, fontSize: 25 }}>{tagName}</Text>
			</View>
			<View style={{ marginTop: 30, display: 'flex', alignItems: 'center' }}>
				<Text style={{ fontSize: 25, color: theme.darkColors.white }}>
					Heading in News Langauge
				</Text>
				<Text style={{ fontSize: 20, color: theme.darkColors.white }}>
					{newslang}
				</Text>
			</View>
			<View style={{ marginTop: 100, marginHorizontal: 30 }}>
				<Button type="solid" color={theme.darkColors.secondary}
					titleStyle={{
						fontSize: 25
					}}
					loading={isLoading}
					onPress={() => {
						setIsLoading(true)
						getTruthRating(newslang)
							.then((truthRating) => {
								truthRating = Math.floor(truthRating*10e5);
								console.log(truthRating)
								postToBlockchain(backendContract, backendProvider, account, newslang, tagID, title, description, truthRating);
							})
						setIsLoading(false);
						Alert.alert("Submitted", "Post with the title " + title + ' is Submitted', [{
							text: 'Move to Dashboard', onPress: () => {
								navigation.navigate('Dashboard')
							}
						}])
					}}
				>
					Confirm and Post
				</Button>
				<Text>
					 
				</Text>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		paddingHorizontal: 20,
		backgroundColor: theme.darkColors.background,
	},
	multilineText: {
		borderColor: 'white', borderWidth: 1, color: theme.darkColors.white, borderRadius: 20, paddingHorizontal: 20, fontSize: 20, textAlignVertical: "top", paddingVertical: 10,
		marginTop: 20,
		maxHeight: 300
	}

})
export default ConfirmPost