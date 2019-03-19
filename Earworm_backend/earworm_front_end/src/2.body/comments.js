import React, { Component } from 'react'

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
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