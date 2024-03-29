import React, { Component } from "react";
import axios from "axios"

import SongList from "./songsList"

import "../css/allsongs.css"

export default class SongsByPopular extends Component {
constructor(props) {
  super(props)
  this.state = {
    data: [],
    searchQuery: "",
    currentUserID: "1",
    genresType: []
  }
}


getGenresList = () =>{
  axios.get('/genres/').then((res)=>{
    this.setState({
      genresType: res.data.data
    })
  })
}

onSelectHandler = (event) =>{
  this.setState({
    searchQuery:event.target.value
  })

  setTimeout(() => {
    this.getSongsbyGenres()
  }, 400);

}


elMapGenresOptions = (arr_genresType) => {
  let options = arr_genresType.map((el, i) => {
    return (
      <option key = {i} value = {el.id}> {el.type} </option>
    )
  })
return (
  <select defaultValue = " " onChange = {this.onSelectHandler}>
  <option disabled value = " "></option>
    {options}
  </select>
)
}


getSongsbyGenres = () => {
  let type = this.state.searchQuery
  axios.get('/songs/genres/'+type).then((res)=>{
    // console.log(res.data)
    this.setState({
      data: res.data.data
    })
  }).catch(err =>{
    console.log(err)
  })
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
  this.getAllSongs()

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
  this.getGenresList()
}

render() {
  return (
    <div className = "content" >
      <div className="content_container">
      <div className="page_title">
        <h1> Songs By Genres </h1>
        <form>
        {this.elMapGenresOptions(this.state.genresType)}
        </form>
      </div>


      <div className="SongListings">
        <SongList props={this.state} AddFavs={this.handleFavsAdd} MinusFavs={this.handleFavsMinus} functionRefresh={this.functionRefresh}/>
      </div>
      </div>
    </div>
    )
}
}

