// Disease solutions database
const solutions = {
    "TLB": {
        organic: [
            "Neem oil spray every 7 days.",
            "Crop rotation with legumes to reduce spore buildup.",
            "Garlic extract spray as a natural fungicide."
        ],
        inorganic: [
            "Fungicide containing Mancozeb or Propiconazole.",
            "Seed treatment with metalaxyl-based fungicides.",
            "Foliar spray of Carbendazim."
        ],
        fertilizers: [
            "Apply nitrogen-rich fertilizers like Urea for better growth.",
            "Use balanced fertilizers with NPK ratio 20-10-10."
        ]
    },
    "RUST": {
        organic: [
            "Spray with compost tea or seaweed extract.",
            "Encourage good air circulation by proper spacing."
        ],
        inorganic: [
            "Use sulfur-based fungicides.",
            "Spray with fungicides containing Azoxystrobin."
        ],
        fertilizers: [
            "Use balanced NPK fertilizers, such as 15-15-15, for healthy plant growth.",
            "Ensure potassium-rich fertilizers to improve plant resistance."
        ]
    },
    "APPLE": {
        organic: [
            "Spray with compost tea or seaweed extract.",
            "Encourage good air circulation by proper spacing."
        ],
        inorganic: [
            "Use sulfur-based fungicides.",
            "Spray with fungicides containing Azoxystrobin."
        ],
        fertilizers: [
            "Use balanced NPK fertilizers, such as 15-15-15, for healthy plant growth.",
            "Ensure potassium-rich fertilizers to improve plant resistance."
        ]
    },
    "MANGO": {
        organic: [
            "Spray with compost tea or seaweed extract.",
            "Encourage good air circulation by proper spacing."
        ],
        inorganic: [
            "Use sulfur-based fungicides.",
            "Spray with fungicides containing Azoxystrobin."
        ],
        fertilizers: [
            "Use balanced NPK fertilizers, such as 15-15-15, for healthy plant growth.",
            "Ensure potassium-rich fertilizers to improve plant resistance."
        ]
    },

};

// Generate report based on input
function generateReport(diseaseName, severity) {
    const disease = solutions[diseaseName.toUpperCase()];
    
    if (!disease) {
        return `No information available for disease: ${diseaseName}`;
    }

    return `
DISEASE REPORT GENERATION
The detected disease is: ${diseaseName}
Severity level: ${severity}

1. Disease Details:
This is a common crop disease that requires immediate attention based on the severity level.

2. Yield Effects:
The disease can significantly impact crop yield depending on severity and control measures taken.

3. Solutions:
Organic Solutions:
${disease.organic.map(sol => '- ' + sol).join('\n')}

Inorganic Solutions:
${disease.inorganic.map(sol => '- ' + sol).join('\n')}

4. Fertilizers:
${disease.fertilizers.map(fert => '- ' + fert).join('\n')}
`;
}

// Event Listeners
document.getElementById('generate-btn').addEventListener('click', () => {
    const diseaseName = document.getElementById('disease-name').value;
    const severity = document.getElementById('severity').value;

    if (!diseaseName) {
        alert('Please enter a disease name');
        return;
    }

    const report = generateReport(diseaseName, severity);
    document.getElementById('report-content').textContent = report;
    document.getElementById('report-section').classList.remove('hidden');
});

// Simple PDF download simulation
document.getElementById('download-pdf').addEventListener('click', () => {
    const diseaseName = document.getElementById('disease-name').value;
    const reportContent = document.getElementById('report-content').textContent;
    
    // Create a Blob with the report content
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${diseaseName}_report.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
});