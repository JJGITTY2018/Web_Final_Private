import React, { Component } from "react";
import axios from "axios"
import SongList from "./songsList"

import "../css/allsongs.css"
import "../css/songsListings.css"

// The styling of your comments has an interesting bug - if I post multiple comments in a row, some of them are justified left and some are justified right, implying that they're coming from different users. How can we adjust the CSS here so that only the comments written by the logged-in user are justified right?

export default class Songs extends Component {
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

  filterSongs = (searchQuery) => {
    (axios
      .get('/songs?searchQuery=' + searchQuery).then((res) => {
        this.setState({
          data: res.data.data,
          currentSearchQuery: this.state.searchQuery,
          searchQuery: ""
        })
      }).then(() => {
        console.log(this.state)
      }))
  }



  handleOnSubmit = (event) => {
    event.preventDefault()
    this.filterSongs(this.state.searchQuery.toLowerCase())
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleFavsAdd = (arr_id) => {
    this.setState(state => {
      const data = state.data.map((el, state_indx) => {
        if (state_indx === arr_id) {
          // console.log(el.sumoffavs)
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
    this.getAllSongs()

  }

  handleFavsMinus = (arr_id) => {
    // let favNum = this.state.data[0].sumoffavs
    // let parsedfavNum = parseInt(favNum)
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
    this.getAllSongs()

  }

  functionRefresh = (id) => {
    axios("/songs/users/" + id).then((res) => {
      this.setState({
        data: res.data.data
      })
    })
  }

  componentDidMount() {
    this.getAllSongs()
  }


  render() {
    return (
      <div className="content" >
        <div className="content_container">
          <div className="page_title">
            <h1> All Songs </h1>


            <form onSubmit={this.handleOnSubmit}>

              <input name="searchQuery" value={this.state.searchQuery} type="input" onChange={this.handleOnChange}
                placeholder="search songs..."></input>

              <button onClick={this.handleOnSubmit}>
                <img alt="" src="https://img.icons8.com/material/50/000000/search.png" />
              </button>

            </form>
          </div>


          <div className="SongListings">
            <SongList props={this.state} AddFavs={this.handleFavsAdd} MinusFavs={this.handleFavsMinus} functionRefresh={this.functionRefresh} />
          </div>
        </div>
      </div>
    )
  }
}
