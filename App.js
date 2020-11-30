import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Font from 'expo-font';

Font.loadAsync({
	'mountains-of-christmas': require('./assets/fonts/MountainsofChristmas-Regular.ttf'),
	'mountains-of-christmas-bold': require('./assets/fonts/MountainsofChristmas-Bold.ttf'),
	'roboto-slab': require('./assets/fonts/RobotoSlab-VariableFont_wght.ttf'),
});

export default function App() {
	const [day, setDay] = useState(0);
	const [hour, setHour] = useState(0);
	const [minute, setMinute] = useState(0);
	const [second, setSecond] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			const year = new Date().getFullYear();
			const christmas = new Date(`Dec 26, ${year}`).getTime();
			const today = new Date().getTime();

			setDay(Math.floor((christmas - today) / (1000 * 60 * 60 * 24)));
			setHour(
				Math.floor(
					((christmas - today) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
				)
			);
			setMinute(
				Math.floor(((christmas - today) % (1000 * 60 * 60)) / (1000 * 60))
			);
			setSecond(Math.floor(((christmas - today) % (1000 * 60)) / 1000));
			if (christmas - today < 0) {
				clearInterval(interval);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<View style={styles.container}>
			<Image
				source={require('./assets/christmas.jpg')}
				style={styles.backgroundImage}
			/>
			<Text style={styles.title}>Christmas</Text>
			<View style={styles.time}>
				<Text style={styles.text}>{day}</Text>
				<Text style={styles.text}>{hour}</Text>
				<Text style={styles.text}>{minute}</Text>
				<Text style={styles.text}>{second}</Text>
			</View>
			<View style={styles.time}>
				<Text style={styles.text2}>days</Text>
				<Text style={styles.text2}>hours</Text>
				<Text style={styles.text2}>mins</Text>
				<Text style={styles.text2}>secs</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	backgroundImage: {
		flex: 1,
		resizeMode: 'cover',
		position: 'absolute',
		width: '100%',
		height: '100%',
		flexDirection: 'column',
	},
	title: {
		fontSize: 80,
		color: 'black',
		marginTop: '65%',
		marginBottom: '5%',
		fontFamily: 'mountains-of-christmas',
	},
	time: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '80%',
	},
	text: {
		width: 60,
		fontSize: 35,
	},
	text2: {
		width: 60,
		fontSize: 30,
		fontFamily: 'mountains-of-christmas',
	},
});
