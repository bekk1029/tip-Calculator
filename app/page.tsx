"use client";
import { useState } from "react";

export default function Home() {
  const [bill, setbill] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [result, setResult] = useState({
    tipAmount: 0,
    totalPerPerson: 0,
    total: 0,
  });
  const [isSplitting, setIsSplitting] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [error, setError] = useState("");

  const percentageButtonValues = [5, 10, 15, 20, 25, 30];

  const calculateTip = () => {
    if (!bill || bill <= 0) {
      setError("Please enter bill amount");
      return;
    }

    if (!percentage) {
      setError("Please select tip percentage!");
      return;
    }

    if (isSplitting && numberOfPeople <= 0) {
      setError("Number of people must be at least 1");
      return;
    }

    setError("");

    const tipAmount = bill * (percentage / 100);
    const total = bill + tipAmount;
    const totalPerPerson = total / numberOfPeople;

    setResult({ tipAmount, totalPerPerson, total });
  };

  const resetCalculator = () => {
    setbill(0);
    setPercentage(0);
    setResult({
      tipAmount: 0,
      totalPerPerson: 0,
      total: 0,
    });
    setIsSplitting(false);
    setNumberOfPeople(1);
  };

  return (
    <div className="website-container">
      <h1 className="text-white font-bold text-2xl">MINI Tip Calculator</h1>
      <div className="tip-calculator-container">
        <div className="left-container">
          <label htmlFor="">Bill Amount</label>
          <input
            type="number"
            value={bill || ""}
            onChange={(e) => setbill(Number(e.target.value))}
          />
          {error && <p className="error-tooltip">{error}</p>}

          <label htmlFor="">Tip Percentage</label>
          <div className="percentage-buttons">
            {percentageButtonValues.map((value) => (
              <button
                className={`${value === percentage && "selected-button"}`}
                key={value}
                onClick={() => setPercentage(value)}
              >
                {value}%
              </button>
            ))}
          </div>

          <div>
            <label className="splitting-checkbox">
              <input
                type="checkbox"
                checked={isSplitting}
                onChange={(e) => setIsSplitting(e.target.checked)}
              />
              Split the bill
            </label>
          </div>

          {isSplitting && (
            <div>
              <label htmlFor="">Number of People</label>
              <input
                type="number"
                min={1}
                value={numberOfPeople || ""}
                onChange={(e) => setNumberOfPeople(Number(e.target.value))}
              />
            </div>
          )}

          <button className="calculate-button" onClick={calculateTip}>
            Calculate
          </button>
        </div>
        <div className="right-container">
          <div className="result-container">
            <p>Tip</p>
            <p className="result-value">${result.tipAmount.toFixed(2)}</p>
          </div>

          {isSplitting && (
            <div className="result-container">
              <p>Bill Per Person</p>
              <p className="result-value">
                $
                {isFinite(result.totalPerPerson)
                  ? result.totalPerPerson.toFixed(2)
                  : "0.00"}
              </p>
            </div>
          )}
          <div className="result-container">
            <p>Total Bill</p>
            <p className="result-value">${result.total.toFixed(2)}</p>
          </div>

          <button className="reset-button" onClick={resetCalculator}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
