import React from 'react'
import ReactPaginate from 'react-paginate'

import {fetchArticles} from '../../data/article'
import Articles from './Articles'
import SearchForm from './SearchForm'

class ArticlesContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      meta: {},
      searchTerm: '',
      currentPage: 1
    };

    this.onSearchInputChanged = this.onSearchInputChanged.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  onSearchInputChanged(e) {
    this.setState({searchTerm: e.target.value})
  }

  onSearch() {
    fetchArticles({searchTerm: this.state.searchTerm}).then( (articles) => {
      this.setState(articles);
    })
  }

  async componentDidMount() {
    const json = await fetchArticles()
    this.setState({articles: json.articles, meta: json.meta})
  }

  async handlePaginationClick(data) {
    this.setState({currentPage: data.selected+1})
    const articles = await fetchArticles({searchTerm: this.state.searchTerm,
                                          currentPage: data.selected+1})
    this.setState(articles)
    window.scrollTo(0, 0)

  }

  render() {
    return (
      <div className="contents">
        <div className="row">
          <div className="section" id="articles-section">
            <Articles articles={this.state.articles}/>
            <SearchForm onSearch={this.onSearch} onSearchInputChanged={this.onSearchInputChanged}/>
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
