import React from 'react' 
import LetterLink from "./LetterLink"

function Letters(props) {
    const letters = props.args.letters.split("") 
	  const title = props.args.title 
   	return (
      <div className="letters row">
  		 <div className="letters-title profile-title qcol-xs-12"> {title} </div>
  		 { letters.map((letter) =>{const args = {letter: letter,
  												                     title: title.toLowerCase()} 
  									             return <LetterLink key={letter} args={args} /> 
							                  })}
  	 </div>
    ) 
}

export default Letters 
