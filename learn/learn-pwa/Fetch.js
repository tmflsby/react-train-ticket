const xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log('XMLHttpRequest', xhr.response);
    }
  }
};

xhr.open('GET', '/userinfo.json', true);

xhr.send(null);


const req = new Request('/userinfo.json', {
  method: 'GET',
  // body
  headers: new Headers(),
  credentials: 'include'
});
fetch(req).then(response => response.json())
  .then(info => {
    console.log('fetch', info);
  });
