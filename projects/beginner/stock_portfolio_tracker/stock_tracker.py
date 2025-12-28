# 📊 Stock Portfolio Tracker
# A beginner-friendly project to track and analyze your stock portfolio

"""
Stock Portfolio Tracker
========================
This project helps you:
- Track your stock holdings
- Calculate portfolio value and returns
- Visualize performance
- Compare against benchmarks

Run: python stock_tracker.py
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime, timedelta

# ============================================================
# SECTION 1: Portfolio Definition
# ============================================================

# Define your portfolio (modify with your holdings)
portfolio = {
    'AAPL': {'shares': 50, 'avg_cost': 150.00},
    'GOOGL': {'shares': 20, 'avg_cost': 125.00},
    'MSFT': {'shares': 30, 'avg_cost': 350.00},
    'AMZN': {'shares': 25, 'avg_cost': 165.00},
}

# Current prices (in real app, fetch from API)
current_prices = {
    'AAPL': 185.50,
    'GOOGL': 141.80,
    'MSFT': 378.90,
    'AMZN': 178.25,
}

# ============================================================
# SECTION 2: Portfolio Calculations
# ============================================================

def calculate_portfolio_value():
    """Calculate current portfolio value and returns."""
    data = []
    
    for ticker, holdings in portfolio.items():
        shares = holdings['shares']
        avg_cost = holdings['avg_cost']
        current_price = current_prices.get(ticker, avg_cost)
        
        cost_basis = shares * avg_cost
        current_value = shares * current_price
        gain_loss = current_value - cost_basis
        return_pct = (gain_loss / cost_basis) * 100
        
        data.append({
            'Ticker': ticker,
            'Shares': shares,
            'Avg Cost': avg_cost,
            'Current Price': current_price,
            'Cost Basis': cost_basis,
            'Current Value': current_value,
            'Gain/Loss': gain_loss,
            'Return %': return_pct
        })
    
    return pd.DataFrame(data)


def portfolio_summary(df):
    """Print portfolio summary."""
    total_cost = df['Cost Basis'].sum()
    total_value = df['Current Value'].sum()
    total_gain = df['Gain/Loss'].sum()
    total_return = (total_gain / total_cost) * 100
    
    print("\n" + "=" * 60)
    print("📊 PORTFOLIO SUMMARY")
    print("=" * 60)
    print(f"\n💰 Total Cost Basis:    ${total_cost:,.2f}")
    print(f"💵 Current Value:       ${total_value:,.2f}")
    print(f"📈 Total Gain/Loss:     ${total_gain:+,.2f}")
    print(f"📊 Total Return:        {total_return:+.2f}%")
    print("\n" + "-" * 60)
    print("\n📋 HOLDINGS BREAKDOWN:\n")
    
    # Format for display
    display_df = df.copy()
    display_df['Avg Cost'] = display_df['Avg Cost'].apply(lambda x: f"${x:.2f}")
    display_df['Current Price'] = display_df['Current Price'].apply(lambda x: f"${x:.2f}")
    display_df['Cost Basis'] = display_df['Cost Basis'].apply(lambda x: f"${x:,.2f}")
    display_df['Current Value'] = display_df['Current Value'].apply(lambda x: f"${x:,.2f}")
    display_df['Gain/Loss'] = display_df['Gain/Loss'].apply(lambda x: f"${x:+,.2f}")
    display_df['Return %'] = display_df['Return %'].apply(lambda x: f"{x:+.1f}%")
    
    print(display_df.to_string(index=False))


# ============================================================
# SECTION 3: Visualization
# ============================================================

def plot_allocation(df):
    """Plot portfolio allocation pie chart."""
    fig, axes = plt.subplots(1, 2, figsize=(14, 5))
    
    # Pie chart - Allocation
    colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6']
    axes[0].pie(df['Current Value'], labels=df['Ticker'], autopct='%1.1f%%',
                colors=colors, startangle=90, explode=[0.02]*len(df))
    axes[0].set_title('Portfolio Allocation', fontsize=14, fontweight='bold')
    
    # Bar chart - Returns
    colors_bar = ['#2ecc71' if x > 0 else '#e74c3c' for x in df['Return %']]
    axes[1].bar(df['Ticker'], df['Return %'], color=colors_bar, edgecolor='black')
    axes[1].axhline(y=0, color='black', linestyle='-', linewidth=0.5)
    axes[1].set_ylabel('Return (%)')
    axes[1].set_title('Individual Stock Returns', fontsize=14, fontweight='bold')
    
    for i, (ticker, ret) in enumerate(zip(df['Ticker'], df['Return %'])):
        axes[1].annotate(f'{ret:+.1f}%', (i, ret), ha='center', 
                        va='bottom' if ret > 0 else 'top', fontsize=10)
    
    plt.tight_layout()
    plt.savefig('portfolio_analysis.png', dpi=150, bbox_inches='tight')
    print("\n📈 Chart saved as 'portfolio_analysis.png'")
    plt.show()


def plot_value_history():
    """Simulate and plot portfolio value history."""
    # Generate simulated historical data
    np.random.seed(42)
    days = 90
    dates = pd.date_range(end=datetime.now(), periods=days, freq='D')
    
    # Calculate initial portfolio value
    df = calculate_portfolio_value()
    current_value = df['Current Value'].sum()
    
    # Simulate historical values (random walk backward)
    returns = np.random.normal(0.0008, 0.012, days)[::-1]
    values = [current_value]
    for r in returns[:-1]:
        values.append(values[-1] / (1 + r))
    values = values[::-1]
    
    # Create DataFrame
    history = pd.DataFrame({'Date': dates, 'Value': values})
    history.set_index('Date', inplace=True)
    
    # Plot
    fig, ax = plt.subplots(figsize=(12, 6))
    ax.plot(history.index, history['Value'], 'b-', linewidth=2)
    ax.fill_between(history.index, history['Value'], alpha=0.3)
    
    ax.set_title('Portfolio Value (Last 90 Days)', fontsize=14, fontweight='bold')
    ax.set_ylabel('Portfolio Value ($)')
    ax.set_xlabel('Date')
    ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda x, p: f'${x:,.0f}'))
    ax.grid(True, alpha=0.3)
    
    # Add annotations
    ax.annotate(f'Current: ${current_value:,.0f}', 
                xy=(history.index[-1], current_value),
                xytext=(10, 10), textcoords='offset points',
                fontsize=12, fontweight='bold',
                arrowprops=dict(arrowstyle='->', color='black'))
    
    plt.tight_layout()
    plt.savefig('portfolio_history.png', dpi=150, bbox_inches='tight')
    print("📈 History chart saved as 'portfolio_history.png'")
    plt.show()


# ============================================================
# SECTION 4: Main Execution
# ============================================================

def main():
    """Main function to run portfolio tracker."""
    print("\n🚀 Starting Stock Portfolio Tracker...")
    
    # Calculate portfolio
    df = calculate_portfolio_value()
    
    # Show summary
    portfolio_summary(df)
    
    # Plot charts
    print("\n📊 Generating visualizations...")
    plot_allocation(df)
    plot_value_history()
    
    print("\n" + "=" * 60)
    print("✅ Analysis Complete!")
    print("=" * 60)


if __name__ == "__main__":
    main()
