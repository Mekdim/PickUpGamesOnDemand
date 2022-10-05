import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import { StateProvider } from './StateProvider.js';
import reducer, { initialState } from './reducer';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import main_am from './translations/am/main.json';
import main_en from './translations/en/main.json';
import main_de from './translations/de/main.json';

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: 'en', // language to use
  resources: {
    en: {
      main: main_en,
    },
    am: {
      main: main_am,
    },
    de: {
      main: main_de,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
