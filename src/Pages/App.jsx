import '../CSS/App.css';
import Weather from './weather';
import Todo from './todo';
import Calculator from './calculater';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Weather/>}/>
      <Route path='/Todo' element={<Todo/>}/>
      <Route path='/Calculator' element={<Calculator/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
