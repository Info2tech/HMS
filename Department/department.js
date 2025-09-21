
document.querySelector('.sidebar').innerHTML = `
<ul class="sidebar-menu">
      <li><a href="../dashboard.html">Dashboard</a></li>

      <li>
        <button class="dropdown-btn department-drop-down-menu">Department
        <!-- <i class="fa fa-caret-down"></i> -->
        </button>
        <div class="dropdown-container">
          <ul>
           <li><a class="department-name"  href="Emergency.html">Emergency</a></li> 
          <li><a class="department-name" href="Surgery.html">Surgery</a></li>
          <li><a class="department-name" href="ICU.html">ICU</a></li>
          <li><a class="department-name" href="ENT.html">ENT</a></li>
          <li><a class="department-name" href="Neurology.html">Neurology</a></li>
          <li><a class="department-name" href="Oncology.html">Oncology</a></li>
          <li><a class="department-name" href="Gynaecology.html">Gynaecology</a></li>
          <li><a class="department-name" href="Pediatrics.html">Pediatrics</a></li>
          <li><a class="department-name" href="Psychiatry.html">Psychiatry</a></li>
          <li><a class="department-name" href="Orthopaedic.html">Orthopaedic</a></li>
          </ul>
          
        </div>
      </li>

      <li><button class="dropdown-btn department-drop-down-menu">Patients
        <!-- <i class="fa fa-caret-down"></i> -->
        </button>
        <div class="dropdown-container">
          <ul>
           <li><a class="patient"  href="../Patients/Inpatients.html">Inpatients</a></li> 
          <li><a class="patient" href="../Patients/Outpatients.html">Outpatients</a></li>
          </ul>
          
        </div></li>
      <li><a href="../Lab Report/Lab_Report.html">Lab Reports</a></li>
      <li><a href="../Room/Room.html">Room</a></li>
      <li><a href="../Billing/Billing.html">Billing</a></li>
    </ul>
`
document.querySelector('.header').innerHTML = 
`
<h1 class="header-logo">HMS</h1>
    <a href='../login.html' class="log-out-btn">Log out</a>
`;

//display header section of department

function displayDeptFirstSection(deptName){
  document.querySelector('.dept-first-sec').innerHTML = `
  <h1>${deptName} DEPARTMENT</h1>
    <div class="dept-sub-container">
      <input class="search-bar" type="text" class='search-bar' placeholder="Search Doctor ID">
      <div>
        <button class="add-doctor js-add-doc" onclick="toggleAddDoctorOverlay()">Add Doctor</button>
        <button class="edit-doctor" onclick="toggleEditDoctorOverlay('edit-doc-overlay')">Edit Doctor</button>
      </div>
    </div>
  `
}



//overlay function


function toggleAddDoctorOverlay() {
  let element = document.querySelector('.overlay');
    if(element.style.visibility === 'hidden'){
      element.style.visibility = 'visible';
    }
    else{
      element.style.visibility = 'hidden';
    }
}

function toggleEditDoctorOverlay(class_name) {
  let element = document.querySelector(`.${class_name}`);
    if(element.style.visibility === 'hidden'){
      element.style.visibility = 'visible';
    }
    else{
      element.style.visibility = 'hidden';
    }
}


 //overlay add doctor inner content
document.querySelector('.add-doc-overlay').innerHTML = 
`<div class="add-doc-dropdown-box">
<p class="add-title">ADD DOCTOR</p>
<p>Full Name:</p>
<input type="text" class="doc-name">
<p>Age:</p>
<input type="text" class="doc-age">
<p>Contact No.:</p>
<input type="tel" class="doc-contact">
<p>Email ID:</p>
<input type="text" class="doc-email">
<p>Gender:</p>
<select name="doc-sex" id="" class="doc-sex">
  <option value="">Select</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
</select>
<p>Salary:</p>
<input type="number" class="doc-salary">
<div class="btn-ctn">
  <button class="add-doc-btn js-add-doc-btn">Submit</button>
</div>
</div>`


//edit doctor overlay

document.querySelector('.edit-doc-overlay').innerHTML = 
`
<div class="edit-doc-first-dropdown">
      <p class="edit-title">EDIT DOCTOR</p>
      <p>Enter Doctor ID:</p>
      <input type="text" class="edit_doctorId">
      <div class="btn-ctn">
        <button class="edit-doc-first-btn">Enter</button>
      </div>
      <p class="invalid-id"></p>
    </div>
`;

document.querySelector('.edit-doc-overlay-1').innerHTML = 
`
<div class="edit-doc-second-dropdown">
      <p class="edit-title">EDIT DOCTOR</p>
      <p>Name:</p>
      <input type="text" class="edit-doc-name">
      <p>Age:</p>
      <input type="text" class="edit-doc-age">
      <p>Contact No.:</p>
      <input type="text" class="edit-doc-contact">
      <p>Email ID:</p>
      <input type="text" class="edit-doc-emailid">
      <p>Sex:</p>
      <select name="edit-doc-sex" id="" class="edit-doc-sex">
        <option value="">Select</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <p>Salary:</p>
      <input type="text" class="edit-doc-salary">
      <p>Employment Status</p>
      <select name="edit-emp-status" id="" class="edit-emp-status">
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <div class="btn-ctn">
        <button class="edit-doc-btn">Save</button>
      </div>
      </div>
`

let Doctor_id = "";
//edit doctor

