import { solutions } from './database.js';

export function generateReport(diseaseName, severity) {
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