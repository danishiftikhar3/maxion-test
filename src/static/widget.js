// (function () {
//   const FRONTEND_URL = "{{FRONTEND_URL}}";

//   // Get the widget container and its data attributes
//   const container = document.getElementById('widget-container');
//   if (!container) {
//     console.error('Widget container not found!');
//     return;
//   }

//   const reportID = container.dataset.reportId; // Assume `data-report-id="12345"` in the container

//   if (!reportID) {
//     console.error('Report ID is missing in the widget container!');
//     return;
//   }

//   // Create the iframe dynamically
//   const createIframe = () => {
//     const iframe = document.createElement('iframe');
//     iframe.src = `${FRONTEND_URL}/asset-valuation-report/${reportID}?type=widget`;
//     iframe.style.border = 'none';
//     iframe.style.width = '100%'; // Adjust as needed
//     iframe.style.height = '0'; // Start with 0 and adjust dynamically
//     iframe.style.transition = 'height 0.2s ease';

//     container.appendChild(iframe);

//     // Listen for height adjustment from iframe
//     window.addEventListener('message', (event) => {
//       if (event.origin === FRONTEND_URL) {
//         console.log('resize message called')
//         if (event.data && event.data.height) {
//           iframe.style.height = `${event.data.height}px`;
//         }
//       }
//     });
//   };

//   // Initialize the widget
//   (async () => {
//     createIframe();
//   })();
// })();
