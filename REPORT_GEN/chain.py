from langchain_core.prompts import PromptTemplate
from langchain_groq import ChatGroq
from langchain_core.exceptions import OutputParserException

class ReportGenerator:
    def __init__(self):  # Corrected __init__ method
        # Initialize the ChatGroq instance with necessary parameters
        self.llm = ChatGroq(
            temperature=0,
            groq_api_key="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",  # Replace with your actual API key
            model_name="llama3-70b-8192"
        )

        # Define the solutions for various diseases
        self.solutions = {
            "TLB": {
                "organic": [
                    "Neem oil spray every 7 days.",
                    "Crop rotation with legumes to reduce spore buildup.",
                    "Garlic extract spray as a natural fungicide."
                ],
                "inorganic": [
                    "Fungicide containing Mancozeb or Propiconazole.",
                    "Seed treatment with metalaxyl-based fungicides.",
                    "Foliar spray of Carbendazim."
                ],
                "fertilizers": [
                    "Apply nitrogen-rich fertilizers like Urea for better growth.",
                    "Use balanced fertilizers with NPK ratio 20-10-10."
                ]
            },
            "Rust": {
                "organic": [
                    "Spray with compost tea or seaweed extract.",
                    "Encourage good air circulation by proper spacing."
                ],
                "inorganic": [
                    "Use sulfur-based fungicides.",
                    "Spray with fungicides containing Azoxystrobin."
                ],
                "fertilizers": [
                    "Use balanced NPK fertilizers, such as 15-15-15, for healthy plant growth.",
                    "Ensure potassium-rich fertilizers to improve plant resistance."
                ]
            }
        }

    def generate_report(self, severity, disease_name):
        # Retrieve solutions and fertilizers based on the disease name
        organic_solutions = self.solutions.get(disease_name.upper(), {}).get("organic", [])
        inorganic_solutions = self.solutions.get(disease_name.upper(), {}).get("inorganic", [])
        fertilizers = self.solutions.get(disease_name.upper(), {}).get("fertilizers", [])

        # Define the prompt template
        prompt = PromptTemplate.from_template(
            """
            ### DISEASE REPORT GENERATION
            The detected disease is: {disease_name}.
            Severity level: {severity}.
            
            1. *Disease Details*:
            Provide detailed information about the disease, including symptoms, causes, and how it affects the plant.
            
            2. *Yield Effects*:
            Explain how the disease impacts crop yield and potential economic losses.
            
            3. *Solutions*:
            Provide the best possible solutions:
                - *Organic Solutions*: {organic_solutions}.
                - *Inorganic Solutions*: {inorganic_solutions}.
            
            4. *Fertilizers*:
            Recommend appropriate fertilizers to support plant growth:
                - {fertilizers}.
            
            ### GENERATED REPORT:
            """
        )

        # Format the prompt with the provided data
        rendered_prompt = prompt.format(
            disease_name=disease_name,
            severity=severity,
            organic_solutions=", ".join(organic_solutions),
            inorganic_solutions=", ".join(inorganic_solutions),
            fertilizers=", ".join(fertilizers)
        )

        try:
            # Call the ChatGroq LLM to generate the report
            response = self.llm.invoke(input=rendered_prompt)
            return response.content  # Return the generated report
        except Exception as e:
            raise Exception("Failed to generate the report. Please check the LLM configuration or response.") from e


# Main script to test the functionality
if __name__ == "__main__":
    # Create an instance of ReportGenerator
    report_generator = ReportGenerator()

    # Example inputs
    severity = "High"
    disease_name = "TLB"  # Test with a valid disease name

    try:
        # Generate the report
        report = report_generator.generate_report(severity, disease_name)
        print("Generated Report:\n")
        print(report)
    except Exception as e:
        print(f"An error occurred while generating the report: {e}")
