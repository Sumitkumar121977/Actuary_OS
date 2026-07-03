from sentence_transformers import SentenceTransformer
import chromadb


class RAGAgent:

    def __init__(self, llm):

        self.llm = llm

        self.model = SentenceTransformer(
            "all-MiniLM-L6-v2"
        )

        self.client = chromadb.PersistentClient(
            path="./vectorstore/chroma_db"
        )

        self.collection = self.client.get_or_create_collection(
            name="insurance_docs"
        )

    def query(self, question):

        results = self.collection.query(
            query_texts=[question],
            n_results=3
        )

        documents = results["documents"][0]

        context = "\n".join(documents)

        question_words = question.lower().split()

        context_found = False

        for word in question_words:

            if len(word) > 3 and word in context.lower():
                context_found = True
                break

        if context_found:

            prompt = f"""
You are an AI Insurance Knowledge Assistant.

DOCUMENT CONTEXT FOUND.

Answer ONLY using the information provided in the context.

Context:
{context}

Question:
{question}

Provide:

1. Direct Answer
2. Simple Explanation
3. Important Notes

Answer:
"""

        else:

            prompt = f"""
You are an AI Assistant.

DOCUMENT CONTEXT NOT FOUND.

The user asked:

{question}

First clearly mention:

❌ This information was not found in the uploaded documents.

Then answer using your general knowledge.

Format:

❌ Context Status

🤖 General AI Answer

📘 Simple Explanation

💡 Key Points

Answer:
"""

        return self.llm.generate(prompt)