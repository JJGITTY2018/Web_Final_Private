import React, { Component } from "react";
import axios from "axios"

import SongList from "./songsList"

export default class SongsByPopular extends

Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      searchQuery: "",
      currentUserID: "1",
    }
  }

  getAllSongs = () => {
    axios
      .get('/songs?searchQuery=').then((res) => {
        this.setState({
          data: res.data.data
        })
      }).then(() => {
      })
  }

  // Okay, here's a challenge for you - can you get the order to update if you add a favorite to a song that puts it above other songs?
  handleFavsAdd = (arr_id) => {
    this.setState(state => {
      const data = state.data.map((el, state_indx) => {
        if (state_indx === arr_id) {
          let y = el
          y.sumoffavs = (parseInt(y.sumoffavs) + 1)
          return y
        }
        else {
          return el
        }
      })
      return {
        data: data
      }
    })
  }

  handleFavsMinus = (arr_id) => {
    this.setState(state => {
      const data = state.data.map((el, state_indx) => {
        if (state_indx === arr_id) {
          let y = el
          y.sumoffavs = (parseInt(y.sumoffavs) - 1)
          return y
        }
        else {
          return el
        }
      })
      return {
        data: data
      }
    })
  }

  componentDidMount() {
    this.getAllSongs()
  }

  render() {
    return (
      <>
        <div className="Songs">
          <h1> Songs By Favs </h1>
        </div>
        <div className="SongListings">
          <SongList props={this.state} AddFavs={this.handleFavsAdd} MinusFavs={this.handleFavsMinus} />
        </div>
      </>)
  }
}
