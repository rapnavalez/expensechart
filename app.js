

//get date

const date = new Date()
const dayNumber = date.getDay()
let day;
switch(dayNumber){
    case 0:
        day = 'sun'
        break;
    case 1:
        day = 'mon'
        break;
    case 2:
        day = 'tue'
        break;
    case 3:
        day = 'wed'
        break;
    case 4:
        day = 'thu'
        break;
    case 5:
        day = 'fri'
        break;
    case 6:
        day = 'sat'
        break;
}

const charts = document.querySelectorAll('.chart')
const chartDays = document.querySelectorAll('.chart .chart__day')
const chartAmount = document.querySelectorAll('.chart .chart__amount')
const chartBars = document.querySelectorAll('.chart .chart__bar')
const chartAmountInner = document.querySelectorAll('.chart .chart__amount h6')



//display the bar amount on hover
charts.forEach(chart => {
    chart.addEventListener("mouseover",()=> {
        chart.classList.add("hovered")
    })
    chart.addEventListener("mouseout",()=> {
        chart.classList.remove("hovered")
    })
})


fetch("./data.json")
    .then((resp)=> {
        return resp.json()
    })
    .then((data)=> {
        let dayInfo = data
        

        //extract "amounts" from data
        let amounts = []
        dayInfo.map(data => {
            amounts.push(data.amount)
        })

        //set the height identifier for the bars
        let heightIdentifier;
        if(Math.max(...amounts) >= 100) {
            heightIdentifier = "px"
        } else {
            heightIdentifier = "%"
        }

        //set total amount
        const total = amounts.reduce((a,b) => a+b,0);
        const totalCont = document.querySelector(".total-amount")

        totalCont.innerHTML = total;



        dayInfo.map((info, index) => {

            //set the days per bar
            chartDays[index].innerHTML = `${info.day}`
            //set the amount per bar
            chartAmountInner[index].innerHTML = `$${(info.amount).toFixed(2)}`
            //set the height per bar
            chartBars[index].style.height = `${info.amount+heightIdentifier}`
            //set the active bar
            if(chartDays[index].innerHTML == day) {
                chartDays[index].parentElement.classList.add("active")
                // uncomment to show the amount on top of the active bar
                // chartAmount[index].style.display = "block"
            }

        })
    })