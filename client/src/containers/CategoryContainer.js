import { connect } from 'react-redux'
import Category from '../views/Category'
import utils from '../utils/utils'

function mapStateToProps(state, ownProps) {
  return {
		args: {
	    category: utils.getFilteredCategory(state.categories, ownProps.params.category),
			before: utils.getBeforeCategory(state.categories, ownProps.params.category),
			after: utils.getAfterCategory(state.categories, ownProps.params.category)
		}
  }
}

const CategoryContainer = connect(
  mapStateToProps
)(Category)


export default CategoryContainer
