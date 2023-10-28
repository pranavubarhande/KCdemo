import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import GifList from '../components/GifList';
import debounce from 'lodash.debounce';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector, useDispatch } from "react-redux";
import { invert } from '../store/reducers/darkmode';
import HomeScreenStyles from '../styles/HomeScreenStyles'; 

const MemoizedText = React.memo((props) => {
  return <Text {...props} />;
});

const HomeScreen = () => {
  const [trendingGifs, setTrendingGifs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const isDarkModeOn = useSelector((state) => state.darkmode);
  const dispatch = useDispatch();
  const randomGifUrl = useMemo(() => {
    return `https://api.giphy.com/v1/gifs/trending?api_key=ugbajrutXYJvoV93pAZz0rRdyy7wCQTY`;
  }, []);

  useEffect(() => {
    fetch(randomGifUrl)
      .then(response => response.json())
      .then(res => {
        setTrendingGifs(res.data);
      })
      .catch(error => {
        console.error('Error fetching trending GIFs:', error);
      });
  }, []);

  const debouncedSave = useCallback(
    debounce(async (nextValue) => {
      if (nextValue !== '') {
        setIsSearching(true)
        const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=ugbajrutXYJvoV93pAZz0rRdyy7wCQTY&q=${nextValue}`;

        try {
          const response = await fetch(searchUrl);
          const res = await response.json();
          setSearchResults(res.data);
          setIsSearching(false);
        } catch (error) {
          setIsSearching(false);
          console.error('Error fetching GIFs:', error);
        }
      }
    }, 2000),
    []
  );

  const handleSearch = term => {
    setSearchTerm(term);
    debouncedSave(term);
  };
  const [isSearching, setIsSearching] = useState(false);

  return (
    <View style={[HomeScreenStyles.container, { backgroundColor: isDarkModeOn ? 'black' : 'white' }]}>
      <StatusBar barStyle={isDarkModeOn ? 'light-content' : 'default'} />
      {searchTerm === '' ? (
        <MemoizedText style={[HomeScreenStyles.heading,{color:isDarkModeOn ? 'white' : 'black'}]}>
          Trending GIF's
        </MemoizedText>
      ) : (
        <MemoizedText style={[HomeScreenStyles.heading,{color:isDarkModeOn ? 'white' : 'black'}]}>
          Searched GIF's
        </MemoizedText>
      )}
      <View style={HomeScreenStyles.inputContainer}>
        <TextInput
          placeholder='Search GIFs ...'
          value={searchTerm}
          onChangeText={text => {
            handleSearch(text);
          }}
          style={HomeScreenStyles.input}
        />
      </View>
      {isSearching && 
      <View style={HomeScreenStyles.activityIndicatorContainer}>
        <ActivityIndicator animating={true} color={'blue'} />
      </View>}
      {searchTerm === '' ? (
        <GifList gifs={trendingGifs} />
      ) : (
        <GifList gifs={searchResults} />
      )}
    </View>
  );
};

export default React.memo(HomeScreen);
