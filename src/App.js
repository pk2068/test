import logo from './logo.svg';
import './App.css';
import data1 from './dataSource.json';
import data2 from './dataSource2.json';
import { DefaultSettings } from '@mscrmaddons/components/lib/Grids/UniversalGrid';
import { UniversalGrid } from '@mscrmaddons/components/lib/Grids/UniversalGrid';



function App() {
  return (
    <div className="App">
      <p>Testing the new UniversalGrid component</p>
      <h1>{data1.length}</h1>
      <h1>{data2.length}</h1>
      <p>Trigger Changes</p>
    </div>
  );
}

export default App;
