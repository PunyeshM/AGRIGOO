import { generateReport } from './reportGenerator.js';
import { downloadReport } from './fileExport.js';

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

document.getElementById('download-pdf').addEventListener('click', () => {
    const diseaseName = document.getElementById('disease-name').value;
    const reportContent = document.getElementById('report-content').textContent;
    downloadReport(diseaseName, reportContent);
});