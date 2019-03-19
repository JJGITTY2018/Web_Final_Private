import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Comments from "./comments.js"
import Axios from 'axios';


class SongList extends Component {
	constructor(props) {
		super(props);
		this.state = {
      favoriteStatus: "",
      currentUserFavs: [],
      data:[]
    };
	}

elMapData = (data) => {
  if (data !== null) {
    return data.map((el,i) => {
      return (
        <div className="Songs" arr_id = {i} key={el.id}>
        <img src={el.img_url} width="auto" height="100" />
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
      let currentUserFavsArr = []
      res.data.data.map(el => {
        currentUserFavsArr.push(el.songs_id)

      })
      this.setState({
        currentUserFavs: currentUserFavsArr
      })
    }).then(() => {
    })
  }

checkFavsArrOnSong = (element_songs_id,array_id) => {
  if (this.state.currentUserFavs.includes(element_songs_id)) {
    return <button name = {array_id} onClick={() => {this.onClickDelete(element_songs_id,array_id)}}> ⭐ Unfavorite This! 💘 </button>;
  } else {
    return <button onClick = {()=> {this.onClickAdd(element_songs_id,array_id)}}> ❤ Favorite This! ❤ </button>;
  }
};


componentDidMount() {
    this.getUserFavorites()

}

render(){
  
  // console.log(this.props)
  // console.log(this.state)
  let songsDisplay = this.elMapData(this.props.props.data)
  return (
    <>
    {songsDisplay}
    </>
  )
}
}

export default SongList;
