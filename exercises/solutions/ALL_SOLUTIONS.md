# 📝 Exercise Solutions

This file contains solutions to all exercises across the curriculum.

## Module 1.1: Python Basics

### Exercise 1: Portfolio Value Calculator
```python
# Calculate portfolio value
aapl_shares = 150
aapl_price = 185.50
total_value = aapl_shares * aapl_price
print(f"Portfolio Value: ${total_value:,.2f}")
# Output: Portfolio Value: $27,825.00
```

### Exercise 2: Profit/Loss Calculator
```python
shares = 200
buy_price = 45.50
sell_price = 52.30

# Calculate
total_cost = shares * buy_price
total_revenue = shares * sell_price
profit_loss = total_revenue - total_cost
return_pct = (profit_loss / total_cost) * 100

print(f"Total Cost: ${total_cost:,.2f}")
print(f"Total Revenue: ${total_revenue:,.2f}")
print(f"Profit/Loss: ${profit_loss:+,.2f}")
print(f"Return: {return_pct:+.2f}%")
```

### Exercise 3: Trading Signal Generator
```python
rsi = 28
current_price = 145.00
ma_50 = 150.00
ma_200 = 140.00

# Determine signals
buy_signal = (rsi < 30) and (current_price < ma_50)
sell_signal = (rsi > 70) or (current_price > ma_200)

if buy_signal:
    print("🟢 BUY SIGNAL")
elif sell_signal:
    print("🔴 SELL SIGNAL")
else:
    print("🟡 HOLD")
```

---

## Module 1.2: Data Structures

### Exercise 1: Watchlist Manager
```python
# Create watchlist
watchlist = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA']

# Add 2 stocks
watchlist.extend(['NVDA', 'META'])

# Remove 1 stock
watchlist.remove('TSLA')

# Print sorted
sorted_list = sorted(watchlist)
print(f"Sorted Watchlist: {sorted_list}")

# Check for AAPL
if 'AAPL' in watchlist:
    print("✓ AAPL is in your watchlist")
```

### Exercise 2: Stock Information Dictionary
```python
stock = {
    'ticker': 'AAPL',
    'price': 185.50,
    'pe_ratio': 28.5,
    'sector': 'Technology'
}

# Print all keys
print(f"Keys: {list(stock.keys())}")

# Add dividend yield
stock['dividend_yield'] = 0.0045

# Calculate market cap
shares_outstanding = 10_000_000_000
market_cap = stock['price'] * shares_outstanding
stock['market_cap'] = market_cap

print(f"Market Cap: ${market_cap/1e9:.2f}B")
```

### Exercise 3: Portfolio Analysis
```python
portfolio_1 = {'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB'}
portfolio_2 = {'AAPL', 'TSLA', 'NVDA', 'AMZN', 'AMD'}

# Common holdings
common = portfolio_1 & portfolio_2
print(f"Common: {common}")
# Output: {'AAPL', 'AMZN'}

# Unique to portfolio 1
unique = portfolio_1 - portfolio_2
print(f"Unique to P1: {unique}")
# Output: {'GOOGL', 'MSFT', 'FB'}

# All stocks
all_stocks = portfolio_1 | portfolio_2
print(f"All stocks: {all_stocks}")
```

---

## Module 2.1: NumPy Essentials

### Exercise: Calculate VaR
```python
import numpy as np

portfolio_value = 1_000_000
returns = np.random.normal(0.0005, 0.015, 252)

# Calculate 95% VaR
var_95 = np.percentile(returns, 5)
dollar_var = abs(var_95 * portfolio_value)

print(f"1-day 95% VaR: {var_95:.4f}")
print(f"Dollar VaR: ${dollar_var:,.0f}")

# Interpretation
print(f"\\nWith 95% confidence, worst daily loss won't exceed ${dollar_var:,.0f}")
```

---

## Module 2.2: Pandas Mastery

### Exercise: Stock Analysis
```python
import pandas as pd
import numpy as np

# Create sample data
dates = pd.date_range('2024-01-01', periods=12, freq='ME')
prices = 100 * np.exp(np.cumsum(np.random.normal(0.01, 0.05, 12)))

df = pd.DataFrame({'Price': prices}, index=dates)

# Calculate returns
df['Returns'] = df['Price'].pct_change()

# Find best month
best_month = df['Returns'].idxmax()
best_return = df['Returns'].max()

print(f"Best performing month: {best_month.strftime('%B %Y')}")
print(f"Return: {best_return:.2%}")
```

---

## Module 4.1: Market Data APIs

### Exercise: Sector Comparison
```python
import yfinance as yf
import pandas as pd

# Download data for different sectors
tickers = {
    'Technology': 'AAPL',
    'Healthcare': 'JNJ',
    'Finance': 'JPM',
    'Energy': 'XOM',
    'Consumer': 'PG'
}

results = []
for sector, ticker in tickers.items():
    stock = yf.Ticker(ticker)
    hist = stock.history(period='1y')
    
    annual_return = (hist['Close'][-1] / hist['Close'][0] - 1) * 100
    volatility = hist['Close'].pct_change().std() * np.sqrt(252) * 100
    
    results.append({
        'Sector': sector,
        'Ticker': ticker,
        'Annual Return': f"{annual_return:.2f}%",
        'Volatility': f"{volatility:.2f}%"
    })

df = pd.DataFrame(results)
print(df.to_string(index=False))
```

---

## Module 4.2: Options Pricing

