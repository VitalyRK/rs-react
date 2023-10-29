import { Component } from 'react';
import SearchBar from '../../components/search-bar/SearchBar';
import SearchingResults from '../../components/searching-results/SearchingResults';
import { findCharacter, getPeople } from '../../api/getData';
import Footer from '../../components/footer/Footer';
import spinner from '../../assets/spinner.gif';

export interface ISearchState {
  query: string | null;
  people: ICharacter[] | null;
  loading: boolean;
}
export interface ICharacter {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

class Main extends Component {
  state: ISearchState = {
    query: localStorage.getItem('LOCAL_LAST_SEARCH_QUERY') || null,
    people: null,
    loading: true,
  };

  async componentDidMount() {
    if (this.state.query !== null) {
      await findCharacter(this.state.query).then((data) => {
        this.setState({ people: data.results });
        this.setState({ loading: false });
      });
    } else {
      await getPeople().then((data) => {
        this.setState({ people: data.results });
        this.setState({ loading: false });
      });
    }
  }

  handleStateChange = (data: ICharacter[] | null) => {
    this.setState({ people: data });
  };

  handleLoadingChange = (value: boolean) => {
    this.setState({ loading: value });
  };

  render() {
    return (
      <>
        <SearchBar
          loading={this.handleLoadingChange}
          stateChange={this.handleStateChange}
        />
        {this.state.loading && (
          <img src={spinner} alt="Loading..." className="container" />
        )}
        {this.state.people !== null && (
          <SearchingResults people={this.state.people} />
        )}
        <Footer />
      </>
    );
  }
}

export default Main;
