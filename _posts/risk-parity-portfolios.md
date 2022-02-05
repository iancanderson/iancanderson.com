---
title: "Risk parity portfolios"
date: "2022-02-04T12:00:00.000Z"
---

_Disclaimer: I am not a financial advisor. Do not take anything I say or write as financial advice, ever._

## Free lunch?

From what I can tell, there aren't a lot of "free lunches" in investing. Either you take more risk and get rewarded (with a lot of volatility in the meantime), or you take less risk and get lower returns with less volatility. It turns out, risk-parity portfolios can kind of get you a free lunch: more reward with the same risk as a more "standard" portfolio (or less risk with the same reward).

## Risk parity?

I first heard about risk parity from Frank Vasquez when he was a [guest on the Choose FI podcast](https://www.choosefi.com/are-you-as-diversified-as-you-think-you-are-with-frank-vasquez-ep-313/). Since then I've really been enjoying his [Risk Parity Radio podcast](https://www.riskparityradio.com).

The general idea of risk parity is to reduce risk without reducing expected returns, by investing in several uncorrelated assets.

In this context "uncorrelated" can mean either asset with negative correlation (e.g. stocks vs treasury bonds) or assets with near-zero correlation (e.g. stocks vs gold).

The most common asset classes in these portfolios are:

- Stocks (index funds / ETFs)
- Long-term treasury bonds (government bonds)
- Gold (ETFs)

## Correlations

Here are the correlations between each asset class vs the total US stock market since 1987:

### Total stock market: 1.00

Right. The total stock market is perfectly correlated with itself, so it's ratio is 1.00.

### Long term treasury bonds: -0.14

Long term treasury bonds are the most negatively correlated with stocks. This means that when stocks tank, long term treasury bonds will generally rise as investors look for safety.

### Total US bond market: 0.07

The total US bond market includes both government bonds and corporate bonds. Corporate bonds generally rise and fall with stocks, so they're not as useful as government bonds for the purpose of reducing correlation between portfolio assets.

### Gold: -0.02

Gold generally has zero-ish correlation with stocks. You can think of gold as kind of "doing its own thing" in relation to stocks and bonds.

## The 60/40

The "60/40" portfolio has become a kind of standard relatively consersative portfolio, consisting of 60% total stock market and 40% total bond market.

Let's compare the performance of the 60/40 portfolio with a portfolio with less-correlated assets:

- 50% total stock market
- 30% long term treasury bonds
- 20% gold

I ran a backtest on portfolio visualizer to analyze the [performance of each portfolio since 1987](https://www.portfoliovisualizer.com/backtest-asset-class-allocation?s=y&mode=1&timePeriod=4&startYear=1972&firstMonth=1&endYear=2022&lastMonth=12&calendarAligned=true&includeYTD=false&initialAmount=10000&annualOperation=0&annualAdjustment=0&inflationAdjusted=true&annualPercentage=0.0&frequency=4&rebalanceType=1&absoluteDeviation=5.0&relativeDeviation=25.0&leverageType=0&leverageRatio=0.0&debtAmount=0&debtInterest=0.0&maintenanceMargin=25.0&leveragedBenchmark=false&portfolioNames=true&portfolioName1=60%2F40&portfolioName2=50%2F30%2F20+stocks%2FLTT%2Fgold&asset1=TotalStockMarket&allocation1_1=60&allocation1_2=50&asset2=TotalBond&allocation2_1=40&asset3=SmallCapValue&asset4=ShortTreasury&asset5=LongTreasury&allocation5_2=30&asset6=Gold&allocation6_2=20).

### CAGR

The compound annual growth rates for the 2 portfolios were:

- 60/40: 9.09%
- 50/30/20: 9.14%

Almost exactly the same returns, even with 10% fewer stocks.

### Best year

- 60/40: 28.74%
- 50/30/20: 27.12%

Pretty close!

### Worst year

Here's where things get interesting.

- 60/40: -20.20%
- 50/30/20: -10.78%

In the worst year, the 50/30/20 portfolio's losses were about half compared to the 60/40 portfolio! Roughly equivalent returns over time, with much less downside. Enjoy that free lunch!

The Sortino Ratio and the Sharpe Ratio were both higher for the 50/30/20 portfolio, which makes sense because these ratios measure the returns of the portfolios in comparison to their risk/downsides.

## Matching the total stock market returns with less volatility

"60/40, you say? That's for retirees, right? What if I'm young and willing to tolerate more risk?"

Risk parity portfolios can also match the returns of the total stock market with less volatility and drawdowns.

This usually happens via leverage / margin. For example, we can keep the same relative proportions in the 50/30/20 portfolio, but add leverage so that the effective exposure of the portfolio is 120% instead of 100%.

Here's what that could look like:

- 60% total stock market
- 36% long term treasury bonds
- 24% gold
- -20% cash (this represents the leverage to make the portfolio add up to 100%)

We should expect higher returns of the leveraged portfolio compared to the 50/30/20 portfolio. Let's compare this leveraged portfolio with a straight 100% total stock market allocation.

[Portfolio visualizer analysis since 2004](https://www.portfoliovisualizer.com/backtest-portfolio?s=y&timePeriod=4&startYear=1985&firstMonth=1&endYear=2022&lastMonth=12&calendarAligned=true&includeYTD=false&initialAmount=10000&annualOperation=0&annualAdjustment=0&inflationAdjusted=true&annualPercentage=0.0&frequency=4&rebalanceType=1&absoluteDeviation=5.0&relativeDeviation=25.0&leverageType=0&leverageRatio=0.0&debtAmount=0&debtInterest=0.0&maintenanceMargin=25.0&leveragedBenchmark=false&reinvestDividends=true&showYield=false&showFactors=false&factorModel=3&portfolioNames=false&portfolioName1=Portfolio+1&portfolioName2=Portfolio+2&portfolioName3=Portfolio+3&symbol1=VTSAX&allocation1_1=100&allocation1_2=60&symbol2=TLT&allocation2_2=36&symbol3=GLD&allocation3_2=24&symbol4=CASHX&allocation4_2=-20)

### CAGR

The compound annual growth rates for the 2 portfolios were:

- 100% stock: 10.25%
- 60/36/24/-20: 11.14%

We did it! Higher returns than the stock market.

### Best year

- 100% stock: 33.52%
- 60/36/24/-20: 27.39%

The highs aren't as high, but still pretty darn good.

### Worst year

Again, here's where these portfolios shine.

- 100% stock: -50.84%
- 60/36/24/-20: -22.26%

As before, the risk parity portfolio has average returns that match (or exceed) the comparison portfolio. But in the worst year, the downside is _less than half_. A 50% loss in your portfolio is pretty scary, and can tempt you to do drastic (and suboptimal) things like selling out of stocks while they're low, and missing the inevitable comeback.

Again, the Sortino and Sharpe ratios are much higher for the risk parity portfolio, indicative of the similar returns with less risk.

### Leverage? How?

The easiest way to get a leveraged portfolio is to buy ETFs that have leverage built-in.

- `UPRO` is an ETF that is a 3x leveraged S&P 500 fund. This means that when the S&P 500 rises or falls by a given percentage, `UPRO` will move in the same direction, but 3x as much.
- `TMF` is an ETF that is a 3x leveraged long-term treasury bond fund. This means that when the long-term treasury bond market rises or falls by a given percentage, `TMF` will move in the same direction, but 3x as much.

An example portfolio that recently made some waves in financial forums is called "Hedgefundie's Excellent Adventure." It's comprised completely of `UPRO` and `TMF`, the most recent rendition being 55% in `UPRO` and 45% in `TMF`.

The backtesting results are impressive to say the least, with a ~16.7% annual return since 1987, compared to 9.87% for the S&P 500, all while maintaining similar downside to the S&P500. See this article for a summary and backtest of the hedgefunie's excellent adventure portfolio: [HEDGEFUNDIE’s Excellent Adventure (UPRO/TMF) – A Summary](https://www.optimizedportfolio.com/hedgefundie-adventure/). This is an experimental portfolio. I don't think I'd actually go for this for my main portfolio, but it's a good illustration for how leverage can be used to make a portfolio more efficient.

## Conclusion

Stocks are great, but they're volatile and scary if they're all you have. Use some gold and long term treasuries to diversify your portfolio, and consider leverage to get even better returns while keeping volatility relatively low.

### Further reading / listening

- https://www.riskparityradio.com
- https://www.riskparityradio.com/portfolios
- https://portfoliocharts.com/2015/09/22/catching-a-golden-butterfly/
- https://portfoliocharts.com/2016/04/18/the-theory-behind-the-golden-butterfly/
- https://www.investopedia.com/terms/r/risk-parity.asp
