import ReactDOM from 'react-dom';

import {toast, ToastContainer} from 'react-toastify';

import { MdOutlineError } from "react-icons/md";
import { IoWarningSharp } from "react-icons/io5";
import { FaSmileWink } from "react-icons/fa";

import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

export const showToast = (type: string, text: string | undefined): void => {
	switch (type) {
		case 'success':
			toast.success(
				<div className='flex align-center justify-center'>
					<FaSmileWink />
					&emsp;
					{text}
				</div>
			);
			break;
		case 'warning':
			toast.warn(
				<div className='flex align-center justify-center'>
					<IoWarningSharp />
					&emsp;
					{text}
				</div>
				);
			break;
		case 'error':
			toast.error(
				<div className='flex align-center justify-center'>
					<MdOutlineError />
					&emsp;
					{text}
				</div>
			);
			break;
		default:
			toast(text);
			break;
	}
};
const Toast = () => {
	return (
		<>
			{ReactDOM.createPortal(
				<ToastContainer
				position="bottom-center"
				bodyClassName={"text-center"}
				closeButton={false}
				icon={false}
				/>,
				document.getElementsByTagName('body')[0]
			)}
		</>
	);
};

export default Toast;
