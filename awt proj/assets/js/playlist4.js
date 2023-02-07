console.log("Welcome to TuneBot");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('vj/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let vj = [
    {songName: "Nooru Samigal", filePath: "vj/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Thappellam Thappe Illai", filePath: "vj/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Makkayala", filePath: "vj/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Mascara", filePath: "vj/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Macha Kanni", filePath: "vj/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Nakka Mukka", filePath: "vj/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Aathichudi", filePath: "vj/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Sexy Lady", filePath: "vj/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Azhagaai Pookkuthey", filePath: "vj/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Nakka Mukka", filePath: "vj/4.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = vj[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = vj[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `vj/${songIndex+1}.mp3`;
        masterSongName.innerText = vj[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `vj/${songIndex+1}.mp3`;
    masterSongName.innerText = vj[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `vj/${songIndex+1}.mp3`;
    masterSongName.innerText = vj[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})