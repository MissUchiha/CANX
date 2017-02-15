import React from 'react' 
import Footer from './Footer' 
import Letters from './Letters'

function Category(props) {
	const argsLet ={letters: props.args.category.value,
   				    		title: props.args.category.name} 
	const argsFoot = {left: "/categories/"+props.args.before,
					  			  right: "/categories/"+props.args.after} 
	return (
		<div>
			<Letters args={argsLet}/>
			<div className='footer-back'></div>
			<Footer args={argsFoot} />
		</div>
    ) 
}

export default Category 