### Exercise: Monte Carlo Option Pricing
```python
import numpy as np

# Parameters
S0 = 100  # Current price
K = 100   # Strike
T = 1     # 1 year
r = 0.05  # Risk-free rate
sigma = 0.20  # Volatility
n_sims = 100000

# Simulate final stock prices
np.random.seed(42)
Z = np.random.standard_normal(n_sims)
ST = S0 * np.exp((r - 0.5*sigma**2)*T + sigma*np.sqrt(T)*Z)

# Calculate call payoffs
payoffs = np.maximum(ST - K, 0)

# Discount to present value
call_price = np.exp(-r*T) * np.mean(payoffs)

print(f"Monte Carlo Call Price: ${call_price:.2f}")
print(f"Standard Error: ${np.std(payoffs)/np.sqrt(n_sims):.4f}")
```

---

## Module 4.3: Portfolio Optimization

### Exercise: Add Constraints
```python
from scipy.optimize import minimize
import numpy as np

# Add max 50% constraint per asset
def neg_sharpe_constrained(weights):
    return -sharpe_ratio(weights, expected_returns, cov_matrix)

# Constraints
constraints = [
    {'type': 'eq', 'fun': lambda x: np.sum(x) - 1},  # Sum to 1
]

# Bounds: 0% to 50% per asset
bounds = tuple((0, 0.50) for _ in range(n_assets))

result = minimize(
    neg_sharpe_constrained,
    initial_weights,
    method='SLSQP',
    bounds=bounds,
    constraints=constraints
)

optimal_weights = result.x
print("Optimal Allocation (Max 50% per asset):")
for asset, weight in zip(assets, optimal_weights):
    print(f"  {asset}: {weight:.1%}")
```

---

## Module 4.4: Risk Metrics

### Exercise: Multi-Period VaR
```python
import numpy as np

# 1-day VaR
var_1day = 0.025  # 2.5%
portfolio_value = 1_000_000

# 10-day VaR using square root of time rule
holding_period = 10
var_10day = var_1day * np.sqrt(holding_period)

dollar_var_1day = abs(var_1day * portfolio_value)
dollar_var_10day = abs(var_10day * portfolio_value)

print(f"1-day 95% VaR: {var_1day:.2%} (${dollar_var_1day:,.0f})")
print(f"10-day 95% VaR: {var_10day:.2%} (${dollar_var_10day:,.0f})")
print(f"\\nScaling factor: {np.sqrt(holding_period):.2f}x")
```

---

## Module 5.1: ML Fundamentals

### Exercise: Cross-Validation
```python
from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestClassifier

# Use the same data from the module
clf = RandomForestClassifier(n_estimators=100, random_state=42)

# 5-fold cross-validation
scores = cross_val_score(clf, X_train_c_scaled, y_train_c, cv=5)

print("Cross-Validation Scores:")
print(f"  Folds: {scores}")
print(f"  Mean: {scores.mean():.4f}")
print(f"  Std: {scores.std():.4f}")
print(f"  95% CI: [{scores.mean() - 2*scores.std():.4f}, {scores.mean() + 2*scores.std():.4f}]")
```

---

## Module 5.2: Time Series Forecasting

### Exercise: Rolling Forecast
```python
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

# Initialize
window_size = int(len(ts) * 0.8)
predictions = []
actuals = []

# Rolling forecast
for i in range(window_size, len(ts)):
    # Train on data up to point i
    train = ts[:i]
    
    # Fit model
    model = ARIMA(train, order=(5, 1, 2))
    fit = model.fit()
    
    # Forecast 1 step ahead
    forecast = fit.forecast(steps=1)[0]
    predictions.append(forecast)
    actuals.append(ts.iloc[i])

# Evaluate
predictions = pd.Series(predictions, index=ts.index[window_size:])
actuals = pd.Series(actuals, index=ts.index[window_size:])

mae = (predictions - actuals).abs().mean()
print(f"Rolling Forecast MAE: {mae:.2f}")
```

---

## Module 5.4: Algorithmic Trading

### Exercise: RSI Strategy
```python
import numpy as np
import pandas as pd

# Calculate RSI
def calculate_rsi(prices, period=14):
    delta = prices.diff()
    gain = delta.where(delta > 0, 0).rolling(period).mean()
    loss = -delta.where(delta < 0, 0).rolling(period).mean()
    rs = gain / loss
    return 100 - (100 / (1 + rs))

# Apply to data
df['RSI'] = calculate_rsi(df['Close'])

# Generate signals
df['RSI_Signal'] = 0
df.loc[df['RSI'] < 30, 'RSI_Signal'] = 1   # Buy
df.loc[df['RSI'] > 70, 'RSI_Signal'] = -1  # Sell

# Backtest
df['RSI_Position'] = df['RSI_Signal'].shift(1)
df['RSI_Returns'] = df['RSI_Position'] * df['Returns']
df['RSI_Cumulative'] = (1 + df['RSI_Returns'].fillna(0)).cumprod()

# Performance
total_return = (df['RSI_Cumulative'].iloc[-1] - 1) * 100
print(f"RSI Strategy Total Return: {total_return:.2f}%")

# Compare to buy & hold
bh_return = (df['Buy_Hold'].iloc[-1] - 1) * 100
print(f"Buy & Hold Return: {bh_return:.2f}%")
```

---

## Tips for Using Solutions

1. **Try First**: Always attempt exercises before checking solutions
2. **Understand**: Don't just copy - understand each line
3. **Modify**: Try changing parameters to see different results
4. **Combine**: Mix techniques from different solutions
5. **Extend**: Add your own features to make it better

---

**Keep Learning!** 🚀
