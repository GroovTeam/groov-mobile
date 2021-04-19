import React, { useState } from 'react';
import { Text, TextInput, View, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Styles from '../../components/Styles';
import InputStyles from '../../components/InputStyles';
import { Button } from 'react-native-material-ui';
import firebase from '../../utils/Firebase';

/**
 * Logs a user in.
 */
const Login = ({ login, startRegister }) => {
  // Email and Password are stateful
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resettingPassword, setResettingPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const prepareLogin = () => {
    login(email, password);
  };

  // Sends the email to reset a user's password
  const sendEmailReset = () => {
    if (resetEmail == '') return;
    
    firebase.auth().sendPasswordResetEmail(resetEmail)
      .then(() => {
        Alert.alert(
          'All set.',
          'If that email exists, a reset password email has been sent.'
        );
        setResettingPassword(false);
      })
      .catch(() => {
        Alert.alert(
          'Uh oh.',
          'Something went wrong, please try again.'
        );
      });
  };
  
  const resetPassword =
  resettingPassword ? (
    <View>
      <TextInput 
        style={InputStyles.textInput}
        placeholder='email'
        onChangeText={text => setResetEmail(text)}
      />
      <View style={{marginTop: 10, display: 'flex', flexDirection: 'row'}}>
        <Button
          raised
          text={'Cancel'}
          onPress={() => setResettingPassword(false)}
        />
        <View style={{width: 10}} />
        <Button
          raised
          primary
          text={'Send Reset Email'}
          onPress={sendEmailReset}
        />
      </View>
    </View>
  ) : (
    <Button
      raised
      text={'Forgot your password?'}
      onPress={() => setResettingPassword(true)}
    />
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <View style={Styles.container}>
        <Text style={[Styles.text, Styles.headerText]}>
          Please&nbsp;
          <Text style={Styles.blueAccentText}>
          login
          </Text>
        </Text>
        <View style={{marginTop: 15}} />
        <TextInput 
          style={InputStyles.textInput}
          placeholder='wevibe@gmail.com'
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          secureTextEntry={true}
          style={InputStyles.textInput}
          placeholder={'password'}
          onChangeText={text => setPassword(text)}
        />
        <View style={{marginTop: 30}} />
        <Button
          raised
          primary
          text={'Login'}
          onPress={prepareLogin}
        />
        <View style={{marginTop: 15}} />
        <Button
          raised
          text={'Register'}
          onPress={startRegister}
        />
        <View style={{marginTop: 15}} />
        {resetPassword}
      </View>
    </TouchableWithoutFeedback>
  );
};
 
export default Login;