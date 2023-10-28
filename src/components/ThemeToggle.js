import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from "react-redux";
import { invert } from '../store/reducers/darkmode'
const ThemeToggle = ({ toggleTheme }) => {
  // const { isDarkModeOn, toggleDarkMode } = useGlobal()
  const isDarkModeOn= useSelector((state) => state.darkmode);
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(invert())
      }}
    >
      <View style={styles.button}>
        <Text style={styles.buttonText}>
          Switch to {isDarkModeOn ? 'Light' : 'Dark'} Mode
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center'
  }
})

export default ThemeToggle
