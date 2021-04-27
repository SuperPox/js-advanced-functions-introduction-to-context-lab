// Your code here

function createEmployeeRecord(arr)
{
    const values = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    const employee = new Object(values);
    return employee;
}

function createEmployeeRecords(arr)
{
    return arr.map(function(row) 
    {
        return createEmployeeRecord(row)
    })
}

function createTimeInEvent(employeeObj, dateStamp)
{
    let [date, hour] = dateStamp.split(' ')
    employeeObj.timeInEvents.push
    (
        {
            type: "TimeIn",
            hour: parseInt(hour, 10),
            date,
        }
    )
    return employeeObj;
}

function createTimeOutEvent (employeeObj, dateStamp)
{
    let [date, hour] = dateStamp.split(' ')
    employeeObj.timeOutEvents.push
    (
        {
            type: "TimeOut",
            hour: parseInt(hour, 10),
            date,
        }
    )
    return employeeObj;
}

function hoursWorkedOnDate (employee, dateStamp)
{
    let inEvent = employee.timeInEvents.find(function(e)
    {
        return e.date === dateStamp;
    })

    let outEvent = employee.timeOutEvents.find(function(e)
    {
        return e.date === dateStamp;
    })

    return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate (employee, dateStamp)
{
    let wage = hoursWorkedOnDate(employee, dateStamp) * employee.payPerHour;
    return parseFloat(wage.toString())
}

function allWagesFor(employee)
{
    let daysWorked = employee.timeInEvents.map(function(e) {return e.date})
    let allWages = daysWorked.reduce(function(a, b) 
    {
        return a + wagesEarnedOnDate(employee, b)
    }, 0)
    return allWages;
}

function findEmployeeByFirstName(srcArray, firstName)
{
    return srcArray.find(function(e) {return e.firstName === firstName})
}

function calculatePayroll(arr)
{
    return arr.reduce(function(a,b) {return a + allWagesFor(b)}, 0)
}