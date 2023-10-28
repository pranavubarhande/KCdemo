import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
// import { useGlobal } from '../components/AppProvider';
import GifList from '../components/GifList';
import debounce from 'lodash.debounce';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector, useDispatch } from "react-redux";
import { invert } from '../store/reducers/darkmode'
const MemoizedText = React.memo((props) => {
  return <Text {...props} />;
});

const HomeScreen = () => {
  const [trendingGifs, setTrendingGifs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // const { isDarkModeOn, toggleDarkMode } = useGlobal();
  const isDarkModeOn= useSelector((state) => state.darkmode);
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
      
      console.log('finaldebounce');
      if (nextValue !== '') {
        setIsSearching(true)
        const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=ugbajrutXYJvoV93pAZz0rRdyy7wCQTY&q=${nextValue}`;
        
        try {
          const response = await fetch(searchUrl);
          const res = await response.json();
          setSearchResults(res.data);
          console.log(res.data);
          setIsSearching(false)
        } catch (error) {
          setIsSearching(false)
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
  const [isSearching, setIsSearching] = useState(false)

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkModeOn ? 'black' : 'white' },
      ]}
    >
      <StatusBar barStyle={isDarkModeOn ? 'light-content' : 'default'} />
      {searchTerm === '' ? (
        <MemoizedText
          style={{
            fontFamily: 'sans-serif-medium',
            textAlign: 'center',
            color: isDarkModeOn ? 'white' : 'black',
            fontSize: 20,
            fontWeight: 'bold',
            margin: 10
          }}
        >
          Trending GIF's
        </MemoizedText>
      ) : (
        <MemoizedText
          style={{
            fontFamily: 'sans-serif-medium',
            textAlign: 'center',
            color: isDarkModeOn ? 'white' : 'black',
            fontSize: 20,
            fontWeight: 'bold',
            margin: 10
          }}
        >
          Searched GIF's
        </MemoizedText>
      )}
      <View style={{ marginBottom: 10 }}>
        <TextInput
          placeholder='Search GIFs ...'
          value={searchTerm}
          onChangeText={text => {
            handleSearch(text);
          }}
          style={styles.input}
        />
      </View>
      {isSearching && 
      <View style={{width:'100%', height:Dimensions.get('window').height}}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  input: {
    height: 40,
    marginLeft: 5,
    fontFamily: 'sans-serif-medium',
    width: '80%',
    color: '#2f3330',
    borderColor: 'black',
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});

export default React.memo(HomeScreen);
