import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import React, { useContext } from 'react'
import theme from '../static/theme'
import tags from '../assets/tags.json'
import { Button, Icon } from '@rneui/base'
import { PostContext } from '../context/PostContext'
import { ContractContext } from '../context/ContractContext'
import postToBlockchain from '../helper/postToBlockchain'
import getTruthRating from '../helper/getTruthRating'
const ConfirmPost = () => {
	const { postData } = useContext(PostContext)
	const { title, description, tag, newslang } = postData
	const {backendContract, backendProvider, account } = useContext(ContractContext);
	let newsLang = ""
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
				<Text style={{ color: theme.darkColors.white, marginLeft: 20, fontSize: 25 }}>{tags[tag - 1].name}</Text>
			</View>
			<Text style={{ fontSize: 30, color: theme.darkColors.white }}>
				NewsLang: {newsLang = (newslang?.subject + newslang?.object + newslang?.sentence)}
			</Text>
			<View style={{ marginTop: 20, marginHorizontal: 30 }}>
				<Button type="solid" color={theme.darkColors.secondary}
					titleStyle={{
						fontSize: 25
					}}
					onPress={() => {
						getTruthRating(newsLang)
						.then((truthRating)=>{
							console.log(truthRating)
							postToBlockchain(backendContract, backendProvider, account, newsLang, tag, title, description, truthRating);
						})
						}}
				>
					Confirm and Post
				</Button>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		paddingHorizontal: 20,
		backgroundColor: theme.darkColors.background,
		height: "100%"
	},
	multilineText: {
		borderColor: 'white', borderWidth: 1, color: theme.darkColors.white, borderRadius: 20, paddingHorizontal: 20, fontSize: 20, textAlignVertical: "top", paddingVertical: 10,
		marginTop: 20,
		maxHeight: 300
	}

})
export default ConfirmPost