import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Comments from "./comments.js"
import Axios from 'axios';

// This code works so well - but it's really hard for me to access and work with because of formatting. Could you refactor this project to make it more accessible to other developers?

class SongList extends Component {
	constructor(props) {
		super(props);
		this.state = {
      favoriteStatus: "",
      currentUserFavs: [],
      data:[]
    };
  }

naviLink =(id) =>{

}

elMapData = (data) => {
  if (data !== null) {
    return data.map((el,i) => {
      return (
        <div className="Songs" arr_id = {i} key={el.id}>
        <img src={el.img_url} alt= {el.title}width="auto" height="100" />
        <h1> {el.title} </h1>
        Post by : <NavLink to = {'profile/' + el.id}>{el.added_by}</NavLink>
        <h3> Total Favs: {el.sumoffavs} </h3>
        {this.checkFavsArrOnSong(el.id,i)}
        <div className = "Comments">
          <Comments currentUserID= {this.props.props.currentUserID} songs_id = {el.id}/>
        </div>
        </div>

      )
    })
  }
  else {
    return null;
  }
}

onClickAdd = (element_id,arr_id) =>{
  // console.log("Added")
  Axios.post("/favorites",{
    users_id: this.props.props.currentUserID,
    songs_id: element_id
  }).then(()=>{
    this.getUserFavorites()
    this.props.AddFavs(arr_id)
  })
}
onClickDelete = (element_id,arr_id) =>{
  // console.log(element_id)
  // console.log(this.props.props.currentUserID)
  Axios.delete("/favorites",{
    data:{
    users_id: this.props.props.currentUserID,
    songs_id: element_id
    }
  }).then(()=>{
    this.props.MinusFavs(arr_id)
    this.getUserFavorites()

    })
}

  getUserFavorites = () => {
    Axios.get('/favorites/users/' + this.props.props.currentUserID).then((res) => {
      console.log(res)
      let currentUserFavsArr = []
      res.data.data.map(el => {
        return currentUserFavsArr.push(el.id)
      })
      this.setState({
        currentUserFavs: currentUserFavsArr
      })
    }).then(() => {
    })
  }

checkFavsArrOnSong = (element_songs_id,array_id) => {
  console.log(this.state.currentUserFavs)
  if (this.state.currentUserFavs.includes(element_songs_id)) {
    return <button name = {array_id} onClick={() => {this.onClickDelete(element_songs_id,array_id)}}> <span> Unfavorite This! </span></button>;
  } else {
    return <button onClick = {()=> {this.onClickAdd(element_songs_id,array_id)}}> ❤ Favorite This! ❤ </button>;
  }
};


componentDidMount() {
    this.getUserFavorites()

}

render(){

  let songsDisplay = this.elMapData(this.props.props.data)
  return (
    <>
    {songsDisplay}
    </>
  )
}
}

export default SongList;
