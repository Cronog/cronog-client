import {FunctionComponent} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import Props from './props';

import store from '../../redux/store';

const Rota: FunctionComponent<Props> = (props): JSX.Element => {

	const RotaPrivada = ({...rest}) => {
  
		return <Route {...rest} render={props =>  {
			// const resposta = loginUtils.usuarioLogado(rest.exigeAutenticacao);
			const logged = true;
	
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
			<RotaPrivada route={props.path} {...props} />
			{/* <Route
				exact={props.exact}
				path={props.path}
				component={() =>
					<Provider store={store}>{props.children}</Provider>
				}
			/> */}
		</Switch>
	);
};

export default Rota;
