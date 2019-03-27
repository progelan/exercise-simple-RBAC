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

var countGroups = 0; 
var countRights = 0;


function createUser(username, password) {
	var user = {username: username, password: password, groups: []};
	allUsers.push(user);
	return allUsers[allUsers.length - 1];
};


function deleteUser(user) {
	var x = allUsers.indexOf(user);
	
	if (x >= 0) {
		allUsers.splice(x, 1);
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
	return allGroups[allGroups.length -1];
};


function deleteGroup(group) {
	var x = allGroups.indexOf(group);

	if (x >= 0) {
		allUsers.forEach(function(element){
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
		throw new Error("передали плохой аргумент или удаленный аргумент");
	} else {
		user.groups.push(group);
	}
};


function userGroups(user) {
	return user.groups;
};


function removeUserFromGroup(user, group) {
	if (group == undefined || allUsers.indexOf(user) == -1 || allGroups.indexOf(group) == -1) {
		throw new Error("передали плохой аргумент или удаленный аргумент");
	}
	var x = user.groups.indexOf(group);

	if (x >= 0) {
		user.groups.splice(x, 1);
	} else {
		throw new Error("попытка удалить user из группы, которого там нет");
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
	var x = allRights.indexOf(right);


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
	if (allRights.indexOf(right) == -1 || allGroups.indexOf(group) == -1 || group == undefined) {
		throw new Error("передали плохой аргумент");
	} else {
		group[Object.keys(group)].push(right)
	}
};

function removeRightFromGroup(right, group) { 
	if (allRights.indexOf(right) == -1 || allGroups.indexOf(group) == -1 || group == undefined || group[Object.keys(group)].indexOf(right) == -1) {
		throw new Error("передали плохой аргумент");
	} else {
		var x = group[Object.keys(group)].indexOf(right);
		group[Object.keys(group)].splice(x, 1);
	}
};

function login(username, password) {
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


function isAuthorized(user, right) {
	if (user.groups.rights.indexOf(right) >= 0) {
		return true
	} else {
		return false
	}
};

function func() {

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

	console.log('добавляем правило в группу');
	addRightToGroup(right1, group1);
	console.log(group1);
};


