"""Regression test: the P/E verdict must not call expensive stocks undervalued."""

import importlib
import importlib.util
import sys
from pathlib import Path
from types import ModuleType

MODULE_PATH = Path(__file__).resolve().parents[1] / "projects/advanced/ai_stock_analyst/ai_analyst.py"


def _load():
    # The verdict is pure; stub the heavy plotting/data imports when they are absent.
    for name in ("matplotlib", "matplotlib.pyplot", "pandas", "yfinance"):
        try:
            importlib.import_module(name)
        except ImportError:
            sys.modules[name] = ModuleType(name)
    spec = importlib.util.spec_from_file_location("ai_analyst", MODULE_PATH)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def test_pe_valuation_bands():
    pe_valuation = _load().pe_valuation
    assert pe_valuation(10, 20) == "Undervalued"
    assert pe_valuation(20, 20) == "Fairly Valued"
    assert pe_valuation(28, 20) == "Fairly Valued"  # 1.4x the average was labelled Undervalued
    assert pe_valuation(40, 20) == "Overvalued"
