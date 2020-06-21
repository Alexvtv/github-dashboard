import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class Repository extends Component {

  render() {

    return (
      <div className="repository">

      	<p 
      		className="repository-name"
      		onClick={() => this.props.recognizeRepos(this.props.id)}
      	>
      		<Link to="/card">{this.props.name}</Link>
      	</p>
      	<p className="repository-stars">&#9733; {this.props.stars}</p>
      	<p className="repository-commited">Последнее изменение {this.props.commited}</p>
      	<a href={this.props.url}><p className="repository-url">Перейти на GitHub</p></a>
      	
      </div>
    );
  }
}
