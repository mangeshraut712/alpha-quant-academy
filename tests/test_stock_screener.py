"""Regression tests for StockScreener's overall score."""

import importlib.util
from pathlib import Path
from types import SimpleNamespace

import pytest

MODULE_PATH = Path(__file__).resolve().parents[1] / "projects/advanced/ai_stock_analyst/advanced_features.py"


def _screener():
    spec = importlib.util.spec_from_file_location("advanced_features", MODULE_PATH)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    screener = module.StockScreener()
    screener._score_valuation = lambda info: 100.0
    screener._score_growth = lambda info: 0.0
    screener._score_financial_health = lambda info: 0.0
    screener._score_profitability = lambda info: 0.0
    screener._score_momentum = lambda info: 0.0
    return screener


def test_overall_score_applies_the_configured_weights(capsys):
    screener = _screener()

    total = screener.screen_stock("TEST", SimpleNamespace(info={}))

    # Only Valuation scores, and its configured weight is 0.25 (not an equal 0.20).
    assert total == pytest.approx(25.0)
    assert "OVERALL QUALITY SCORE" in capsys.readouterr().out
