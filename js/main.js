var $photo = document.getElementById('photo');
var $imgSrc = document.querySelector('.placeholderimg');
var $journalEntry = document.getElementById('journalentry');

$photo.addEventListener('input', function () {
  if ($photo.value !== '') {
    $imgSrc.src = $photo.value;
  }
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
  $journalEntry.reset();
  $imgSrc.setAttribute('src', '/images/placeholder-image-square.jpg');
});
