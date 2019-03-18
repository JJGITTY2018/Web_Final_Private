import React, { Component } from "react";
import axios from "axios"


export default class Songs extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  getAllSongs = () =>{
    axios
    .get('/songs').then((res)=>{
      this.setState({
        data:res.data.data
      })
    }).then(()=>{
      console.log(this.state)
    })
  }

  componentDidMount() {
      this.getAllSongs()
  }


  render() {
    return (
    <>
      <div className="Songs">
      

      </div>
    </>)
  }
}