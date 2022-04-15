import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Path from '../../components/Path';
import Cronog from '../Cronog';
import Home from '../Home';
import Login from '../Login';

import lockedRoutes from '../../utils/routes';

import './styles.css';

function Main() {

  const historico = useHistory();

    useEffect(() => {
      if(historico){
        if(lockedRoutes().find(item => item === historico.location.pathname)){
          historico.push("/login");
        }
      }
    }, [historico])

  return (
    <div id="container-main">
      <Path path='/login' exact>
        <Login />
      </Path>
      <Path path='/home' exact>
        <Home />
      </Path>
      <Path path='/home/cronog/:id?'>
        <Cronog />
      </Path>
    </div>
  );
}

export default Main;
