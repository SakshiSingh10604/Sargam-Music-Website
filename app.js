const music = new Audio('music1/hass hass.mp3');
const songs = [
   {
      id: 1,
      songName: 'Hass hass<br><div class="subtitle">Diljeet Dosanjh</div>',
      poster: "music_posters/hass hass.jpg",
      path:'music1/hass hass.mp3',
   },
   {
      id: 2,
      songName: 'Admirin You <br><div class="subtitle">Karan Aujla</div>',
      poster: "music_posters/adrin u.jpg",
      path:'music1/admirin u.mp3',
   },
   {
      id: 3,
      songName: 'Putt jatt da <br><div class="subtitle">Diljeet Dosanjh</div>',
      poster: "music_posters/putt jat da.jpg",
      path:'music1/putt jatt da.mp3',
   },
   {
      id: 4,
      songName: 'Softly<br><div class="subtitle">Karan Aujla</div>',
      poster: "music_posters/softly.jpg",
      path:'music1/softly.mp3',
   },
   {
      id: 5,
      songName: 'Abhi to party suru hui hai<br><div class="subtitle">Badshah</div>',
      poster: "music_posters/abhi to party.png",
      path:'music1/1.mp3',
   },
   {
      id: 6,
      songName: 'Kya Baat Ayy<br><div class="subtitle">Hardy sandhu</div>',
      poster: "music_posters/kya baat h.png",
      path:'music1/Harrdy Sandhu - Kya Baat Ay _ Jaani _ B Praak _  Arvindr Khaira _ Official Music Video(MP3_160K).mp3',
   },
   {
      id: 7,
      songName: 'Ishq Mubharakh<br><div class="subtitle">unknown</div>',
      poster: "music_posters/ishq mubharakh.png",
      path:'music1/ISHQ MUBARAK Full Video Song __ Tum Bin 2 __ Arijit Singh _ Neha Sharma_ Aditya Seal _ Aashim Gulati(MP3_160K).mp3',
   },
   {
      id: 8,
      songName: 'Tum Hi Ho<br><div class="subtitle">Arijit Singh</div>',
      poster: "music_posters/tum hi ho.png",
      path:'music1/_Tum Hi Ho_ Aashiqui 2 Full Song With Lyrics _ Aditya Roy Kapur_ Shraddha Kapoor(MP3_160K).mp3',
   },
];

Array.from(document.getElementsByClassName('songItem')).splice(0,8).forEach((e, i) => {
   e.getElementsByTagName('img')[0].src = songs[i].poster;
   e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
});

let masterPlay=document.getElementById('masterPlay');
let wave=document.getElementById('wave');

masterPlay.addEventListener('click',()=>{
   if(music.paused||music.currentTime<=0){

      music.play();
      wave.classList.add('active1');
      masterPlay.classList.remove('bi-play-fill');
      masterPlay.classList.add('bi-pause-fill');


   }else{
      music.pause();
      wave.classList.remove('active1');
      masterPlay.classList.add('bi-play-fill');
      masterPlay.classList.remove('bi-pause-fill');
   }
});
const makeAllplays=()=>{
   Array.from(document.getElementsByClassName('playListPlay')).splice(0,8).forEach((el)=>{
      el.classList.add('bi-play-circle-fill');
      el.classList.remove('bi-pause-circle-fill');
   })
}



const makeAllBackground=()=>{
   Array.from(document.getElementsByClassName('songItem')).forEach((el)=>{
      el.style.background='rgb(105,105,105,-1)';
   })
  
}


let index = 0;
const poster_master_play = document.getElementById('poster_master_play');
const title = document.getElementById('title');


Array.from(document.getElementsByClassName('playListPlay')).forEach((e) => {
   e.addEventListener('click',(el)=>{
      target_ele = songs.find((find_target)=>find_target.id === Number(el.target.getAttribute("id")));

      index=el.target.id;

      music.src=target_ele.path;

      poster_master_play.src=target_ele.poster;

      title.innerHTML = target_ele.songName;

      music.play();
      masterPlay.classList.remove('bi-play-fill');
      masterPlay.classList.add('bi-pause-fill');

      // let songTitles=songs.filter((els)=>{
      //    return els.id==index;
      // });

      // songTitles=songs.forEach(elss=>{
      //    let{songName}=elss;
      //    title.innerHTML=songName;
         
      // });   



      makeAllBackground();
      Array.from(document.getElementsByClassName('songItem'))[index-1].style.background="rgb(105,105,105,-1)";
      makeAllplays();
      // e.target.classList.remove('bi-play-circle-fill');
      // e.target.classList.add('bi-pause-circle-fill');
      wave.classList.add('active1');
   });
})




