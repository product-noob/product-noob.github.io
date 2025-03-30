/**
 * QR Code Generator
 * JavaScript functionality for the QR code generator tool
 */

// Add debug console logs to help identify issues
console.log('QR Generator script loaded');

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded - initializing QR generator');
  
  // DOM elements - adding error handling to make sure elements exist
  const qrTextInput = document.getElementById('qr-text');
  const qrSizeInput = document.getElementById('qr-size');
  const qrSizeValue = document.getElementById('size-value');
  const foregroundColorInput = document.getElementById('foreground-color');
  const backgroundColorInput = document.getElementById('background-color');
  const errorCorrectionSelect = document.getElementById('error-correction');
  const generateButton = document.getElementById('generate-btn');
  const qrCodeElement = document.getElementById('qr-code');
  const qrPlaceholder = document.getElementById('qr-placeholder');
  const qrActions = document.getElementById('qr-actions');
  const downloadPngButton = document.getElementById('download-png');
  const downloadSvgButton = document.getElementById('download-svg');
  
  console.log('QR Code Elements Check:', {
    qrTextInput,
    generateButton,
    qrCodeElement,
    qrPlaceholder,
    qrActions
  });
  
  // Verify all elements were found
  if (!qrTextInput || !generateButton || !qrCodeElement) {
    console.error('Critical DOM elements not found:',
                 {qrTextInput, generateButton, qrCodeElement});
    return; // Exit if critical elements aren't found
  }
  
  console.log('All DOM elements loaded successfully');
  
  let qrCode = null;
  
  // Update size value display when slider is moved
  if (qrSizeInput && qrSizeValue) {
    qrSizeInput.addEventListener('input', function() {
      const size = qrSizeInput.value;
      qrSizeValue.textContent = `${size} x ${size}`;
    });
  }
  
  // Generate QR code when button is clicked
  generateButton.addEventListener('click', function() {
    console.log('Generate button clicked');
    generateQR();
  });
  
  // Add a button click listener directly to the element as a backup
  document.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'generate-btn') {
      console.log('Generate button clicked via direct listener');
      generateQR();
    }
  });
  
  // Generate QR code function
  function generateQR() {
    console.log('generateQR function called');
    const text = qrTextInput.value.trim();
    
    if (!text) {
      alert('Please enter a URL or text first!');
      return;
    }
    
    console.log('Generating QR code for text:', text);
    
    // Get user-selected options
    const size = qrSizeInput ? parseInt(qrSizeInput.value) : 256;
    const foregroundColor = foregroundColorInput ? foregroundColorInput.value : '#000000';
    const backgroundColor = backgroundColorInput ? backgroundColorInput.value : '#ffffff';
    const errorCorrectionLevel = errorCorrectionSelect ? errorCorrectionSelect.value : 'M';
    
    // Verify the qrcode library is available
    if (typeof qrcode === 'undefined') {
      console.error('QR Code library not loaded!');
      alert('QR Code library failed to load. Please refresh the page and try again.');
      return;
    }
    
    // Clear previous QR code
    qrCodeElement.innerHTML = '';
    
    try {
      // Create new QR code with error handling
      console.log('Creating new QR code with options:', {
        text, size, foregroundColor, backgroundColor, errorCorrectionLevel
      });
      
      // Map error correction levels
      let ecLevel = 'M'; // Default to medium
      if (errorCorrectionLevel === 'L' || errorCorrectionLevel === 'M' ||
          errorCorrectionLevel === 'Q' || errorCorrectionLevel === 'H') {
        ecLevel = errorCorrectionLevel;
      }
      
      // Generate QR code using qrcode-generator library
      const typeNumber = 0; // Auto-detect
      const qr = qrcode(typeNumber, ecLevel);
      qr.addData(text);
      qr.make();
      
      // Create an image element with the QR code
      const img = document.createElement('img');
      img.src = qr.createDataURL(size, 0);
      img.style.width = size + 'px';
      img.style.height = size + 'px';
      
      // Set background color if not white
      if (backgroundColor !== '#ffffff') {
        img.style.backgroundColor = backgroundColor;
      }
      
      // Append the image to the QR code element
      qrCodeElement.appendChild(img);
      
      // Store QR code data for download
      qrCode = {
        element: qrCodeElement,
        dataURL: img.src,
        size: size
      };
      
      // Show QR code and hide placeholder
      qrCodeElement.style.display = 'block';
      if (qrPlaceholder) qrPlaceholder.style.display = 'none';
      if (qrActions) qrActions.style.display = 'flex';
      
      console.log('QR code generated successfully');
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Error generating QR code: ' + error.message);
    }
  }
  
  // Download QR code as PNG
  if (downloadPngButton) {
    downloadPngButton.addEventListener('click', function() {
      if (!qrCode) {
        console.log('No QR code to download');
        return;
      }
      
      try {
        // Create a temporary link element
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = qrCode.dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log('PNG download successful');
      } catch (error) {
        console.error('Error downloading PNG:', error);
        alert('Error downloading QR code: ' + error.message);
      }
    });
  }
  
  // Download QR code as SVG
  if (downloadSvgButton) {
    downloadSvgButton.addEventListener('click', function() {
      if (!qrCode) return;
      
      try {
        // The qrcode-generator library doesn't have direct SVG support
        // Use the PNG instead
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = qrCode.dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setTimeout(() => {
          alert('SVG format is not directly supported. The QR code has been downloaded as PNG instead.');
        }, 100);
        console.log('PNG download (SVG fallback) successful');
      } catch (error) {
        console.error('Error downloading PNG (SVG fallback):', error);
        alert('Error downloading QR code: ' + error.message);
      }
    });
  }
  
  // Enter key in input triggers generation
  qrTextInput.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
      generateQR();
    }
  });
  
  console.log('QR generator initialization complete');
  
  // Add a button to test QR code generation via console
  window.testQR = function() {
    console.log('Testing QR code generation via console');
    generateQR();
  };
  
  // Auto-generate a QR code after 3 seconds if nothing has happened
  setTimeout(function() {
    if (!document.querySelector('#qr-code canvas')) {
      console.log('Auto-testing QR code generation...');
      if (qrTextInput && !qrTextInput.value.trim()) {
        qrTextInput.value = 'https://example.com/test';
      }
      generateQR();
    }
  }, 3000);
});
