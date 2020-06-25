document.addEventListener("DOMContentLoaded", () => {
  let users;
  
  let usersBlock = document.createElement("div");
  usersBlock.classList.add("users");

    fetch('https://randomuser.me/api/?results=50&inc=name,gender,location,email,dob,phone,picture,cell')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      users = data.results;

      assignUsers(users);
    });

    function sortAgeUp(a, b){
      return a.dob.age-b.dob.age;
    }
    
    function sortAgeDown(a, b){
      return b.dob.age-a.dob.age;
    }

    function sortNameUp(a, b) {
      let nameA=a.name.first, nameB=b.name.first;
      if (nameA < nameB) { 
        return -1;
      }
      if (nameA > nameB){
        return 1;
      }
      return 0;
    }

    function sortNameDown(a, b){
      let nameA=a.name.first, nameB=b.name.first;
      if (nameB < nameA) { 
        return -1;
      }
      if (nameB > nameA){
        return 1;
      }
      return 0;
    }

    function assignUsers(users){
      usersBlock.innerHTML = "";
      const content = document.querySelector(".content");
      users.forEach(element => {
       let userCard = document.createElement("div");
       userCard.classList.add("user", `user_${element.gender}`);

       let userName = document.createElement("div");
       userName.classList.add("user__name", element.gender);
       userName.innerHTML = `${element.name.first} ${element.name.last}`;

       let userPhoto = document.createElement("img");
       userPhoto.classList.add("user__photo");
       userPhoto.setAttribute("src", element.picture.large);

       let userAge = document.createElement("div");
       userAge.classList.add("user__age");
       userAge.innerHTML = `I have ${element.dob.age} years old`;

       let userMail = document.createElement("div");
       userMail.classList.add("user__mail");
       userMail.innerHTML = element.email;

       let userPhone = document.createElement("div");
       userPhone.classList.add("user__phone");
       userPhone.innerHTML = element.cell;

       let userAddress = document.createElement("div");
       userAddress.classList.add("user__address");
       userAddress.innerHTML = `${element.location.street.number} ${element.location.street.name}`;

       let userGender = document.createElement("div");
       userGender.classList.add("user__gender");
       userGender.innerHTML = element.gender;

       userCard.append(userName, userPhoto, userAge, userMail, userPhone, userAddress, userGender);

       usersBlock.append(userCard);
      });
      content.append(usersBlock);
    }

    document.addEventListener("change",(e) => {
      let usersSorted = users;
      
      let ageUp = e.target.classList.contains("fieldset__input_age-up");
      let ageDown = e.target.classList.contains("fieldset__input_age-down");

      let nameUp = e.target.classList.contains("fieldset__input_name-up");
      let nameDown = e.target.classList.contains("fieldset__input_name-down");

      let nameFilter = e.target.classList.contains("fieldset__input_name");

      let genderMale = e.target.classList.contains("fieldset__gender_male");
      let genderFemale = e.target.classList.contains("fieldset__gender_female");
      let genderAll = e.target.classList.contains("fieldset__gender_all");

      if(ageUp) {
        usersSorted.sort(sortAgeUp);
      }

      if(ageDown) {
        usersSorted.sort(sortAgeDown);
      }

      if(nameUp){
        usersSorted.sort(sortNameUp);
      }

      if(nameDown){
        usersSorted.sort(sortNameDown);
      }

      if(nameFilter) {
        console.log(e.target.value)
      }

      if(genderMale) {
        usersSorted = users.filter(el => el.gender === "male");
      }

      if(genderFemale) {
        usersSorted = users.filter(el => el.gender === "female");
      }

      if(genderAll) {
        // usersBlock.innerHTML = "";
        // assignUsers(users);
      }
      console.log(usersSorted)
      assignUsers(usersSorted);
    });

    // document.addEventListener("click", (e) => {
    //   let resetButton = e.target.classList.contains("fieldset__reset");

    //   if(resetButton) {
    //     usersBlock.innerHTML = "";
    //     assignUsers(users);
    //   }
    // })

});