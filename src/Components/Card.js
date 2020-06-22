import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class Card extends Component {

  constructor() {
    super()
    this.state = {      
    }
  }

  render() {
    const dataCard = this.props.shownCard
    console.log(dataCard)
    return (
      <div className="card">

        <p><Link to="/">Назад</Link></p>
        <p><span className="card-name">{dataCard.name}</span><span className="card-stars">&#9733; {dataCard.stargazers_count}</span></p>
        
        <div className="card-owner">
          <img src={dataCard.owner.avatar_url} alt="avatar" />
          <p>{dataCard.owner.login}</p>
        </div>

        <p className="card-description">{dataCard.description}</p>
        <p><span className="card-commited">Последнее изменение: {dataCard.pushed_at}</span> <span className="card-language">{dataCard.language}</span></p>

      </div>
    );
  }
}
