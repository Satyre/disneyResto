import React, {Component} from 'react';
import {View, Text, Button, FlatList, ActivityIndicator} from 'react-native';
import styles from './ApiStyles';
const ApiView = props => {
  const {goForAxios, axiosData, renderItem, FlatListItemSeparator, loading} =
    props;
  return (
    <View style={styles.parentContainer}>
      <View>
        <Text style={styles.textStyle}>Loader for Disney location</Text>
      </View>
      <View style={{margin: 18}}>
        <Button title={'Load Disney data'} onPress={goForAxios} color="green" />
      </View>

      {
        <FlatList
          data={axiosData}
          ItemSeparatorComponent={FlatListItemSeparator}
          renderItem={item => renderItem(item)}
          keyExtractor={item => item.id.toString()}
        />
      }
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
          <Text style={{fontSize: 16, color: 'red'}}>Loading Data...</Text>
        </View>
      )}
    </View>
  );
};
export default ApiView;
