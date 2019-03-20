import React, { Component } from "react";
import axios from "axios"

import SongList from "./songsList"

export default class Profile extends

Component {
constructor(props) {
  super(props)
  this.state = {
    currentUserID: "1",
    data: [],
    currentShowing: "usongs",
    genresType: [],
    img_url: "",
    title: "",
    genres_id: " ",
    searchQuery: ""
  }
}

getSongsOfUsers = (event) =>{

   this.setState({
    currentShowing: "usongs"
  })
  if (this.props.match.params.id){
    let id = this.props.match.params.id
    axios("/songs/users/"+id).then((res)=>{
      this.setState({
        data:res.data.data
      })
    }).then((result) => {
      // console.log(this.state)
    }).catch((err) => {
      console.log(err)
    });
  }
  else if (this.state.currentUserID) {
    let id = this.state.currentUserID
    axios("/songs/users/"+id).then((res)=>{
      this.setState({
        data: res.data.data
      })
    }).then(() => {
      // console.log(this.state)
    }).catch((err) => {
      console.log(err)
    });
  }
  else {
    return null
  }
}

onSelectHandler = (event) =>{
  this.setState({
    genres_id:event.target.value
  })
  
}

getUsersFavsSongs = (event) => {
  this.setState({
    currentShowing: "favs"
  })

  if (this.props.match.params.id) {
    let id = this.props.match.params.id
    axios("/favorites/users/" + id).then((res) => {
      this.setState({
        data: res.data.data
      })
    }).then((result) => {
      // console.log(this.state)
    }).catch((err) => {
      console.log(err)
    });
  }
  else if (this.state.currentUserID) {
    let id = this.state.currentUserID
    axios("/favorites/users/" + id).then((res) => {
      this.setState({
        data: res.data.data
      })
    }).then(() => {
      console.log(this.state)
    }).catch((err) => {
      console.log(err)
    });
  }
  else {
    return null
  }
}

elMapGenresOptions = (arr_genresType) => {
  let options = arr_genresType.map((el, i) => {
    return (
      <option key = {i} value = {el.id}> {el.type} </option>
    )
  })
return (
  <select required defaultValue={this.state.genres_id} onChange = {this.onSelectHandler}>
  <option disabled value = " "></option>
    {options}
  </select>
)
}

addSongsBox = () =>{
  if ((this.state.currentShowing === "usongs" || this.props.match.params.id === this.state.currentUserID) &&!this.props.match.params.id){
    return (
      <>
        <h1> ADD A SONG</h1>
        <form  onSubmit = {this.handleOnSubmit}>
          <label> TITLE: </label>
          <input onChange={this.handleOnChange} value ={this.state.title} name = "title" required type="input" placeholder="TITLE" />
          <label> IMG_URL: </label>
          <input onChange={this.handleOnChange} value = {this.state.img_url} name = "img_url" required type="input" placeholder="TITLE" />
          {this.elMapGenresOptions(this.state.genresType)}
          <input type="submit" />
        </form>
      </>
    )
  }
  else{
    return null
  }
}

handleOnChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  })
  // console.log(this.state)
}

handleOnSubmit = (event) =>{
  // console.log(this.state)
  event.preventDefault()
  if(this.state.genres_id){
  axios.post("/songs",{
    title: this.state.title,
    img_url: this.state.img_url,
    users_id: this.state.currentUserID,
    genres_id: this.state.genres_id
  }).then(()=>{
    this.setState({
      title: "",
    img_url: "",
    users_id: this.state.currentUserID,
    genres_id: ""
    })
  })
  }
  else{
    console.log("GENRES IS EMPTY")
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

getGenresList = () =>{
  axios.get('/genres/').then((res)=>{
    this.setState({
      genresType: res.data.data
    })
  })
}

componentDidMount() {
  this.getSongsOfUsers()
  this.getGenresList()
}

render() {
  return (
    <>
    <form >
        <input name="option" value ="usongs" type="radio" defaultChecked onClick = {this.getSongsOfUsers}/> <label >USERS SONGS</label>
        <input name="option" value = "favs" type="radio" onClick = {this.getUsersFavsSongs}/> <label> USERS FAVS</label>
    </form>

    <div>
    {this.addSongsBox()}
    </div>

    <SongList props={this.state} AddFavs={this.handleFavsAdd} MinusFavs={this.handleFavsMinus} />
    </>)
}
}

