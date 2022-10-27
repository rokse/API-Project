function renderUser() {
  const bodyElement = document.querySelector('body');
  const userWrapperEl = document.createElement('div');
  userWrapperEl.classList.add('user-wrapper');

  bodyElement.append(userWrapperEl);

  fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(res => res.json())
    .then(user => {
      console.log(user);
      let userFullNameEl = document.createElement('h2');
      let userNickNameEl = document.createElement('h3');
      let userEmailEl = document.createElement('p');
      let userAddressEl = document.createElement('a');
      let userPhoneNrEl = document.createElement('p');
      let userWebsiteEl = document.createElement('a');
      let userCompanyEl = document.createElement('p');

      userFullNameEl.textContent = user.name;
      userNickNameEl.textContent = user.username;
      userEmailEl.textContent = user.email;
      userAddressEl.href = `https://maps.google.com/?q=<${user.address.geo.lat}>,<${user.address.geo.lng}>`
      userAddressEl.textContent = `${user.address.street} ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;
      userPhoneNrEl.textContent = user.phone;
      userWebsiteEl.href = user.website;
      userWebsiteEl.textContent = user.website;
      userCompanyEl.textContent = user.company.name;

      userWrapperEl.append(userFullNameEl, userNickNameEl, userEmailEl, userAddressEl, userPhoneNrEl, userWebsiteEl, userCompanyEl);
    });
};

renderUser();

// 3.1. Pilnas vardas.
// 3.2. Vartotojo vardas / nick'as.
// 3.3. El. paštas.
// 3.4. Adresas, kuris turės gatvę, namo numerį, miestą, pašto kodą. Paspaudus ant adreso, pagal koordinates, turėtų atidaryti šios vietos Google Maps.
// 3.5. Telefono numeris.
// 3.6. Internetinio puslapio adresas.
// 3.7. Įmonės, kurioje dirba, pavadinimas.