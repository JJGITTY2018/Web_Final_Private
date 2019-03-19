import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[]
    }
  }

  getCommentsofSongs = (songs_id) =>{
    setTimeout(() => {
      Axios.get("/comments/songs/"+songs_id).then((res)=>{
      // console.log(res.data.data)
      this.setState({ 
        data: res.data.data
      })
    })
    }, 1200)
  }

  elMap = (arr) =>{
    return arr.map(el =>{
      return (
        <div className = "songs_comment" key = {el.id}> 
        <p> {el.body} </p>
        <p> Comments By: <NavLink to={'profile/' + el.users_id}>{el.username}</NavLink></p>
        </div>
      )
    })
  }

  componentDidMount() {
    this.getCommentsofSongs(this.props.songs_id)
  }

  render() {
    return (
      <div className = "SongsComments" > 
      {this.elMap(this.state.data)}
      <form> 
      <textarea> 
      </textarea>
      <input type = "submit" />
      </form>
      </div>
      );
  }
}

export default Comments;

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
