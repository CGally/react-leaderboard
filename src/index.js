import React, { Component } from 'react';
import './styles.css';

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.users,
      ranking: [],
      colNames: [],
      asc: false,
      alph: false,
      page: 1,
      pageMax: 1,
    };
    this.sortUsers = this.sortUsers.bind(this);
    this.sortUsersByName = this.sortUsersByName.bind(this);
    this.filterRank = this.filterRank.bind(this);
    this.increasePage = this.increasePage.bind(this);
    this.decreasePage = this.decreasePage.bind(this);
    this.setPage = this.setPage.bind(this);
  }

  componentDidMount() {
    const ranking = this.state.users;
    const paginate = this.props.paginate;
    ranking.sort(this.compareScore).reverse();
    ranking.map((user, index) => user.rank = index +1);
    ranking.map((user, index) => user.page = Math.ceil((index+1)/paginate));
    this.setState({ pageMax: ranking[ranking.length - 1].page})
    this.setState({ ranking: ranking});
  }

  compareScore(a,b) {
    if (a.score < b.score)
      return -1;
    if (a.score > b.score)
      return 1;
    return 0;
  }

  compareName(a,b) {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }

  sortUsers() {
    const ranking = this.state.ranking;
    if(this.state.asc === true) {
      ranking.sort(this.compareScore).reverse();
      ranking.map((user, index) => user.page = Math.ceil((index+1)/this.state.paginate));
      this.setState({ ranking: ranking});
      this.setState({ asc: false});
      this.setState({ alph: false});
    } else {
      ranking.sort(this.compareScore);
      ranking.map((user, index) => user.page = Math.ceil((index+1)/this.state.paginate));
      this.setState({ ranking: ranking});
      this.setState({ asc: true});
      this.setState({ alph: false});
    }
  }

  sortUsersByName() {
    const ranking = this.state.ranking;
    if(this.state.alph === true) {
      ranking.sort(this.compareName).reverse();
      ranking.map((user, index) => user.page = Math.ceil((index+1)/this.state.paginate));
      this.setState({ ranking: ranking});
      this.setState({ alph: false});
      this.setState({ asc: true});
    } else {
      ranking.sort(this.compareName);
      ranking.map((user, index) => user.page = Math.ceil((index+1)/this.state.paginate));
      this.setState({ ranking: ranking});
      this.setState({ alph: true});
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
    newRanking.sort(this.compareScore).reverse();
    newRanking.map((user, index) => user.page = Math.ceil((index+1)/5));
    this.setState({ ranking: newRanking});
    this.setState({ page: 1});
    this.setState({ pageMax: newRanking[newRanking.length - 1].page})
  }

  increasePage(e) {
    e.preventDefault();
    let page = this.state.page;
    if(page < this.state.pageMax){
      page += 1;
    }
    this.setState({ page: page});
  }

  decreasePage(e) {
    e.preventDefault();
    let page = this.state.page;
    if(page > 1){
      page -= 1;
    }
    this.setState({ page: page});
  }

  setPage(e) {
    e.preventDefault();
    let page = this.state.page;
    page = e;
    this.setState({ page: page});
  }

  render() {
    return (
      <div>
        <table id="lBoard">
          <tbody className='ranking'>
            <tr>
              <td colspan="10000"><h1>Leaderboard</h1></td>
            </tr>
            <tr>
              <td colspan="10000">
                <form onChange={this.filterRank}>
                  Name: <input type="search" name="search" placeholder="Search"/>
                </form>
              </td>
            </tr>
            <tr>
              <td className='rank-header' onClick={ this.sortUsers }> Rank </td>
              <td className='rank-header' onClick={ this.sortUsersByName }> Name </td>
              <td className='rank-header' onClick={ this.sortUsers }> Score </td>
            </tr>
            {
            this.state.ranking.map((user, index) =>
               <tr className='ranking' key={index}>
                { user.page == this.state.page ? <td className='data'>{ user.rank }</td> : null }
                { user.page == this.state.page ? <td className='data'>{ user.name }</td> : null }
                { user.page == this.state.page ? <td className='data'>{ user.score }</td> : null }
               </tr>
             )
           }
          </tbody>
        </table>
        <p onClick={ this.decreasePage }>prev</p>
        { this.state.page == 1 ? null: <p> { this.state.page - 1 }</p>}
        <p> { this.state.page }</p>
        { this.state.page < this.state.pageMax ? <p> { this.state.page + 1 }</p>: null }
        <p onClick={ this.increasePage }>next</p>
      </div>
    );
  }
}
export default Leaderboard;
