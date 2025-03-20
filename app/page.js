"use client";

import { useReducer } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

function reducer(state, action) {
  const getExchangeRate = (fromUnit, toUnit) => toUnit / fromUnit;

  const handleUnitChange = (unitType, action, state) => {
    const otherUnitType = unitType === "fromUnit" ? "toUnit" : "fromUnit";
    const otherAmountType =
      unitType === "fromAmount" ? "toAmount" : "fromAmount";
    const exchangeRate = getExchangeRate(state[otherUnitType], action.payload);

    if (state[otherAmountType]) {
      const newAmount = (state[otherAmountType] * exchangeRate).toFixed(8);
      return {
        ...state,
        [unitType]: action.payload,
        exchangeRate,
        [unitType === "fromUnit" ? "fromAmount" : "toAmount"]: newAmount,
      };
    }

    return {
      ...state,
      [unitType]: action.payload,
      exchangeRate,
    };
  };

  switch (action.type) {
    case "setFromUnit":
      return state.toUnit
        ? handleUnitChange("fromUnit", action, state)
        : { ...state, fromUnit: action.payload };

    case "setToUnit":
      return state.fromUnit
        ? handleUnitChange("toUnit", action, state)
        : { ...state, toUnit: action.payload };

    case "setFromAmount":
      return state.exchangeRate
        ? {
            ...state,
            fromAmount: action.payload,
            toAmount: (action.payload * state.exchangeRate).toFixed(8),
          }
        : { ...state, fromAmount: action.payload };

    case "setToAmount":
      return state.exchangeRate
        ? {
            ...state,
            toAmount: action.payload,
            fromAmount: (action.payload * (1 / state.exchangeRate)).toFixed(8),
          }
        : { ...state, toAmount: action.payload };

    default:
      return state;
  }
}

export default function CurrencyConverter() {
  const [{ fromUnit, toUnit, exchangeRate, fromAmount, toAmount }, dispatch] =
    useReducer(reducer, {
      fromUnit: 1,
      toUnit: 10,
      exchangeRate: 0,
      fromAmount: 0,
      toAmount: 0,
    });

  return (
    <div className="m-5">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Currency Converter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fromAmount">From</Label>
              <Input
                id="fromUnit"
                value={fromUnit}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*\.?\d*$/.test(value)) {
                    dispatch({ type: "setFromUnit", payload: value });
                  }
                }}
                placeholder="Enter amount"
                inputMode="decimal"
                pattern="\d*\.?\d*"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="toAmount">To</Label>
              <Input
                id="toUnit"
                value={toUnit}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*\.?\d*$/.test(value)) {
                    dispatch({ type: "setToUnit", payload: value });
                  }
                }}
                placeholder="Enter amount"
                inputMode="decimal"
                pattern="\d*\.?\d*"
              />
            </div>

            <>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex flex-col items-center flex-grow flex-shrink basis-0">
                    <p className="font-medium">From {"->"} To</p>
                    <p className="text-sm text-muted-foreground">
                      1 = {exchangeRate.toFixed(8)}
                    </p>
                  </div>
                  <div className="flex flex-col items-center flex-grow flex-shrink basis-0">
                    <p className="font-medium">To {"->"} From</p>
                    <p className="text-sm text-muted-foreground">
                      1 = {(1 / exchangeRate).toFixed(8)}
                    </p>
                  </div>
                </div>
              </div>

              <hr />

              <div className="space-y-2">
                <Label htmlFor="fromAmount">From Amount</Label>
                <Input
                  id="fromAmount"
                  value={fromAmount}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*\.?\d*$/.test(value) && exchangeRate) {
                      dispatch({ type: "setFromAmount", payload: value });
                    }
                  }}
                  placeholder="Enter amount"
                  inputMode="decimal"
                  pattern="\d*\.?\d*"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="toAmount">To Amount</Label>
                <Input
                  id="toAmount"
                  value={toAmount}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*\.?\d*$/.test(value) && exchangeRate) {
                      dispatch({ type: "setToAmount", payload: value });
                    }
                  }}
                  placeholder="Enter amount"
                  inputMode="decimal"
                  pattern="\d*\.?\d*"
                />
              </div>
            </>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
