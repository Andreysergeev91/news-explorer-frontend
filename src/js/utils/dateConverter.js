export default function dateConverter() {
const date = new Date();

return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();

}