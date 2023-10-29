import React, { useState, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import GifItem from './GifItem';
import BigList from "react-native-big-list";
const GifList = ({ gifs, onGifPress, onEndReached, itemsPerPage }) => {
  
  const renderGifItem = ({ item }) => {
    if (item == null) {
      return <View style={{ flex: 1, margin: 4 }} />;
    }
    return <GifItem gif={item} onPress={() => onGifPress(item)} />;
  };

  return (
    <BigList
      data={gifs} 
      keyExtractor={(item) => item.id}
      renderItem={renderGifItem}
      itemHeight={260}
      numColumns={2}
          
    />
  );
};

export default React.memo(GifList);
