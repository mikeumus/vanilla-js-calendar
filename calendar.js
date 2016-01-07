/* Vanilla JS Calendar */

window.onload = function onReadyClojure(){
    
    var theDate = new Date();
    
    var DateObject = function DateObject(theDate) {
        this.theMonth = theDate.getMonth()+1;
        this.theYear = theDate.getFullYear();
        this.daysInMonth = new Date(theDate.getFullYear(), theDate.getMonth()+1, 0).getDate();
    };
    
    /*function daysInMonth(month,year) {
        return new Date(year, month, 0).getDate();
    }*/
    
    function renderCalendar(targetElem, DateObject){
        var renderTarget = document.getElementById(targetElem);
        renderTarget.appendChild(document.createElement("LI"));
        for(x in y);
    }
    
    renderCalendar("targetMe");
    
    console.log(new DateObject(theDate));
    
    // console.log(new DateObject(theDate));
    
    /*var calendarCreator = function CalendarCreator(dateObject) {
        this.date = 3;   
    } */
}