import { Authenticator } from '@aws-amplify/ui-react';
import { BrowserRouter } from 'react-router-dom';
import AppRoute from './AppRoute';
import '@aws-amplify/ui-react/styles.css';

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <BrowserRouter>
          <div>
            <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
              <span>Welcome, {user?.username}!</span>
              <button onClick={signOut} style={{ marginLeft: '1rem' }}>
                Sign out
              </button>
            </header>
            <AppRoute />
          </div>
        </BrowserRouter>
      )}
    </Authenticator>
  );
}

export default App;
