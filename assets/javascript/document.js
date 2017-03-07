var config = {
    apiKey: "AIzaSyAfrk7HHCm1qZYlyHgzif0umHkwvcC-oho",
    authDomain: "groupproject-d2bdc.firebaseapp.com",
    databaseURL: "https://groupproject-d2bdc.firebaseio.com",
    storageBucket: "groupproject-d2bdc.appspot.com",
    messagingSenderId: "463679645799"
};

firebase.initializeApp(config);

var database = firebase.database();

database.ref().on("child_added", function(snapshot) {

	if ( ( snapshot.child("name").exists() ) && (snapshot.child("role").exists()) && (snapshot.child("startDate").exists()) && (snapshot.child("monthsWorked").exists()) && (snapshot.child("monthlyRate").exists()) && (snapshot.child("totalBilled").exists())){

		var employeeName = snapshot.val().name;
		
		var employeeRole = snapshot.val().role;
		
		var startDate = snapshot.val().startDate;
		
		var monthsWorked = snapshot.val().monthsWorked;

		var monthlyRate = snapshot.val().monthlyRate;
		
		var totalBilled = snapshot.val().totalBilled;

		var now = moment(new Date()); //todays date
		var end = moment(startDate); // start date
		var duration = moment.duration(now.diff(end));
		var months = duration.asMonths();

		var newRow = $("<tr>");
		var newName = $("<td>");
		var newRole = $("<td>");
		var newDate = $("<td>");
		var newMonths = $("<td>");
		var newRate = $("<td>");
		var newTotal = $("<td>");

		newName.text(employeeName);
		newRole.text(employeeRole);
		newDate.text(startDate);
		newMonths.text(monthsWorked);
		newRate.text(monthlyRate);
		newTotal.text(totalBilled);

		newRow.append(newName, newRole, newDate, newMonths, newRate, newTotal);

		$("#employee-table").append(newRow);
	}

}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

$("#submit-btn").on("click", function(event) {

	event.preventDefault();

	var employeeName = $("#employee-name").val().trim();
	
	var employeeRole = $("#employee-role").val().trim();
	
	var startDate = $("#start-date").val().trim();
	
	var monthlyRate = $("#monthly-rate").val().trim();

	var now = moment(new Date()); //todays date
	var end = moment(startDate); // start date
	var duration = moment.duration(now.diff(end));
	var monthsWorked = duration.asMonths();
	monthsWorked = Math.round(monthsWorked);

	var totalBilled = monthlyRate * monthsWorked;
	totalBilled = Math.round(totalBilled);

	// push new employee infro to database to be written on the page
	database.ref().push({
        name: employeeName,
        role: employeeRole,
        startDate: startDate,
        monthsWorked: monthsWorked,
        monthlyRate: monthlyRate,
        totalBilled: totalBilled
    });

});