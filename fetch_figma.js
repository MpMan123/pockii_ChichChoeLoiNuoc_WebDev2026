const https = require('https');
const fs = require('fs');

const token = 'figd_GVtCeIkI-CH2tpGLN2aSrEPpH_WtW5i5TVvIqNpp';
const fileKey = 'pLqfqbssLRMtsfc127xhqo';

const options = {
  headers: {
    'X-Figma-Token': token
  }
};

// Get File Data
https.get(`https://api.figma.com/v1/files/${fileKey}`, options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('figma_file_data.json', data);
    console.log('File data saved to figma_file_data.json');
    
    // Parse and print some basic info
    try {
        const parsed = JSON.parse(data);
        console.log('File Name:', parsed.name);
        if (parsed.document && parsed.document.children[0].children) {
            console.log('Top level nodes:', parsed.document.children[0].children.map(n => n.name).join(', '));
        }
    } catch(e) { console.error('Error parsing JSON'); }
  });
}).on('error', err => {
  console.log('Error fetching file data:', err.message);
});

// Get Image of top level node
// We'll just ask for the file's main children nodes if possible, or wait till we get file data
https.get(`https://api.figma.com/v1/images/${fileKey}?ids=0:1&format=jpg`, options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
        const parsed = JSON.parse(data);
        if (parsed.images && parsed.images['0:1']) {
            const imageUrl = parsed.images['0:1'];
            console.log('Image URL:', imageUrl);
            
            // Download image
            https.get(imageUrl, (imgRes) => {
                const imgStream = fs.createWriteStream('figma_design.jpg');
                imgRes.pipe(imgStream);
                imgStream.on('finish', () => {
                    console.log('Image downloaded to figma_design.jpg');
                });
            });
        } else {
            console.log('No image found for node 0:1:', data);
        }
    } catch(e) {
        console.error('Error downloading image', e);
    }
  });
});
