import React from 'react'
import ReactPaginate from 'react-paginate'
import {fetchArticles, /*fetchSuggestions,*/ fetchRelevantSuggestions} from '../../data/article'
import Articles from './Articles'
import Autosuggest from 'react-autosuggest';

class ArticlesContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      titleResults: [],
      meta: {},
      searchTerm: '',
      searchSuggestions: []
    };

    this.onSearchInputChanged = this.onSearchInputChanged.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const root = await fetchArticles()
    this.setState({articles: root.articles, meta: root.meta})
  }

  onSearchInputChanged(event, {newValue}) {
    this.setState({searchTerm: newValue})
  }

  async onSearch(e) {
    // Enter pressed
    if (e.charCode == 13) {
      const root = await fetchArticles({searchTerm: this.state.searchTerm})
      this.setState({articles: root.articles, meta: root.meta});
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const root = await fetchArticles({searchTerm: this.state.searchTerm})
    this.setState({articles: root.articles, meta: root.meta});
  }

  async onSuggestionsFetchRequested({value}) {
    // Story #2 suggestions
    //const suggestions = await fetchSuggestions(value)
    const suggestions = await fetchRelevantSuggestions(value)
    this.setState({ searchSuggestions: suggestions.articles });
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      searchSuggestions: []
    });
  }

  async handlePaginationClick(data) {
    const articles = await fetchArticles({searchTerm: this.state.searchTerm,
                                          currentPage: data.selected+1})
    this.setState(articles)
    window.scrollTo(0, 0)

  }

  getSuggestionValue = suggestion => suggestion.title;

  renderSuggestion = suggestion => (
    <div>
      {suggestion.title}
    </div>
  );

  render() {
    const inputProps = {
      placeholder: 'Article title',
      value: this.state.searchTerm,
      onChange: this.onSearchInputChanged,
      onKeyPress: this.onSearch
    };

    return (
      <div className="contents">
        <div className="row">
          <div className="section" id="articles-section">
            <Articles articles={this.state.articles}/>
            <div className="col-1-4">
              <form onSubmit={this.handleSubmit}>
                <div className="search">
                  Search Articles
                    <Autosuggest
                      suggestions={this.state.searchSuggestions}
                      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                      onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                      getSuggestionValue={this.getSuggestionValue}
                      renderSuggestion={this.renderSuggestion}
                      inputProps={inputProps}
                    />
                    <input type="submit" name="commit" value="search"/>
                  </div>
                </form>
              </div>
          </div>
        </div>
        <div className="row">
          <div className="section">
            <ReactPaginate previousLabel={"← Previous"}
                       nextLabel={"Next →"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"gap"}
                       pageCount={this.state.meta.total_pages}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={8}
                       onPageChange={this.handlePaginationClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"current"}
                       forcePage={this.state.meta.current_page-1}
                     />
         </div>
       </div>
     </div>
    );
  }
}

export default ArticlesContainer;
