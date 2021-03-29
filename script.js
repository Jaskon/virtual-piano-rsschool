document.getElementById('btn-fullscreen').addEventListener('click', () => {
  document.body.requestFullscreen();
});

const piano = document.getElementById('piano');
const btnNotes = document.getElementById('btn-notes');
const btnLetters = document.getElementById('btn-letters');
const pianoKeys = Array.from(piano.getElementsByClassName('piano-key'));

// Switch to notes
btnNotes.addEventListener('click', () => {
  pianoKeys.forEach(one => {
    one.classList.remove('piano-key-letter');
    one.classList.add('piano-key-note');
    btnLetters.classList.remove('btn-active');
    btnNotes.classList.add('btn-active');
  });
});

// Switch to letters
btnLetters.addEventListener('click', () => {
  pianoKeys.forEach(one => {
    one.classList.remove('piano-key-note');
    one.classList.add('piano-key-letter');
    btnNotes.classList.remove('btn-active');
    btnLetters.classList.add('btn-active');
  });
});

const audio = {
  'c': new Audio('assets/audio/c.mp3'),
  'd': new Audio('assets/audio/d.mp3'),
  'e': new Audio('assets/audio/e.mp3'),
  'f': new Audio('assets/audio/f.mp3'),
  'g': new Audio('assets/audio/g.mp3'),
  'a': new Audio('assets/audio/a.mp3'),
  'b': new Audio('assets/audio/b.mp3'),
  'c#': new Audio('assets/audio/c♯.mp3'),
  'd#': new Audio('assets/audio/d♯.mp3'),
  'f#': new Audio('assets/audio/f♯.mp3'),
  'g#': new Audio('assets/audio/g♯.mp3'),
  'a#': new Audio('assets/audio/a♯.mp3')
}

function playAudio(note) {
  audio[note].cloneNode().play();
}


// Mouse events

let pianoKeyClicked = false;

function checkItsPianoKey(one) {
  return one.classList.contains('piano-key');
}

piano.addEventListener('mousedown', e => {
  const one = e.target;
  if (checkItsPianoKey(one)) {
    pianoKeyClicked = true;
    playAudio(one.dataset.note);
    one.classList.add('piano-key-active');
  }
});

piano.addEventListener('mouseup', e => {
  const one = e.target;
  if (checkItsPianoKey(one)) {
    one.classList.remove('piano-key-active');
  }
})

document.addEventListener('mouseup', () => {
  pianoKeyClicked = false;
});

piano.addEventListener('mouseover', e => {
  const one = e.target;
  if (pianoKeyClicked && checkItsPianoKey(one)) {
    if (e.buttons === 1) {
      playAudio(one.dataset.note);
      one.classList.add('piano-key-active');
    }
  }
});

piano.addEventListener('mouseout', e => {
  const one = e.target;
  if (checkItsPianoKey(one)) {
    if (e.buttons === 1) {
      one.classList.remove('piano-key-active');
    }
  }
});


// Keyboard events

const keyToNoteMapping = {
  d: { note: 'c', pianoKey: pianoKeys.find(one => one.dataset.note === 'c') },
  f: { note: 'd', pianoKey: pianoKeys.find(one => one.dataset.note === 'd') },
  g: { note: 'e', pianoKey: pianoKeys.find(one => one.dataset.note === 'e') },
  h: { note: 'f', pianoKey: pianoKeys.find(one => one.dataset.note === 'f') },
  j: { note: 'g', pianoKey: pianoKeys.find(one => one.dataset.note === 'g') },
  k: { note: 'a', pianoKey: pianoKeys.find(one => one.dataset.note === 'a') },
  l: { note: 'b', pianoKey: pianoKeys.find(one => one.dataset.note === 'b') },
  r: { note: 'c#', pianoKey: pianoKeys.find(one => one.dataset.note === 'c#') },
  t: { note: 'd#', pianoKey: pianoKeys.find(one => one.dataset.note === 'd#') },
  u: { note: 'f#', pianoKey: pianoKeys.find(one => one.dataset.note === 'f#') },
  i: { note: 'g#', pianoKey: pianoKeys.find(one => one.dataset.note === 'g#') },
  o: { note: 'a#', pianoKey: pianoKeys.find(one => one.dataset.note === 'a#') }
};

document.addEventListener('keydown', e => {
  const note = keyToNoteMapping[e.key];
  if (note && !e.repeat) {
    playAudio(note.note);
    note.pianoKey.classList.add('piano-key-active');
  }
});

document.addEventListener('keyup', e => {
  const note = keyToNoteMapping[e.key];
  if (note) {
    note.pianoKey.classList.remove('piano-key-active');
  }
});
