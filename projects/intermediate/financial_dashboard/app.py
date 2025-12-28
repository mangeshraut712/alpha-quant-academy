"""
📊 Financial Dashboard
======================
A Streamlit-based interactive financial dashboard

Run: streamlit run app.py
"""

import streamlit as st
import pandas as pd
import numpy as np
import plotly.graph_objects as go
import plotly.express as px
from datetime import datetime, timedelta

# Page config
st.set_page_config(
    page_title="Financial Dashboard",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS
st.markdown("""
<style>
    .main-header {
        font-size: 2.5rem;
        font-weight: 700;
        color: #1f77b4;
        margin-bottom: 0;
    }
    .sub-header {
        font-size: 1rem;
        color: #666;
        margin-top: 0;
    }
    .metric-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 1rem;
        border-radius: 10px;
        color: white;
    }
    .stMetric {
        background-color: #f8f9fa;
        padding: 1rem;
        border-radius: 10px;
    }
</style>
""", unsafe_allow_html=True)


# ============================================================
# Data Generation Functions
# ============================================================

@st.cache_data
def generate_stock_data(ticker: str, days: int = 252) -> pd.DataFrame:
    """Generate synthetic stock data."""
    np.random.seed(hash(ticker) % 2**32)
    
    dates = pd.date_range(end=datetime.now(), periods=days, freq='B')
    
    # Random walk with drift
    returns = np.random.normal(0.0005, 0.02, days)
    prices = 100 * np.exp(np.cumsum(returns))
    
    # Generate OHLCV
    df = pd.DataFrame({
        'Date': dates,
        'Open': prices * (1 + np.random.normal(0, 0.005, days)),
        'High': prices * (1 + np.abs(np.random.normal(0, 0.01, days))),
        'Low': prices * (1 - np.abs(np.random.normal(0, 0.01, days))),
        'Close': prices,
        'Volume': np.random.randint(1000000, 10000000, days)
    })
    
    df.set_index('Date', inplace=True)
    return df


def calculate_metrics(df: pd.DataFrame) -> dict:
    """Calculate key financial metrics."""
    returns = df['Close'].pct_change().dropna()
    
    return {
        'current_price': df['Close'].iloc[-1],
        'prev_close': df['Close'].iloc[-2],
        'change': df['Close'].iloc[-1] - df['Close'].iloc[-2],
        'change_pct': ((df['Close'].iloc[-1] / df['Close'].iloc[-2]) - 1) * 100,
        'annual_return': returns.mean() * 252,
        'volatility': returns.std() * np.sqrt(252),
        'sharpe': (returns.mean() * 252) / (returns.std() * np.sqrt(252)),
        'max_drawdown': ((df['Close'] / df['Close'].cummax()) - 1).min(),
        'high_52w': df['Close'].max(),
        'low_52w': df['Close'].min(),
    }


# ============================================================
# Sidebar
# ============================================================

st.sidebar.markdown("## 🎛️ Settings")

# Stock selection
tickers = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META', 'TSLA', 'NVDA']
selected_ticker = st.sidebar.selectbox("Select Stock", tickers)

# Date range
st.sidebar.markdown("### 📅 Date Range")
period = st.sidebar.radio(
    "Period",
    ["1M", "3M", "6M", "1Y"],
    horizontal=True
)

period_map = {"1M": 21, "3M": 63, "6M": 126, "1Y": 252}
days = period_map[period]

# Technical indicators
st.sidebar.markdown("### 📈 Technical Indicators")
show_sma = st.sidebar.checkbox("SMA (20, 50)", value=True)
show_bb = st.sidebar.checkbox("Bollinger Bands", value=False)
show_volume = st.sidebar.checkbox("Volume", value=True)

st.sidebar.markdown("---")
st.sidebar.markdown("### 💼 Portfolio Settings")
portfolio_value = st.sidebar.number_input(
    "Portfolio Value ($)", 
    min_value=1000, 
    max_value=10000000, 
    value=100000,
    step=10000
)

# ============================================================
# Main Content
# ============================================================

# Header
st.markdown(f'<h1 class="main-header">📊 {selected_ticker} Dashboard</h1>', unsafe_allow_html=True)
st.markdown('<p class="sub-header">Real-time stock analysis and portfolio insights</p>', unsafe_allow_html=True)

# Load data
df = generate_stock_data(selected_ticker, days)
metrics = calculate_metrics(df)

# ============================================================
# Key Metrics Row
# ============================================================

st.markdown("### 📊 Key Metrics")

col1, col2, col3, col4, col5 = st.columns(5)

with col1:
    st.metric(
        "Current Price",
        f"${metrics['current_price']:.2f}",
        f"{metrics['change_pct']:+.2f}%"
    )

with col2:
    st.metric(
        "Annual Return",
        f"{metrics['annual_return']:.1%}",
    )

with col3:
    st.metric(
        "Volatility",
        f"{metrics['volatility']:.1%}",
    )

with col4:
    st.metric(
        "Sharpe Ratio",
        f"{metrics['sharpe']:.2f}",
    )

with col5:
    st.metric(
        "Max Drawdown",
        f"{metrics['max_drawdown']:.1%}",
    )

st.markdown("---")

# ============================================================
# Charts
# ============================================================

col_chart, col_stats = st.columns([2, 1])

with col_chart:
    st.markdown("### 📈 Price Chart")
    
    # Create candlestick chart
    fig = go.Figure()
    
    # Candlestick
    fig.add_trace(go.Candlestick(
        x=df.index,
        open=df['Open'],
        high=df['High'],
        low=df['Low'],
        close=df['Close'],
        name='OHLC'
    ))
    
    # Technical indicators
    if show_sma:
        sma_20 = df['Close'].rolling(20).mean()
        sma_50 = df['Close'].rolling(50).mean()
        
        fig.add_trace(go.Scatter(
            x=df.index, y=sma_20,
            mode='lines', name='SMA 20',
            line=dict(color='orange', width=1)
        ))
        fig.add_trace(go.Scatter(
            x=df.index, y=sma_50,
            mode='lines', name='SMA 50',
            line=dict(color='purple', width=1)
        ))
    
    if show_bb:
        bb_mid = df['Close'].rolling(20).mean()
        bb_std = df['Close'].rolling(20).std()
        
        fig.add_trace(go.Scatter(
            x=df.index, y=bb_mid + 2*bb_std,
            mode='lines', name='Upper BB',
            line=dict(color='gray', width=1, dash='dash')
        ))
        fig.add_trace(go.Scatter(
            x=df.index, y=bb_mid - 2*bb_std,
            mode='lines', name='Lower BB',
            line=dict(color='gray', width=1, dash='dash'),
            fill='tonexty', fillcolor='rgba(128,128,128,0.1)'
        ))
    
    fig.update_layout(
        height=400,
        xaxis_rangeslider_visible=False,
        template='plotly_white',
        legend=dict(orientation='h', yanchor='bottom', y=1.02),
        margin=dict(l=0, r=0, t=30, b=0)
    )
    
    st.plotly_chart(fig, use_container_width=True)
    
    if show_volume:
        # Volume chart
        colors = ['#26a69a' if df['Close'].iloc[i] >= df['Open'].iloc[i] 
                  else '#ef5350' for i in range(len(df))]
        
        fig_vol = go.Figure(go.Bar(
            x=df.index, y=df['Volume'],
            marker_color=colors,
            name='Volume'
        ))
        fig_vol.update_layout(
            height=150,
            template='plotly_white',
            margin=dict(l=0, r=0, t=10, b=0),
            showlegend=False
        )
        st.plotly_chart(fig_vol, use_container_width=True)

with col_stats:
    st.markdown("### 📋 Statistics")
    
    stats_df = pd.DataFrame({
        'Metric': [
            '52-Week High',
            '52-Week Low',
            'Avg Volume',
            'Daily Return',
            'YTD Return',
        ],
        'Value': [
            f"${metrics['high_52w']:.2f}",
            f"${metrics['low_52w']:.2f}",
            f"{df['Volume'].mean()/1e6:.1f}M",
            f"{df['Close'].pct_change().mean():.3%}",
            f"{((df['Close'].iloc[-1] / df['Close'].iloc[0]) - 1):.1%}",
        ]
    })
    
    st.dataframe(stats_df, hide_index=True, use_container_width=True)
    
    st.markdown("### 📊 Return Distribution")
    
    returns = df['Close'].pct_change().dropna() * 100
    fig_hist = px.histogram(
        returns, nbins=30,
        template='plotly_white',
        labels={'value': 'Daily Return (%)'}
    )
    fig_hist.update_layout(
        height=200,
        showlegend=False,
        margin=dict(l=0, r=0, t=10, b=0)
    )
    st.plotly_chart(fig_hist, use_container_width=True)

# ============================================================
# Portfolio Analysis
# ============================================================

st.markdown("---")
st.markdown("### 💼 Portfolio Analysis")

col_port1, col_port2 = st.columns(2)

with col_port1:
    st.markdown("#### Allocation")
    
    # Simulated portfolio allocation
    allocation = pd.DataFrame({
        'Asset': ['Stocks', 'Bonds', 'Cash', 'Alternatives'],
        'Weight': [0.60, 0.25, 0.10, 0.05]
    })
    allocation['Value'] = allocation['Weight'] * portfolio_value
    
    fig_pie = px.pie(
        allocation, values='Weight', names='Asset',
        color_discrete_sequence=px.colors.qualitative.Set2
    )
    fig_pie.update_layout(height=300, margin=dict(l=0, r=0, t=30, b=0))
    st.plotly_chart(fig_pie, use_container_width=True)

with col_port2:
    st.markdown("#### Performance Comparison")
    
    # Generate comparison data
    benchmark = generate_stock_data('SPY', days)
    
    stock_norm = df['Close'] / df['Close'].iloc[0] * 100
    bench_norm = benchmark['Close'] / benchmark['Close'].iloc[0] * 100
    
    fig_comp = go.Figure()
    fig_comp.add_trace(go.Scatter(x=df.index, y=stock_norm, name=selected_ticker, line=dict(color='#1f77b4')))
    fig_comp.add_trace(go.Scatter(x=benchmark.index, y=bench_norm, name='S&P 500', line=dict(color='#ff7f0e')))
    
    fig_comp.update_layout(
        height=300,
        template='plotly_white',
        legend=dict(orientation='h', yanchor='bottom', y=1.02),
        yaxis_title='Normalized (Base=100)',
        margin=dict(l=0, r=0, t=30, b=0)
    )
    st.plotly_chart(fig_comp, use_container_width=True)

# ============================================================
# Footer
# ============================================================

st.markdown("---")
st.markdown(
    """
    <div style='text-align: center; color: #666; font-size: 0.9rem;'>
        📊 Python Finance Academy | Financial Dashboard Demo<br>
        Data is simulated for educational purposes only
    </div>
    """,
    unsafe_allow_html=True
)
