class Utils {
	static getTypeHeaders() {
		return {'Content-Type': 'application/json', 'Accept': 'application/json'}
	}

  static getFilteredCategory(categories, category) {
		let filteredCategory = categories.filter((cat) => {
					if(cat.name.toLowerCase() === category.toLowerCase())
						return true
					return false
			})

		if(filteredCategory.length !== 0)
			return filteredCategory[0]
		else
		//TODO: catch and manage exception
			return {name: 'error', value : ''}
	}

	static getBeforeLetter(categories, props) {
		let category = this.getFilteredCategory(categories, props.category)
		let ind = category.value.indexOf(props.letter)

		if(ind !== -1)
			if(ind === 0)
					return category.value[category.value.length - 1]
			else
					return category.value[ind-1]
		return "x"
	}

	static getAfterLetter(categories, props) {
		let category = this.getFilteredCategory(categories, props.category)
		let ind = category.value.indexOf(props.letter)

		if(ind !== -1)
			if(ind === category.value.length - 1)
					return category.value[0]
			else
					return category.value[ind+1]
		return "x"
	}

	static getBeforeCategory(categories, category) {
		let cat = this.getFilteredCategory(categories, category)
		let ind = categories.indexOf(cat)

		if(ind !== -1)
			if(ind === 0)
					return categories[categories.length - 1].name
			else
					return categories[ind-1].name
	}

	static getAfterCategory(categories, category) {
		let cat = this.getFilteredCategory(categories, category)

		let ind = categories.indexOf(cat)

		if(ind !== -1)
			if(ind === categories.length - 1)
					return categories[0].name
			else
					return categories[ind+1].name
	}

	static testName(name) {
		return !(name.length === 0);
	}

	static testPass(password) {
		return !(password.length < 6)
	}

	static testConfirmPass(confPass, pass) {
		return !(confPass !== pass || confPass.length < 6 )
	}

	static testEmail(email) {
      let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return regEx.test(email)
	}
}

export default Utils
