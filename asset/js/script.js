   window.onload = function () {
      if (localStorage.getItem("user") === null) {
        window.location.href = 'login.html';
      }
      const theme = localStorage.getItem('theme');
      if (theme) {
        document.body.setAttribute('data-bs-theme', theme);
      }else{
        document.body.removeAttribute('data-bs-theme');
      }
    }
    document.querySelector('#tabs .nav-link.active').click();

    document.querySelector(".navbar-toggler").addEventListener('click', function () {
      const sidebar = document.getElementById('sidebar');
      const content = document.querySelector('.content');
      content.classList.toggle('shift');
    });

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        const orders = document.querySelector('#orders tbody');
        data.forEach(order => {
          orders.innerHTML += `
            <tr>
              <td>${order.id}</td>
              <td>${order.title}</td>
              <td>Customer Name</td>
              <td>${new Date().toLocaleDateString()}</td>
              <td>Shipped</td>
            </tr>
          `;
        });
      });

      fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        const customers = document.querySelector('#customers tbody');
        data.forEach(customer => {
          customers.innerHTML += `
            <tr>
              <td>${customer.id}</td>
              <td>${customer.name}</td>
              <td>${customer.email}</td>
              <td>${customer.phone}</td>
              <td>Active</td>
            </tr>
          `;
        });
      });
      // change user name form local storage
      const userName = document.getElementsByClassName('user-name');
      const user = JSON.parse(localStorage.getItem('user'));
      for (let i = 0; i < userName.length; i++) {
        userName[i].textContent = user.name;
      }
      // setting popup bootstrap dark mode
      document.getElementById('setting').addEventListener('click', function () {
        console.log('setting');
        const setting = document.createElement('div');
        setting.innerHTML = `
          <div class="modal fade" id="settingModal" tabindex="-1" aria-labelledby="settingModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="settingModalLabel">Settings</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="darkModeSwitch">
                    <label class="form-check-label" for="darkModeSwitch">Dark Mode</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        if(localStorage.getItem('theme') === 'dark'){
          setting.querySelector('#darkModeSwitch').checked = true;
        }else{
          setting.querySelector('#darkModeSwitch').checked = false;
        }
        document.body.appendChild(setting);
        const settingModal = new bootstrap.Modal(document.getElementById('settingModal'));
        settingModal.show();
        document.getElementById('darkModeSwitch').addEventListener('click', function () {
          // add attribute data-bs-theme
          if (this.checked) {
            localStorage.setItem('theme', 'dark');
            document.body.setAttribute('data-bs-theme', 'dark');
            document.body.style.color = 'white';
            settingModal.hide();
          } else {
            localStorage.removeItem('theme');
            document.body.removeAttribute('data-bs-theme');
            settingModal.hide();
          }
          document.getElementById('settingModal').remove();

        });
      });
      // sign out
      document.getElementById('signOut').addEventListener('click', function () {
        localStorage.removeItem('user');
        window.location.href = 'login.html';
      });