import "./HomePage.scss";
import { malaysianStates } from "../../constants/solarConstants";
import { useSolarCalculatorUtil } from "../../utils/useSolarCalculatorUtil";
import money from "../../asset/money.svg";
import savings from "../../asset/savings.svg";

export const HomePage = () => {
  const {
    solarSavingsObject,
    solarCalculationObject,
    callbackObject,
    showCalculationError,
    showSavingError,
    showCallbackError,
    solarSetupCalculation,
    loanAndSavingsCalculation,
    onSubmitCallbackForm,
    updateSolarCalculationObject,
    updateSolarSavingObject,
    updateCallbackObject,
  } = useSolarCalculatorUtil();
  return (
    <div className="homePage">
      <h1>Save on Your Electricity Bill with Solar Energy</h1>
      <p>
        Calculate your potential savings and take the first step towards energy
        independence.
      </p>

      <div class="costCalculator">
        <div class="flexContainer">
          <h2>Solar Cost Calculation</h2>
          <div>
            <img src={money} alt="spending" class="icon" />
          </div>
        </div>
        <label for="monthlyElectricityBill">Monthly TNB Bill (RM)</label>
        <input
          type="number"
          id="monthlyElectricityBill"
          placeholder="Enter amount"
          value={solarCalculationObject.monthlyElectricityBill}
          onChange={(event) => {
            updateSolarCalculationObject(
              "monthlyElectricityBill",
              parseFloat(event.target.value),
            );
          }}
          required
        />

        <label for="location">Location (Optional)</label>
        <select
          id="malaysianState"
          value={solarCalculationObject?.selectedState}
          onChange={(val) => {
            updateSolarCalculationObject("selectedState", val.target.value);
          }}
        >
          <option value="" disabled selected>
            -select a state-
          </option>
          {malaysianStates?.map((type) => {
            return <option value={type}>{type}</option>;
          })}
        </select>

        <button onClick={solarSetupCalculation}>Calculate Setup Cost</button>
        {showCalculationError ? (
          <div>Please enter monthly TNB bill AND select state</div>
        ) : (
          <p id="calculationResults">
            Selected State: {solarCalculationObject?.selectedState}
            <br />
            Estimated System Size: RM {solarCalculationObject?.systemSize} kWp
            <br />
            Total Cost: RM {solarCalculationObject?.totalCost}
          </p>
        )}
      </div>

      <div class="savingsCalculator">
        <div class="flexContainer">
          <h2>Solar Savings Calculation</h2>
          <div>
            <img src={savings} alt="spending" class="icon" />
          </div>
        </div>
        <input
          type="number"
          id="yearLoan"
          placeholder="Enter loan years"
          value={solarSavingsObject.yearLoan}
          onChange={(event) => {
            updateSolarSavingObject("yearLoan", parseInt(event.target.value));
          }}
          required
        />
        <button onClick={loanAndSavingsCalculation}>Calculate Savings</button>

        {showSavingError ? (
          <div>Please enter year(s) for the loan</div>
        ) : (
          <p id="results">
            With a {solarSavingsObject?.yearLoan} year loan
            <br />
            The calculated monthly payment: RM $
            {solarSavingsObject?.targetMonthlyPayment}
            <br />
            Expect break even in {solarSavingsObject?.breakevenYears} years
          </p>
        )}
      </div>

      <div class="emailContactContainer">
        <h3>Request a Callback</h3>
        <form onSubmit={onSubmitCallbackForm}>
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            required
            value={callbackObject.name}
            onChange={(event) => {
              updateCallbackObject("name", event.target.value);
            }}
          />

          <label for="contact">Phone/Email</label>
          <input
            type="text"
            id="contact"
            placeholder="Email or Phone Number"
            required
            value={callbackObject.emailOrPhone}
            onChange={(event) => {
              updateCallbackObject("emailOrPhone", event.target.value);
            }}
          />

          <button type="submit">Submit</button>
        </form>

        {showCallbackError &&
          callbackObject.name &&
          callbackObject.emailOrPhone && (
            <div>Please enter correct email address or phone number</div>
          )}
      </div>
    </div>
  );
};
