import { connect } from 'react-redux'
import Letter from '../views/Letter'
import utils from '../utils/utils'

function mapStateToProps(state, ownProps) {
  return {
		args: {
	    letter: ownProps.params.letter,
			before: utils.getBeforeLetter(state.categories, ownProps.params),
			after: utils.getAfterLetter(state.categories, ownProps.params),
			title: ownProps.params.category,
      id: state.user.id
		}
  }
}

const LetterContainer = connect(
  mapStateToProps
)(Letter)

export default LetterContainer
