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
      console.log(users);
    });

    function assignUsers(users){
      const content = document.querySelector(".content");
      users.forEach(element => {
       let userCard = document.createElement("div");
       userCard.classList.add("user");

       let userName = document.createElement("div");
       userName.classList.add("user__name");
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
});