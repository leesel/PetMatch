
var org = 'RI77';
var status = 'adoptable';

fetch('https://api.petfinder.com/v2/oauth2/token', {
	method: 'POST',
	body: 'grant_type=client_credentials&client_id=tSbHrhvV3nXMgtxe7HDPbAQiCuf7IgjQLaw38wWJ896aRoCqQn&client_secret=pEnbfJGHgvbAMqKnnGJF651ccUcdS82ZuydjvnV7',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}).then(function (resp) {
	// Return the response as JSON
	return resp.json();
}).then(function (data) {
    // second API call that usea the token we received for authentication
	return fetch('https://api.petfinder.com/v2/animals?organization=' + org + '&status=' + status, {
		headers: {
			'Authorization': data.token_type + ' ' + data.access_token,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});
}).then(function (resp) {
	// Return the API response as JSON
	return resp.json();
}).then(function (data) {
	// Log the pet data
	console.log('pets', data);
    const results = document.querySelector('#results');
    //Clear page 
    results.innerHTML = '';
    data.animals.forEach(pet => {
        const container = document.createElement('div');
        container.setAttribute("class", "each-pet");
        container.innerHTML = `
            <div class="row">
                <div class="details">
                    <h4 class="name-title">${pet.name} (${pet.age})</h4>
                    <p class="breed">${pet.breeds.primary}</p>
                    <p class="address">${pet.contact.address.city} ${pet.contact.address.state} ${pet.contact.address.postcode}</p>
                    <p class="contact">Contact: ${pet.contact.email}</p>
                </div>
                <div class="image">
                    <img class="animal-image" src="${pet.photos[0].small}">
                </div>
            </div>
        `;
        results.appendChild(container);
    })

}).catch(function (err) {
	// Log any errors
	console.log('oops! something went wrong', err);
});