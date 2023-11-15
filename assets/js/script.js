const watch = document.querySelector('.watch');
const milSec = document.querySelector('.milSec');
const watchContainer = document.querySelector('.watch-container');

const start = document.querySelector('.btn-start');
const lap = document.querySelector('.btn-lap');
const laps = document.querySelector('.laps');

let seconds = 0;
let ms = 0;
let timer1, timer2;
document.addEventListener('click', (e) => {
    const elem = e.target;

    if(elem.classList.contains('btn-start')){
        startWatch();
    }
    if(elem.classList.contains('pause')){
        pauseWatch();
    }
    if(elem.classList.contains('reload')){
        reload();
    }
    if(elem.classList.contains('btn-lap')){
        const arrayPush = [];
        for (let elem of watchContainer.childNodes){
            if(elem.innerHTML){
                arrayPush.push(elem.innerHTML);
            }
        };

        const lapedNode = document.createElement('h1');
        lapedNode.innerHTML = arrayPush.join('.');
        lapedNode.classList.add('lapedNode');       
        laps.appendChild(lapedNode);
    }
})

const init = (seconds) => {
        const data = new Date(1000*seconds);
        setMilSec();
        return data.toLocaleTimeString( 
            'pt-BR', {
            hour12: false,
            timeZone: 'UTC'
        });
}

const setMilSec = () => {
   clearInterval(timer2); 
   timer2 = setInterval(()=>{
    if(ms >= 9) ms = 0;
    ms++;
    milSec.innerHTML = ms;
    }, 50);
}

const startWatch = () => {
   clearInterval(timer1); 
   timer1 = setInterval(() => {
        seconds++;
        watch.innerHTML = init(seconds);
    }, 1000);
}
const reload = () => {   
    seconds = 0;
    ms = 0;
    watch.innerHTML = init(seconds);
    milSec.innerHTML = ms;
    clearInterval(timer1);    
    clearInterval(timer2); 
}

const pauseWatch = () => {
    clearInterval(timer1);
    clearInterval(timer2);
}

