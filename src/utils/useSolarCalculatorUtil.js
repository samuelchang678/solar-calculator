import { useState } from "react";

const TARIFF = 0.509;
const PANELCOST = 3000;
const PEAKHOURS = 3 * 0.8;
const MONTHLYINTERESTRATE = 0.05 / 12;

const solarCalculationRequiredFields = [
  "selectedState",
  "monthlyElectricityBill",
];
const solarSavingRequiredFields = ["yearLoan"];

export const useSolarCalculatorUtil = () => {
  const [showCalculationError, setShowCalculationError] = useState(false);
  const [showSavingError, setShowSavingError] = useState(false);
  const [solarCalculationObject, setSolarCalculationObject] = useState({
    systemSize: 0,
    totalCost: 0,
    selectedState: "",
    monthlyElectricityBill: undefined,
  });
  const [solarSavingsObject, setSolarSavingObject] = useState({
    yearLoan: undefined,
    targetMonthlyPayment: 0,
    breakevenYears: 0,
  });

  const onValidate = (objectToBeValidated, fieldsToBeValidated) => {
    if(fieldsToBeValidated){
      return fieldsToBeValidated.every((attr) => {
        const value = objectToBeValidated[attr] ?? undefined;
        return value !== null && value !== undefined && (value !== "" || value >0);
      });
    }

    return Object.values(objectToBeValidated).every(value => 
      value !== null && 
      value !== undefined && 
      (value !== "" || value >=1)
    );

  };

  const updateSolarCalculationObject = (key, value) => {
    setSolarCalculationObject((prev) => ({ ...prev, [key]: value }));
  };

  const updateSolarSavingObject = (key, value) => {
    setSolarSavingObject((prev) => ({ ...prev, [key]: value }));
  };

  const solarSetupCalculation = () => {
    if (!onValidate(solarCalculationObject, solarCalculationRequiredFields)) {
      // Don't do any calculation if any field is invalid

      setShowCalculationError(true);

      return;
    }
    setShowCalculationError(false);
    const bill = solarCalculationObject.monthlyElectricityBill;

    const monthlyEnergy = bill / TARIFF;
    const dailyEnergy = monthlyEnergy / 30;
    const newSystemSize = dailyEnergy / PEAKHOURS;
    const newTotalCost = newSystemSize * PANELCOST;

    updateSolarCalculationObject("systemSize", newSystemSize.toFixed(2));
    updateSolarCalculationObject("totalCost", newTotalCost.toFixed(2));
  };

  const loanAndSavingsCalculation = () => {
    const validateCalculation = onValidate(solarCalculationObject)
    const validateSaving = onValidate(solarSavingsObject, solarSavingRequiredFields)
    if(!validateCalculation || !validateSaving){
      if(!validateCalculation){
        setShowCalculationError(true)
      }
      if(!validateSaving){
        setShowSavingError(true)
      }

      return
    }
    setShowSavingError(false);
    const bill = solarCalculationObject.monthlyElectricityBill ?? 0;
    const totalCost = solarCalculationObject.totalCost ?? 0;

    const targetPayment = bill * 0.7;
    const n = solarSavingsObject.yearLoan * 12;

    let targetMonthlyPayment =
      (totalCost * MONTHLYINTERESTRATE * Math.pow(1 + MONTHLYINTERESTRATE, n)) /
      (Math.pow(1 + MONTHLYINTERESTRATE, n) - 1);

    let monthlySavings = bill - targetPayment;
    let breakevenMonths = totalCost / monthlySavings;
    let breakevenYears = breakevenMonths / 12;

    updateSolarSavingObject(
      "targetMonthlyPayment",
      targetMonthlyPayment.toFixed(2)
    );
    updateSolarSavingObject("breakevenYears", breakevenYears.toFixed(1));
  };

  return {
    solarSavingsObject,
    solarCalculationObject,
    showCalculationError,
    showSavingError,
    solarSetupCalculation,
    loanAndSavingsCalculation,
    updateSolarCalculationObject,
    updateSolarSavingObject,
  };
};
