const data = [
    {
        music: "./music/MAGIC! - Rude.mp3",
        name: "Rude",
        subtitle: "MAGIC!",
        album: "./img/album/rude.jpg"
    },
    {
        music: "./music/Maroon 5 - Girls Like You ft. Cardi B.mp3",
        name: "Girls Like You ft. Cardi B",
        subtitle: "Maroon 5",
        album: "./img/album/Girls like you.png"
    },
    {
        music: "./music/Avicii - The Nights.mp3",
        name: "The Nights",
        subtitle: "Avicii",
        album: "./img/album/The Nights.jpg"
    }
]

//Variaveis
const interface       = document.querySelector('.player')
const albumImage      = document.querySelector('#image')
const nameMusic       = document.querySelector('.title')
const nameBand        = document.querySelector('.subtitle')
const playSong        = document.querySelector('.play')
const pauseSong       = document.querySelector('.pause')
const playNextSong    = document.querySelector('.play-forward')
const playPrevSong    = document.querySelector('.play-back')
const lineBar         = document.querySelector('.line-bar')
const progressBar     = document.querySelector('.progress-bar')
const currentTimeSong = document.querySelector('.start-music')
const durationSong    = document.querySelector('.end-music')
const song            = document.querySelector('audio')

const color           = document.querySelector('.change-color')

let indexMusic = 0;

updateDataMusic(indexMusic) //Carrega a primeira musica

//================Eventos
playSong.addEventListener('click', playMusic)          //Inicia a musica ao clicar no icone play
pauseSong.addEventListener('click', pauseMusic)        //Pausa a musica ao clicar no icone pause
song.addEventListener('timeupdate', updateProgressBar) //Faz o progresso da duração da musica
color.addEventListener('change', changeColor)          //Muda cor de interface
 
playPrevSong.addEventListener('click', () => {         //Volta musica
    indexMusic-- 
    
    if (indexMusic < 0) {
        indexMusic = 0
    }

    updateDataMusic(indexMusic)
    playMusic()
})

playNextSong.addEventListener('click', () => {        //Avança musica
    indexMusic++
    
    if (indexMusic > data.length - 1) {
        indexMusic = 0  //volta ao começo
        playMusic()
    }

    updateDataMusic(indexMusic)
    playMusic()
})

//Toca a próxima musica automaticamente caso não clique no icone para avançar para próxima música
song.addEventListener('ended', () => {
    indexMusic++

    if (indexMusic > data.length - 1) {
        indexMusic = 0  //volta ao começo
        playMusic()
    }

    updateDataMusic(indexMusic)
    playMusic()
})

//avança o tempo da musica na barra de progresso
lineBar.onclick = (e) => {
    const newTime = (e.offsetX / lineBar.offsetWidth) * song.duration

    song.currentTime = newTime
}

//volta o tempo da musica na barra de progresso
progressBar.onclick = (e) => {
    const newTime = (e.offsetX / progressBar.offsetWidth) * song.duration

    song.currentTime = newTime
}

//================Funções
function updateDataMusic(index) {
    song.setAttribute('src', data[index].music)
    
    song.addEventListener('loadeddata', () => {
        albumImage.src = data[index].album
        nameMusic.textContent = data[index].name
        nameBand.textContent  = data[index].subtitle
        durationSong.textContent = secondToMinute(Math.floor(song.duration))
    })
} 


function playMusic(){
    song.play()
    pauseSong.style.display = 'block'
    playSong.style.display = 'none'
}

function pauseMusic() {
    song.pause()
    pauseSong.style.display = 'none'
    playSong.style.display = 'block'
}

function updateProgressBar(){
    //calculo para transformar a duração da musica em porcentagem 
    let timeMusicBar = Math.floor((song.currentTime / song.duration) * 100) + '%'
    progressBar.style.width = timeMusicBar

    //Converte a classe start-music para mostrar a duração da musica em tempo real
    currentTimeSong.textContent = secondToMinute(Math.floor(song.currentTime))
}

function secondToMinute(seconds){
    let timeMinutes = Math.floor(seconds / 60) 
    let timeSeconds = seconds % 60

    if (timeSeconds < 10) {
        timeSeconds = '0' + timeSeconds;  //Formata o campo segundo como '05', por exemplo
    }
        
    return timeMinutes + ':' + timeSeconds //retorna formato 00:00
}

function changeColor(){
    interface.style.backgroundColor = color.value
    progressBar.style.backgroundColor = color.value
}