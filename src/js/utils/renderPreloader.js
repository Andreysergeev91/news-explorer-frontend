export default function renderPreloader(isLoading) {
  if (isLoading) {
    document.querySelector('.preloader').style.display = 'block';

  } else {
    document.querySelector('.preloader').style.display = 'none';
  }
}