const faker = require('faker');

const campusData = [];
const studentData = [];

const numCampuses = Math.floor(Math.random()*10) + 4;
const numStudents = numCampuses*(Math.floor(Math.random()*50)) + 50;

for (let i = 0; i < numCampuses; i++) {
  const campusName = faker.random.word();
  campusData.push({
    name: campusName,
    pictureUrl: faker.image.business(),
    address: faker.fake("{{address.streetAddress}}, {{address.city}}, {{address.stateAbbr}} {{address.zipCode}}"),
    email: `info@${campusName.replace(/\s+/g, '')}.com`
  })
}

for (let j = 0; j < numStudents; j++) {
  studentData.push({
    name: faker.name.findName(),
    pictureUrl: faker.internet.avatar(),
    email: faker.internet.email(),
    campusId: Math.floor(Math.random() * campusData.length + 1)
  })
}

module.exports = { campusData, studentData }