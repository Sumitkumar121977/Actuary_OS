class FutureSimulatorAgent:

    def __init__(self, llm):
        self.llm = llm

    def simulate(
        self,
        inflation_rate,
        claims_growth,
        years
    ):

        prompt = f"""
You are a Senior Actuarial Forecasting Expert.

Analyze the future insurance scenario using the following data:

Inflation Rate: {inflation_rate}%

Claims Growth Rate: {claims_growth}%

Projection Period: {years} years

Generate a professional report using EXACTLY these sections:

📈 Executive Summary

Provide a short overview of the future insurance environment.

⚠ Future Risk Level

Classify the risk level as:
- Low Risk
- Moderate Risk
- High Risk

Explain why.

📊 Claims Trend Forecast

Discuss how insurance claims are expected to change over the projection period.

💰 Premium Adjustment Recommendation

Suggest whether premiums should:
- Increase
- Decrease
- Remain Stable

Provide justification.

🏢 Business Impact

Explain the impact on:
- Insurance Companies
- Customers
- Profitability
- Claim Reserves

🎯 Strategic Recommendations

Provide actionable recommendations for insurers.

📌 Conclusion

Provide a final professional summary.

Requirements:
- Use professional actuarial language.
- Use bullet points where appropriate.
- Make the report detailed and easy to understand.
- Do not return JSON.
- Do not use markdown code blocks.
"""

        return self.llm.generate(prompt)