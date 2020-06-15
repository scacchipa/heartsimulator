import _ from 'lodash';

  function component() {
    const element = document.createElement('div');

   // Lodash, now imported by this script
    element.innerHTML = ('HELLO WORLDs');

    return element;
  }

  document.body.appendChild(component());