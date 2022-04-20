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

import * as authUtils from "../../utils/auth";
import CronogDetail from '../CronogDetail';

function Main() {

  const history = useHistory();

    useEffect(() => {
      if(!authUtils.authenticatedUser(true)){
        if(history){
          if(lockedRoutes().find(item => item === history.location.pathname)){
            history.push("auth/login");
          }
        }
      }else{
        history.push("/home")
      }
    }, [history])

  return (
    <div id="container-main">
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
      <Path path='/home/cronog-detail/:id/:title/:color'>
        <CronogDetail />
      </Path>
    </div>
  );
}

export default Main;
