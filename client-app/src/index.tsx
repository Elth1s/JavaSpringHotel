import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';


import './index.css';
import "cropperjs/dist/cropper.css";
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import { store } from './store'
import { AuthUser } from './components/comon/AuthDialog/actions';

const token = localStorage.token as string;

if (token) {
  AuthUser(token, store.dispatch);
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();