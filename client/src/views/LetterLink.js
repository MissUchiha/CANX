import React from 'react' 
import {Link} from 'react-router' 

function LetterLink(props) {
   	return (
      <div className="letter-col col-xs-3">
    		<Link className='letter-link' to={"/categories/"+props.args.title.toLowerCase()+"/letters/"+props.args.letter} >
    			<div className="letter-container">
    			   	<div className="letter">
    				      {props.args.letter}
    		   		</div>
    	   		</div>
    		 </Link>
  	  </div>
    ) 
}

export default LetterLink 
