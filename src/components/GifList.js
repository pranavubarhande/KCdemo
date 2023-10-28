import React, { useState, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import GifItem from './GifItem';
import BigList from "react-native-big-list";
const GifList = ({ gifs, onGifPress, onEndReached, itemsPerPage }) => {
  const numColumns = 2;

  const formatData = useCallback((data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsInLastRow = data.length - numberOfFullRows * numColumns;

    while (
      numberOfElementsInLastRow !== numColumns &&
      numberOfElementsInLastRow !== 0
    ) {
      data.push({ key: `blank-${numberOfElementsInLastRow}`, empty: true });
      numberOfElementsInLastRow++;
    }

    return data;
  }, []);

  const formattedData = formatData(gifs, numColumns);

  

  const renderGifItem = ({ item }) => {
    if (item.empty) {
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
