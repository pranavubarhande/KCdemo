import React, { useState } from 'react';
import {
  View,
  PermissionsAndroid,
  TouchableOpacity,
  ImageBackground,
  Alert,
  StyleSheet,
} from 'react-native';
import { Image } from 'react-native-elements';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { useSelector, useDispatch } from "react-redux";
import { invert } from '../store/reducers/darkmode';
import GifItemStyles from '../styles/GifItemStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const GifItem = ({ gif, onPress }) => {
  const isDarkModeOn = useSelector((state) => state.darkmode);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
  }

  const handleDownload = async () => {
    const gifUrl = gif.images.original.url;

    try {
      const fileUri = FileSystem.documentDirectory + 'downloaded.gif';
      const downloadObject = FileSystem.createDownloadResumable(
        gifUrl,
        fileUri,
        {},
        downloadProgress => {
          const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        }
      );

      const { uri } = await downloadObject.downloadAsync();

      if (uri) {
        Alert.alert('Downloaded GIF saved at:', uri);
        return uri;
      } else {
        Alert.alert('Download failed');
        return null;
      }
    } catch (error) {
      Alert.alert('Error downloading GIF:', error);
      return null;
    }
  };

  const downloadAndShareGifToWhatsApp = async () => {
    const gifUrl = gif.images.original.url;

    try {
      const downloadedUri = await handleDownload(gifUrl);

      if (downloadedUri) {
        await Sharing.shareAsync(downloadedUri, { mimeType: 'image/gif' });
      } else {
        console.error('Download or sharing failed');
      }
    } catch (error) {
      console.error('Error downloading or sharing GIF:', error);
    }
  };

  return (
    <View style={[GifItemStyles.container, { borderColor: isDarkModeOn ? 'white' : 'black' }]}>
      <TouchableOpacity style={GifItemStyles.imageContainer} onPress={() => togglePlay()}>
        {isPlaying ? (
          <ImageBackground
            source={{ uri: gif.images.original_still.url }}
            style={GifItemStyles.image}
          />
        ) : (
          <ImageBackground
            source={{ uri: gif.images.original.url }}
            style={GifItemStyles.image}
          />
        )}
      </TouchableOpacity>
      <View style={GifItemStyles.iconContainer}>
        <TouchableOpacity onPress={() => downloadAndShareGifToWhatsApp()}>
          <MaterialCommunityIcons name='whatsapp' size={24} color={isDarkModeOn ? 'white' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDownload()}>
          <MaterialCommunityIcons name='download' size={24} color={isDarkModeOn ? 'white' : 'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default React.memo(GifItem);
