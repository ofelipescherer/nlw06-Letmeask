import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import './styles/global.scss'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import { AuthContextProvider } from './contexts/AuthContext'
import { Room } from "./pages/Room";


//extact no Route significa que ele vai vai exatamente isso
//se não ele pegaria qualquer endereço q começa com /
//além disso, se escrever somente exact, é a mesma coisa que exact={true}



function App() {


  return (
    <BrowserRouter>
      <AuthContextProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" exact component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />
          </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
