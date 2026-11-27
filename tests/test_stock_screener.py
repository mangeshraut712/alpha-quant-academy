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


def test_a_new_category_is_weighted_from_one_table(capsys):
    """A category is one row: display name, weight key and scorer together.

    Regression: the weights were copied key by key into a renamed dict, so a
    category added to ``scoring_weights`` and ``scores`` but not to that copy
    raised ``KeyError`` in the middle of a screening.
    """
    screener = _screener()
    screener.scoring_weights["sentiment"] = 0.5
    screener._score_sentiment = lambda info: 100.0
    screener._score_valuation = lambda info: 0.0

    with pytest.MonkeyPatch.context() as patch:
        patch.setattr(
            screener,
            "categories",
            screener.categories + (("Sentiment", "sentiment", "_score_sentiment"),),
        )
        total = screener.screen_stock("TEST", SimpleNamespace(info={}))

    # Sentiment scores 100 at weight 0.5; every other category scores 0.
    assert total == pytest.approx(50.0)
    assert "Sentiment" in capsys.readouterr().out


def test_every_category_has_a_weight_and_a_scorer():
    """The category table and ``scoring_weights`` must not drift apart."""
    screener = _screener()

    for display_name, weight_key, scorer_name in screener.categories:
        assert weight_key in screener.scoring_weights, f"{display_name}: no weight for {weight_key!r}"
        assert callable(getattr(screener, scorer_name, None)), f"{display_name}: no scorer {scorer_name!r}"
