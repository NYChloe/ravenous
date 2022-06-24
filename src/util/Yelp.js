const apiKey =
  "go-JI9s4qbdY6pVysu1pmY3J1QPW_gQpbyNzGpzCiTKtK1f7oBBHRCLYj4m8PwTmMCJQDjOLF7BMQB77fV10l7AOz9AIGlCrr4_mo9RpJIVz9_0auAph8nw-afWzYnYx";

const Yelp = {
  search(term, location, sortBy) {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map((business) => ({
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count,
          }));
        }
      });
  },
};

export default Yelp;
