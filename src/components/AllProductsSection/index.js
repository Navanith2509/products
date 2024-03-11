import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const statusList = {
  success: 'Success',
  failure: 'Failure',
  inProgress: 'In_Progress',
}

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    activeOptionId: sortbyOptions[0].optionId,
    status: statusList.inProgress,
    url: `https://apis.ccbp.in/products?sort_by=PRICE_HIGH`,
  }

  componentDidMount() {
    this.setState({status: statusList.inProgress})
    this.getProducts()
    this.onGetUrl()
  }

  onGetUrl = para => {
    const {activeOptionId} = this.state
    this.setState(
      {
        url: `https://apis.ccbp.in/products?sort_by=${activeOptionId}${para}`,
      },
      this.getProducts,
    )
  }

  getProducts = async () => {
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {url} = this.state

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        status: statusList.success,
      })
    } else {
      this.setState({status: statusList.failure})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderBasic = () => {
    const {activeOptionId} = this.state
    return (
      <ProductsHeader
        activeOptionId={activeOptionId}
        sortbyOptions={sortbyOptions}
        changeSortby={this.changeSortby}
      />
    )
  }

  renderProductsList = () => {
    const {productsList} = this.state

    // TODO: Add No Products View
    return (
      <div className="all-products-container">
        {this.renderBasic()}
        <div>
          <FiltersGroup
            categoryOptions={categoryOptions}
            ratingsList={ratingsList}
            onGetUrl={this.onGetUrl}
          />
          <ul className="products-list">
            {productsList.length === 0 && (
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
                alt="no products"
              />
            )}
            {productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderFailure = () => (
    <div className="all-products-container">
      {this.renderBasic()}
      <div>
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          onGetUrl={this.onGetUrl}
        />

        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
          alt="products failure"
        />
      </div>
    </div>
  )

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view

  render() {
    const {status} = this.state

    switch (status) {
      case statusList.inProgress:
        return this.renderLoader()
      case statusList.failure:
        return this.renderFailure()
      case statusList.success:
        return this.renderProductsList()
      default:
        return null
    }
  }
}

export default AllProductsSection
