# import os
# from langchain_community.document_loaders import TextLoader
# from langchain import hub
# from langchain_chroma import Chroma
# from langchain_core.output_parsers import StrOutputParser
# from langchain_core.runnables import RunnablePassthrough
# from langchain_openai import OpenAIEmbeddings
# from langchain_text_splitters import RecursiveCharacterTextSplitter
# from langchain_core.prompts import PromptTemplate
# from langchain_google_vertexai import ChatVertexAI
# from langchain_google_genai import GoogleGenerativeAIEmbeddings
# from dotenv import load_dotenv
# from pathlib import Path
#
# env_path = Path(".") / ".env"
# load_dotenv(dotenv_path=env_path)
#
# # GOOGLE_API_KEY="AIzaSyA-t4qSqCjxAO-wwJQ7-P0q7oAWH7TVYyQ"
# GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
#
# # GOOGLE_KEY = os.getenv("GOOGLE_KEY")
#
#
# def get_file_path():
#     # Get the current directory (where run.py is located)
#     current_directory = os.path.dirname(__file__)
#
#     # Navigate one level up to the 'backend' directory
#     # backend_directory = os.path.join(current_directory, "..")
#
#     # Access data/data.pdf
#     pdf_path = os.path.join(current_directory, "data", "data.txt")
#
#     # Now you can use pdf_path to access data/data.pdf
#     return pdf_path
#
#
# get_file_path()
#
# loader = TextLoader(get_file_path(), encoding="utf-8")
# docs = loader.load()
# # print(docs[0])
#
# llm = ChatVertexAI(model="gemini-pro")
#
# text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
# splits = text_splitter.split_documents(docs)
#
# embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
# vectorstore = Chroma.from_documents(documents=splits, embedding=embeddings)
#
# retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 6})
#
# template = """Use the following pieces of context to answer the question at the end.
# If you don't know the answer, just say that you don't know, don't try to make up an answer.
# Use three sentences maximum and keep the answer as concise as possible.
# Always say "thanks for asking!" at the end of the answer.
#
# {context}
#
# Question: {question}
#
# Helpful Answer:"""
# custom_rag_prompt = PromptTemplate.from_template(template)
#
#
# def format_docs(docs):
#     return "\n\n".join(doc.page_content for doc in docs)
#
#
# def rag_response(user_input):
#     rag_chain = (
#             {"context": retriever | format_docs, "question": RunnablePassthrough()}
#             | custom_rag_prompt
#             | llm
#             | StrOutputParser()
#     )
#
#     response = rag_chain.invoke(user_input)
#     return response
#
# # print(response)
