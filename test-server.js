import handler from './api/index.js';

(async () => {
  try {
    const request = new Request('http://localhost:3000/');
    console.log('Calling handler...');
    const response = await handler(request);
    console.log('Status:', response.status);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));
    const text = await response.text();
    console.log('Body:', text.substring(0, 100) + '...');
  } catch (err) {
    console.error('Error occurred:');
    console.error(err);
  }
})();
