let counterForTableRating = 1;

export async function checkRecords(score = 0) {
  const table = document.getElementById("recordsTable");
  const usersList = await getData();

  usersList.sort(compareUsersScore);

  if (score > usersList.at(-1).score) {
    const userName = await showModalWindow();
    if (usersList.length < 10) {
      const userId = await addData(userName, score);
      usersList.push({
        id: userId,
        name: userName,
        score: score,
      });
    } else {
      await deleteData(usersList.at(-1).id);
      const userId = await addData(userName, score);
      usersList.pop()
      usersList.push({
        id: userId,
        name: userName,
        score: score,
      });
    }
  }
  usersList.sort(compareUsersScore);
  fillTable(table, usersList);
}

function fillTable(elem, data) {
  elem.firstElementChild.innerHTML = "";
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < data.length; i++) {
    const row = document.createElement("tr");
    const cell1 = document.createElement("td");
    const cell2 = document.createElement("td");
    const cell3 = document.createElement("td");

    cell1.innerText = counterForTableRating++;
    cell2.innerText = data[i].name;
    cell3.innerText = data[i].score;
    row.append(cell1, cell2, cell3);
    fragment.append(row);
  }
  elem.firstElementChild.append(fragment);
  counterForTableRating = 1;
}

function getData() {
  return db
    .collection("users")
    .get()
    .then(function (querySnapshot) {
      const usersFromDb = [];
      querySnapshot.forEach(function (doc) {
        usersFromDb.push({
          id: doc.id,
          name: doc.data().name,
          score: doc.data().score,
        });
      });
      return usersFromDb;
    })
    .catch(function (error) {
      console.error("Ошибка: ", error);
    });
}

function addData(name, score) {
  const userId = `user-${name}-${Math.random().toString().split('.')[1]}`;
  return db
    .collection("users")
    .doc(userId)
    .set({
      name: name,
      score: score,
    })
    .then(function () {
      console.log("Рекорд добавлен");
      return userId;
    })
    .catch(function (error) {
      console.error("Ошибка: ", error);
    });
}

function deleteData(docId) {
  return db
    .collection("users")
    .doc(docId)
    .delete()
    .then(function () {
      console.log("Рекорд удален");
    })
    .catch(function (error) {
      console.error("Ошибка: ", error);
    });
}

function compareUsersScore(a, b) {
  return b.score - a.score;
}

function showModalWindow() {
  return new Promise((resolve) => {
    const dialog = document.getElementById("modalWindow");
    const inputForUserName = document.getElementById("userName");

    inputForUserName.value = "";
    inputForUserName.placeholder = "Василий";
    inputForUserName.maxLength = 15;

    inputForUserName.addEventListener("input", (event) => {
      if (inputForUserName.value.length === inputForUserName.maxLength) {
        inputForUserName.setCustomValidity(
          "Максимальное количество символов 15"
        );
        inputForUserName.reportValidity();
        setTimeout(() => inputForUserName.setCustomValidity(""), 2000);
      } else {
        inputForUserName.setCustomValidity("");
      }
    });

    dialog.addEventListener("click", (event) => {
      if (event.target.id === "saveNameBtn") {
        dialog.classList.remove("modal-overlay");
        resolve(inputForUserName.value || "Аноним");
      }
    });

    dialog.classList.add("modal-overlay");
  });
}
