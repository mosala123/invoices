// main.jsx
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './components/rtk/store.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import { ChatProvider } from './components/chat/ChatContext.jsx'; // ← أضف السطر ده

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ChatProvider>   {/* ← wrap بيه */}
            <App />
          </ChatProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);