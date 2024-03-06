
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer O3r0O9LGi-Ug-FUWsrT9VwV7PwZndrrhJnzJrjmqNFds2ZpoAnuU_iO5v-DwCTxqoN2HXgbHF-FFIYrF_baUfJJjch8gsXqxDuXqo7FM31NKv2hululT0gfPwf3dZXYx'
  }
};

const APIResponse = async () => {

  try {
    // const response = await fetch(`https://api.yelp.com/v3/businesses/search?latitude=44.651070&longitude=-63.582687&radius=40000`, options);

    const response = await fetch(`https://api.yelp.com/v3/businesses/search?location=CANADA`, options);
    const results = await response.json();
    // console.log(results);

    // const uniqueCategories = [...new Set(results.businesses.map((restaurant) => {
    //     return restaurant.categories[0].title
    // }))]
    const canadian = results.businesses.filter(business => { return business.location.country === 'CA' }
    )
    // .map(one => console.log(one));
    console.log("country is canada", canadian)
    const categoriesForCanadian = canadian.map(category => {
      return category.categories
    })
    console.log("CAD", categoriesForCanadian)


    function getUniqueCategories(categoriesForCanadian) {
      return categoriesForCanadian.reduce((uniqueCategories, categoryArray) => {
        categoryArray.forEach(category => {
          // const key = `${category.alias} ${category.title}`;
          const key = category.alias
          if (!uniqueCategories[key]) {
            // uniqueCategories[key] = { alias: category.alias, title: category.title };
            uniqueCategories[key] = category.title

          }
        });
        return uniqueCategories;
      }, {});
    }

    const uniqueCategoriesObject = getUniqueCategories(categoriesForCanadian);

    console.log(">>", uniqueCategoriesObject);


    // var catCounts = categoriesForCanadian.reduce(function (obj, category) {
    //     if (!obj[category]) {
    //         obj[category];
    //     }
    // else {
    //     obj[category]++;
    // }
    //     return obj;
    // }, {});

    // console.log(catCounts);




    // console.log(uniqueCategories);
  } catch (error) {
    console.error(error);
  }
}

APIResponse();