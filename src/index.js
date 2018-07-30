import React, { Component } from 'react';
import './styles.css';

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.users,
      ranking: [],
      colNames: [],
      asc: false
    };
    this.sortUsers = this.sortUsers.bind(this);
    this.filterRank = this.filterRank.bind(this);
  }

  componentDidMount() {
    const ranking = this.state.users;
    ranking.sort(this.compare).reverse();
    ranking.map((user, index) => user.rank = index +1);
    ranking.map((user, index) => user.key = function(n) {
        return this[Object.keys(this)[n]];
    });
    this.setState({ ranking: ranking});
  }

  compare(a,b) {
    if (a.score < b.score)
      return -1;
    if (a.score > b.score)
      return 1;
    return 0;
  }

  sortUsers() {
    const ranking = this.state.ranking;
    if(this.state.asc === true) {
      this.setState({ ranking: ranking.sort(this.compare).reverse()});
      this.setState({ asc: false});
    } else {
      this.setState({ ranking: ranking.sort(this.compare)});
      this.setState({ asc: true});
    }
  }

  filterRank(e) {
    e.preventDefault();
    const ranking = this.state.users;
    const newRanking = [];
    const inputLength = e.target.value.length
    for(var i = 0; i < ranking.length; i++) {
      const str = ranking[i].name.slice(0, inputLength).toLowerCase();
      if(str === e.target.value.toLowerCase()) {
        newRanking.push(ranking[i]);
      }
    }
    this.setState({ ranking: newRanking.sort(this.compare).reverse()});
  }

  render() {
    return (
      <div>
        <h1>Leaderboard</h1>
        <form onChange={this.filterRank}>
          Name: <input type="search" name="search" placeholder="Search"/>
        </form>
        <table id="lBoard">
          <colgroup>
            <col id='user-name' />
            <col id='high-score' />
          </colgroup>
          <tbody className='ranking'>
            <tr>
              <td className='rank' onClick={ this.sortUsers }> Rank </td> |
              <td className='name'> Name </td> |
              <td className='score' onClick={ this.sortUsers }> Score </td> |
            </tr>
            {
            this.state.ranking.map((user, index) =>
               <tr className='ranking' key={index}>
                <td className='user-rank'> { user.rank } </td> |
                <td className='user-name'> { user.name } </td> |
                <td className='high-score'> { user.score } </td> |
               </tr>
             )
           }
          </tbody>
        </table>
      </div>
    );
  }
}
export default Leaderboard;
