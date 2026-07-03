from pypdf import PdfReader
import chromadb

# Create Chroma DB
client = chromadb.PersistentClient(
    path="./vectorstore/chroma_db"
)

collection = client.get_or_create_collection(
    name="insurance_docs"
)

# Read PDF
reader = PdfReader(
    "documents/insurance_policy.pdf"
)

text = ""

for page in reader.pages:
    page_text = page.extract_text()

    if page_text:
        text += page_text + "\n"

# Create chunks
chunks = [
    text[i:i+500]
    for i in range(0, len(text), 500)
]

# Store chunks
for idx, chunk in enumerate(chunks):
    collection.add(
        documents=[chunk],
        ids=[str(idx)]
    )

print("Documents Loaded Successfully")