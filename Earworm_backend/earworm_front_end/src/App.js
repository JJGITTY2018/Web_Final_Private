import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom"
import { withRouter } from "react-router-dom"

//CSS
import './App.css';


//Components
import NavBar from "./1.header/navi.js"
import Home from "./2.body/home.js"
import Songs from "./2.body/songs.js";
import SongsByPopular from "./2.body/songsbypopular.js";
import SongsByGenres from "./2.body/songsbygenres.js";



class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <>
      <NavBar exact props={this.props} />
      <Switch >
          <Route exact path="/songs" component={Songs}></Route>

          <Route exact path="/songs/bypop" component={SongsByPopular}></Route>

          <Route exact path="/songs/bygenre" component={SongsByGenres}></Route>


          <Route path="/*" render = {Home}> </Route>
      </Switch>
      </>
    )
  }
}

export default withRouter(App)