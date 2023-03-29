import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </PersistGate>
    </Provider>
  </QueryClientProvider>
);
