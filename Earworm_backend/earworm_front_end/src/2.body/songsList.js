import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Comments from "./comments.js"
import Axios from 'axios';


class SongList extends Component {
	constructor(props) {
		super(props);
		this.state = {
    };
	}

elMapData = (data) => {
  if (data !== null) {
    return data.map((el) => {
      return (
        <div className="Songs" key={el.id}>
        <img src={el.img_url} width="auto" height="100" />
        <h1> {el.title} </h1>
        Post by : <NavLink to = {'profile/' + el.id}>{el.added_by}</NavLink>
        <h3> Total Favs: {el.sumoffavs} </h3>
        <h4> Type: {el.type} </h4>
        {this.checkFavsArrOnSong(el.id)}
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

onClickAdd = (element_id) =>{
  Axios.post("/favorites",{
    users_id: this.props.currentUserID,
    songs_id: element_id
  })
}
onClickDelete = (element_id) =>{
  Axios.delete("/favorites",{
    id: element_id
  })
}


getUserFavorites = ()=>{
    Axios.get('/favorites/users/'+this.state.currentUserID).then((res)=>{
      console.log(res.data.data)
      let currentUserFavsArr = []
      let currentUserFavsArrIDs = []

      res.data.data.map(el=>{
        currentUserFavsArr.push(el.songs_id)
        currentUserFavsArrIDs.push(el.id)

      })
          this.setState({
            currentUserFavs: currentUserFavsArr,
            currentUserFavsID: currentUserFavsArrIDs,
          })
    }).then(()=>{
      // console.log(this.state)
    })
  }

checkFavsArrOnSong = (element_songs_id, element_fav_id) => {
  if (this.props.props.currentUserFavs.includes(element_songs_id)) {
    return <button> ⭐ Unfavorite This! 💘 </button>;
  } else {
    return <button> ❤ Favorite This! ❤ </button>;
  }
};

componentDidMount() {

}

render(){
  console.log(this.props.props)
  let songsDisplay = this.elMapData(this.props.props.data)
  return (
    <>
    {songsDisplay}
    </>
  )
}
}

export default SongList;

// elMapData = (data) => {
//   if (data !== null) {
//     return (
//       data.map(el => {
//         return (
//           <div className="Songs" key={el.id}>
//             <img src={el.img_url} width="auto" height="100" />
//             <h1> {el.title} </h1>
//             Post by : <NavLink to={"profile/" + el.id} >{el.added_by}</NavLink>
//             <h3> Total Favs: {el.sumoffavs}</h3>
//             <h4> Type: {el.type}</h4>
//             <div className="FavButton">
//               {this.checkFavsArrOnSong(el.id)}
//               <h1> Comments: </h1>
//               <div className="comments">
//                 <CommtsComponent props={el.id} />
//               </div>
//             </div>
//           </div>
//         )
//       }))
//   }
//   else {
//     console.log(data)
//     return null
//   }
// }
