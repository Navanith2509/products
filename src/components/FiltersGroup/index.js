import {Component} from 'react'

import './index.css'

class FiltersGroup extends Component {
  state = {activeCategory: '', activeRating: '', activeUrl: ''}

  componentDidMount() {
    this.getUrl()
  }

  getUrl = () => {
    const {activeCategory, activeRating} = this.state

    if (activeCategory !== '' && activeRating !== '') {
      this.setState(
        {activeUrl: `&category=${activeCategory}&rating=${activeRating}`},
        this.sendUrl,
      )
    } else if (activeCategory !== '') {
      this.setState({activeUrl: `&category=${activeCategory}`}, this.sendUrl)
    } else if (activeRating !== '') {
      this.setState({activeUrl: `&rating=${activeRating}`}, this.sendUrl)
    } else {
      this.setState({activeUrl: ''}, this.sendUrl)
    }
  }

  sendUrl = () => {
    const {activeUrl} = this.state
    const {onGetUrl} = this.props
    onGetUrl(activeUrl)
  }

  onCategoryClick = id => {
    this.setState({activeCategory: id}, this.getUrl)
    console.log(id)
  }

  onRatingClick = id => {
    this.setState({activeRating: id}, this.getUrl)
  }

  clearFilter = () => {
    this.setState({activeCategory: '', activeRating: ''}, this.getUrl)
  }

  render() {
    const {ratingsList, categoryOptions} = this.props

    return (
      <div className="filters-group-container">
        <h1>Category</h1>
        {categoryOptions.map(each => (
          <button
            onClick={() => this.onCategoryClick(each.categoryId)}
            value={each.categoryId}
            key={each.categoryId}
          >
            <p>{each.name}</p>
          </button>
        ))}
        <h1>Rating</h1>
        {ratingsList.map(each => (
          <button
            onClick={() => this.onRatingClick(each.ratingId)}
            key={each.ratingId}
            value={each.ratingId}
          >
            <img src={each.imageUrl} alt={`rating ${each.ratingId}`} />
          </button>
        ))}
        <button onClick={this.clearFilter} type="button">
          Clear Filters
        </button>
      </div>
    )
  }
}
export default FiltersGroup
