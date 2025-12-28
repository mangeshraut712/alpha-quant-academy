"""
Generate Sample Financial Data
================================
This script creates realistic sample datasets for the curriculum.
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta

np.random.seed(42)

# ============================================================
# 1. Stock Prices Dataset
# ============================================================

def generate_stock_prices(ticker, start_date='2020-01-01', periods=1260):
    """Generate realistic stock price data."""
    dates = pd.date_range(start=start_date, periods=periods, freq='B')
    
    # Random walk with drift
    returns = np.random.normal(0.0005, 0.015, periods)
    prices = 100 * np.exp(np.cumsum(returns))
    
    # Generate OHLCV
    df = pd.DataFrame({
        'Date': dates,
        'Open': prices * (1 + np.random.normal(0, 0.005, periods)),
        'High': prices * (1 + np.abs(np.random.normal(0, 0.01, periods))),
        'Low': prices * (1 - np.abs(np.random.normal(0, 0.01, periods))),
        'Close': prices,
        'Volume': np.random.randint(1000000, 10000000, periods)
    })
    
    df['Ticker'] = ticker
    return df

# Generate for multiple stocks
tickers = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA']
all_stocks = pd.concat([generate_stock_prices(t) for t in tickers])
all_stocks.to_csv('../data/sample_stock_prices.csv', index=False)
print("✅ Created: data/sample_stock_prices.csv")

# ============================================================
# 2. Portfolio Holdings Dataset
# ============================================================

portfolio_data = pd.DataFrame({
    'Ticker': ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'NVDA', 'META'],
    'Shares': [50, 20, 30, 25, 15, 40, 18],
    'AvgCost': [150.00, 125.00, 350.00, 165.00, 220.00, 280.00, 310.00],
    'Sector': ['Technology', 'Technology', 'Technology', 'Consumer', 'Automotive', 'Technology', 'Technology'],
    'PurchaseDate': pd.to_datetime(['2022-01-15', '2022-02-20', '2021-11-05', '2022-03-10', 
                                     '2021-12-01', '2022-04-15', '2022-05-20'])
})
portfolio_data.to_csv('../data/sample_portfolio.csv', index=False)
print("✅ Created: data/sample_portfolio.csv")

# ============================================================
# 3. Financial Ratios Dataset
# ============================================================

financial_ratios = pd.DataFrame({
    'Ticker': ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'],
    'PE_Ratio': [28.5, 24.3, 34.2, 58.1, 52.4],
    'PB_Ratio': [45.2, 6.1, 11.8, 12.3, 15.2],
    'ROE': [1.472, 0.291, 0.442, 0.185, 0.234],
    'DebtToEquity': [1.96, 0.09, 0.41, 0.71, 0.32],
    'CurrentRatio': [0.93, 2.46, 1.78, 1.09, 1.52],
    'ProfitMargin': [0.256, 0.214, 0.369, 0.053, 0.152],
    'RevenueGrowth': [0.085, 0.112, 0.067, 0.095, 0.238]
})
financial_ratios.to_csv('../data/financial_ratios.csv', index=False)
print("✅ Created: data/financial_ratios.csv")

# ============================================================
# 4. Options Chain Dataset
# ============================================================

strike_prices = np.arange(80, 121, 5)
options_data = []

for strike in strike_prices:
    # Call options
    options_data.append({
        'Type': 'Call',
        'Strike': strike,
        'Bid': max(0.05, 100 - strike + np.random.uniform(-2, 2)),
        'Ask': max(0.10, 100 - strike + np.random.uniform(-1, 3)),
        'IV': 0.25 + np.random.uniform(-0.05, 0.05),
        'Delta': max(0, min(1, 0.5 + (100-strike)/50)),
        'Volume': np.random.randint(0, 5000)
    })
    
    # Put options
    options_data.append({
        'Type': 'Put',
        'Strike': strike,
        'Bid': max(0.05, strike - 100 + np.random.uniform(-2, 2)),
        'Ask': max(0.10, strike - 100 + np.random.uniform(-1, 3)),
        'IV': 0.25 + np.random.uniform(-0.05, 0.05),
        'Delta': min(0, max(-1, -0.5 + (100-strike)/50)),
        'Volume': np.random.randint(0, 5000)
    })

options_df = pd.DataFrame(options_data)
options_df.to_csv('../data/sample_options_chain.csv', index=False)
print("✅ Created: data/sample_options_chain.csv")

# ============================================================
# 5. Economic Indicators Dataset
# ============================================================

dates = pd.date_range('2020-01-01', '2024-12-31', freq='ME')
economic_data = pd.DataFrame({
    'Date': dates,
    'GDP_Growth': np.random.normal(2.5, 1.0, len(dates)),
    'Unemployment': np.maximum(3.5, 10 - np.linspace(0, 6, len(dates)) + np.random.normal(0, 0.3, len(dates))),
    'Inflation': np.maximum(0, 2 + np.random.normal(0, 1.5, len(dates))),
    'Interest_Rate': np.maximum(0, 5 - np.linspace(0, 4, len(dates)) + np.random.normal(0, 0.2, len(dates))),
    'VIX': np.maximum(10, 20 + np.random.normal(0, 5, len(dates)))
})
economic_data.to_csv('../data/economic_indicators.csv', index=False)
print("✅ Created: data/economic_indicators.csv")

# ============================================================
# 6. Transaction History
# ============================================================

transactions = []
for _ in range(100):
    transactions.append({
        'Date': datetime(2024, 1, 1) + timedelta(days=np.random.randint(0, 365)),
        'Ticker': np.random.choice(['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA']),
        'Type': np.random.choice(['Buy', 'Sell']),
        'Shares': np.random.randint(10, 100),
        'Price': np.random.uniform(100, 400),
        'Commission': 0
    })

transactions_df = pd.DataFrame(transactions).sort_values('Date')
transactions_df.to_csv('../data/transaction_history.csv', index=False)
print("✅ Created: data/transaction_history.csv")

print("\n✅ All sample datasets created successfully!")
print("\nDatasets available:")
print("  1. sample_stock_prices.csv - 5 stocks, 5 years of data")
print("  2. sample_portfolio.csv - Sample portfolio holdings")
print("  3. financial_ratios.csv - Key financial metrics")
print("  4. sample_options_chain.csv - Options chain data")
print("  5. economic_indicators.csv - Macro economic data")
print("  6. transaction_history.csv - Trading history")
