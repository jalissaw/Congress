import React from 'react';
import './capitol.JPG'


import './App.css';
const key = 'xCaHBd8gI5ZJSOUXWFJGOXZBjJtMbvoIcip0kSmS'

class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: null,
      senators: [],
      represenatives: [],
      bills: [],
      repst: 0,
      displayLeft: 'none',
      displayRight: 'block'
    }
  }

  handleChange = (e) => {
    this.setState({
      userInput: e.target.value.toUpperCase(),
      repst: 0
    })
  }

  right = (i) => {
    if (this.state.repst + 1 < i.length)
      this.setState({
        repst: this.state.repst + 1,
      });
    if (this.state.repst === i.length - 1) {
      // this.setState({
      //   displayRight: 'none'
      // })
      console.log('end')
    } else { this.setState({ displayRight: 'block' }) }
    console.log(this.state.repst)
    console.log(i.length)
  }
  left = (i) => {

    if (this.state.repst - 1 > -1)
      this.setState({
        repst: this.state.repst - 1,
      })


  }

  componentDidMount() {
    const key = `xCaHBd8gI5ZJSOUXWFJGOXZBjJtMbvoIcip0kSmS`
    const urls = [`https://api.propublica.org/congress/v1/116/senate/members.json`,
      `https://api.propublica.org/congress/v1/102/house/members.json`,
      `https://api.propublica.org/congress/v1/statements/latest.json`,
      `https://api.propublica.org/congress/v1/bills/search.json`];

    let requests = urls.map(url => fetch(url, {
      type: "GET",
      dataType: 'json',
      headers: {
        'X-API-Key': key
      }
    }))
    Promise.all(requests)
      .then(res => {
        return Promise.all(res.map(res => res.json()));
      }).then(response => {
        this.setState({
          senators: response[0].results[0].members,
          represenatives: response[1].results[0].members,
          bills: response[2].results
        })
        console.log(this.state.senators)
        console.log(this.state.represenatives)
      }).catch(err => {
        console.log(err)
      })

  }

  render() {


    const { senators, bills, represenatives, userInput, repst } = this.state;

    const style = {
      buttons: {
        displayLeft: this.state.display,
        displayRight: this.state.display
      }
    };
    const { buttons } = style;

    const inSenate = senators.filter(
      (senator) => senator.state === userInput
    )

    const inHouse = represenatives.filter(
      (represenative) => represenative.state === userInput
    )

    const draft = bills.find(
      (bill) => bill.name === inSenate.last_name)



    return (

      <div className="congress">
        <div className="users">
          <h2 className="titled">Enter State Abbreviation</h2>
          <h2>{this.state.userInput}</h2>
          <input className="userInput" onChange={this.handleChange} />
        </div>

        {inSenate.map((senate, i) => {
          return (
            <div key={senate.id} className="senate">
              <ul className="bio">
                <h2 >{senate.short_title + " " + senate.first_name + " " + senate.last_name}</h2>
                <li>{senate.title}</li>
                <li>State: <strong>{senate.state}</strong></li>
                <li>Party: <strong>{senate.party}</strong></li>
                <li>DOB: <strong>{senate.date_of_birth}</strong></li>
                <li>Next Election: <strong>{senate.next_election}</strong></li>
                <li>Missed Votes: <strong>{senate.missed_votes}</strong></li>
                <li> Votes With Party Percentage: <strong>{senate.votes_with_party_pct + "%"}</strong></li>
                <li>Votes Against Party Percentage: <strong>{senate.votes_against_party_pct + "%"}</strong></li>
              </ul>
            </div>
          )
        })}

        {inHouse.map((rep, i) => {
          return (
            <div key={rep.id} className="house">
              <h2 className="numbers" >Your state has {inHouse.length} Represenative(s)</h2>
              <h2 className="namesHouse">{rep.short_title + " " + inHouse[this.state.repst].first_name + " " + inHouse[this.state.repst].last_name}</h2>
              <ul className="bio">
                <li  >{rep.title}</li>
                <li  >State: <strong>{inHouse[this.state.repst].state}</strong></li>
                <li  >Party: <strong>{inHouse[this.state.repst].party}</strong></li>
                <li  >DOB: <strong>{inHouse[this.state.repst].date_of_birth}</strong></li>
                <li  >Missed Votes: <strong>{inHouse[this.state.repst].missed_votes}</strong></li>
                <li  > Votes With Party Percentage: <strong>{inHouse[this.state.repst].votes_with_party_pct + "%"}</strong></li>
                <li  >Votes Against Party Percentage: <strong>{inHouse[this.state.repst].votes_against_party_pct + "%"}</strong></li>
              </ul>
              <button onClick={() => this.left(inHouse)} style={buttons} className="left btn">Prev</button>
              <button onClick={() => this.right(inHouse)} style={buttons} className="right btn">Next</button>
            </div>
          )
        })}
      </div>

    )
  }
}

export default Members;
