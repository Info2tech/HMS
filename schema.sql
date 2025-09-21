CREATE DATABASE  IF NOT EXISTS `hms` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hms`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hms
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS bill;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE bill (
  bill_no int NOT NULL AUTO_INCREMENT,
  patient_id varchar(15) NOT NULL,
  operation_charges int DEFAULT NULL,
  lab_charges int DEFAULT NULL,
  medicine_charges int DEFAULT NULL,
  room_charges int DEFAULT NULL,
  total_bill int NOT NULL,
  payment_status varchar(20) NOT NULL,
  PRIMARY KEY (bill_no),
  KEY patient_id (patient_id),
  CONSTRAINT bill_ibfk_1 FOREIGN KEY (patient_id) REFERENCES patient (patient_id)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES bill WRITE;
/*!40000 ALTER TABLE bill DISABLE KEYS */;
INSERT INTO bill VALUES (1,'INP001',5000,1400,2000,3000,11400,'Paid'),(2,'INP002',7000,2500,1800,2500,13800,'Partially Paid'),(3,'OUTP003',6000,2000,2200,1800,12000,'Unpaid'),(4,'OUTP001',1500,1800,2500,500,6300,'Paid'),(5,'INP003',6200,3000,1800,3000,14000,'Unpaid'),(6,'OUTP005',300,400,500,0,1200,'Paid');
/*!40000 ALTER TABLE bill ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS department;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE department (
  dept_id int NOT NULL,
  dept_name varchar(100) NOT NULL,
  PRIMARY KEY (dept_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES department WRITE;
/*!40000 ALTER TABLE department DISABLE KEYS */;
INSERT INTO department VALUES (1,'Emergency'),(2,'Surgery'),(3,'ICU'),(4,'ENT'),(5,'Neurology'),(6,'Oncology'),(7,'Gynaecology'),(8,'Pediatrics'),(9,'Psychiatry'),(10,'Orthopaedic');
/*!40000 ALTER TABLE department ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS doctor;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE doctor (
  doctor_id varchar(50) NOT NULL,
  doctor_name varchar(100) NOT NULL,
  phone varchar(20) NOT NULL,
  email varchar(100) NOT NULL,
  gender varchar(10) NOT NULL,
  Age int DEFAULT NULL,
  salary int DEFAULT NULL,
  employee_status varchar(20) NOT NULL,
  dept_id int NOT NULL,
  PRIMARY KEY (doctor_id),
  KEY dept_id (dept_id),
  CONSTRAINT doctor_ibfk_1 FOREIGN KEY (dept_id) REFERENCES department (dept_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES doctor WRITE;
/*!40000 ALTER TABLE doctor DISABLE KEYS */;
INSERT INTO doctor VALUES ('EMG001','John Doe','9988763442','johndoe@gmail.com','Male',51,30000,'Active',1),('EMG002','Achal Sharma','9976342312','achalsharma@gmail.com','Male',29,40000,'Active',1),('EMG003','Sathwik Kumar','8976123454','sathwikkumar@gmail.com','Male',34,40000,'Active',1),('EMG004','Soumya','8976123434','soumya@gmail.com','Female',27,40000,'Active',1),('ENT001','Rajesh Patel','9418763441','rajeshpatel@gmail.com','Male',59,50000,'Active',4),('ENT002','Mamatha Shetty','8974324511','mamathashetty@gmail.com','Female',45,60000,'Active',4),('GYN001','Meera Malhotra','1098765433','meera@gmail.com','Female',31,50000,'Active',7),('GYN002','Shreya Nayak','8976543412','shreyanayak@gmail.com','Female',60,30000,'Active',7),('ICU001','Kristen Dsouza','9918763441','kristendsouza@gmail.com','Male',40,30000,'Active',3),('ICU002','Reenal Zeena','8767435432','reenalzeena@gmail.com','Female',45,30000,'Active',3),('NEU001','Sunita Khan','9418763442','sunitha@gmail.com','Female',45,50000,'Active',5),('NEU002','Sunil Mehta','9678342312','sunilmehta@gmail.com','Male',39,40000,'Active',5),('ONC001','Kartik Mishra','3210987655','karthikmishra@gmail.com','Male',32,60000,'Active',6),('ONC002','Krishnaraj','8674543421','krishnaraj@gmail.com','Male',40,30000,'Active',6),('ORT001','Anusha Gupta','9418763441','anusha@gmail.com','Female',43,50000,'Active',10),('PED001','Ravi Verma','0987654322','raviverma@gmail.com','Male',40,40000,'Active',8),('PSY001','Neha Joshi','9418763441','nehajoshi@gmail.com','Female',60,50000,'Active',9),('SUR001','Rohan Reddy','9988763441','rohanreddy@gmail.com','Male',55,40000,'Active',2),('SUR002','Priya Singh','9988767442','priyasingh@gmail.com','Female',55,40000,'Inactive',2);
/*!40000 ALTER TABLE doctor ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lab_report`
--

