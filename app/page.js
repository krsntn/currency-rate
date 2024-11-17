"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function CurrencyConverter() {
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(10);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExchangeRate = () => {
      try {
        setExchangeRate(toAmount / fromAmount);
        setError("");
      } catch (err) {
        setError("Something went wrong. Please try again.");
      }
    };

    if (fromAmount && toAmount) {
      fetchExchangeRate();
    }
  }, [fromAmount, toAmount]);

  return (
    <Card className="w-full max-w-md mx-auto mt-5">
      <CardHeader>
        <CardTitle>Currency Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fromAmount">From</Label>
            <Input
              id="fromAmount"
              value={fromAmount}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  setFromAmount(value);
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
              id="toAmount"
              value={toAmount}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  setToAmount(value);
                }
              }}
              placeholder="Enter amount"
              inputMode="decimal"
              pattern="\d*\.?\d*"
            />
          </div>

          {error ? (
            <p className="text-red-500" role="alert">
              {error}
            </p>
          ) : (
            <div className="flex justify-between">
              <div className="flex flex-col items-center flex-grow flex-shrink basis-0">
                <p className="font-medium">From {"->"} To</p>
                <p className="text-sm text-muted-foreground">
                  1 = {exchangeRate.toFixed(4)}
                </p>
              </div>
              <div className="flex flex-col items-center flex-grow flex-shrink basis-0">
                <p className="font-medium">To {"->"} From</p>
                <p className="text-sm text-muted-foreground">
                  1 = {(1 / exchangeRate).toFixed(4)}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
