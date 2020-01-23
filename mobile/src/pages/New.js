import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import api from '../services/api';

export default class New extends Component {
  static navigationOptions = {
    headerTitle: 'Nova publicação'
  };

  state = {
    image: null,
    preview: null,
    author: '',
    place: '',
    description: '',
    hashtags: ''
  };

  handleSelectImage = () => {
    ImagePicker.showImagePicker({
      title: 'Selecionar imagem'
    }, upload => {
      if (upload.error) {
        console.log('Error');
      } else if (upload.didCancel) {
        console.log('User canceled');
      } else {
        const preview = {
          uri: `data:image/jpeg;base64,${upload.data}`
        };

        let prefix, extension;

        if (upload.fileName) {
          [prefix, extension] = upload.fileName.split('.');

          extension = extension.toLowerCase() === 'heic' ? 'jpg' : extension;
        } else {
          prefix = new Date().getTime();
          extension = 'jpg';
        }

        const image = {
          uri: upload.uri,
          type: upload.type,
          name: `${prefix}.${extension}`
        };

        this.setState({ preview, image });
      }
    });
  }

  handleSubmit = async () => {
    const data = new FormData();

    data.append('image', this.state.image);
    data.append('author', this.state.author);
    data.append('place', this.state.place);
    data.append('description', this.state.description);
    data.append('hashtags', this.state.hashtags);

    await api.post('posts', data);

    this.props.navigation.navigate('Feed');
  };

  render() {
    return (
      <KeyboardAvoidingView enabled={Platform.OS === 'android'} style={styles.container} behavior="padding">
        <TouchableOpacity style={styles.selectButton} onPress={() => this.handleSelectImage()}>
          <Text style={styles.selectButtonText}>Selecionar imagem.</Text>
        </TouchableOpacity>

        {this.state.preview && <Image source={this.state.preview} style={styles.preview} />}

        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize='none'
          placeholder='Nome do autor'
          placeholderTextColor='#999'
          value={this.state.author}
          onChangeText={author => this.setState({ author })}
        />

        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize='none'
          placeholder='Local da foto'
          placeholderTextColor='#999'
          value={this.state.place}
          onChangeText={place => this.setState({ place })}
        />

        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize='none'
          placeholder='Descrição'
          placeholderTextColor='#999'
          value={this.state.description}
          onChangeText={description => this.setState({ description })}
        />

        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize='none'
          placeholder='Hashtags'
          placeholderTextColor='#999'
          value={this.state.hashtags}
          onChangeText={hashtags => this.setState({ hashtags })}
        />

        <TouchableOpacity style={styles.shareButton} onPress={() => { this.handleSubmit() }}>
          <Text style={styles.shareButtonText}>Públicar</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  selectButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCC',
    borderStyle: 'dashed',
    height: 42,

    justifyContent: 'center',
    alignItems: 'center',
  },

  selectButtonText: {
    fontSize: 16,
    color: '#666',
  },

  preview: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 4,
  },

  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginTop: 10,
    fontSize: 16,
  },

  shareButton: {
    backgroundColor: '#7159c1',
    borderRadius: 4,
    height: 42,
    marginTop: 15,

    justifyContent: 'center',
    alignItems: 'center',
  },

  shareButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
});