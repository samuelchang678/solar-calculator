import logo from './logo.svg';
import './App.scss';

function App() {
  return (
   <div className='appStyle'>
      <h1>Save on Your Electricity Bill with Solar Energy</h1>
      <p>Calculate your potential savings and take the first step towards energy independence.</p>

      <div class="calculator">
            <h2>Solar Savings Calculator</h2>
            <label for="monthlyBill">Monthly TNB Bill (RM)</label>
            <input type="number" id="monthlyBill" placeholder="Enter amount" required/>
            
            <label for="location">Location (Optional)</label>
            <select id="location">
                <option value="">Select State</option>
                <option value="selangor">Selangor</option>
                <option value="johor">Johor</option>
                <option value="penang">Penang</option>
            </select>
            
            <button onclick="handleCalculation()">Calculate</button>
            <p id="results"></p>

        </div>

        <div>
          <h3>Request a Callback</h3>
          <form>
                <label for="name">Name</label>
                <input type="text" id="name" placeholder="Your Name" required/>
                
                <label for="contact">Phone/Email</label>
                <input type="text" id="contact" placeholder="Your Contact" required/>
              
                <button type="submit">Submit</button>
          </form>
        </div>
        
   </div>
  );
}

export default App;
