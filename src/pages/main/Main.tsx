import { Component } from 'react';
import SearchBar from '../../components/search-bar/SearchBar';
import SearchingResults from '../../components/searching-results/SearchingResults';

class Main extends Component {
  render() {
    return (
      <>
        <SearchBar />
        <SearchingResults />
      </>
    );
  }
}

export default Main;
