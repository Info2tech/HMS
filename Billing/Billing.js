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
           <li><a class="patient"  href="../Patients/Inpatients.html">Inpatients</a></li> 
          <li><a class="patient" href="../Patients/Outpatients.html">Outpatients</a></li>
          </ul>
          
        </div></li>
      <li><a href="../Lab Report/Lab_Report.html">Lab Reports</a></li>
      <li><a href="../Room/Room.html">Room</a></li>
      <li><a href="Billing.html">Billing</a></li>
    </ul>
`

displayBillingFirstSection();
const billingList = document.querySelector('.billing-table');

  billingList.innerHTML = 
  `
    <th>Bill No.</th>
    <th>Patient ID</th>
    <th>Room Charges</th>
    <th>Operation Charges</th>
    <th>Lab Charges</th>
    <th>Medicine Charges</th>
    <th>Total Bill</th>
    <th>Status</th>
  `

  document.addEventListener('DOMContentLoaded',()=>{
    fetch('http://localhost:5000/getBillingData' )
    .then(response=>response.json())
    .then(data=>displayBillingList(data['data']));
  })

// let k= displayBillingList()

document.querySelector('.add-bill-overlay').innerHTML =
`
<div class="add-bill-dropdown-box">
<p class="add-title">ADD BILL</p>
<p>Patient ID:</p>
<input type="text" class="patientId">
<p>Room Charge:</p>
<input type="text" class="room-charge">
<p>Operation Charge:</p>
<input type="text" class="operation-charge">
<p>Lab Charge:</p>
<input type="text" class="lab-charge">
<p>Medicine Charge:</p>
<input type="text" class="medicine-charge">
<p>Payment Status:</p>
<select name="status" id="" class="payment-status">
      <option value="Paid">Paid</option>
      <option value="Partially Paid">Partially Paid</option>
      <option value="Unpaid">Unpaid</option>
</select>

<div class="btn-ctn">
  <button class="add-bill-btn">Save & Submit</button>
