const fs = require('fs');

const coordsMap = {
  "ret-1": { lat: -22.5852, lng: 17.0903 },
  "ret-2": { lat: -22.9515, lng: 14.5298 },
  "ret-3": { lat: -22.5694, lng: 17.0858 },
  "ret-4": { lat: -22.4578, lng: 17.0863 },
  "ret-5": { lat: -22.5894, lng: 17.0700 },
  "off-1": { lat: -22.5649, lng: 17.0820 },
  "off-2": { lat: -22.5852, lng: 17.0903 },
  "off-3": { lat: -22.5684, lng: 17.0848 },
  "off-4": { lat: -22.5670, lng: 17.0820 },
  "res-1": { lat: -22.5700, lng: 17.0800 },
  "res-2": { lat: -22.5720, lng: 17.0800 },
  "res-3": { lat: -22.5740, lng: 17.0800 },
  "ind-1": { lat: -22.6100, lng: 17.0800 },
  "ind-2": { lat: -22.5880, lng: 17.0800 },
  "ind-3": { lat: -22.9570, lng: 14.5000 },
  "ind-4": { lat: -26.5800, lng: 18.1300 },
  "ind-5": { lat: -26.1500, lng: 27.9200 },
  "lease-1": { lat: -22.9515, lng: 14.5298 },
  "lease-2": { lat: -22.5694, lng: 17.0858 },
  "lease-3": { lat: -22.5880, lng: 17.0800 }
};

const data = JSON.parse(fs.readFileSync('./src/data/properties.json', 'utf8'));

const updated = data.map(item => {
  if (coordsMap[item.id]) {
    item.coordinates = coordsMap[item.id];
  } else {
    item.coordinates = { lat: -22.5609, lng: 17.0836 }; // default windhoek
  }
  return item;
});

fs.writeFileSync('./src/data/properties.json', JSON.stringify(updated, null, 2));
console.log('Coordinates added.');
