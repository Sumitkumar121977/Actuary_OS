class RecommendationAgent:

    def __init__(self, llm):
        self.llm = llm

    def recommend(self, risk_analysis):

        prompt = f"""
You are an insurance recommendation specialist.

Based on this risk analysis:

{risk_analysis}

Provide:

1. Premium Recommendation
2. Monitoring Recommendation
3. Lifestyle Recommendation
4. Underwriting Recommendation

Use bullet points.
"""

        return self.llm.generate(prompt)