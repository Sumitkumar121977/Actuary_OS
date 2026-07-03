class ReportAgent:


 def __init__(self, llm):
    self.llm = llm

 def generate_report(
    self,
    customer_data,
    risk_analysis,
    recommendations
):

    prompt = f"""


You are a Senior Actuarial Risk Consultant working for a global insurance company.

Generate a professional, attractive, executive-level actuarial report.

Customer Data:
{customer_data}

Risk Analysis:
{risk_analysis}

Recommendations:
{recommendations}

Generate the report using EXACTLY the following structure:

══════════════════════════════
ACTUARYOS AI RISK REPORT
══════════════════════════════

# Executive Summary

Provide a brief overview of the customer's insurance risk profile.

# Customer Profile

Summarize:

* Age
* BMI
* Number of Children
* Smoking Status

# Risk Assessment

Explain:

* Risk Category
* Overall Risk Level
* Why this customer belongs to this category

# Key Risk Factors

List the major factors affecting risk:

* Age
* BMI
* Smoking
* Family Dependents
* Other relevant factors

# Recommendations

Provide actionable recommendations to reduce risk.

# Business Impact

Explain:

* Potential insurance cost implications
* Claim probability
* Long-term risk exposure

# Future Risk Outlook

Predict how the risk may change in the future.

# Conclusion

Provide a final professional assessment.

Requirements:

* Use professional actuarial language.
* Use bullet points where appropriate.
* Make the report detailed and easy to read.
* Keep sections clearly separated.
* Do not return JSON.
* Do not use markdown code blocks.
  """

  
    return self.llm.generate(prompt)
  
