# 📊 Sample Data Directory

## Overview

This directory contains **realistic sample datasets** for learning and practicing financial analysis with Python.

## 📁 Datasets

### 1. `sample_stock_prices.csv`
**5 stocks × 5 years of daily OHLCV data**

| Column | Description |
|--------|-------------|
| Date | Trading date |
| Ticker | Stock symbol |
| Open | Opening price |
| High | Daily high |
| Low | Daily low |
| Close | Closing price |
| Volume | Trading volume |

**Use for:** Price analysis, technical indicators, backtesting

### 2. `sample_portfolio.csv`
**Sample portfolio with 7 holdings**

| Column | Description |
|--------|-------------|
| Ticker | Stock symbol |
| Shares | Number of shares owned |
| AvgCost | Average cost per share |
| Sector | Market sector |
| PurchaseDate | When purchased |

**Use for:** Portfolio analysis, diversification, returns calculation

### 3. `financial_ratios.csv`
**Key financial metrics for 5 stocks**

Includes: P/E, P/B, ROE, Debt/Equity, Current Ratio, Profit Margin, Revenue Growth

**Use for:** Fundamental analysis, stock screening, valuation

### 4. `sample_options_chain.csv`
**Options chain data (calls & puts)**

Includes: Strike prices, Bid/Ask, IV, Delta, Volume

**Use for:** Options pricing, Greeks calculations, strategies

### 5. `economic_indicators.csv`
**Macro economic data (2020-2024)**

Includes: GDP Growth, Unemployment, Inflation, Interest Rates, VIX

**Use for:** Macro analysis, market correlations, forecasting

### 6. `transaction_history.csv`
**100 sample trades**

Includes: Date, Ticker, Buy/Sell, Shares, Price

**Use for:** Performance tracking, tax calculations, trading analysis

## 🔄 Generating Fresh Data

To create new sample datasets:

```bash
cd scripts
python generate_sample_data.py
```

This regenerates all files with new random data (controlled seed for reproducibility).

## 💡 Usage Examples

### Load Stock Prices
```python
import pandas as pd

df = pd.read_csv('data/sample_stock_prices.csv', parse_dates=['Date'])
aapl = df[df['Ticker'] == 'AAPL']
```

### Analyze Portfolio
```python
portfolio = pd.read_csv('data/sample_portfolio.csv')
total_value = (portfolio['Shares'] * portfolio['AvgCost']).sum()
```

### Screen Stocks
```python
ratios = pd.read_csv('data/financial_ratios.csv')
good_stocks = ratios[(ratios['ROE'] > 0.20) & (ratios['PE_Ratio'] < 30)]
```

## ⚠️ Important Notes

1. **Simulated Data**: All data is artificially generated for educational purposes
2. **Not for Trading**: Do NOT use this data for actual trading decisions
3. **Realistic Patterns**: Data mimics real market behavior but isn't real
4. **Reproducible**: Same seed generates same data every time

## 🎯 Learning Goals

Use these datasets to practice:

- ✅ Data loading and cleaning
- ✅ Exploratory data analysis
- ✅ Financial calculations
- ✅ Visualization
- ✅ Backtesting strategies
- ✅ Building complete projects

## 📚 Related Modules

| Dataset | Best Used In |
|---------|--------------|
| Stock Prices | Modules 2.2, 3.3, 5.2, 5.4 |
| Portfolio | Modules 4.3, 4.4 |
| Financial Ratios | Modules 4.1, 5.1 |
| Options | Module 4.2 |
| Economic | Modules 5.2, 5.3 |
| Transactions | Module 4.4, Projects |

## 🔄 Want Real Data?

For real market data, use:

```python
import yfinance as yf

# Download real data
apple = yf.download('AAPL', start='2020-01-01')
```

See Module 4.1 (Market Data APIs) for complete tutorial.

---

**Happy Analyzing!** 📊
