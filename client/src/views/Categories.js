import React from 'react'
import {Link} from 'react-router'

function Categories(props) {
		return (
    	  <div className='category-container'>
			     <h1 className='profile-title'>CATEGORIES</h1>
		  	      {props.args.categories.map((cat, ind) => <Link key={ind} to={'/categories/'+cat.name.toLowerCase() }>
                                                        <div className='category-row'> {cat.name} </div>
                                                      </Link>)}
		  </div>
    	)
}

export default Categories
