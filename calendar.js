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
    
    var currentDate = new DateObject(theDate);

    function renderCalendar(targetElem){
        
        currentDate = new DateObject(theDate);
        
        var renderTarget = document.getElementById(targetElem);
        renderTarget.remove();
        renderTarget = document.createElement("DIV");
        renderTarget.setAttribute("id", targetElem);
        document.getElementsByTagName('body')[0].appendChild(renderTarget);
        
        var calendarContainer = document.createElement("DIV");
        renderTarget.appendChild(calendarContainer);

        var prevMonthSpan = document.createElement("SPAN");
        prevMonthSpan.addEventListener('click', function(){
            goToMonth(currentDate, false);
        });
        prevMonthSpan.classList.add('arrow', 'float-left', 'prev-arrow');
        var backArrow = document.createTextNode("<");
        prevMonthSpan.appendChild(backArrow);
        
        var nextMonthSpan = document.createElement("SPAN");
        nextMonthSpan.addEventListener('click', function(){
            goToMonth(currentDate, true);
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
        renderTarget.appendChild(monthSpan);
        
        // renderTarget.appendChild(document.createElement("UL"));
        for(i = 0; i < currentDate.daysInMonth; i++){
            var calendarCell = document.createElement("LI");
            calendarCell.setAttribute('id', 'day'+i);
            if(i === currentDate.theDay-1){
                calendarCell.className = "today";
            }
            var dayOfMonth = document.createTextNode(i+1);
            calendarCell.appendChild(dayOfMonth);
            renderTarget.appendChild(calendarCell);
             
        }
    }
    
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
    
};