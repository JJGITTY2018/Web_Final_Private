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
    }
  }

  getAllSongs = () =>{
    axios
    .get('/songs?searchQuery=').then((res)=>{
      this.setState({
        data:res.data.data
      })
    }).then(()=>{
      // console.log(this.state)
    })
  }

  filterSongs =(searchQuery) =>{
  // searchQuery !== "" ? 
  (axios
    .get('/songs?searchQuery='+searchQuery).then((res) => {
      this.setState({
        data: res.data.data,
        currentSearchQuery: this.state.searchQuery,
        searchQuery: ""
      })
    }).then(() => {
      console.log(this.state)
    }))


  //  : 
  //   (axios
  //     .get('/songs?searchQuery='+ this.state.currentSearchQuery).then((res) => {
  //       this.setState({
  //         data: res.data.data,
  //         currentSearchQuery: this.state.searchQuery,
  //         searchQuery: ""
  //       })
  //     }).then(() => {
  //       console.log(this.state)
  //     }))
      
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

  handleFavsAdd = (arr_id) =>{
    // let favNum = this.state.data[0].sumoffavs
    // let parsedfavNum = parseInt(favNum)
    this.setState( state =>{
      const data = state.data.map((el, state_indx) =>{
        if(state_indx === arr_id ){
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
        data:data
      }
    })
  console.log(this.state)
}

  handleFavsMinus = (arr_id) => {
    // let favNum = this.state.data[0].sumoffavs
    // let parsedfavNum = parseInt(favNum)
    this.setState(state => {
      const data = state.data.map((el, state_indx) => {
        if (state_indx === arr_id) {
          // console.log(el.sumoffavs)
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
    // console.log(this.state)
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
          <SongList props={this.state} AddFavs={this.handleFavsAdd} MinusFavs={this.handleFavsMinus}/> 
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
