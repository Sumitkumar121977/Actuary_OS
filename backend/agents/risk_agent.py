class RiskAgent:

    def __init__(self, llm):
        self.llm = llm

    def analyze(self, customer_data):

        prompt = f"""
You are a senior insurance risk analyst.

Analyze the customer profile.

Customer:
{customer_data}

Provide:

Risk Level:
Risk Score:
Key Risk Factors:
Detailed Explanation:

Be professional and concise.
"""

        return self.llm.generate(prompt)