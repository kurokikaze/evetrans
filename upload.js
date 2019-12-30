const fs = require('fs');

const systemMap = require('./eve-map-json/dist/universe-pretty.json');

const mapSystem = ({id, name, security}) => [id,name,security,`SYSTEM${security > 0.5 ? ';SAFE' : ''}`].join(',') + '\n';
const mapJump = ({from, to}) => [from,to,'HAS_JUMP'].join(',') + '\n';

const systemsCSV = systemMap.solarSystems.map(mapSystem);
// const regionsCSV = systemMap.solarSystems.map(({id, region}) => `${id},${region},IN_REGION\n`);
const routesCSV = systemMap.jumps.map(mapJump);

const SYSTEM_FILE_NAME = 'systems.csv';
const REGION_FILE_NAME = 'regions.csv';
const ROUTES_FILE_NAME = 'routes.csv';

console.log(systemMap.solarSystems.length);

function writeCSV(filename, header, data) {
    const fileHandle = fs.openSync(filename, 'w');

    fs.writeSync(fileHandle, header);

    for (let record of data) {
        fs.writeSync(fileHandle, record);
    }

    fs.closeSync(fileHandle);
}

writeCSV(`./csv/${SYSTEM_FILE_NAME}`, 'id:ID,name,security,:LABEL\n', systemsCSV);
writeCSV(`./csv/${ROUTES_FILE_NAME}`, 'from:START_ID,to:END_ID,type:TYPE\n', routesCSV);