let currentStart=document.getElementById('currentStart');
let currentEnd=document.getElementById('currentEnd');
let seek=document.getElementById('seek');
let bar2=document.getElementById('bar2');
let dot=document.getElementsByClassName('dot')[0];

dot.style.left = `${seek.value}%`;

music.addEventListener('timeupdate', () => {
   let music_curr = music.currentTime;
   let music_dur = music.duration;

   let min1 = Math.floor(music_dur / 60);
   let sec1 = Math.floor(music_dur % 60);

   if (sec1 < 10) {
      sec1 = `0${sec1}`;
   }
   if (min1 < 10){
      min1 = `0${min1}`;
   }

   currentEnd.innerText = `${min1}:${sec1}`;
   let min2 = Math.floor(music_curr / 60);
   let sec2 = Math.floor(music_curr % 60);
   
   if (sec2 < 10) {
      sec2 = `0${sec2}`;
   }
   if (min2 < 10){
      min2 = `0${min2}`;
   }

   currentStart.innerText = `${min2}:${sec2}`;

   let progressBar = parseInt((music_curr / music_dur) * 100);
   seek.value = progressBar;

   let seekbar = seek.value;
   bar2.style.width = `${seekbar}%`;
   dot.style.left = `${seekbar}%`;
});



seek.addEventListener('change',()=>{
   music.currentTime=seek.value*music.duration/100;

});



let vol_icon=document.getElementById('vol_icon');
let vol=document.getElementById('vol');
let vol_bar = document.getElementsByClassName('vol_bar')[0];
let vol_dot = document.getElementById('vol_dot');

vol_dot.style.left=`${vol.value}%`;

vol.addEventListener('change',()=>{
   if(vol.value==0){
      vol_icon.classList.remove('bi-volume-up-fill');
      vol_icon.classList.remove('bi-volume-down-fill');
      vol_icon.classList.add('bi-volume-off-fill');
   }
   if(vol.value>0){
      vol_icon.classList.remove('bi-volume-up-fill');
      vol_icon.classList.add('bi-volume-down-fill');
      vol_icon.classList.remove('bi-volume-off-fill');
   }
   if(vol.value>50){
      vol_icon.classList.add('bi-volume-up-fill');
      vol_icon.classList.remove('bi-volume-down-fill');
      vol_icon.classList.add('bi-volume-off-fill');
   }
   let vol_a = vol.value;
   vol_bar.style.width=`${vol_a}%`;
   vol_dot.style.left=`${vol_a}%`;
   music.volume = vol_a/100;
});

let back=document.getElementById('back');
let next=document.getElementById('next');
back.addEventListener('click', () => {
   index -= 1;
   if (index < 13) {
      index = 20;
   }
   console.log(index);
   const prev_song = songs[index - 13];
   console.log(prev_song);
   music.src = prev_song.path;
   poster_master_play.src = prev_song.poster;
   title.innerHTML = prev_song.songName;

   music.play();

   masterPlay.classList.remove('bi-play-fill');
   masterPlay.classList.add('bi-pause-fill');

   makeAllBackground();
   Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105,105,105,-1)";
   makeAllplays();
   // Use back instead of e
   back.classList.remove('bi-play-circle-fill');
   back.classList.add('bi-pause-circle-fill');
   wave.classList.add('active1');
});




// if (index < 13) {
//    index = 20;
// }

// next.addEventListener('click', () => {
//    console.log(index);
//    index = 21 - index;
//    if (index === 20) {
//       index = 1;
//    }
//    const next_song = songs[index - 1];
//    console.log(next_song);
//    music.src = next_song.path;
//    poster_master_play.src = next_song.poster;
//    title.innerHTML = next_song.songName;
//    music.play();
// });








let pop_song_left=document.getElementById('pop_song_left');
let pop_song_right=document.getElementById('pop_song_right');
let pop_song=document.getElementsByClassName('pop_song')[0];

pop_song_right.addEventListener('click',()=>{
    pop_song.scrollLeft+=330;
});
pop_song_left.addEventListener('click',()=>{
    pop_song.scrollLeft-=330;
});

let pop_art_left=document.getElementById('pop_art_left');
let pop_art_right=document.getElementById('pop_art_right');
let Artists_bx=document.getElementsByClassName('Artists_bx')[0];

pop_art_right.addEventListener('click',()=>{
   Artists_bx.scrollLeft+=330;
});
pop_art_left.addEventListener('click',()=>{
   Artists_bx.scrollLeft-=330;
});