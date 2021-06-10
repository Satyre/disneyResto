import React, {Component} from 'react';
import ApiView from './ApiView';
import axios from 'axios';
import {ListItem} from 'react-native-elements';

import styles from './ApiStyles';
import {View, Text, TouchableOpacity, Image} from 'react-native';
class ApiContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      fromAxios: false,
      dataSource: [],
      axiosData: null,
    };
  }

  goForAxios = () => {
    this.setState({
      loading: true,
    });

    const data = JSON.stringify({
      query:
        'query activities($market: String!, $types: [String]) { activities(market: $market, types: $types) {... on Activity {id name shortDescription heroMedia {...media} squareMedia {...media}}}}fragment media on Media {  url  alt}',
      variables: {
        market: 'fr-fr',
        types: ['Restaurant'],
      },
      operationName: 'activities',
    });
    const config = {
      method: 'post',
      url: 'https://api.disneylandparis.com/query',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    axios(config)
      .then(response => {
        setTimeout(() => {
          this.setState({
            loading: false,
            axiosData: response.data.data.activities,
          });
        }, 2000);
      })
      .catch(error => {
        console.log(error);
      });
  };
  FlatListSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      />
    );
  };
  renderItem = data => {
    console.log('log data : ', data);
    return (
      <TouchableOpacity style={styles.list}>
        <Text style={styles.lightText}>{data.item.id}</Text>
        <Text style={styles.lightText}>{data.item.name}</Text>
        <Text style={styles.lightText}>{data.item.shortDescription}</Text>
        <Image
          source={{uri: data.item.heroMedia.url}}
          style={{
            width: 80,
            height: 80,
            borderWidth: 2,
            borderColor: '#d35647',
            resizeMode: 'cover',
            margin: 8,
          }}
        />
      </TouchableOpacity>
    );
  };

  //     <ListItem
  //       title={data.item.name}
  //       subtitle={data.item.shortDescription}
  //       leftAvatar={{source: {uri: data.item.heroMedia.url}}}
  //       bottomDivider={true}
  //     />
  //   );
  // };

  render() {
    const {dataSource, fromAxios, loading, axiosData} = this.state;
    return (
      <ApiView
        goForAxios={this.goForAxios}
        dataSource={dataSource}
        loading={loading}
        fromAxios={fromAxios}
        axiosData={axiosData}
        FlatListSeparator={this.FlatListSeparator}
        renderItem={this.renderItem}
      />
    );
  }
}

export default ApiContainer;
