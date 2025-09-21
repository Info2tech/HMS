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
      <li><a href="Room.html">Room</a></li>
      <li><a href="../Billing/Billing.html">Billing</a></li>
    </ul>
`;



  document.querySelector('.room-first-sec').innerHTML = `
  <h1>ROOM</h1>
    <div class="dept-sub-container">
      <input class="search-bar" type="text" placeholder="Search Room No.">
      <div>
        <button class="assign-room" onclick="toggleRoomOverlay('assign-room-overlay')">Assign Room</button>
        <button class="vacate-room" onclick="toggleRoomOverlay('vacate-room-overlay')">Vacate Room</button>
      </div>
    </div>

  `

  const roomList = document.querySelector('.room-table');
    roomList.innerHTML = 
    `
    <thead>
    <th>Room No.</th>
    <th>Patient ID</th>
    <th>Status</th>
    </thead>
    `;

    document.addEventListener('DOMContentLoaded',()=>{
      fetch('http://localhost:5000/getRoomData' )
      .then(response=>response.json())
      .then(data=>displayRoomList(data['data']));
    })

  document.querySelector('.assign-room-overlay').innerHTML = 
  `
  <div class="assign-room-dropdown-box">
      <p class="add-title">ASSIGN ROOM</p>
      <p>Enter Room Number:</p>
      <input type="text" class="room-no">
      <p>Enter Patient ID:</p>
      <input type="text" class="patientId">
      <div class="btn-ctn">
        <button class="assign-room-btn">Assign Room</button>
      </div>
      <p class="invalid-id"></p>
    </div>
  `

  document.querySelector('.vacate-room-overlay').innerHTML = 
  `
  <div class="vacate-room-dropdown-box">
      <p class="add-title">VACATE ROOM</p>
      <p>Enter Room Number:</p>
      <input type="text" class="vacate-room-no">
      <p>Enter Patient ID:</p>
      <input type="text" class="vacate-PatientId">
      <div class="btn-ctn">
        <button class="vacate-room-btn">Vacate Room</button>
      </div>
      <p class="invalid-room-id"></p>
    </div>
  `

  document.querySelector('.assign-room-btn').addEventListener('click',()=>{
    let RoomNo = Number(document.querySelector('.room-no').value);
    let PatientId = document.querySelector('.patientId').value;

    fetch('http://localhost:5000/getIndRoomData/' + RoomNo)
    .then(response=>response.json())
    .then(data=>{
      if(data['data']){
        const {patient_id,status} = data['data'];
        if(patient_id == null && status == 'Available'){
          fetch('http://localhost:5000/updateRoom',{
            headers:{
              'content-type':'application/json'
            },
            method:'PATCH',
            body:JSON.stringify({
              patient_id:PatientId,
              status:'Occupied',
              room_no: RoomNo
            })
          })
          .then(response=>response.json())
          .then(data=>{
            if(data.success){
              document.querySelector('.invalid-id').innerHTML = '';
              toggleRoomOverlay('assign-room-overlay');
              location.reload();
            }
          })
        }
        else{
          document.querySelector('.invalid-id').innerHTML = 'The Room is Occupied';
        }
      }
      else{
        document.querySelector('.invalid-id').innerHTML = 'Invalid Room No.';
      }
    });
    
  });

  document.querySelector('.vacate-room-btn').addEventListener('click',()=>{
    let RoomNo = Number(document.querySelector('.vacate-room-no').value);
    let PatientId = document.querySelector('.vacate-PatientId').value;
    fetch('http://localhost:5000/getIndRoomData/' + RoomNo)
    .then(response=>response.json())
    .then(data=>{
      if(data['data']){
        const {patient_id,status} = data['data'];
        if(status == 'Occupied'){
          if(patient_id == PatientId)
        {
          fetch('http://localhost:5000/updateRoom',{
            headers:{
              'content-type':'application/json'
            },
            method:'PATCH',
            body:JSON.stringify({
              patient_id:null,
              status:'Available',
              room_no: RoomNo
            })
          })
          .then(response=>response.json())
          .then(data=>{
            if(data.success){
              document.querySelector('.invalid-id').innerHTML = '';
              toggleRoomOverlay('vacate-room-overlay');
              location.reload();
            }
          })
        }
        else{
          
          document.querySelector('.invalid-room-id').innerHTML = 'Invalid Patient ID'
        }
      }else{
        document.querySelector('.invalid-room-id').innerHTML = 'The Room is Vacant';
      }
      }
      else{
        document.querySelector('.invalid-room-id').innerHTML = 'Invalid Room No.';
      }
      
    });
    
  });


  document.addEventListener('keydown',(event)=>{
    if(event.key == 'Enter'){
     let search_roomNo = Number(document.querySelector('.search-bar').value);
     fetch('http://localhost:5000/getIndRoomData/' + search_roomNo)
    .then(response=>response.json())
    .then(data=>{
      if(data['data']){
        const {room_no,status,patient_id} = data['data'];
        document.querySelector('.room-table').innerHTML = 
        `
        <thead>
        <th>Room No.</th>
        <th>Patient ID</th>
        <th>Status</th>
        </thead>

        <tr>
          <td>${room_no}</td>
          <td>${patient_id}</td>
          <td>${status}</td>
        </tr>
        `
      }
      else{
        document.querySelector('.room-table').innerHTML = 'No results found';
      }
    })
    //   const searchList = [];
    //   let flag = false;
    //  Room.forEach(data => {
    //   if(data.RoomNo == search_roomNo){
    //     flag = true;
    //     searchList.push(data);
    //     displayRoomList(searchList);
    //   }
    //  });
    //  if(flag == false){
    //   document.querySelector('.room-table').innerHTML = 'No results found';
    //  }
     }
  });
  


  // displayRoomList(Room);

  function displayRoomList(Rooms){
    

    
    Rooms.forEach(({room_no,status, patient_id})=>{
      roomList.innerHTML += 
      `
      <tr>
      <td>${room_no}</td>
      <td>${patient_id}</td>
      <td>${status}</td>
      </tr>
      `
    })
  }

  function toggleRoomOverlay(class_name){
    let element = document.querySelector(`.${class_name}`);
    if(element.style.visibility === 'hidden'){
      element.style.visibility = 'visible';
    }
    else{
      element.style.visibility = 'hidden';
    }
  }

  
        