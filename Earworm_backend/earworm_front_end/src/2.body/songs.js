import React, { Component } from "react";
import axios from "axios"
import Navi from "../1.header/navi";

// import FavsComponent from "./favorites.js"
import SongList from "./songsList"

export default class Songs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      searchQuery: "",
      currentUserID: "1",
      currentUserFavs: [],
      currentUserFavsID: []

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
      </div>
      <div className = "SongListings">
          <SongList props = {this.state}/>
      </div>
    </>)
  }
}



// getUserFavorites = () => {
//   axios.get('/favorites/users/' + this.state.currentUserID).then((res) => {
//     console.log(res.data.data)
//     let currentUserFavsArr = []
//     let currentUserFavsArrIDs = []

//     res.data.data.map(el => {
//       currentUserFavsArr.push(el.songs_id)
//       currentUserFavsArrIDs.push(el.id)

//     })
//     this.setState({
//       currentUserFavs: currentUserFavsArr,
//       currentUserFavsID: currentUserFavsArrIDs,
//     })
//   }).then(() => {
//     // console.log(this.state)
//   })
// }