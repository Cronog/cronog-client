import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Path from '../../components/Path';
import CronogConfig from '../CronogConfig';
import Home from '../Home';
import Login from '../Auth/Login';
import Register from '../Auth/Register';

import lockedRoutes from '../../utils/routes';

import './styles.css';
import Recovery from '../Auth/Recovery';

import CronogDetail from '../CronogDetail';
import TaskConfig from '../TaskConfig';
import { Provider } from 'react-redux';
import store from "../../redux/store";

function Main() {

  const history = useHistory();

    useEffect(() => {
      if(history){
        if(lockedRoutes().find(item => item === history.location.pathname)){
          history.push("/home")
        }
      }
    }, [history])

  return (
    <div id="container-main">
      <Provider store={store}>
      <Path path='/auth/login' exact>
        <Login />
      </Path>
      <Path path='/auth/register/:email?' exact>
        <Register />
      </Path>
      <Path path='/auth/recovery/:email?'>
        <Recovery />
      </Path>
      <Path path='/home' exact>
        <Home />
      </Path>
      <Path path='/home/cronog-config/:id?'>
        <CronogConfig />
      </Path>
      <Path path='/home/cronog-detail/:id'>
        <CronogDetail />
      </Path>
      <Path path='/home/task-config/:cronogId/:order/:id?'>
        <TaskConfig />
      </Path>
      </Provider>
    </div>
  );
}

export default Main;
