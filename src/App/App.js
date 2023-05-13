import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import AuthorizationPage from '../pages/Authorization-page/Authorization-page';
import Chat from '../pages/Chat-page/Chat';
import './App.css';

library.add(fas);

function App({ idInstance }) {
  return (
    <div className="app">
      <Header />
      {idInstance ? <Chat /> : <AuthorizationPage />}
    </div>
  );
}

const mapStateToProps = ({ idInstance }) => ({ idInstance })

export default connect(mapStateToProps)(App);
