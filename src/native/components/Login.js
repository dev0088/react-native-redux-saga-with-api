import React from 'react';
import PropTypes from 'prop-types';
import { 
  Container, 
  Content, 
  Form, 
  Item, 
  Label, 
  Input, 
  Text, 
  Button, 
  View, 
  Body, 
  Thumbnail,
  H1,
  H2,
  H3
} from 'native-base';
import { Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Messages from './Messages';
import { translate } from '../../i18n';
import Header from './Header';
import Spacer from './Spacer';
import Logo from '../../images/logo.png'

class Login extends React.Component {
  static propTypes = {
    member: PropTypes.shape({
      email: PropTypes.string,
    }),
    locale: PropTypes.string,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
    locale: null,
    member: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      email: (props.member && props.member.email) ? props.member.email : '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  handleSubmit = () => {
    this.props.onFormSubmit(this.state)
      .then(() => Actions.home())
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error, locale } = this.props;

    if (loading) return <Loading />;

    return (
      <Container>
        <Content>
          <View padder>
            <Body>
              <Thumbnail source={require('../../images/logo.png')} />
            </Body>
            <Body>
              <View>
                <Spacer size={5} />
                <H3>Welcome to</H3>
                <Spacer size={5} />
              </View>
            </Body>
            <Body>
              <View>
                <Spacer size={5} />
                <H2>Upper Network!</H2>
                <Spacer size={10} />
              </View>
            </Body>
            {error && <Messages message={error} />}
          </View>

          <Form>
            <Item stackedLabel>
              <Label>{translate('Email', locale)}</Label>
              <Input
                autoCapitalize="none"
                value={this.state.email}
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
              />
            </Item>
            <Item stackedLabel>
              <Label>{translate('Password', locale)}</Label>
              <Input
                secureTextEntry
                onChangeText={v => this.handleChange('password', v)}
              />
            </Item>

            <Spacer size={20} />

            <View padder>
              <Body>
                <Button onPress={this.handleSubmit}>
                  <Text>{translate('Login', locale)}</Text>
                </Button>
              </Body>
            </View>

          </Form>
          <View style={{flex: 1}}>
          </View>
          <View padder>
            <Body>
              <Text onPress={Actions.forgotPassword}>{translate('ForgotPassword', locale)}</Text>
            </Body>
          </View> 

          <View padder>
            <Body>
              <Button onPress={Actions.signUp}>
                <Text>{translate('Signup', locale)}</Text>
              </Button>
            </Body>
          </View>   
                
          </Content>
      </Container>
    );
  }
}

export default Login;
