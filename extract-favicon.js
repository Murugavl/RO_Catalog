const sharp = require('sharp');

sharp('public/ponsri-logo.png')
    .extract({ left: 0, top: 0, width: 222, height: 222 })
    .resize(48, 48)
    .toFile('public/favicon.png')
    .then(() => console.log('Favicon extracted successfully'))
    .catch(err => console.error('Error extracting favicon:', err));
