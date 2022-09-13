var $photo = document.getElementById('photo');
var $imgSrc = document.querySelector('.placeholderimg');

$photo.addEventListener('input', function () {
  if ($photo.value !== '') {
    $imgSrc.src = $photo.value;
  }
});
