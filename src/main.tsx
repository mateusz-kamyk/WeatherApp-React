import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./styles/base.css";
import "./styles/layout.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
