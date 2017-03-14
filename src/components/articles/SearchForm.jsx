import React from 'react'

class SearchForm extends React.Component
{
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onSearchInputChanged(e);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSearch(e);
  }

  render() {
    return (
      <div className="col-1-4">
        <div className="search">
          Search Articles
          <form onSubmit={this.handleSubmit}>
            <p>
              <input type="text" name="title" onChange={this.handleChange}/>
              <input type="submit" name="commit" value="search"/>
            </p>

            <div className="load hide"></div>

            <div className="results box hide">No Results</div>
          </form>
        </div>
      </div>
    )
  }
}

export default SearchForm;