DROP TABLE IF EXISTS lab_report;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE lab_report (
  report_id int NOT NULL AUTO_INCREMENT,
  patient_id varchar(15) NOT NULL,
  category varchar(20) NOT NULL,
  impression varchar(255) NOT NULL,
  report_date date NOT NULL,
  doctor_id varchar(15) NOT NULL,
  amount int NOT NULL,
  payment_status varchar(20) NOT NULL,
  PRIMARY KEY (report_id),
  KEY patient_id (patient_id),
  KEY doctor_id (doctor_id),
  CONSTRAINT lab_report_ibfk_1 FOREIGN KEY (patient_id) REFERENCES patient (patient_id),
  CONSTRAINT lab_report_ibfk_2 FOREIGN KEY (doctor_id) REFERENCES doctor (doctor_id)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lab_report`
--

LOCK TABLES lab_report WRITE;
/*!40000 ALTER TABLE lab_report DISABLE KEYS */;
INSERT INTO lab_report VALUES (1,'OUTP001','Blood Test','Normal','2024-02-21','ORT001',1500,'Paid'),(2,'INP002','MRI','Inflammation detected','2024-02-24','ORT001',2500,'Paid'),(3,'INP003','X-ray','Fracture confirmed','2024-02-23','ONC001',2000,'Unpaid'),(4,'OUTP002','Blood Test','High sugar level','2024-02-22','ENT001',1800,'Paid'),(5,'OUTP003','CT Scan','No abnormalities found','2024-02-21','ONC001',3000,'Paid'),(6,'INP006','CT Scan','Epilepsy','2024-02-25','NEU002',600,'Paid'),(7,'OUTP005','CBC','Cold','2024-03-28','EMG001',400,'Paid');
/*!40000 ALTER TABLE lab_report ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS patient;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE patient (
  patient_id varchar(15) NOT NULL,
  `name` varchar(20) NOT NULL,
  age int NOT NULL,
  phone_no varchar(20) NOT NULL,
  gender varchar(10) NOT NULL,
  disease varchar(20) NOT NULL,
  doctor_id varchar(50) NOT NULL,
  date_of_admission date NOT NULL,
  date_of_discharge date DEFAULT NULL,
  category varchar(20) NOT NULL,
  PRIMARY KEY (patient_id),
  KEY doctor_id (doctor_id),
  CONSTRAINT patient_ibfk_1 FOREIGN KEY (doctor_id) REFERENCES doctor (doctor_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES patient WRITE;
/*!40000 ALTER TABLE patient DISABLE KEYS */;
INSERT INTO patient VALUES ('INP001','Ramesh Sharma',45,'9876543210','Male','Cancer','NEU001','2024-02-25','2024-03-01','Inpatient'),('INP002','Priya Patel',28,'8765432108','Female','Appendicitis','EMG001','2024-02-24',NULL,'Inpatient'),('INP003','Amit Kumar',32,'7654321098','Male','Fractured leg','EMG001','2024-02-23','2024-03-02','Inpatient'),('INP004','Joel Grover',25,'8975431212','Female','STD','PED001','2024-02-26','2024-03-07','Inpatient'),('INP005','Hariprasad',35,'9676543212','Male','Alzheimer','NEU001','2024-03-07',NULL,'Inpatient'),('INP006','Meagan Dsouza',25,'6754878833','Female','Epilepsy','NEU001','2024-02-26',NULL,'Inpatient'),('OUTP001','Sunita Devi',51,'6543210987','Female','Fever','PED001','2024-02-22',NULL,'Outpatient'),('OUTP002','Rajesh Singh',35,'5432109876','Male','Migraine','PED001','2024-02-21',NULL,'Outpatient'),('OUTP003','Deepika Sharma',22,'4321098765','Female','Allergy','PED001','2024-02-20',NULL,'Outpatient'),('OUTP004','Surya Kumar',35,'8756431223','Male','Fever','PED001','2024-03-04',NULL,'Outpatient'),('OUTP005','Ajay Dev',30,'9876543212','Male','Cold','EMG002','2024-02-28',NULL,'Outpatient');
/*!40000 ALTER TABLE patient ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS room;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE room (
  room_no int NOT NULL,
  `status` varchar(20) NOT NULL,
  patient_id varchar(15) DEFAULT NULL,
  PRIMARY KEY (room_no),
  KEY patient_id (patient_id),
  CONSTRAINT room_ibfk_1 FOREIGN KEY (patient_id) REFERENCES patient (patient_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES room WRITE;
/*!40000 ALTER TABLE room DISABLE KEYS */;
INSERT INTO room VALUES (101,'Occupied','INP001'),(102,'Occupied','INP005'),(103,'Occupied','INP002'),(104,'Occupied','INP003'),(105,'Available',NULL);
/*!40000 ALTER TABLE room ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS user;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  user_id varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  email_id varchar(45) NOT NULL,
  PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES user WRITE;
/*!40000 ALTER TABLE user DISABLE KEYS */;
INSERT INTO user VALUES ('admin','admin@123','dsouzacleon90@gmail.com');
/*!40000 ALTER TABLE user ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-18 18:48:01
