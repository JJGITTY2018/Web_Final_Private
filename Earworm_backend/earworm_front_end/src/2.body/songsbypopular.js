import React, { Component } from "react";
import axios from "axios"

import SongList from "./songsList"

export default class SongsByPopular extends Component {
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

  compareValues = (key, order='asc') => {
    return function (a,b){
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)){
        return 0
      }

      const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key]

      const varB = (typeof a[key] === 'string') ? b[key].toUpperCase() : b[key]

      let compare = 0

      if(varA > varB){
        compare = 1
      }
      else if (varA < varB){
        compare = 1
      }

      return (
        (order === 'desc') ? (compare * -1) : compare
      )
    }
  }

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
        data: data.sort(this.compareValues('sumsoffavs','desc'))
      }
    })

    this.getAllSongs()

    console.log(this.state)
  
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
    this.getAllSongs()

  }

  functionRefresh =(id)=>{
  axios("/songs/users/"+id).then((res)=>{
      this.setState({
        data:res.data.data
      })})
}



  componentDidMount() {
    this.getAllSongs()
  }

  render() {
    return (
      <div className= "content">
        <div className = "content_container">
        <div className="page_title">
          <h1> Songs By Favs </h1>
        </div>
        <div className="SongListings">
          <SongList props={this.state} AddFavs={this.handleFavsAdd} MinusFavs={this.handleFavsMinus} 
            functionRefresh={this.functionRefresh}
          />
        </div>
        </div>
      </div>)
  }
}

