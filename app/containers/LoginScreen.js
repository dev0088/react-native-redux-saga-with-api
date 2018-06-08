import React, {Component} from 'react';
import { Container, Header, Content, Button, Text, Item, Input, H1, Body} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../actions/loginActions';
import { Actions } from 'react-native-router-flux';

class LoginScreen extends Component {
  state = {
    email: 'bond@007.com',
    password: 'asdfasdf1',
  };

  loginEmail = () => {
    const { email, password } = this.state;

    // console.log(email, password, this.props.actions);

    this.props.actions.loginRequest(email, password);
    //Actions.main();
  };

  render() {
    const { email, password } = this.state;
    const { user } = this.props;

    let error;
    if (user.errorMessage) {
      error = <Text style={{backgroundColor: 'red'}}>{user.errorMessage}</Text>;
    }

    return (
      <Container>
        <Header/>
        <Content paddr>
          <Body style={{padding: 20}}>
            <H1 block>Welcome to</H1>
            <H1 block>Upper Network!</H1>
            <Item regular style={{marginTop: 20}}>
              <Input
                placeholder="Email"
                onChangeText={email => this.setState({email})}
                value={email}
              />
            </Item>
            <Item regular>
              <Input
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={password => this.setState({password})}
                value={password}
              />
            </Item>
            {error}
            <Button block style={styles.button} onPress={this.loginEmail}>
              <Text>Log In</Text>
            </Button>
            <Button block style={styles.button}>
              <Text>SIGN UP</Text>
            </Button>
          </Body>
        </Content>
      </Container>
    );
  }
}

const styles = {
  button: {
    backgroundColor: "#2F7E78",
    borderRadius: 0,
    width: 150,
    margin: 12,
    alignSelf: 'center'
  }
}

function mapStateToProps(state) {
  const { user } = state;

  return {
    user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);