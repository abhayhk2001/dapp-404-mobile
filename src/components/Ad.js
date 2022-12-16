import React, { useEffect, useState } from 'react'
import { View, Linking, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native'
import { Card, Icon } from "@rneui/base";
// import { Image } from '@rneui/themed';
import theme from '../static/theme';


const Post = ({ ad }) => {
	const title = ad[3]
	const img_url = JSON.parse(ad[4]).img
	const url = JSON.parse(ad[4]).url

	const [width, setWidth] = useState(0)
	const [height, setHeight] = useState(0)

	useEffect(() => {
		Image.getSize(img_url, (w, h) => {
			if (w > 325) {
				h = h / w * 325
				w = 325
			}
			setHeight(h)
			setWidth(w)
		})
	})
	return (
		<View >
			<Card containerStyle={{
				marginHorizontal: 1,
				maxWidth: "100%",
				borderRadius: 30,
				backgroundColor: theme.darkColors.primary,
				borderWidth: 0
			}}>
				<TouchableOpacity onPress={async () => {
					const supported = await Linking.canOpenURL(url);
					if (supported) {
						await Linking.openURL(url);
					} else {
						Alert.alert(`Don't know how to open this URL: ${url}`);
					}
				}}>
					<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<Image
							style={{
								width: width,
								height: height,
							}}
							source={{
								uri: img_url,
							}}
						/>
					</View>
				</TouchableOpacity>
			</Card>
		</View>
	)
}

export default Post
