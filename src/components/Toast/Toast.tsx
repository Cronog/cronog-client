import {FunctionComponent} from 'react';
import ReactDOM from 'react-dom';

import {toast, ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

export const showToast = (type: string, text: string): void => {
	switch (type) {
		case 'success':
			toast.success(text);
			break;
		case 'warning':
			toast.warn(text);
			break;
		case 'error':
			toast.error(text);
			break;
		default:
			toast(text);
			break;
	}
};
const Toast: FunctionComponent = (): JSX.Element => {
	return (
		<>
			{ReactDOM.createPortal(
				<ToastContainer />,
				document.getElementsByTagName('body')[0]
			)}
		</>
	);
};

export default Toast;
