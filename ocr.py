import pdfplumber
import tkinter as tk
from tkinter import filedialog

root = tk.Tk()
root.withdraw() 

file_path = filedialog.askopenfilename(
    title="Select PDF file",
    filetypes=[("PDF files", "*.pdf")]
)

required_fields = []

if file_path:
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                for line in text.split('\n'):
                    for field in required_fields:
                        if field.lower() in line.lower():
                            print(f"{field}: {line}")
else:
    print("No file selected.")
