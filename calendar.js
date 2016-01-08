/* Vanilla JS Calendar */

// https://stackoverflow.com/questions/1643320/get-month-name-from-date
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

window.onload = function onReadyClojure(){
    
    var theDate = new Date();
    
    var DateObject = function DateObject(theDate) {
        this.theDay = theDate.getDate();
        this.theMonth = monthNames[theDate.getMonth()];
        this.theYear = theDate.getFullYear();
        this.daysInMonth = new Date(theDate.getFullYear(), theDate.getMonth()+1, 0).getDate();
    };
    
    
    var startingDate = new DateObject(theDate);
    
    function goToPrevMonth(startingDate) {
        return new Date(this.getFullYear(), this.getMonth()-1, 1);
    }
    
    /*function daysInMonth(month,year) {
        return new Date(year, month, 0).getDate();
    }*/
    
    function renderCalendar(targetElem, DateObject){
        
        var renderTarget = document.getElementById(targetElem);
        // var calTable = document.createElement("TABLE"); //.className = "calendar-table";
        // renderTarget.appendChild(calTable);
        var prevMonthSpan = document.createElement("SPAN");
        prevMonthSpan.addEventListener('click', goToPrevMonth(startingDate));
        prevMonthSpan.classList.add('arrow', 'float-left', 'prev-arrow');
        var backArrow = document.createTextNode("<");
        prevMonthSpan.appendChild(backArrow);
        
        var nextMonthSpan = document.createElement("SPAN");
        nextMonthSpan.addEventListener('click', goToNextMonth(startingDate));
        nextMonthSpan.classList.add('arrow', 'float-right', 'next-arrow');
        var nextArrow = document.createTextNode(">");
        nextMonthSpan.appendChild(nextArrow);
        
        var monthSpan = document.createElement("SPAN");
        monthSpan.className = "month-container"; 
        var monthOf = document.createTextNode(
            startingDate.theMonth +" "+ startingDate.theYear
        );
        monthSpan.appendChild(prevMonthSpan);
        monthSpan.appendChild(monthOf);
        monthSpan.appendChild(nextMonthSpan);
        renderTarget.appendChild(monthSpan);
        
        // renderTarget.appendChild(document.createElement("UL"));
        for(i = 0; i < startingDate.daysInMonth; i++){
            var calendarCell = document.createElement("LI");
            calendarCell.setAttribute('id', 'day'+i);
            if(i === startingDate.theDay-1){
                calendarCell.className = "today";
            }
            var dayOfMonth = document.createTextNode(i+1);
            calendarCell.appendChild(dayOfMonth);
            renderTarget.appendChild(calendarCell);
             
        }
    }
    
    /*function goToPrevMonth(startingDate){
        // startingDate = startingDate.theMonth - 1;
        // renderCalendar("calendarThis");
    }*/
    
    function goToNextMonth(startingDate){
        // startingDate = startingDate.theMonth + 1;
        // renderCalendar("calendarThis");
    }
    
    renderCalendar("calendarThis");
    
    console.log(new DateObject(theDate));
    
    // console.log(new DateObject(theDate));
    
    /*var calendarCreator = function CalendarCreator(dateObject) {
        this.date = 3;   
    } */
    debugger; 
};