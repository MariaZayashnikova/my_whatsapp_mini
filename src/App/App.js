import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Header from '../Header/Header';
import AuthorizationPage from '../pages/Authorization-page/Authorization-page';
import './App.css';

library.add(fas);

function App() {
  return (
    <div className="app">
      <Header />
      <AuthorizationPage />
    </div>
  );
}

export default App;
