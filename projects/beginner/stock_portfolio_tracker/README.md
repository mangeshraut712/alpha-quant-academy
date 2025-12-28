# Stock Portfolio Tracker - Beginner Project

## 📋 Project Overview

Build a stock portfolio tracker that helps you monitor your investments, calculate returns, and visualize performance.

## 🎯 Learning Objectives

After completing this project, you will be able to:
- Work with Python dictionaries and lists
- Use Pandas DataFrames for data manipulation
- Create visualizations with Matplotlib
- Calculate financial metrics (returns, gains/losses)
- Format currency and percentage values

## 🛠 Prerequisites

- Module 1: Python Fundamentals
- Module 2.2: Pandas Basics
- Module 3.1: Matplotlib Basics

## 📁 Project Structure

```
stock_portfolio_tracker/
├── stock_tracker.py      # Main application
├── README.md             # This file
└── requirements.txt      # Dependencies
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pip install pandas matplotlib numpy
```

### 2. Configure Your Portfolio

Edit the `portfolio` dictionary in `stock_tracker.py`:

```python
portfolio = {
    'AAPL': {'shares': 50, 'avg_cost': 150.00},
    'GOOGL': {'shares': 20, 'avg_cost': 125.00},
    # Add more stocks...
}
```

### 3. Run the Tracker

```bash
python stock_tracker.py
```

## 📊 Features

### Current Features
- ✅ Portfolio value calculation
- ✅ Per-stock return analysis
- ✅ Allocation pie chart
- ✅ Returns bar chart
- ✅ Value history simulation

### Challenge Extensions
- [ ] Fetch real-time prices with yfinance
- [ ] Add more technical metrics (Sharpe ratio, volatility)
- [ ] Export reports to PDF
- [ ] Compare against S&P 500 benchmark
- [ ] Add dividend tracking

## 💡 Code Walkthrough

### Key Concepts Used

1. **Dictionaries** - Store portfolio data
2. **List Comprehensions** - Process data efficiently
3. **Pandas DataFrame** - Organize and display data
4. **Matplotlib** - Create professional charts
5. **String Formatting** - Display currency values

### Sample Output

```
📊 PORTFOLIO SUMMARY
============================================================

💰 Total Cost Basis:    $25,750.00
💵 Current Value:       $28,432.50
📈 Total Gain/Loss:     +$2,682.50
📊 Total Return:        +10.42%
```

## 🎯 Exercises

### Easy
1. Add a new stock to your portfolio
2. Change the chart colors

### Medium
1. Add a function to calculate portfolio beta
2. Implement a "top performer" finder

### Hard
1. Use yfinance to fetch real prices
2. Add portfolio rebalancing suggestions

## 📚 Resources

- [Pandas Documentation](https://pandas.pydata.org/docs/)
- [Matplotlib Gallery](https://matplotlib.org/stable/gallery/)
- [yfinance Library](https://github.com/ranaroussi/yfinance)
