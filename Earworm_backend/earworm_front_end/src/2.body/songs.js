import React, { Component } from "react";
import axios from "axios"
import Navi from "../1.header/navi";
import { NavLink } from "react-router-dom"

import FavsComponent from "./favorites.js"


export default class Songs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      searchQuery: "",
      currentUserID: "1",
      currentUserFavs: []
    }
  }

  getAllSongs = () =>{
    axios
    .get('/songs?searchQuery=').then((res)=>{
      this.setState({
        data:res.data.data
      })
    }).then(()=>{
      console.log(this.state)
    })
  }

  filterSongs =(searchQuery) =>{
    axios
      .get('/songs?searchQuery='+searchQuery).then((res) => {
        this.setState({
          data: res.data.data,
          searchQuery: ""
        })
      }).then(() => {
        // console.log(this.state)
      })
  }

  getUserFavorites = ()=>{
    axios.get('/favorites/users/'+this.state.currentUserID).then((res)=>{
      console.log(res.data.data)
      let currentUserFavsArr = []
      res.data.data.map(el=>{
        currentUserFavsArr.push(el.songs_id)
      })
          this.setState({
            currentUserFavs: currentUserFavsArr
          })
    }).then(()=>{
      // console.log(this.state)
    })
  }

  checkFavsArrOnSong = (element_id) =>{
    if(this.state.currentUserFavs.includes(element_id)){
      return (
        <button> ⭐ Unfavorite This! 💘 </button>
      )
    }
    else {
      return (<button> ❤ Favorite This! ❤</button>)
    }
  }

  elMapData = (data) => {
    if (data !== null) {
        return (
          data.map(el =>{
           return(
             <div className = "Songs" key= {el.id}>
               <img src = {el.img_url} width = "auto" height = "100" /> 
               <h1> {el.title} </h1>
               Post by : <NavLink to = {"profile/"+el.id} >{el.added_by}</NavLink>
               <h3> Total Favs: {el.sumoffavs}</h3>
               <h4> Type: {el.type}</h4>
               <div className = "FavButton"> 
               {this.checkFavsArrOnSong(el.id)}
               </div>
             </div>
           )
        }))
      }
      else {
        console.log(data)
      return null
  }
}

  
  handleOnSubmit = (event) =>{
    event.preventDefault()
    this.filterSongs(this.state.searchQuery.toLowerCase())
  }

  handleOnChange = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount() {
      this.getAllSongs()
      this.getUserFavorites()
  }


  render() {

    return (
    <>
      <div className="Songs">
      <h1> All Songs </h1>
      <form onSubmit = {this.handleOnSubmit}>
        <input name = "searchQuery" value = {this.state.searchQuery} type = "input" onChange = {this.handleOnChange}></input>
        <input type = "submit" ></input>
      </form>
      {this.elMapData(this.state.data)}
      </div>
    </>)
  }
}