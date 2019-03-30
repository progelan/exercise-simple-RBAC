var allUsers = [
	// {username: "admin", password: "1234", groups: ["admin", "manager", "basic"]},
	// {username: "sobakajozhec", password: "ekh228", groups: ["basic", "manager"]},
	// {username: "patriot007", password: "russiaFTW", groups: ["basic"]}
	];

var allRights = [
	// "manage content", "play games", "delete users", "view site"
	];

var allGroups = [
	// {"admin": [allRights[2]]},
	// {"manager": [allRights[0]]},
	// {"basic": [allRights[1], allRights[3]]}
	];


var loggedUser = undefined; // вошедший пользователь
var session = undefined; // состояние текущей сессии вошедшего пользователя с вводом пароля
// var guestSession = undefined;



var countGroups = 0; // счетчик для создания имен групп
var countRights = 0; // счетчик для создания имен прав


function createUser(username, password) {
	var user = {username: username, password: password, groups: []};
	users().push(user);
	return users()[users().length - 1];
};


function deleteUser(user) {
	var x = users().indexOf(user);
	
	if (x >= 0) {
		users().splice(x, 1);
	} else if (user == undefined || x < 0) {
		throw new Error("передали плохой аргумент или уже удаленн(ого/ую) user");
	}
};


function users() {
	return allUsers;
};


function createGroup() {
	function counter() { 
		return countGroups++ ;
	}
	group = {};
	var key = 'group' + String(counter());
	group[key] = [];

	allGroups.push(group);
	return allGroups[allGroups.length - 1];
};


function deleteGroup(group) {
	var x = groups().indexOf(group);

	if (x >= 0) {
		users().forEach(function(element){
			if (element.groups.indexOf(group) >= 0) {
				removeUserFromGroup(element, group);
			}
		});
	allGroups.splice(x, 1); // удалить группу
		return // остановить выполнение функции
	} else {
		throw new Error('такая группа уже удалена');
	}
};

function groups() {
	return allGroups;
};


function addUserToGroup(user, group) {
	if (group == undefined || allUsers.indexOf(user) == -1 || allGroups.indexOf(group) == -1) {
		throw new Error("передали плохой или удаленный аргумент");
	} else {
		user.groups.push(group);
	}
};


function userGroups(user) {
	return user['groups'];
};


function removeUserFromGroup(user, group) {
	if (user.groups.indexOf(group) == -1 || users().indexOf(user) == -1) {
		throw new Error("передали плохой или удаленный аргумент");
	} else {
		var x = user.groups.indexOf(group);
		user.groups.splice(x, 1);
	}
};


function createRight() {
	function counter() { 
		return countGroups++;
	}

	var right = 'right' + String(counter());

	allRights.push(right);
	return allRights[allRights.length - 1]
};


function deleteRight(right) {
	var x = rights().indexOf(right);
	if (x >= 0) {
		allRights.splice(x, 1);
		for (var i = 0; i < allGroups.length; i++) {
			var arrayGroup = allGroups[i][Object.keys(allGroups[i])]
			
			if (arrayGroup.indexOf(right) >= 0) {
				var x1 = arrayGroup.indexOf(right);
				arrayGroup.splice(x1, 1);
			};
		};
	} else {
		throw new Error("попытка удалить right , которого там нет");
	}
};


function groupRights(group) {
	return group[Object.keys(group)];
};


function rights() {
	return allRights;
};


function addRightToGroup(right, group) {
	if (rights().indexOf(right) == -1 || allGroups.indexOf(group) == -1 || group == undefined) {
		throw new Error("передали плохой аргумент");
	} else {
		group[Object.keys(group)].push(right)
	}
};


function removeRightFromGroup(right, group) { 
	if (groups().indexOf(group) == -1 || group[Object.keys(group)].indexOf(right) == -1) {
		throw new Error("передали плохой аргумент");
	} else {
		var x = group[Object.keys(group)].indexOf(right);
		group[Object.keys(group)].splice(x, 1);
	}
};


function login(username, password) {
	if (session == undefined) {
		var arrayUsers = users().filter(function(user) {
			return username === user['username'] && password === user['password'];
		});
		
		if (arrayUsers.length == 1) {
			loggedUser = arrayUsers[0];
			session = true;
			return true
		} else {
			return false
		}
	} else {
		return false
	}
};


function currentUser() {
	if (session == true) {
		return loggedUser
	} else {
		return undefined
	}
};


function logout() {
	loggedUser = undefined;
	session = undefined;
};


function isAuthorized(user, right) {
	if (users().indexOf(user) == -1 || rights().indexOf(right) == -1) {
		throw new Error("передали плохой аргумент");
	} else {
		var arr = [];
		for (var i = 0; i < user.groups.length; i++) {
			var arrayRights = user.groups[i][Object.keys(user.groups[i])]
				arrayRights.forEach(function(rightInArr){
					arr.push(rightInArr)
				});
		}
		if (arr.indexOf(right) >= 0) {
			return true
		} else {
			return false
		}
	}
};



console.log('создаем и выводим пользователя:');
var user1 = createUser('admin', '123');
console.log(user1);
console.log('---------');

console.log('создаем и выводим группу:');
var group1 = createGroup();
console.log(group1);
console.log('---------');

console.log('добавляем пользователя в группу и выводим пользователя');
addUserToGroup(user1, group1);
console.log(user1);
console.log('---------');

console.log('создаем и выводим правило:');
var right1 = createRight();
console.log(right1);
console.log('---------');

console.log('выводим все правила:');
console.log(rights());
console.log('---------');

console.log('добавляем правило в группу и выводим группу');
addRightToGroup(right1, group1);
console.log(group1);
console.log('---------');

console.log('логинимся в систему, вошедший юзер:');
login(user1.username, user1.password)
console.log(loggedUser)
console.log('состояние сессии:');
console.log(session)
console.log('выходим из системы, вошедший юзер:');
logout()
console.log(loggedUser)
console.log('состояние сессии:');
console.log(session)
