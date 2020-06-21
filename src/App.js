import React, { Component } from 'react'
import {Repository} from './Components/Repository'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import {Card} from './Components/Card'
import {HomePage} from './Components/HomePage'

class App extends Component {

  constructor() {
    super()
    this.state = {  
      shownCard: JSON.parse(window.localStorage.getItem('reposArr')) || false  
    }
  }

  setShownCard = reposArr => {
    this.setState({ shownCard: reposArr[0] })
    localStorage.setItem('reposArr', JSON.stringify(reposArr[0]))
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/card">
              <Card
                shownCard={this.state.shownCard}
              />
            </Route>
            <Route path="/">
              <HomePage
                setShownCard={this.setShownCard} 
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
  
}

export default App;
