var allUsers = [ // cписок пользователей
	// {username: "admin", password: "1234", groups: ["admin", "manager", "basic"]},
	// {username: "sobakajozhec", password: "ekh228", groups: ["basic", "manager"]},
	// {username: "patriot007", password: "russiaFTW", groups: ["basic"]}
];

var allRights = [
// "manage content", "play games", "delete users", "view site"
]; // cписок прав

var allGroups = [
	// {"admin": [allRights[2]]},
	// {"manager": [allRights[0]]},
	// {"basic": [allRights[1], allRights[3]]}
]; //список групп


var session = true;


function createUser(username, password) { // Создает нового пользователя с указанным логином `username` и паролем `password`, возвращает созданного пользователя. +
	var user = {username: username, password: password, groups: []};
	allUsers.push(user);
	return user;
};


function deleteUser(user) { // `function deleteUser(user: Any): undefined` Удаляет пользователя `user` +
	var x = allUsers.indexOf(user);
	allUsers.splice(x, 1);
};


function users() { //Возвращает массив всех пользователей. +
	return allUsers;
};


function createGroup() { // Создает новую группу и возвращает её `function createGroup(): Any` нет аргументов +
	allGroups.push({rights: []});
	return allGroups[allGroups.length -1];
};


// должна бросить исключение, если ей передали плохой аргумент
// должна бросить исключение, если ей передали уже удаленн(ого/ое/ую) group
function deleteGroup(group) { //`function deleteGroup(group: Any): undefined` Удаляет группу `group`++
	var x = allGroups.indexOf(group); // возвращаем индекс вхождения group

	if (x >= 0) {							// если во всех группах - группа есть, то
		allUsers.forEach(function(element){	// перебираем всех пользователей - их группы
			if (element.groups.indexOf(group) >= 0) { // если удаляемая группа есть в группах пользователя, то
				removeUserFromGroup(element, group);  // то удаляем пользователя из группы
			}
		});
	allGroups.splice(x, 1); // удалить группу
		return // остановить выполнение функции
	} else {
		throw new Error('группа удаление не найдена');
	}
};

function groups() { // `function groups(): Array<Any>` Возвращает массив групп +
	return allGroups;
};



function addUserToGroup(user, group) { // Добавляет пользователя `user` в группу `group`//`function addUserToGroup(user: Any, group: Any): undefined` 
	user.groups.push(group);
};


function userGroups(user) { // Возвращает массив групп, к которым принадлежит пользователь +
	for (i = 0; i < allUsers.length; i++) {
		if (user === allUsers[i]) {
			return allUsers[i].groups;
		}
	}
};


function removeUserFromGroup(user, group) { //`function removeUserFromGroup(user: Any, group: Any): undefined` Удаляет пользователя `user` из группы `group`. Должна бросить исключение, если пользователя `user` нет в группе `group` +-
	var x = user.groups.indexOf(group);
	user.groups.splice(x, 1);
};

function createRight() { // `function createRight(): Any` Создает новое право и возвращает его +
	var right = {};
	allRights.push(right);
	return right;
};

function deleteRight(right) { // `function deleteRight(right: Any): undefined` --- Удаляет право `right` +
	var x = allRights.indexOf(right);
	allRights.splice(x, 1);
};

function groupRights(group) { // `function groupRights(group: Any): Array<Any>` Возвращает массив прав, которые принадлежат группе `group`  +
	return group.rights;
};

function rights() { // `function rights(): Array<Any>` Возвращает массив прав +
	return allRights;
};


function addRightToGroup(right, group) { // `function addRightToGroup(right: Any, group: Any) : undefined` Добавляет право `right` к группе `group`
	group.rights.push(right);
};

function removeRightFromGroup(right, group) { //`function removeRightFromGroup(right: Any, group: Any) : undefined` Удаляет право `right` из группы `group`. Должна бросить исключение, если права `right` нет в группе `group`
	var x = group.rights.indexOf(right);
	group.rights.splice(x, 1);
};

function login(username, password) { // `function login(username: String, password: String): Boolean` *return* 	-	`true`, если пользователь с логином `username` и паролем `password` существует, `false` в противном случае.  Также функция `login` должна вернуть `false` в случае, если сессия пользователя уже существует.
  for (i = 0; i < allUsers.length; i++) {
    if (username == allUsers[i].username && password == allUsers[i].password) {
      return true;
    } else {
      return false;
    }
  }
};

function currentUser() {
	if (login() == true) {
		return user;
	} else {
		return undefined;
	}
};

function logout() {
	session = undefined;
};


function isAuthorized(user, right) { // `true` в случае, если пользователь `user` обладает правом `right`, `false` в противном случае
	if (user.groups.rights.indexOf(right) >= 0) {
		return true
	} else {
		return false
	}
};







// аргумент плохой - null или undefinded