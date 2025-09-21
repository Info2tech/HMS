document.querySelector('.sidebar').innerHTML = 
`
<ul class="sidebar-menu">
      <li><a href="../dashboard.html">Dashboard</a></li>

      <li>
        <button class="dropdown-btn department-drop-down-menu">Department
        <!-- <i class="fa fa-caret-down"></i> -->
        </button>
        <div class="dropdown-container">
          <ul>
           <li><a class="department-name"  href="../Department/Emergency.html">Emergency</a></li> 
          <li><a class="department-name" href="../Department/Surgery.html">Surgery</a></li>
          <li><a class="department-name" href="../Department/ICU.html">ICU</a></li>
          <li><a class="department-name" href="../Department/ENT.html">ENT</a></li>
          <li><a class="department-name" href="../Department/Neurology.html">Neurology</a></li>
          <li><a class="department-name" href="../Department/Oncology.html">Oncology</a></li>
          <li><a class="department-name" href="../Department/Gynaecology.html">Gynaecology</a></li>
          <li><a class="department-name" href="../Department/Pediatrics.html">Pediatrics</a></li>
          <li><a class="department-name" href="../Department/Psychiatry.html">Psychiatry</a></li>
          <li><a class="department-name" href="../Department/Orthopaedic.html">Orthopaedic</a></li>
          </ul>
          
        </div>
      </li>

      <li><button class="dropdown-btn department-drop-down-menu">Patients
        <!-- <i class="fa fa-caret-down"></i> -->
        </button>
        <div class="dropdown-container">
          <ul>
           <li><a class="patient"  href="Inpatients.html">Inpatients</a></li> 
          <li><a class="patient" href="Outpatients.html">Outpatients</a></li>
          </ul>
          
        </div></li>
      <li><a href="../Lab Report/Lab_Report.html">Lab Reports</a></li>
      <li><a href="../Room/Room.html">Room</a></li>
      <li><a href="../Billing/Billing.html">Billing</a></li>
    </ul>
`

//add patient page content
document.querySelector('.add-inpatient-overlay').innerHTML = 
`
<div  class="add-inpatient-dropdown-box">
     <p class="add-title">ADD PATIENT</p>
     <div class="patient-detail-ctn">
     <div class="patient-detail" >
       <div>
         <p >Full Name:</p>
         <input type="text" class="patient-name">
       </div>
       <div>
         <p >Age:</p>
         <input type="text" class="patient-age">
       </div>
       <div>
         <p >Contact No.:</p>
         <input type="text" class="patient-phone">
       </div>
       
       <div>
         <p>Date of Admission:</p>
         <input type="date" class="DOA">
       </div>
       </div>
       <div class="patient-detail">
       <div>
         <p >Gender:</p>
         <select  name="patient-sex" id="" class="patient-sex">
           <option value="">Select</option>
           <option value="Male">Male</option>
           <option value="Female">Female</option>
         </select>
       </div>
       <div>
         <p >Disease:</p>
         <input type="text" class="patient-disease">
       </div>
       <div>
         <p >Doctor ID:</p>
         <input type="text" class="patient-doc">
       </div>
       <div>
         <p >Date of Discharge:</p>
         <input type="date" class="DOD">
       </div>
       
       </div>
     </div>
     
     <div class="btn-ctn">
       <button class="add-patient-btn add-inpatient-btn">Save & Submit</button>
     </div>
 </div>
`;


function displayPatientFirstSection(patient_sec){
  document.querySelector('.patient-first-sec').innerHTML = `
  <h1>${patient_sec}</h1>
    <div class="dept-sub-container">
      <input class="search-bar" type="text" class="search-bar" placeholder="Search Patient ID">
      <div>
        <button class="add-patient">Add Patient</button>
        <button class="edit-patient">Edit Patient</button>
      </div>
    </div>
  `
}

const patientList = document.querySelector('.patient-table');
  patientList.innerHTML = `
  <tr>
    <th>Patient ID</th>
    <th>Name</th>
    <th>Age</th>
    <th>Phone</th>
    <th>Sex</th>
    <th>Disease</th>
    <th>Doctor Id</th>
    <th>Date of Admission</th>
    <th>Date of Discharge</th>
    
  </tr>`


function displayInpatientList(Patient) {

  let j = 0;
  Patient.forEach(({patient_id,name,age,phone_no,gender,disease,doctor_id,date_of_admission,date_of_discharge}) => {
    if(date_of_discharge == null){
      date_of_discharge = '--';
    }
    else{
      date_of_discharge = new Date(date_of_discharge).toLocaleDateString();
    }
  
    patientList.innerHTML += `
    <tr>
    <td>${patient_id}</td>
    <td>${name}</td>
    <td>${age}</td>
    <td>${phone_no}</td>
    <td>${gender}</td>
    <td>${disease}</td>
    <td>${doctor_id}</td>
    <td>${new Date(date_of_admission).toLocaleDateString()}</td>
    <td>${date_of_discharge}</td>
    
    </tr>
    `
    j++;
    
  });

  // return j;
}
 
function displayOutPatientList(Patient){
  const patientList = document.querySelector('.outpatient-table');
  patientList.innerHTML = `
  <tr>
    <th>Patient Id</th>
    <th>Name</th>
    <th>Age</th>
    <th>Phone</th>
    <th>Sex</th>
    <th>Disease</th>
    <th>Doctor Id</th>
    <th>Date</th>
  </tr>`

  let j = 0;
  Patient.forEach(({patient_id,name,age,phone_no,gender,disease,doctor_id,date_of_admission})=>{
  
    patientList.innerHTML += `
    <tr>
    <td>${patient_id}</td>
    <td>${name}</td>
    <td>${age}</td>
    <td>${phone_no}</td>
    <td>${gender}</td>
    <td>${disease}</td>
    <td>${doctor_id}</td>
    <td>${new Date(date_of_admission).toLocaleDateString()}</td>
    
    </tr>
    `
    j++;
    
  });

  return j;

}

//toggle add patient overlay
function toggleAddPatientOverlay(class_name){
  console.log(class_name);
  let element = document.querySelector(`.${class_name}`);
  if(element.style.visibility === 'hidden'){
    element.style.visibility = 'visible';
  }
  else{
    element.style.visibility = 'hidden';
  }
}

function getDate(d){
  let date = new Date(d);
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2,'0');
  let day = String(date.getDate()).padStart(2,'0');

  return `${year}-${month}-${day}`;
}

function toggleEditPatientOverlay(class_name){
  let element = document.querySelector(`.${class_name}`);
  if(element.style.visibility === 'hidden'){
    element.style.visibility = 'visible';
  }
  else{
    element.style.visibility = 'hidden';
  }
}
