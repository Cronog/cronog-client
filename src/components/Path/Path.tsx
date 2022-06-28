import {FunctionComponent} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import Props from './props';

import store from '../../redux/store';
import { authenticatedUser } from '../../utils/auth';

const Path: FunctionComponent<Props> = (props): JSX.Element => {

	const PrivatePath = ({...rest}) => {
		return <Route {...rest} render={async props =>  {
			const logged = await authenticatedUser(rest.exigeAutenticacao);
	
			if(logged){
				return <Provider store={store}><rest.componente {...props} /></Provider>  
			}else{
				return <Redirect to={{ pathname:"/login" }} />
			};
		}
		}
		/>
	}

	return (
		<Switch>
			<PrivatePath route={props.path} {...props} />
		</Switch>
	);
};

export default Path;
