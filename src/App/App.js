import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import AuthorizationPage from '../pages/Authorization-page/Authorization-page';
import Chat from '../pages/Chat-page/Chat';
import { setIdApi } from '../actions';
import './App.css';

library.add(fas);

function App({ idInstance, setIdApi }) {
  if (!idInstance && sessionStorage.getItem('idInstance')) {
    let data = {
      'idInstance': sessionStorage.getItem('idInstance'),
      'apiTokenInstance': sessionStorage.getItem('apiTokenInstance')
    }
    setIdApi(data);
  }
  return (
    <div className="app">
      <Header />
      {idInstance ? <Chat /> : <AuthorizationPage />}
    </div>
  );
}

const mapStateToProps = ({ idInstance }) => ({ idInstance });

const mapDispatchToProps = {
  setIdApi
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
