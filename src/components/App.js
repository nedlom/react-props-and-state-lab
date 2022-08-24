import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  changeType = (event) => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  petFind = (event) => {
    if (this.state.filters.type === 'all') {
      fetch('/api/pets')
      .then(resp => resp.json())
      .then(json => this.setState({ pets: json}))
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(resp => resp.json())
      .then(json => this.setState({ pets: json}))
    }
  }

  adopt = (id) => {
    const pet = this.state.pets.find(pet => pet.id === id)
    pet.isAdopted = true
    this.setState({ pets: this.state.pets })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeType} onFindPetsClick={this.petFind}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adopt} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
