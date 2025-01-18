import '../CSS/App.css';
import Weather from './weather';
import Todo from './todo';
import Calculator from './calculater';
import NotFound from './notfound';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
     <Routes future={{ v7_relativeSplatPath: true }}>
      <Route path='/' element={<Weather/>}/>
      <Route path='/Todo' element={<Todo/>}/>
      <Route path='/Calculator' element={<Calculator/>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
