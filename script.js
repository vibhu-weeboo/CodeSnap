// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    const codeInput = document.getElementById('code-input');
    const codeOutput = document.getElementById('code-output');
    const languageSelect = document.getElementById('language-select');
    const themeSelect = document.getElementById('theme-select');
    const lineNumbersCheckbox = document.getElementById('line-numbers');
    const exportPngBtn = document.getElementById('export-png');
    const copyImageBtn = document.getElementById('copy-image');

    // Update code preview
    function updatePreview() {
        const code = codeInput.value;
        const language = languageSelect.value;
        
        codeOutput.textContent = code;
        codeOutput.className = `language-${language}`;
        
        if (lineNumbersCheckbox.checked) {
            codeOutput.parentElement.classList.add('line-numbers');
        } else {
            codeOutput.parentElement.classList.remove('line-numbers');
        }
        
        // Apply syntax highlighting
        Prism.highlightElement(codeOutput);
    }

    // Event listeners
    codeInput.addEventListener('input', updatePreview);
    languageSelect.addEventListener('change', updatePreview);
    lineNumbersCheckbox.addEventListener('change', updatePreview);

    // Theme change
    themeSelect.addEventListener('change', function() {
        const theme = this.value;
        const linkElement = document.querySelector('link[href*="prism"]');
        
        const themeUrls = {
            'dracula': 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css',
            'monokai': 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css',
            'tomorrow': 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css',
            'nord': 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-nord.min.css'
        };
        
        if (linkElement && themeUrls[theme]) {
            linkElement.href = themeUrls[theme];
            setTimeout(updatePreview, 100);
        }
    });

    // Export as PNG
    exportPngBtn.addEventListener('click', function() {
        const codeWindow = document.getElementById('code-preview');
        
        html2canvas(codeWindow, {
            backgroundColor: null,
            scale: 2
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'codesnap.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    });

    // Copy image to clipboard
    copyImageBtn.addEventListener('click', function() {
        const codeWindow = document.getElementById('code-preview');
        
        html2canvas(codeWindow, {
            backgroundColor: null,
            scale: 2
        }).then(canvas => {
            canvas.toBlob(blob => {
                const item = new ClipboardItem({ 'image/png': blob });
                navigator.clipboard.write([item]).then(() => {
                    alert('Image copied to clipboard!');
                }).catch(err => {
                    console.error('Failed to copy image:', err);
                    alert('Failed to copy image to clipboard');
                });
            });
        });
    });

    // Initial preview
    updatePreview();
});
