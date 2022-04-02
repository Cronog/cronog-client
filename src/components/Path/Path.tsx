import {FunctionComponent} from 'react';
import {Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';

import Props from './props';

import store from '../../redux/store';

const Rota: FunctionComponent<Props> = (props): JSX.Element => {
	return (
		<Routes>
			<Route
				path={props.path}
				element={
					<Provider store={store}>{props.children}</Provider>
				}
			/>
		</Routes>
	);
};

export default Rota;
