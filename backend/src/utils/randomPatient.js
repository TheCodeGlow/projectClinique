
const { faker } = require('@faker-js/faker');
const axios = require('axios');

function generateRandomPerson() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const dateOfBirth = faker.date.birthdate(min=18, max=100);
  const gender = faker.person.sex();
  const phone = faker.phone.number();
  const address = faker.location.streetAddress();
  const email = faker.internet.email();
  const password = faker.internet.password();

  return {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    address,
    phone,
    email,
    password
  };
}

// Loop 10 times for registration
for (let i = 0; i < 10; i++) {
  const randomPerson = generateRandomPerson();

  // Register at http://localhost:5000/api/auth/register
  console.log(randomPerson);

  axios
    .post('http://localhost:5000/api/auth/register', randomPerson)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}