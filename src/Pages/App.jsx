import '../CSS/App.css';
import Weather from './weather';
import Todo from './todo-list';
import Calculator from './calculater';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename="/Multi-app">
     <Routes>
      <Route path='/' element={<Weather/>}/>
      <Route path='/todo' element={<Todo/>}/>
      <Route path='/calculator' element={<Calculator/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
