import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  View,
  PermissionsAndroid,
  TouchableOpacity,
  ImageBackground,
  Alert
} from 'react-native'
import { Image } from 'react-native-elements'
import * as Sharing from 'expo-sharing'
import * as FileSystem from 'expo-file-system'
import { useSelector, useDispatch } from "react-redux";
import { invert } from '../store/reducers/darkmode'
const GifItem = ({ gif, onPress }) => {

  const isDarkModeOn= useSelector((state) => state.darkmode);
  // const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(true)

  const togglePlay = () => {
    setIsPlaying(prevIsPlaying => !prevIsPlaying)
  }

  const handleDownload = async () => {
    const gifUrl = gif.images.original.url
    try {
      const fileUri = FileSystem.documentDirectory + 'downloaded.gif' // Replace 'downloaded.gif' with the desired file name

      const downloadObject = FileSystem.createDownloadResumable(
        gifUrl,
        fileUri,
        {},
        downloadProgress => {
          const progress =
            downloadProgress.totalBytesWritten /
            downloadProgress.totalBytesExpectedToWrite
        }
      )

      const { uri } = await downloadObject.downloadAsync()

      if (uri) {
        Alert.alert('Downloaded GIF saved at:', uri)
        return uri
      } else {
        Alert.alert('Download failed')
        return null
      }
    } catch (error) {
      Alert.alert('Error downloading GIF:', error)
      return null
    }
  }
  const downloadAndShareGifToWhatsApp = async () => {
    const gifUrl = gif.images.original.url
    try {
      const downloadedUri = await handleDownload(gifUrl)

      if (downloadedUri) {
        await Sharing.shareAsync(downloadedUri, { mimeType: 'image/gif' })
      } else {
        console.error('Download or sharing failed')
      }
    } catch (error) {
      console.error('Error downloading or sharing GIF:', error)
    }
  }

  return (
    <View
      style={{
        margin: 5,
        width: '45%',
        borderRadius: 20,
        borderWidth: 1,
        paddingBottom: 5,
        borderColor:isDarkModeOn?'white':'black'
      }}
    >
      <TouchableOpacity
        style={{ height: 200, borderRadius: 20 }}
        onPress={() => togglePlay()}
      >
        {isPlaying ? (
          <ImageBackground
            source={{ uri: gif.images.original_still.url }}
            style={{
              width: '100%',
              height: 200,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              overflow: 'hidden'
            }}
          />
        ) : (
          <ImageBackground
            source={{ uri: gif.images.original.url }} 
            style={{
              width: '100%',
              height: 200,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              overflow: 'hidden'
            }}
          />
        )}
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' ,marginTop:5}}>
        <TouchableOpacity onPress={() => downloadAndShareGifToWhatsApp()}>
          <MaterialCommunityIcons name='whatsapp' size={24} color={isDarkModeOn?'white':'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDownload()}>
          <MaterialCommunityIcons name='download' size={24} color={isDarkModeOn?'white':'black'} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default React.memo(GifItem)
