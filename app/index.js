import Expo from 'expo';
import React, {Component} from 'react';
import {Navigator} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import MyApp from './MyApp';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
			loadingExpo: true,
      isLoading: true,
      store: configureStore(() => this.setState({isLoading: false}))
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
	    Roboto: require("native-base/Fonts/Roboto.ttf"),
	    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
			// Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ loadingExpo: false });
  }

  render() {
    if (this.state.loadingExpo) {
      return <Expo.AppLoading />;
    }
		if (this.state.isLoading) {
			return null;
		}

    return (
      <Provider store={this.state.store}>
        <MyApp />
      </Provider>
    );
  }
}

Expo.registerRootComponent(App);
