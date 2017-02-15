import React from 'react' 
import {Link} from 'react-router' 

function Footer(props) {
    return (
	 <div className="control-nav container-fluid">
        <div className="row">
         	<Link to={props.args.left} onClick={props.args.onClick}> <div className="col-xs-2 col-sm-2 "> </div> </Link>
            <Link to={props.args.right} onClick={props.args.onClick}> <div className=" col-xs-2 col-sm-2 col-xs-offset-8 col-sm-offset-8 "> </div> </Link>
        </div>
    </div>
) 
}

export default Footer 
