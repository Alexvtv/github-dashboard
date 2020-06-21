import React, { Component } from 'react'
import {Repository} from './Repository'

export class HomePage extends Component {

  constructor() {
    super()
    this.state = {  
      reposData: [],
      actualPage: 1,  
      shownCard: false,
      inputValue: ''
    }
  }
  
  componentDidMount() {

    // запрос популярных репозиториев

    fetch(`https://api.github.com/search/repositories?q=stars%3A%3E0&sort=stars&page=1`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ reposData: data.items})
        console.log(data.items)
      })

  }

  recognizeRepos = reposId => {

    // пробрасываю объект выбранного репозитория

    let repos = this.state.reposData.filter(item => item.id == reposId)
    this.props.setShownCard(repos);
  }

  handleChange = (event) => {
    let variable = event.target.value

    // переменная для будущей проверки 
    // изменилось ли значение input`a,
    // чтобы не делать запрос после каждого символа

    this.setState({ inputValue: event.target.value })
    setTimeout(() => {
      if (variable == this.state.inputValue) {

        // Если символы не меняются в течение 1.5с, делаем новый запрос

        fetch(`https://api.github.com/search/repositories?q=${this.state.inputValue}&page=1`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.setState({ reposData: data.items})
        })

      }
    }, 1500)

  }

  changePage = value => {

    console.log(this.state.actualPage)

    // логика изменения страницы

    let actualPage = this.state.actualPage
    let newPage = this.state.actualPage

    if (value == 'prev') {
      if (actualPage > 1) {
        newPage = actualPage - 1
      }
    } else if (value == 'next') {
      if (actualPage < 9) {
        newPage = actualPage + 1
      }
    } else {
      newPage = value
    }
    if (!this.state.inputValue) {
      fetch(`https://api.github.com/search/repositories?q=stars%3A%3E0&sort=stars&page=${Math.ceil(newPage/3)}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.setState({ reposData: data.items, actualPage: newPage })
        })
    } else {
      fetch(`https://api.github.com/search/repositories?q=${this.state.inputValue}&page=${Math.ceil(newPage/3)}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.setState({ reposData: data.items, actualPage: newPage })
        })
    }
  }

  render() {

    const {reposData, actualPage} = this.state;

    const reposList = reposData.slice( ((actualPage-1)*10 - (Math.ceil(actualPage/3)-1)*30), actualPage*10 - (Math.ceil(actualPage/3)-1)*30).map(item => {
      return (
        <Repository 
          key={item.id}
          name={item.name}
          stars={item.stargazers_count}
          commited={item.pushed_at}
          url={item.html_url}
          id={item.id}
          recognizeRepos={this.recognizeRepos}
        />
      )
    })

    return (
      <div className="App">
        <div className="header">
          <p className="search">Поиск репозитория</p>
          <input 
            value={this.state.inputValue} 
              onChange={this.handleChange}
          />
        </div>
        <div className="repos-list">
          {reposList}
        </div>
            <div className="repos-list__pages">
              <button
                onClick={() => this.changePage('prev')}
              >
                &lt;
              </button>
              <button
                onClick={() => this.changePage(1)}
                className={actualPage == 1 ? 'active' : {}}
              >
                1
              </button>
              <button
                onClick={() => this.changePage(2)}
                className={actualPage == 2 ? 'active' : {}}
              >
                2
              </button>
              <button
                onClick={() => this.changePage(3)}
                className={actualPage == 3 ? 'active': {}}
              >
                3
              </button>
              <button
                onClick={() => this.changePage(4)}
                className={actualPage == 4 ? 'active' : {}}
              >
                4
              </button>
              <button
                onClick={() => this.changePage(5)}
                className={actualPage == 5 ? 'active' : {}}
              >
                5
              </button>
              <button
                onClick={() => this.changePage(6)}
                className={actualPage == 6 ? 'active' : {}}
              >
                6
              </button>
              <button
                onClick={() => this.changePage(7)}
                className={actualPage == 7 ? 'active' : {}}
              >
                7
              </button>
              <button
                onClick={() => this.changePage(8)}
                className={actualPage == 8 ? 'active' : {}}
              >
                8
              </button>
              <button
                onClick={() => this.changePage(9)}
                className={actualPage == 9 ? 'active' : {}}
              >
                9
              </button>
              <button
                onClick={() => this.changePage('next')}
              >
                &gt;
              </button>
            </div>
      </div>
    )
  }
}

export default HomePage;