export function monthReplacer(str) {
  switch (str) {
    case '-01-':
      str = 'января';
      break;
    case '-02-':
      str = 'февраля';
      break;
    case '-03-':
      str = 'марта';
      break;
    case '-04-':
      str = 'апреля';
      break;
    case '-05-':
      str = 'мая';
      break;
    case '-06-':
      str = 'июня';
      break;
    case '-07-':
      str = 'июля';
      break;
    case '-08-':
      str = 'августа';
      break;
    case '-09-':
      str = 'сентября';
      break;
    case '-10-':
      str = 'октября';
      break;
    case '-11-':
      str = 'ноября';
      break;
    case '12':
      str = 'декабря';

  }
  return str

}


export function converter(str) {
  let date = str.substr(0,10);
  let result = `${date[8]}${date[9]||''} ${date.substr(4,4).replace(/\-\d\d\-/, monthReplacer)} ${str.substr(0,4)}`
  return result
}