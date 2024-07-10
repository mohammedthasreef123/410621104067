import React, { useState } from 'react';
import './App.css';

function App() {
  const [numbers, setNumbers] = useState('');
  const [n, setN] = useState('');
  const [operation, setOperation] = useState('average');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    try {
      let result;
      const numArray = numbers.split(',').map(num => parseFloat(num.trim()));

      switch (operation) {
        case 'average':
          if (numArray.length === 0) {
            throw new Error('Empty list of numbers');
          }
          result = numArray.reduce((a, b) => a + b, 0) / numArray.length;
          break;

        case 'prime':
          const max = parseInt(n);
          if (isNaN(max) || max < 2) {
            throw new Error('Invalid number for prime calculation');
          }
          result = Array.from({ length: max - 1 }, (_, i) => i + 2)
            .filter(num => Array.from({ length: Math.floor(Math.sqrt(num)) }, (_, i) => i + 2)
            .every(divisor => num % divisor !== 0));
          break;

        case 'fibonacci':
          const count = parseInt(n);
          if (isNaN(count) || count < 1) {
            throw new Error('Invalid number for Fibonacci calculation');
          }
          result = [0, 1];
          while (result.length < count) {
            result.push(result[result.length - 1] + result[result.length - 2]);
          }
          break;

        case 'even':
          const evenMax = parseInt(n);
          if (isNaN(evenMax)) {
            throw new Error('Invalid number for even number calculation');
          }
          result = Array.from({ length: Math.floor(evenMax / 2) }, (_, i) => (i + 1) * 2);
          break;

        case 'random':
          const randomCount = parseInt(n);
          if (isNaN(randomCount) || randomCount < 1) {
            throw new Error('Invalid number for random number generation');
          }
          result = Array.from({ length: randomCount }, () => Math.floor(Math.random() * 100) + 1);
          break;
          default:
            throw new Error('Invalid operation');
        }
  
        setResult(result);
      } catch (err) {
        setError(err.message);
      }
    };
  
    return (
      <div className="App">
        <header className="App-header">
          <h1>Number Operations Calculator</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Select Operation:
              <select value={operation} onChange={(e) => setOperation(e.target.value)}>
                <option value="average">Average</option>
                <option value="prime">Prime Numbers</option>
                <option value="fibonacci">Fibonacci Sequence</option>
                <option value="even">Even Numbers</option>
                <option value="random">Random Numbers</option>
              </select>
            </label>
            {operation === 'average' && (
              <label>
                Enter numbers separated by commas:
                <input
                  type="text"
                  value={numbers}
                  onChange={(e) => setNumbers(e.target.value)}
                />
              </label>
               )}
               {operation !== 'average' && (
                 <label>
                   Enter a number:
                   <input
                     type="text"
                     value={n}
                     onChange={(e) => setN(e.target.value)}
                   />
                 </label>
               )}
               <button type="submit">Calculate</button>
             </form>
             {result !== null && (
               <div>
                 <h2>Result:</h2>
                 <p>{Array.isArray(result) ? result.join(', ') : result}</p>
               </div>
             )}
             {error && <p style={{ color: 'red' }}>{error}</p>}
           </header>
         </div>
       );
     }
     
     export default App;
  

