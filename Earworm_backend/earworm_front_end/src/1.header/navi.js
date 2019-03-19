import React, {Component} from "react"
import {NavLink} from "react-router-dom"


export default class Navi extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <>
        <div className="NaviBar">
        <h1> Earworm Report </h1>
          <div className="naviMenu" >
            <NavLink to="/home"> Home </NavLink>
            <NavLink to="/songs"> All Songs </NavLink>
            <NavLink to="/songs/bypop"> By Popular </NavLink>
            <NavLink to="/songs/bygenre"> By Genre </NavLink>
            <NavLink to="/profile"> Profile </NavLink>
          </div>
        </div>
      </>
    )
  }

}
  