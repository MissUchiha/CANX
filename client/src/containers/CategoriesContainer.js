import { connect } from 'react-redux'
import Categories from '../views/Categories'

function mapStateToProps(state, ownProps) {
  return {
		args: {
	    categories: state.categories
    }
  }
}

const CategoriesContainer = connect(
  mapStateToProps
)(Categories)


export default CategoriesContainer
