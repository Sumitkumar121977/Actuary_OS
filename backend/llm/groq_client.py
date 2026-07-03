import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

class GroqClient:

    def __init__(self):

        self.model = "llama-3.1-8b-instant"

        self.client = Groq(
            api_key=os.getenv("GROQ_API_KEY")
        )

    def generate(self, prompt):

        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return response.choices[0].message.content

    def get_model_info(self):

        return {
            "provider": "Groq",
            "model": self.model,
            "status": "Online"
        }