function getEditDoctor(dept_id){
document.querySelector('.edit-doc-first-btn').addEventListener('click',()=>{
  // let count = 0;
  Doctor_id = document.querySelector('.edit_doctorId').value;
  fetch('http://localhost:5000/getIndividualDocData/' + Doctor_id + '/' + dept_id)
  .then(response=>response.json())
  .then(data=>{
    if(data['data']){
    const {doctor_name,phone,email,gender,Age,salary,employee_status} = data['data'];
      document.querySelector('.edit-doc-name').value = doctor_name;
      document.querySelector('.edit-doc-age').value = Age;
      document.querySelector('.edit-doc-contact').value = phone;
      document.querySelector('.edit-doc-emailid').value = email;
      document.querySelector('.edit-doc-sex').value = gender;
      document.querySelector('.edit-doc-salary').value = salary;
      document.querySelector('.edit-emp-status').value = employee_status;

      document.querySelector('.invalid-id').innerHTML = "";
      toggleEditDoctorOverlay('edit-doc-overlay-1');
      
    }
    else{
      document.querySelector('.invalid-id').innerHTML = "Invalid Doctor ID";
    }
  }); 
})
};


  document.querySelector('.edit-doc-btn').addEventListener('click',()=>{
    let Name = document.querySelector('.edit-doc-name').value;
    let Age = document.querySelector('.edit-doc-age').value;
    let Phone = document.querySelector('.edit-doc-contact').value;
    let emailId = document.querySelector('.edit-doc-emailid').value;
    let Sex = document.querySelector('.edit-doc-sex').value;
    let Salary = document.querySelector('.edit-doc-salary').value;
    let statusIndex = document.querySelector('.edit-emp-status').selectedIndex;
    let Employment_Status = document.querySelector('.edit-emp-status')[statusIndex].value;

    fetch('http://localhost:5000/updateDoc/',{
      headers:{
        'content-type':'application/json'
      },
      method:'PATCH',
      body:JSON.stringify({
        doctor_name:Name,
        phone:Phone,
        email:emailId,
        gender:Sex,
        Age:Age,
        salary:Salary,
        employee_status:Employment_Status,
        doctor_id:Doctor_id
      })
    })
    .then(response=>response.json())
    .then(data=>{
      if(data.success){
        toggleEditDoctorOverlay('edit-doc-overlay-1');
        toggleEditDoctorOverlay('edit-doc-overlay');
        location.reload();
      }
    });

  });

  //search

  

//Add doctor

let doctorId = "";
function addDoctor(deptId,deptPrefix){
  let doctor_id = "";
  document.querySelector('.js-add-doc-btn').addEventListener('click',()=>{
    let Name = document.querySelector('.doc-name').value;
    let Age = Number(document.querySelector('.doc-age').value);
    let Phone = document.querySelector('.doc-contact').value;
    let sexIndex = document.querySelector('.doc-sex').selectedIndex;
    let Sex = document.querySelector('.doc-sex')[sexIndex].value;
    let EmailId = document.querySelector('.doc-email').value;
    let Salary = Number(document.querySelector('.doc-salary').value);
    let Employment_Status = 'Active';
    

    fetch('http://localhost:5000/getDoctorCount/' + deptId)
    .then(response=>response.json())
    .then(data=>{let n = data['data']
        n = ++n;
        let id = (n<10)?`00${n}`:(n<100)?`0${n}`:`${n}`;
        doctor_id = `${deptPrefix}${id}`
        console.log(doctor_id);

        fetch('http://localhost:5000/insertDocData',{
          headers:{
            'content-type':'application/json'
          },
          method:'POST',
          body: JSON.stringify({doctor_id:doctor_id,doctor_name:Name,phone:Phone,email:EmailId,gender:Sex,Age:Age,salary:Salary,employee_status:Employment_Status,dept_id:deptId})
        }
        ).then(response => response.json())
        .then(data=>console.log(data['data']));
      });
    
    toggleAddDoctorOverlay();
    location.reload();
  })
}




const doctors = document.querySelector('.department-table');
  doctors.innerHTML = `
  <tr>
    <th>Doctor Id</th>
    <th>Name</th>
    <th>Age</th>
    <th>Phone</th>
    <th>Email ID</th>
    <th>Sex</th>
    <th>Salary</th>
    <th>Employment Status</th>
  </tr>`



//display doctor list

// let n = getNumber();


function displayDoctorList(department) {
  const doctors = document.querySelector('.department-table');

  let j = 0;
  department.forEach(({doctor_id,doctor_name,phone,email,gender,Age,salary,employee_status} )=> {
    
    doctors.innerHTML += `
    <tr>
    <td>${doctor_id}</td>
    <td>${doctor_name}</td>
    <td>${Age}</td>
    <td>${phone}</td>
    <td>${email}</td>
    <td>${gender}</td>
    <td>&#8377 ${salary}</td>
    <td>${employee_status}</td>
    </tr>
    `
    // console.log(++j);
    ++j;
    
  });

}

function searchDoc(dept_id){
  document.addEventListener('keydown',(event)=>{
    if(event.key == 'Enter'){
      let doctor_id = document.querySelector('.search-bar').value;
      fetch('http://localhost:5000/getIndividualDocData/' + doctor_id + '/' + dept_id)
      .then(response=>response.json())
      .then(data=>{
        if(data['data']){
          const {doctor_id,doctor_name,phone,email,gender,Age,salary,employee_status} = data['data'];
          doctors.innerHTML = `
          <thead>
            <th>Doctor Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Email ID</th>
            <th>Sex</th>
            <th>Salary</th>
            <th>Employment Status</th>
          </thead>

          <tr>
          <td>${doctor_id}</td>
          <td>${doctor_name}</td>
          <td>${Age}</td>
          <td>${phone}</td>
          <td>${email}</td>
          <td>${gender}</td>
          <td>&#8377 ${salary}</td>
          <td>${employee_status}</td>
          </tr>
          `
        }
        else{
          doctors.innerHTML = 'No result found';
        }
      })

    }
  })
}
