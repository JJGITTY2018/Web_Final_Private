import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Axios from 'axios';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      inputValue: "",
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
    }, 645)
  }

  handleClick = (id) => {
    // console.log(this.props)
    this.props.functionRefresh(id)
    
   
  }

  elMap = (arr) =>{
    // console.log(this.state)
    // debugger
    return arr.map(el =>{
      return (
        <div className = "songs_comment" key = {el.id}> 
        <p> {el.body} </p>
        <p> Comments By: <NavLink to={'/profile/'+el.users_id}><button onClick = {()=>{this.handleClick(el.users_id)}}>{el.username}</button></NavLink></p>
        </div>
      )
    })
  }

  onSubmitHandler = (event,users_id, songs_id,text) =>{
    event.preventDefault()
    // console.log(this.state)
    // console.log(this.props)
    this.state.inputValue.length > 2 ? 
    Axios.post("/comments",{
      body: this.state.inputValue,
      songs_id: this.props.songs_id,
      users_id: this.props.currentUserID
    }).then(() => {
      this.getCommentsofSongs(this.props.songs_id)
      this.setState(
        {
          inputValue : ""
        }
      )
    })

    :

    console.log("nope")
  }

  onChangeHandler = (event) => {
    this.setState({
    [event.target.name] : event.target.value
    })
    // console.log(this.state)
  }

  componentDidMount() {
    this.getCommentsofSongs(this.props.songs_id)
  }
  
  render() {
    return (
      <div className = "SongsComments" > 
      {this.elMap(this.state.data)}
      <form onSubmit = {this.onSubmitHandler}>  
          <textarea required name= "inputValue" onChange = {this.onChangeHandler} value = {this.state.inputValue}> 
      </textarea>
          <input onSubmit={this.onSubmitHandler} type = "submit" />
      </form>
      </div>
      );
  }
}

export default Comments;