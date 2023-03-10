import React, {Component} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { View, StatusBar, Text, Image, FlatList, TouchableOpacity } from 'react-native'

import {globalState} from '../App'
import styles from '../assets/styles/otherStyles'
import commonStyles from '../assets/styles/commonStyles'
import ItemHistorico from './components/ItemHistorico'

export default class Histórico extends Component{
    
    static navigationOptions = {
      header: null,
      headerLeft: (null),
      headerTitle: (null),
      headerRight: (null)
    }

    constructor(props) {
      super(props)
      
      this.state = {
        listIsLoading: false
      }
    }

    render () {     
      //console.log('\n|##################################################################|\n')
      //console.log(' ==> Navigated to Histórico.\n\n', globalState.usuario.carrinho.items)
      //console.log('\n|##################################################################|\n')
      const { navigate } = this.props.navigation

        return( 
            <View style={styles.perfilContainer}>
                <StatusBar barStyle="dark-content"/>
                <Image style={styles.logoBG} source={require('../assets/logo-bg.png')}/>

                <View style={styles.topHeader}>
                    <View style={styles.inlineFlexRowBetween}>
                        <TouchableOpacity style={styles.refreshButton} onPress={() => navigate('Categorias')}>
                            <Icon name="arrow-left" color={commonStyles.colors.white} size={20}/>
                        </TouchableOpacity>

                        <Text style={styles.welcomeSubText}>Histórico</Text>
                    </View>
                </View>

                <View style={styles.pageBody}>
                      <View style={styles.lineContainer} justifyContent={'space-between'} marginBottom={0}>
                          <View style={styles.componenteItemLeft} width={'50%'}>
                              <Text style={styles.inlineItemTitle}>Nº do Pedido</Text>
                          </View>
                          <View style={styles.componenteItemRight} width={'50%'}>
                              <Text style={styles.inlineItemPrice}>Data do Pedido</Text>
                          </View>
                      </View>
                      
                    <View style={styles.thinRedLine} marginBottom={10}/>

                    <FlatList data={globalState.usuario.historico.pedidos}
                        extraData={this.state}
                        refreshing={this.state.listIsLoading}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <TouchableOpacity onPress={() => { 
                            globalState.usuario.historico.selectedOrder = item
                            navigate('Resumo')
                        }}><ItemHistorico {...item}/></TouchableOpacity>}
                    />
                </View>
            </View>
        ) 
    }
}