import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showError = (message: string) => {
  toast(message, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};
