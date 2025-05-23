import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./services/store";

const container = document.getElementById('root');
const root = ReactDOM.createRoot(
    container as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
