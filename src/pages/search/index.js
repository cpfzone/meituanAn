import React, { Component } from 'react';
import Axios from 'axios';

export default class index extends Component {

  componentDidMount(){
    Axios.get("/api/tags").then(res=>{
      console.log(res)
    })
  }

  render() {
    return (
      <div>
        搜索
      </div>
    );
  }
}
