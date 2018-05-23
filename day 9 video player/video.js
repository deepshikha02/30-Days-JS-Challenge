const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
let update = false;

function togglePlay(){
	const method = video.paused ? "play" : "pause";
	video[method]();
}

function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.innerText = icon;
}

function handleProgress() {
	debugger;
	const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	video[this.name] = this.value;
}

function updateVideo(e) {
	if(update){
		video.currentTime = (e.offsetX/progress.offsetWidth) * video.duration;
	}
}

video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',handleProgress);

toggle.addEventListener('click',togglePlay);

skipButtons.forEach(button => button.addEventListener('click',skip));
ranges.forEach(range => range.addEventListener('change',handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove',handleRangeUpdate));

progress.addEventListener('click',updateVideo);
progress.addEventListener('mousemove', updateVideo);
progress.addEventListener('mousedown', () => update = true);
progress.addEventListener('mouseup', () => update = false);

