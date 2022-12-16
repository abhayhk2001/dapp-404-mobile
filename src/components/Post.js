import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Card, Icon } from "@rneui/base";
import theme from '../static/theme';
import { ReportPostContext } from '../context/ReportPostContext';

import Advertisment from "../components/Ad"


const Post = ({ title, description, navigation, truthRating, truth = true, ad, img }) => {
	const { setPostData } = useContext(ReportPostContext)
	return (
		<View >
			<Card containerStyle={{
				marginHorizontal: 1,
				maxWidth: "100%",
				borderRadius: 30,
				backgroundColor: theme.darkColors.primary,
				borderWidth: 0
			}}>
				<TouchableOpacity onPress={() => {
					setPostData({

						title: title,
						description: description,
						truthPercentage: truthRating,
						tagID: 0,
						tagName: "",
						originPostInfo: {
							id: 0,
							title: title,
							description: description,
							truthPercentage: truthRating,
							tagID: 0,
						}
					})
					navigation.navigate('Maximised')
				}}>
					<Card.Title style={{ fontSize: 20, color: "white", }}>{title}</Card.Title>
				</TouchableOpacity>
				<Card.Divider />
				<View
					style={{
						position: "relative",
						alignItems: "center",
						marginBottom: 10

					}}
				>
					<Text style={{ color: "white" }}>{description}</Text>
				</View>
				<Card.Divider />
				<View style={{
					marginHorizontal: 30,
					flexDirection: "row", justifyContent: "space-between"
				}}>
					<TouchableOpacity onPress={() => { }}>
						<Icon
							color={theme.darkColors.secondary}
							name="visibility"
							size={30}
							type="material"
						/>
					</TouchableOpacity>
					<View style={{
						height: "100%",
						// flex: 1
					}}>
						<Text style={{
							fontSize: 23,
							paddingTop: 1,
							fontWeight: "bold",
							color: truthRating > 50 ? theme.darkColors.success : theme.darkColors.error
						}}>
							{truthRating}
						</Text>
					</View>
					<TouchableOpacity onPress={() => { }}>
						<Icon
							color={theme.darkColors.secondary}
							name="flag"
							size={30}
							type="material"
						/>
					</TouchableOpacity>
				</View>
			</Card>
			{ad ? <Advertisment
				ad={ad}
			/> : <></>}
		</View>
	)
}

export default Post
