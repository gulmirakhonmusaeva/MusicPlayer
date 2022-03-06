const container = document.getElementById('container')
const title = document.getElementById('title')
const cover = document.getElementById('cover')
let start = document.getElementById('start')
let end = document.getElementById('end')
const progressCont = document.getElementById("progress-container") 
const progress = document.getElementById("progress") 
const audio = document.getElementById('audio')
const prew= document.getElementById('prew')
const play = document.getElementById('play')
const next = document.getElementById('next')
const wave = document.getElementById('wave')
const range = document.getElementById('range')

const songs = [
    'Heather - Conan Gray',
    'Titanic',
    'Osmonlarda - Xamdam Sobirov',
    'U okna - HammAli & Navai'
]

let indexSong = 0 
loadSong(songs[indexSong])


//////// ===== functions ====== ////////
 
function loadSong(song) {
    title.textContent = song
    audio.src = `musics/${song}.mp3`
    cover.src = `img/${song}.jpg`

}

// playSong
function playSong () {
    container.classList.add('play')
    play.innerHTML = `<i class="fas fa-pause big"></i>`
    audio.play()
    wave.classList.add('loader')
}
// pauseSong
function pauseSong() {
    container.classList.remove('play')
    play.innerHTML = `<i class="fas fa-play big"></i>`
    audio.pause()
    wave.classList.remove('loader')

}

// prewSong 
function prewSong() {
    indexSong--
    if (indexSong < 0) {
        indexSong = songs.length - 1
    }
    loadSong(songs[indexSong])
    playSong()
}

// nextSong
function nextSong() {
    indexSong++
    if (indexSong > songs.length - 1) {
        indexSong = 0 
    }
    loadSong(songs[indexSong])
    playSong()
}
 
////  setProgress 
function setProgress(e) {
    const {currentTime, duration} = e.srcElement
    const currentTimeMusic = currentTime
    const durationMusic = duration 
    const progressPresent = (currentTime / durationMusic) * 100 
    progress.style.width = `${progressPresent}%`

    let minutes = Math.floor(durationMusic / 60)
    let seconds = Math.floor(durationMusic % 60)

   
    end.textContent = `${minutes = minutes < 10 ? '0' + minutes : minutes} : ${seconds = seconds < 10  ? '0' + seconds : seconds}`
   



   

    //// start 
    let currentMinutes = Math.floor(currentTimeMusic / 60)
    let currentSecond = Math.floor(currentTimeMusic % 60)

    start.textContent = `${currentMinutes = currentMinutes < 10 ? '0' + currentMinutes : currentMinutes} : ${(currentSecond = currentSecond < 10 ? '0' + currentSecond : currentSecond)}`
}

function setProgressTime(e) {
    const width = this.clientWidth
    const clientX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (clientX / width) * duration 
    console.log( audio.currentTime);
}

function setVolume() {
    audio.volume = range.value / 100
}


play.addEventListener('click',() => {
    const isPlaying = container.classList.contains('play')
    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

prew.addEventListener('click', prewSong)
next.addEventListener('click', nextSong)
progressCont.addEventListener('click', setProgressTime)
audio.addEventListener('timeupdate', setProgress)
audio.addEventListener('ended', nextSong)
range.addEventListener('input',setVolume)