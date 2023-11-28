import { Component } from 'react';

import { findCharacter } from '@/api/getData';
import spinner from '@/assets/spinner.gif';
import Footer from '@/components/footer/Footer';
import SearchBar from '@/components/search-bar/SearchBar';
import SearchingResults from '@/components/searching-results/SearchingResults';
import { ICharacter, ISearchState } from '@/helpers/Types';

class Main extends Component {
  state: ISearchState = {
    query: localStorage.getItem('LOCAL_LAST_SEARCH_QUERY') || '',
    charactersData: null,
    isLoading: true,
  };

  async componentDidMount() {
    await findCharacter(this.state.query).then((data) => {
      this.setState({ charactersData: data.results });
      this.setState({ isLoading: false });
    });
  }

  handleStateChange = (data: ICharacter[] | null) => {
    this.setState({ charactersData: data });
  };

  handleLoadingChange = (value: boolean) => {
    this.setState({ isLoading: value });
  };

  render() {
    return (
      <>
        <SearchBar
          setIsLoading={this.handleLoadingChange}
          setCharacters={this.handleStateChange}
        />
        {this.state.isLoading && (
          <img src={spinner} alt="Loading..." className="container" />
        )}
        {this.state.charactersData !== null && (
          <SearchingResults people={this.state.charactersData} />
        )}
        <Footer />
      </>
    );
  }
}

export default Main;
