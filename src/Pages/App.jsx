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
      <Route path='/todo' element={<Todo/>}/>
      <Route path='/calculator' element={<Calculator/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
