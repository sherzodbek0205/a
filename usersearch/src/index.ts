
import '../public/style.css';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}
const loader = document.querySelector('.loader')as HTMLDivElement;
const img:HTMLImageElement = document.querySelector('img');
const card:HTMLDivElement = document.querySelector('.card')!;
const names = document.querySelector('.name') as HTMLElement;
const emails = document.querySelector('.email') as HTMLElement;
const addresss = document.querySelector('.address') as HTMLElement;
const phonee = document.querySelector('.phone') as HTMLElement;
const users = document.querySelector('.card-title') as HTMLElement;
const back = document.querySelector('.back') as HTMLButtonElement;
const imgurl: string[] = [
  'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.1.355452321.1701325382&semt=ais',
  'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611704.jpg?w=740&t=st=1701330238~exp=1701330838~hmac=e700e4dead03d3621cc7ca9dc8585fdf6ed0efd26e4d93e4d5b2236eda2ff721',
  'https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436191.jpg?size=626&ext=jpg&ga=GA1.1.355452321.1701325382&semt=ais',
  'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses-green-hair_23-2149436201.jpg?t=st=1701348717~exp=1701349317~hmac=cb0a0f9ed34535e2cf853fe3c5206159569c56d380c6d18e69debee267c771db',
  'https://img.freepik.com/premium-psd/3d-render-cartoon-avatar-isolated_570939-100.jpg?size=626&ext=jpg&ga=GA1.1.355452321.1701325382&semt=sph',
  'https://img.freepik.com/premium-photo/cartoon-character-with-blue-shirt-glasses_561641-2088.jpg?size=626&ext=jpg&ga=GA1.1.355452321.1701325382&semt=sph',
  'https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436185.jpg?size=626&ext=jpg&ga=GA1.1.355452321.1701325382&semt=ais',
  'https://img.freepik.com/premium-photo/character-with-blue-tie-glasses-that-says-pixar_862682-745.jpg?size=626&ext=jpg&ga=GA1.1.355452321.1701325382&semt=sph',
  'https://img.freepik.com/free-photo/3d-illustration-teenage-girl-with-hoodie_1142-32303.jpg?size=626&ext=jpg&ga=GA1.1.355452321.1701325382&semt=sph',
  'https://img.freepik.com/free-photo/boy-with-colorful-haircut-that-has-word-it_1340-41697.jpg?size=626&ext=jpg&ga=GA1.1.355452321.1701325382&semt=sph'
];
const random = Math.floor(Math.random() *5+1);
function fetchData(): Promise<User[]> {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return json;
    });
}
console.log(random);
function createTable(data: User[]): void {
  setTimeout(() => {
    const table = document.createElement('table');


    const headerRow = document.createElement('tr');
    const headers = ['ID', 'Name', 'Username', 'Email', 'Address', 'Phone', 'Action'];
    headers.forEach((header) => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    data.forEach((user) => {
      const row = document.createElement('tr');
      const { id, name, username, email, address, phone } = user;
      console.log('user');
      console.log(user);
      const cells = [id, name, username, email, `${address.street}, ${address.city}`, phone];
      cells.forEach((cell:string) => {
        const td = document.createElement('td');
        td.textContent = cell;
        row.appendChild(td);
      });

      const actionCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete';
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        const deletedId = user.id;
        const deletedAddress = user.address;
        const deletedPhone = user.phone;
        row.remove();

        const randomIndex = Math.floor(Math.random() * data.length);
        const randomUser = data[randomIndex];
        randomUser.id = deletedId;
        randomUser.address = deletedAddress;
        randomUser.phone = deletedPhone;
        console.log(`User ${deletedId} has been deleted. ID ${deletedId}, Address ${JSON.stringify(deletedAddress)}, and Phone ${deletedPhone} are assigned to User ${randomUser.name}`);
      });
      actionCell.appendChild(deleteButton);

      const selectButton = document.createElement('button');
      selectButton.textContent = 'Select';
      selectButton.className = 'select';

      selectButton.addEventListener('click', () => {

        table.style.display = 'none';
        card.style.display = 'block';
        names.innerText = `${user.name}`;
        emails.innerText = `${user.email}`;
        phonee.innerText = `${user.phone}`;
        addresss.innerText = `${user.address.city}`;
        users.innerText = `${user.username} Card`;
        img.src = `${imgurl[user.id-1]}`




      });
      back.addEventListener('click', () => {

      card.style.display = 'none';
      table.style.display = 'block';


      });
      actionCell.appendChild(selectButton);

      row.appendChild(actionCell);

      table.appendChild(row);
    });

    document.body.appendChild(table);
    loader.style.display = 'none';
  }, 5000);

}

fetchData().then((data) => {
  createTable(data);
});