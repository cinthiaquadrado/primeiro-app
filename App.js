import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Picker, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selecionado: false,
      timeOut: null,
      contagem: 0
    }

  }

  async tocarAlarme() {

    this.soundObject = new Audio.Sound();

    try {
      await this.soundObject.loadAsync(require('./alarme.m4a'));
      await this.soundObject.playAsync();
    } catch (error) {

    }
  }

  pressionado = () => {

    var intervalo = setInterval(() => {

      this.setState({ contagem: this.state.contagem - 1 });

      if (this.state.contagem == 0) {
        clearInterval(intervalo);
        this.setState({
          selecionado: false,
          timeOut: null,
          contagem: 0
        });
        this.tocarAlarme();
        alert('Acabou!');
      }
    }, 1000);
  }

  displayTimer = () => {
    var contadores = [];
    for (var i = 1; i <= 60; i++) {
      contadores.push(<Picker.Item label={i.toString()} value={i.toString()} />);
    }

    if (this.state.selecionado == false) {

      return (
        <View style={styles.boxTimerSelect}>
          <Text style={{ textAlign: 'center', fontSize: 19, color: '#fff', marginTop: 50 }}>Selecione o tempo para o timer:</Text>
          <Picker style={{ width: 200, height: 30, marginTop: 20 }} onValueChange={(value, index) => this.setState({ selecionado: true, contagem: value })}>
            <Picker.Item label="Selecione o tempo" value="Selecione o tempo..." />
            {contadores}
          </Picker>
        </View>

      )

    } else {

      return (

        <View style={styles.boxTimerSelect}>
          <Text style={{ textAlign: 'center', fontSize: 19, color: '#fff', marginTop: 50 }}>Contagem: {"\n\n"} {this.state.contagem}</Text>


          <TouchableOpacity style={styles.btn} onPress={() => this.pressionado()}><Text style={{ color: '#fff' }}>Começar</Text></TouchableOpacity>
        </View>
      )
    }
  }

  render() {

    return (
      <View>{this.displayTimer()}</View>
    )
  }
}

const styles = StyleSheet.create({
  boxTimerSelect: {
    display: 'flex',
    backgroundColor: '#934cff',
    height: '100%',
    alignItems: 'center'
  },

  btn: {
    backgroundColor: '#5f32a8',
    padding: 10,
    borderRadius: 20,
    marginTop: 10
  }
});
