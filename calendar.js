/* Vanilla JS Calendar */
(function vanillaJsCalendar(){

"use strict";

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

document.addEventListener("DOMContentLoaded", function(event){
		
		var theDate = new Date();
		
		var DateObject = function DateObject(theDate) {
				this.theDay = theDate.getDate();
				this.dayName = dayNames[theDate.getDay()];
				this.theMonth = monthNames[theDate.getMonth()];
				this.theYear = theDate.getFullYear();
				this.daysInMonth = new Date(theDate.getFullYear(), theDate.getMonth()+1, 0).getDate();
				this.firstDayOfMonth = dayNames[new Date(theDate.getFullYear(), theDate.getMonth(), 1).getDay()];
		};
		
		var currentDate = new DateObject(theDate);
		
		function renderCalendar(targetElem){
				
				// Custom function to make new elements easier:
				function addElem(elementType, elemClass, appendTarget){
					appendTarget.innerHTML += "<"+elementType+" class="+elemClass+"> </"+elementType+">";
				}
				
				currentDate = new DateObject(theDate);
				
				// Refreshing Calendar
				var renderTarget = document.getElementById(targetElem);
				renderTarget.remove();
				renderTarget = document.createElement("div");
				renderTarget.id = targetElem;
				document.getElementsByTagName('body')[0].appendChild(renderTarget);
				
				// Monday, dayView
				addElem("div", "day-view", renderTarget);
				var dayView = document.querySelector('.day-view');
				var dayNameElem = document.createElement("div"); // i.e.: Wednesday
				dayNameElem.className = "day-header";
				var dayNameNode = document.createTextNode(currentDate.dayName);
				dayNameElem.appendChild(dayNameNode);
				dayView.appendChild(dayNameElem);
				// 21st, dayNumber
				addElem("time", "day-number", dayView);
				var dayNumber = document.querySelector('.day-number');
				var dayNumNode = document.createTextNode(currentDate.theDay);
				dayNumber.appendChild(dayNumNode);
				dayView.appendChild(dayNumber);
				
				addElem("div", "month-view", renderTarget);
				var monthView = document.querySelector('.month-view');

				var prevMonthSpan = document.createElement("SPAN");
				prevMonthSpan.addEventListener('click', function(){
					goToMonth(currentDate, false); // Go To Previous Month
				});
				prevMonthSpan.classList.add('arrow', 'float-left', 'prev-arrow');
				var backArrow = document.createTextNode("<");
				prevMonthSpan.appendChild(backArrow);
				
				var nextMonthSpan = document.createElement("SPAN");
				nextMonthSpan.addEventListener('click', function(){
					goToMonth(currentDate, true); // Go To Next Month
				});
				nextMonthSpan.classList.add('arrow', 'float-right', 'next-arrow');
				var nextArrow = document.createTextNode(">");
				nextMonthSpan.appendChild(nextArrow);
				
				document.onkeydown = function() {
					switch (window.event.keyCode) {
						case 37: //Left key
							goToMonth(currentDate, false);
							break;
						case 39: //Right key
							goToMonth(currentDate, true);
							break;
					}
				};
				
				var monthSpan = document.createElement("SPAN");
				monthSpan.className = "month-header"; 
				var monthOf = document.createTextNode(
					currentDate.theMonth +" "+ currentDate.theYear
				);
				
				monthSpan.appendChild(prevMonthSpan);
				monthSpan.appendChild(monthOf);
				monthSpan.appendChild(nextMonthSpan);
				monthView.appendChild(monthSpan);
				
				for(var i=0; i < dayNames.length; i++){
					var dayOfWeek = document.createElement('div');
					dayOfWeek.className = "day-of-week";
					var charOfDay = document.createTextNode(dayNames[i].charAt(0));
					dayOfWeek.appendChild(charOfDay);
					monthView.appendChild(dayOfWeek);
				}
				
				// renderTarget.appendChild(document.createElement("ul"));
				var calendarList = document.createElement("ul");
				for(i = 0; i < currentDate.daysInMonth; i++){
					var calendarCell = document.createElement("li");
					var calCellTime = document.createElement("time");
					calendarList.appendChild(calendarCell);
					calendarCell.id = 'day_'+(i+1);
					var dayDataDate = new Date(theDate.getFullYear(), theDate.getMonth(), (i+1));
					calCellTime.setAttribute('datetime', dayDataDate.toISOString());
					calCellTime.setAttribute('data-dayofweek', dayNames[dayDataDate.getDay()]);
					
					calendarCell.className = "calendar-cell";
					if(i === currentDate.theDay-1){
						calendarCell.className = "today";
					}
					var dayOfMonth = document.createTextNode(i+1);
					calCellTime.appendChild(dayOfMonth);
					calendarCell.appendChild(calCellTime);
					monthView.appendChild(calendarList);
						
				} // daysInMonth for loop ends
				
				var dayOne = document.getElementById('day_1');
				if (currentDate.firstDayOfMonth == "Monday"){
					dayOne.style.marginLeft = "49px";
				} else if (currentDate.firstDayOfMonth == "Tuesday"){
					dayOne.style.marginLeft = "98px";
				} else if (currentDate.firstDayOfMonth == "Wednesday"){
					dayOne.style.marginLeft = "147px";
				} else if (currentDate.firstDayOfMonth == "Thursday"){
					dayOne.style.marginLeft = "196px";
				} else if (currentDate.firstDayOfMonth == "Friday"){
					dayOne.style.marginLeft = "245px";
				} else if (currentDate.firstDayOfMonth == "Saturday"){
					dayOne.style.marginLeft = "304px";
				}
		
				var dayHeader = document.getElementsByClassName('day-header');
				var dayNumNode = document.getElementsByClassName('day-number');
				var updateDay = function(){
					var thisCellTime = this.querySelector('time');
					dayHeader[0].textContent = thisCellTime.getAttribute('data-dayofweek');
					
					dayNumNode[0].textContent = this.textContent;  
						
				} 
				
				var calCells = document.getElementsByClassName('calendar-cell');
				for(i = 0; i < calCells.length; i++){
					calCells[i].addEventListener('click', updateDay, false);
				}
				
		} // renderCalener function ends
		
		// console.log(new DateObject(theDate));
		renderCalendar("calendarThis");
		
		function goToMonth(currentDate, direction) {
			if (direction == false){
				theDate = new Date(theDate.getFullYear(), theDate.getMonth()-1, 1);
			} else{
				theDate = new Date(theDate.getFullYear(), theDate.getMonth()+1, 1);
			}
			return renderCalendar("calendarThis");
		}
		
	}); // DOMContentLoaded event listener ends

})(); // iife (immediately invoked function expressions) ends