</div>
</div>
`;



document.querySelector('.edit-bill').addEventListener('click',()=>{
  toggleEditBillOverlay('edit-bill-overlay');
});

let Patient_Id ="";
document.querySelector('.edit-bill-first-btn').addEventListener('click',()=>{
  Patient_Id = document.querySelector('.edit_patientId').value;
  fetch('http://localhost:5000/getIndividualBillData/' + Patient_Id)
  .then(response=>response.json())
  .then(data=>{
    if(data['data']){
      const {operation_charges,lab_charges,medicine_charges,room_charges,payment_status} = data['data'];
      document.querySelector('.edit-room-charge').value = room_charges;
      document.querySelector('.edit-operation-charge').value = operation_charges;
      document.querySelector('.edit-lab-charge').value = lab_charges;
      document.querySelector('.edit-medicine-charge').value = medicine_charges;
      document.querySelector('.edit-payment-status').value = payment_status;

      document.querySelector('.invalid-id').innerHTML = "";
      toggleEditBillOverlay('edit-bill-overlay-1');
    }
    else{
      document.querySelector('.invalid-id').innerHTML = "Invalid Patient ID";
    }
  })
});

document.querySelector('.edit-bill-btn').addEventListener('click',()=>{
  let Room_Charges = Number(document.querySelector('.edit-room-charge').value);
  let Operation_Charges = Number(document.querySelector('.edit-operation-charge').value);
  let Lab_Charges = Number(document.querySelector('.edit-lab-charge').value);
  let Medicine_Charges = Number(document.querySelector('.edit-medicine-charge').value);
  let statusIndex = document.querySelector('.edit-payment-status').selectedIndex;
    let Payment_Status = document.querySelector('.edit-payment-status')[statusIndex].value;
  let total_bill = Room_Charges + Operation_Charges + Lab_Charges + Medicine_Charges;

  fetch('http://localhost:5000/updateBill/',{
      headers:{
        'content-type':'application/json'
      },
      method:'PATCH',
      body:JSON.stringify({
        operation_charges:Operation_Charges,
        lab_charges:Lab_Charges,
        medicine_charges:Medicine_Charges,
        room_charges:Room_Charges,
        total_bill:total_bill,
        payment_status:Payment_Status,
        patient_id:Patient_Id
      })
    })
    .then(response=>response.json())
    .then(data=>{
      if(data.success){
        toggleEditBillOverlay('edit-bill-overlay-1');
        toggleEditBillOverlay('edit-bill-overlay');
        location.reload();
      }
    });

    // Bills.forEach(data=>{
    //   if(data.PatientId == Patient_Id){
    //     data.Room_Charges = Room_Charges;
    //     data.Operation_Charges = Operation_Charges;
    //     data.Lab_Charges = Lab_Charges;
    //     data.Medicine_Charges = Medicine_Charges;
    //     data.Payment_Status = Payment_Status;
    //     displayBillingList();
    //     toggleEditBillOverlay('edit-bill-overlay-1');
    //     toggleEditBillOverlay('edit-bill-overlay');
    //   }
    // })

})

document.querySelector('.add-bill-btn').addEventListener('click',()=>{
  let PatientId = document.querySelector('.patientId').value;
  let Room_Charges = Number(document.querySelector('.room-charge').value);
  let Operation_Charges = Number(document.querySelector('.operation-charge').value);
  let Lab_Charges = Number(document.querySelector('.lab-charge').value);
  let Medicine_Charges = Number(document.querySelector('.medicine-charge').value);
  let statusIndex = document.querySelector('.payment-status').selectedIndex;
  let Payment_Status = document.querySelector('.payment-status')[statusIndex].value;

  let total_bill = Operation_Charges+Lab_Charges+Medicine_Charges+Room_Charges;
  fetch('http://localhost:5000/insertBillData',{
      headers:{
        'content-type':'application/json'
      },
      method:'POST',
      body: JSON.stringify({patient_id:PatientId,operation_charges:Operation_Charges,lab_charges:Lab_Charges,medicine_charges:Medicine_Charges,room_charges:Room_Charges,total_bill:total_bill,payment_status:Payment_Status})
    })
    .then(response => response.json())
    .then(data=>console.log(data['data']));

    
    toggleAddBillOverlay();
    location.reload();
});

document.addEventListener('keydown',(event)=>{
  if(event.key == 'Enter'){
    let patient_id = document.querySelector('.search-bar').value;
    fetch('http://localhost:5000/getIndividualBillData/' + patient_id)
  .then(response=>response.json())
  .then(data=>{
    if(data['data']){
      const {bill_no,patient_id,operation_charges,lab_charges,medicine_charges,room_charges,total_bill,payment_status} = data['data']
      billingList.innerHTML = 
  `
    <thead>
    <th>Bill No.</th>
    <th>Patient ID</th>
    <th>Room Charges</th>
    <th>Operation Charges</th>
    <th>Lab Charges</th>
    <th>Medicine Charges</th>
    <th>Total Bill</th>
    <th>Status</th>
    </thead>

    <tr>
      <td>${bill_no}</td>
      <td>${patient_id}</td>
      <td>&#8377 ${room_charges}</td>
      <td>&#8377 ${operation_charges}</td>
      <td>&#8377 ${lab_charges}</td>
      <td>&#8377 ${medicine_charges}</td>
      <td>&#8377 ${total_bill}</td>
      <td>${payment_status}</td>
    </tr>
  `
    }
    else{
      billingList.innerHTML = "No result found";
    }
  })
  }
})




function displayBillingFirstSection(){
  document.querySelector('.billing-first-sec').innerHTML = `
  <h1>BILLING</h1>
    <div class="dept-sub-container">
      <input class="search-bar" type="text" class="search-bar" placeholder="Search Patient ID">
      <div>
        <button class="add-bill" onclick="toggleAddBillOverlay()">Add Bill</button>
        <button class="edit-bill">Edit Bill</button>
      </div>
    </div>
  `
}

function displayBillingList(Bills) {
  
  let j = 0;
  Bills.forEach(({bill_no,patient_id,operation_charges,lab_charges,medicine_charges,room_charges,total_bill,payment_status}) => {
    billingList.innerHTML += 
    `
    <tr>
      <td>${bill_no}</td>
      <td>${patient_id}</td>
      <td>&#8377 ${room_charges}</td>
      <td>&#8377 ${operation_charges}</td>
      <td>&#8377 ${lab_charges}</td>
      <td>&#8377 ${medicine_charges}</td>
      <td>&#8377 ${total_bill}</td>
      <td>${payment_status}</td>
    </tr>
    `
    j++;
  });
  return j;

}

function toggleAddBillOverlay() {
  let element = document.querySelector('.add-bill-overlay');
  if(element.style.visibility === 'hidden'){
    element.style.visibility = 'visible';
  }
  else{
    element.style.visibility = 'hidden';
  }
}

function toggleEditBillOverlay(class_name) {
  let element = document.querySelector(`.${class_name}`);
  const childElement = element.children[0];
  if(element.style.visibility === 'hidden'){
    element.style.visibility = 'visible';
    
  }
  else{
    element.style.visibility = 'hidden';
    
  }

  
  console.log(childElement);
  
}