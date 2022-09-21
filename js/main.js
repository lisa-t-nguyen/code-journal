var $photo = document.getElementById('photo');
var $imgSrc = document.querySelector('.placeholderimg');
var $journalEntry = document.getElementById('journalentry');
var $newButton = document.getElementById('newbutton');
var $navigation = document.querySelector('.navigation');
var $entriesView = document.querySelector('.entriesview');
var $journalEntryView = document.querySelector('.journalentryview');
var $notesArea = document.getElementById('notes');
var $inputTitle = document.getElementById('title');

$photo.addEventListener('input', function () {
  if ($photo.value !== '') {
    $imgSrc.src = $photo.value;
  }
});

$newButton.addEventListener('click', function (event) {
  viewChange('entry-form');
});

$navigation.addEventListener('click', function (event) {
  viewChange('entries');
});

$journalEntry.addEventListener('submit', function (event) {
  event.preventDefault();
  var titleValue = $journalEntry.elements.title.value;
  var photoURL = $journalEntry.elements.photo.value;
  var notesValue = $journalEntry.elements.notes.value;
  var dataID = data.nextEntryId;
  data.nextEntryId++;
  var object = {
    titleValue,
    photoURL,
    notesValue,
    dataID
  };
  data.entries.unshift(object);
  if (data.editing !== null) {
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].dataID === data.editing.dataID) {
        data.entries[i].titleValue = data.editing.titleValue;
        data.entries[i].photoURL = data.editing.photoURL;
        data.entries[i].notesValue = data.editing.notesValue;
      }
    }
  }
  viewChange('entries');
  var newEntry = grabEntry(object);
  ulList.prepend(newEntry);
  $journalEntry.reset();
  $imgSrc.setAttribute('src', '/images/placeholder-image-square.jpg');
});

function grabEntry(object) {
  if (object === null) {
    return;
  }
  var li = document.createElement('li');
  li.classList.add('row');
  li.classList.add('dataID');
  li.setAttribute('data-entry-id', object.dataID);
  var divFirst = document.createElement('div');
  divFirst.classList.add('column-half');
  li.appendChild(divFirst);
  var imgEntry = document.createElement('img');
  imgEntry.src = object.photoURL;
  imgEntry.classList.add('placeimg');
  divFirst.appendChild(imgEntry);
  var divSecond = document.createElement('div');
  divSecond.classList.add('column-half');
  var divThird = document.createElement('div');
  divThird.classList.add('entrybar');
  divThird.classList.add('column-full');
  li.appendChild(divSecond);
  var h1Title = document.createElement('h1');
  h1Title.classList.add('entrytitle');
  h1Title.textContent = object.titleValue;
  divThird.appendChild(h1Title);
  var editIcon = document.createElement('i');
  editIcon.classList.add('fa-sharp', 'fa-solid', 'fa-pen');
  editIcon.setAttribute('id', 'editbutton');
  divThird.appendChild(editIcon);
  divSecond.appendChild(divThird);
  var pElement = document.createElement('p');
  pElement.textContent = object.notesValue;
  divSecond.appendChild(pElement);
  return li;
}

var ulList = document.querySelector('.ullist');

function viewChange(string) {
  data.view = string;
  if (string === 'entry-form') {
    $entriesView.classList.remove('view');
    $entriesView.classList.add('hidden');
    $journalEntryView.classList.remove('hidden');
    $journalEntryView.classList.add('view');
  }
  if (string === 'entries') {
    $entriesView.classList.remove('hidden');
    $entriesView.classList.add('view');
    $journalEntryView.classList.remove('view');
    $journalEntryView.classList.add('hidden');
  }
}

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    var liList = grabEntry(data.entries[i]);
    ulList.append(liList);
  }
  viewChange(data.view);
});

ulList.addEventListener('click', function (event) {
  if (event.target.matches('#editbutton')) {
    var closestTarget = event.target.closest('.dataID');
    var dataEntryID = closestTarget.getAttribute('data-entry-id');
    dataEntryID = Number(dataEntryID);
    for (let i = 0; i < data.entries.length; i++) {
      if (dataEntryID === data.entries[i].dataID) {
        data.editing = data.entries[i];
        viewChange('entry-form');
        $inputTitle.value = data.editing.titleValue;
        $photo.value = data.editing.photoURL;
        $imgSrc.src = data.editing.photoURL;
        $notesArea.value = data.editing.notesValue;
      }
    }
  }
}
);
