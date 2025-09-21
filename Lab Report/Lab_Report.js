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

// let k = displayLabReportList();
displayLabReportFirstSection();

const reportList = document.querySelector('.lab-report-table');
  
  reportList.innerHTML = 
  `
    
    <th>Report ID</th>
    <th>Patient ID</th>
    <th>Category</th>
    <th>Doctor ID</th>
    <th>Impression</th>
    <th>Report Date</th>
    <th>Amount</th>
    <th>Payment Status</th>
  `

document.addEventListener('DOMContentLoaded',()=>{
  fetch('http://localhost:5000/getLabReport/' )
  .then(response=>response.json())
  .then(data=>displayLabReportList(data['data']));
})
// addReport(LabReport);


  document.querySelector('.add-report-btn').addEventListener('click',()=>{
    let PatientId = document.querySelector('.patientId').value;
    // let PatientIdNum = Number(PatientId);
    let Test = document.querySelector('.test').value;
    let DoctorId = document.querySelector('.doctorId').value;
    // let DoctorIdNum = Number(DoctorId);
    let Impression = document.querySelector('.test-impression').value;
    let Amount = document.querySelector('.report-amount').value;
    let AmountNum = Number(Amount);
    let ReportDate = document.querySelector('.report-date').value;
    let statusIndex = document.querySelector('.payment-status').selectedIndex;
    let PaymentStatus = document.querySelector('.payment-status')[statusIndex].value;

    fetch('http://localhost:5000/insertLabReportData',{
      headers:{
        'content-type':'application/json'
      },
      method:'POST',
      body: JSON.stringify({patient_id:PatientId,category:Test,impression:Impression,report_date:ReportDate,doctor_id:DoctorId,amount:AmountNum,payment_status:PaymentStatus})
    })
    .then(response => response.json())
    .then(data=>console.log(data['data']));
    
    toggleAddLabReportOverlay();
    location.reload();
  });


  document.querySelector('.edit-report').addEventListener('click',()=>{
    toggleEditLabReportOverlay('edit-lab-report-overlay');
  })

  let Report_Id= 0;

  document.querySelector('.edit-report-first-btn').addEventListener('click',()=>{
    Report_Id = Number(document.querySelector('.edit_reportId').value);
    fetch('http://localhost:5000/getIndividualLabReportData/' + Report_Id)
    .then(response=>response.json())
    .then(data=>{
      if(data['data']){
        const {patient_id,category,impression,report_date,doctor_id,amount,payment_status} = data['data'];
        let reportDate = getDate(report_date);
        document.querySelector('.edit-patientId').value = patient_id;
        document.querySelector('.edit-test').value = category;
        document.querySelector('.edit-doctorId').value = doctor_id;
        document.querySelector('.edit-impression').value = impression;
        document.querySelector('.edit-report-date').value = reportDate;
        document.querySelector('.edit-report-amount').value = amount;
        document.querySelector('.edit-payment-status').value = payment_status;

        document.querySelector('.invalid-id').innerHTML = "";
        toggleEditLabReportOverlay('edit-lab-report-overlay-1');
      }
      else{
        document.querySelector('.invalid-id').innerHTML = "Invalid Report ID"
      }
    })

  })

  document.querySelector('.edit-report-btn').addEventListener('click',()=>{
    let PatientId = document.querySelector('.edit-patientId').value;
    let Test = document.querySelector('.edit-test').value;
    let Impression = document.querySelector('.edit-impression').value;
    let DoctorId = document.querySelector('.edit-doctorId').value;
    let Amount = Number(document.querySelector('.edit-report-amount').value );
    let ReportDate = document.querySelector('.edit-report-date').value;
    let statusIndex = document.querySelector('.edit-payment-status').selectedIndex;
    let PaymentStatus = document.querySelector('.edit-payment-status')[statusIndex].value;

    fetch('http://localhost:5000/updateLabReport/',{
      headers:{
        'content-type':'application/json'
      },
      method:'PATCH',
      body:JSON.stringify({
        patient_id : PatientId,
        category:Test,
        impression:Impression,
        report_date:ReportDate,
        doctor_id:DoctorId,
        amount:Amount,
        payment_status:PaymentStatus,
        report_id:Report_Id
      })
    })
    .then(response=>response.json())
    .then(data=>{
      if(data.success){
        toggleEditLabReportOverlay('edit-lab-report-overlay-1');
        toggleEditLabReportOverlay('edit-lab-report-overlay');
        location.reload();
      }
    });

  })

  document.addEventListener('keydown',(event)=>{
    if(event.key == 'Enter'){
      let report_id = document.querySelector('.search-bar').value;
      fetch('http://localhost:5000/getIndividualLabReportData/' + report_id)
    .then(response=>response.json())
    .then(data=>{
      if(data['data'])
      {
        const {report_id,patient_id,category,impression,report_date,doctor_id,amount,payment_status} = data['data']
        reportList.innerHTML = 
            `
            <thead>
          <th>Report ID</th>
          <th>Patient ID</th>
          <th>Category</th>
          <th>Doctor ID</th>
          <th>Impression</th>
          <th>Report Date</th>
          <th>Amount</th>
          <th>Payment Status</th>
          </thead>

          <tr>
      
      <td>${report_id}</td>
      <td>${patient_id}</td>
      <td>${category}</td>
      <td>${doctor_id}</td>
      <td>${impression}</td>
      <td>${new Date(report_date).toLocaleDateString()}</td>
      <td>&#8377 ${amount}</td>
      <td >${payment_status}</td>
    </tr>
        `
      }
      else{
        reportList.innerHTML = 'No result found';
      }
    })
    }
  })


function displayLabReportFirstSection(){
  document.querySelector('.lab-report-first-section').innerHTML=
  `
  <h1>LAB REPORTS</h1>
  <div class="dept-sub-container">
      <input class="search-bar" class="search-bar" type="text" placeholder="Search Report ID">
      <div>
        <button class="add-report" onclick="toggleAddLabReportOverlay()">Add Report</button>
        <button class="edit-report">Edit Report</button>
      </div>
    </div>
  `
}



function displayLabReportList(LabReport){

  
  
  let j = 0;
  LabReport.forEach(({report_id,patient_id,category,impression,report_date,doctor_id,amount,payment_status}) => {
    reportList.innerHTML += `
    <tr>
      
      <td>${report_id}</td>
      <td>${patient_id}</td>
      <td>${category}</td>
      <td>${doctor_id}</td>
      <td>${impression}</td>
      <td>${new Date(report_date).toLocaleDateString()}</td>
      <td>&#8377 ${amount}</td>
      <td >${payment_status}</td>
    </tr>
    `
    j++;
  });


  return j;
}

function getDate(d){
  let date = new Date(d);
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2,'0');
  let day = String(date.getDate()).padStart(2,'0');

  return `${year}-${month}-${day}`;
}

function toggleAddLabReportOverlay() {
  let element = document.querySelector('.add-lab-report-overlay');
  if(element.style.visibility === 'hidden'){
    element.style.visibility = 'visible';
  }
  else{
    element.style.visibility = 'hidden';
  }
}

function toggleEditLabReportOverlay(class_name) {
  let element = document.querySelector(`.${class_name}`);
  if(element.style.visibility === 'hidden'){
    element.style.visibility = 'visible';
  }
  else{
    element.style.visibility = 'hidden';
  }
}


