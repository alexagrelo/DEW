let currentSong = {};
let currentTime = 0;

SONGS = [{
    id: '1',
    title: 'Smells Like Teen Spirit',
    artist: 'Dave Grohl',
    src: './assets/mp3/Dave Grohl - Smells Like Teen Spirit (@ the Ford) (64 kbps).mp3',
    img: './assets/mp3_imgs/Dave Grohl - Smells Like Teen Spirit.jpg'
}, {
    id: '2',
    title: 'Eye of the Tiger',
    artist: 'COOP3RDRUMM3R',
    src: './assets/mp3/Eye of the Tiger - Drum Cover - Survivor (64 kbps).mp3',
    img: './assets/mp3_imgs/COOP3RDRUMM3R - Eye of the Tiger.jpg'
}, {
    id: '3',
    title: 'Smooth Criminal',
    artist: 'Jonathan Moffett',
    src: './assets/mp3/Michael Jacksons Drummer Jonathan Moffett Performs _Smooth Criminal_ (64 kbps).mp3',
    img: './assets/mp3_imgs/Jonathan Moffet Sugar Foot - Smooth Criminal.jpg'
}, {
    id: '4',
    title: 'Basket Case - Green Day',
    artist: 'Kristina Schiano',
    src: 'assets/mp3/Basket Case - Green Day - Drum Cover (64 kbps).mp3',
    img: './assets/mp3_imgs/Kristina Schiano - Basket Case - Green Day.jpg'
}];

SONGS.forEach(song => {
    const FULL_LIST = document.querySelector('#songs_and_icons_list')
    const row = document.createElement('div')
    row.classList.add('row');

    const song_div = document.createElement('div');
    const state_icon_div = document.createElement('div');

    song_div.classList.add('song_item', 'col-7');
    state_icon_div.classList.add('state_icon_item', 'col-1');

    song_div.setAttribute('data-id', song.id);
    state_icon_div.setAttribute('data-id', 'state_icon_div_' + song.id);

    song_div.innerHTML = song.id + ' - ' + song.title + ' - ' + song.artist;

    const icon = document.createElement('i');
    icon.setAttribute('id', 'state_icon_' + song.id);

    state_icon_div.appendChild(icon);

    row.appendChild(song_div);
    row.appendChild(state_icon_div);

    FULL_LIST.appendChild(row);

});

const SONG_ITEMS = document.querySelectorAll('.song_item');
const LIST_ICON_DIVS = document.querySelectorAll('.state_icon_item');
const LIST_ICONS = document.querySelectorAll('.state_icon_item i');
const IMAGE = document.querySelector('.image_div img');

const AUDIO = document.querySelector('#audio_player');
const PLAY_BTN = document.querySelector('#play_btn');
const PAUSE_BTN = document.querySelector('#pause_btn');
const FWD_BTN = document.querySelector('#forward_btn');
const BWD_BTN = document.querySelector('#backward_btn');
const FFWD_BTN = document.querySelector('#ffwd_btn');
const FBWD_BTN = document.querySelector('#fbwd_btn');

PAUSE_BTN.style.display = 'none';
IMAGE.src = './assets/mp3_imgs/default_img.jpg';

// EVENTOS

PLAY_BTN.addEventListener('click', () => {
    if (SONGS.indexOf(currentSong) === -1) {
        currentSong = SONGS[0];
        playSong(currentSong);
    } else {
        playSong(currentSong);
    }
    PLAY_BTN.style.display = 'none';
    PAUSE_BTN.style.display = 'block';
});

PAUSE_BTN.addEventListener('click', () => {
    PLAY_BTN.style.display = 'block';
    PAUSE_BTN.style.display = 'none';
    pauseSong(currentSong);
});

FWD_BTN.addEventListener('click', () => {
    if (currentSong === SONGS[SONGS.length - 1]) {
        currentSong = SONGS[0];
    } else {
        currentSong = SONGS[SONGS.indexOf(currentSong) + 1];
    }
    playSong(currentSong);
    PLAY_BTN.style.display = 'none';
    PAUSE_BTN.style.display = 'block';
});

BWD_BTN.addEventListener('click', () => {
    if (currentSong === SONGS[0]) {
        currentSong = SONGS[SONGS.length - 1];
    } else {
        currentSong = SONGS[SONGS.indexOf(currentSong) - 1];
    }
    playSong(currentSong);
    PLAY_BTN.style.display = 'none';
    PAUSE_BTN.style.display = 'block';
});

AUDIO.addEventListener('ended', () => {
    FWD_BTN.click();
});

FFWD_BTN.addEventListener('click', () => {
    if (AUDIO.src) AUDIO.currentTime += 10;
});

FBWD_BTN.addEventListener('click', () => {
    if (AUDIO.src) AUDIO.currentTime -= 10;
});

// MÉTODOS

function pauseSong(currentSong) {
    setPausedSong(currentSong);
    drawStateIcons();
    AUDIO.pause();
}

function playSong(currentSong) {
    if (currentTime !== 0 && AUDIO.paused && splitSRC(AUDIO.src) === splitSRC(currentSong.src)) {
        AUDIO.currentTime = currentTime;
    } else {
        AUDIO.src = currentSong.src;
        IMAGE.setAttribute('src', unsplitSRC(currentSong.img));
    }
    setActiveSong(currentSong);
    currentTime = 0;
    drawStateIcons();
    AUDIO.play();
}

function setActiveSong(currentSong) {
    SONG_ITEMS.forEach(item => {
        item.classList.remove('active', 'paused');
    });
    SONG_ITEMS.forEach(listItem => {
        listItem.classList.toggle('active', listItem.getAttribute('data-id') === currentSong.id);
    });
    LIST_ICON_DIVS.forEach(div => {
        div.classList.remove('active', 'paused');
    });
    LIST_ICON_DIVS.forEach(div => {
        div.classList.toggle('active', div.getAttribute('data-id') === 'state_icon_div_' + currentSong.id);
    });
}

function setPausedSong(currentSong) {
    SONG_ITEMS.forEach(item => {
        item.classList.remove('active');
    });
    SONG_ITEMS.forEach(listItem => {
        listItem.classList.toggle('paused', listItem.getAttribute('data-id') === currentSong.id);
    });
    currentTime = AUDIO.currentTime;
}

function drawStateIcons() {
    LIST_ICONS.forEach(icon => {
        icon.classList.remove('fa', 'fa-play', 'fa-pause');
    })
    SONG_ITEMS.forEach(song => {
        if (song.classList.contains('active')) {
            document.querySelector('#state_icon_' + song.getAttribute('data-id')).classList.add('fa', 'fa-play');
        }
        if (song.classList.contains('paused')) {
            document.querySelector('#state_icon_' + song.getAttribute('data-id')).classList.add('fa', 'fa-pause');
        }
    });
}

// SOURCE STRING FORMATTING
function splitSRC(src) {
    const splittedSrc = src.split('/');
    return splittedSrc[splittedSrc.length - 1].replaceAll(' ', '%20');
}

function unsplitSRC(src) {
    return src.replaceAll('%20', ' ');
}