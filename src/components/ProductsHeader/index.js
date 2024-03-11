import {BsFilterRight} from 'react-icons/bs'
import {Component} from 'react'

import './index.css'

class ProductsHeader extends Component {
  state = {search: ''}

  onChangeSortby = event => {
    const {changeSortby} = this.props
    changeSortby(event.target.value)
  }

  onChangeSearch = event => {
    const {search} = this.state
    this.setState({search: event.target.value}, console.log(search))
  }

  render() {
    const {sortbyOptions, activeOptionId} = this.props
    const {search} = this.state

    return (
      <div className="products-header">
        <input
          type="search"
          placeholder="search"
          value={search}
          onChange={this.onChangeSearch}
        />
        <h1 className="products-list-heading">All Products</h1>
        <div className="sort-by-container">
          <BsFilterRight className="sort-by-icon" />
          <p className="sort-by">Sort by</p>
          <select
            className="sort-by-select"
            value={activeOptionId}
            onChange={this.onChangeSortby}
          >
            {sortbyOptions.map(eachOption => (
              <option
                key={eachOption.optionId}
                value={eachOption.optionId}
                className="select-option"
              >
                {eachOption.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  }
}

export default ProductsHeader
