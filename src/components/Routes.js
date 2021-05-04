import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Login from './pages/Login'
import Info from './pages/Info'

const Routes = () => (
  <Router>
    <Scene key = "root">
      <Scene key = "info" component = {Info} title = "Info" initial = {true} />
      <Scene key = "home" component = {Login} title = "Login" />
    </Scene>
  </Router>
)
export default Routes