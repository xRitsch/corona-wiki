import lifeAreas from '../static-data/life_areas';
import geo from '../static-data/geo';
import Fuse from 'fuse.js';


const db = [];
for(let [k, area] of Object.entries(lifeAreas)){
  let rec = {type: 'area', id: k, index: [area.title], name: area.title, ico: area.ico}
  if(area.examples){
    rec.index.push(...area.examples);
  }

  db.push(rec)
}

for(let [k, district] of Object.entries(geo.districts)){
  let rec = {
    type: 'district', 
    id: k, 
    index: [district.name], 
    ico: district.ico,
    name: district.name,
    state: district.stateAbbreviation, 
    stateTitle: geo.states[district.stateAbbreviation].name 
  };
  // if(area.examples){
  //   rec.index.push(...area.examples);
  // }

  db.push(rec)
}


let fuse = new Fuse(db, {
  keys: ['index']
});


/**
 * 
 * @param {string} query 
 */
export async function search(query){
  let result = fuse.search(query);
  return result;
}