const faker = require('faker');

const campusData = [];
const studentData = [];

campusData.push({
  name: 'Sayari',
  pictureUrl: 'http://nineplanets.org/images/mercury.jpg',
  address: '976 Woodlawn Drive, Waukesha, WI 53188',
  email: 'hello@sayari.com'
},{
  name: 'Wakusei',
  pictureUrl: 'http://nineplanets.org/images/venus.jpg',
  address: '4235 Emeral Dreams Drive, Romeoville, IL 60441',
  email: 'konnichiwa@wakusei.com'
},{
  name: 'Kochav Lechet',
  pictureUrl: 'http://nineplanets.org/images/earth.jpg',
  address: '902 W Cheltenham, Jenkintown, PA 19027',
  email: 'shalom@kochavlechet.com'
},{
  name: 'Papa Honua',
  pictureUrl: 'http://nineplanets.org/images/mars.jpg',
  address: '4681 Kidd Avenue, Whale Pass, AK 99901',
  email: 'aloha@papahonua.com'
},{
  name: 'Pianeta',
  pictureUrl: 'http://nineplanets.org/images/jupiter.jpg',
  address: '3436 Hilltop Haven Drive, Jersey City, NJ 07305',
  email: 'ciao@pianeta.com'
},{
  name: 'Grah',
  pictureUrl: 'http://www.3dstereo.com/Merchant2/graphics/00000001/lpc_244mll_Saturn_325.jpg',
  address: '1338 Barnes Avenue, Cincinnati, OH 45236',
  email: 'namaste@grah.com'
},{
  name: 'Gezegen',
  pictureUrl: 'http://nineplanets.org/images/uranus.jpg',
  address: '2473 Lang Avenue, Salt Lake City, UT 84104',
  email: 'merhaba@gezegen.com'
},{
  name: 'Fuafuaga',
  pictureUrl: 'http://nineplanets.org/images/neptune.jpg',
  address: '2811 Florence Street, Greenville, TX 75401',
  email: 'talofa@fuafuaga.com'
},{
  name: 'Student is Unassigned',
  pictureUrl: '',
  address: '',
  email: '',
  id: 101
})

const numCampuses = campusData.length;
const numStudents = numCampuses*(Math.floor(Math.random()*30)) + 40;

for (let j = 0; j < numStudents; j++) {
  const studentName = faker.name.findName();
  studentData.push({
    name: studentName,
    pictureUrl: faker.internet.avatar(),
    email: `${studentName.toLowerCase().replace(/\s+/g, '.')}@campusemail.com`,
    campusId: Math.floor(Math.random() * numCampuses + 1)
  })
}

module.exports = { campusData, studentData }