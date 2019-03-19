import React, { Component } from 'react'

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  elMapData = (data) => {
    if (data !== null) {
      return (
        data.map(el => {
          return (
            <div className="Songs" key={el.id}>
              <img src={el.img_url} width="auto" height="100" />
              <h1> {el.title} </h1>
              Post by : <NavLink to={"profile/" + el.id} >{el.added_by}</NavLink>
              <h3> Total Favs: {el.sumoffavs}</h3>
              <h4> Type: {el.type}</h4>
              <div className="FavButton">
                {this.checkFavsArrOnSong(el.id)}
                <h1> Comments: </h1>
                <div className="comments">
                  <CommtsComponent props={el.id} />
                </div>
              </div>
            </div>
          )
        }))
    }
    else {
      console.log(data)
      return null
    }
  }

  componentDidMount(){
    
  }

  render() {
    console.log(this.props.props)
    return (
      <h1> this is a comment </h1>
    )
  }
}

export default (Comments)