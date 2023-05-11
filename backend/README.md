## Schemas Reference

### Account Schema

* **email: (String, required)** email of the account
* **password: (String, required)** password of the account
* **isDoctor: (Boolean, required)** whether the account belongs to a doctor or a patient
* **patient: (ObjectId, ref: 'Patient')** reference to a patient if the account is for a patient
* **doctor: (ObjectId, ref: 'Doctor')** reference to a doctor if the account is for a doctor

### Appointment Schema

* **doctor: (ObjectId, ref: 'Doctor', required)** reference to the doctor associated with the appointment
* **patient: (ObjectId, ref: 'Patient', required)** reference to the patient associated with the appointment
* **startTime: (Date, required)** start time of the appointment
* **endTime: (Date, required)** end time of the appointment
* **reason: (String, required)** reason for the appointment

### Doctor Schema

* **firstName: (String, required)** first name of the doctor
* **lastName: (String, required)** last name of the doctor
* **specialty: (String, required)** specialty of the doctor
* **appointments: (Array of ObjectId, ref: 'Appointment')** array of references to appointments associated with the doctor

### Health Data Schema

* **patient: (ObjectId, ref: 'Patient', required)** reference to the patient associated with the health data
* **date: (Date, required)** date of the health data measurement
* **type: (String, enum: ['steps', 'sleep', 'heartRate', 'bloodPressure'], required)** type of health data measurement
* **value: (Number, required)** value of the health data measurement

### Medical Record Schema

* **patient: (ObjectId, ref: 'Patient', required)** reference to the patient associated with the medical record
* **date: (Date, required)** date of the medical record entry
* **description: (String, required)** description of the medical record entry
* **medications: (Array of String, required)** array of medications prescribed to the patient
* **allergies: (Array of String, required)** array of allergies of the patient

### Patient Schema

* **firstName: (String, required)** first name of the patient
* **lastName: (String, required)** last name of the patient
* **dateOfBirth: (Date, required)** date of birth of the patient
* **gender: (String, enum: ['male', 'female', 'other'], required)** gender of the patient
* **phone: (String, required)** phone number of the patient
* **address: (String, required)** address of the patient
* **appointments: (Array of ObjectId, ref: 'Appointment')** array of references to appointments associated with the patient
* **reminders: (Array of ObjectId, ref: 'Reminder')** array of references to reminders associated with the patient
* **healthData: (Array of ObjectId, ref: 'HealthData')** array of references to health data associated with the patient

### Prescription Schema

* **patient: (ObjectId, ref: 'Patient', required)** reference to the patient associated with the prescription
* **date: (Date, required)** date of the prescription
* **medication: (String, required)** name of the medication prescribed
* **dosage: (String, required)** dosage of the medication prescribed
* **instructions: (String, required)** instructions for taking the medication prescribed
* **refills: (Number, required)** number of refills of the prescription
* **refillDate: (Date, required)** date of the next refill of the prescription

### Reminder Schema

* **patient: (ObjectId, ref: 'Patient', required)** reference to the patient associated with the reminder
* **reminderType: (String, enum: ['appointment', 'medication', 'other'], required)** type of the reminder
* **title: (String, required)** title of the reminder
* **description: (String, required)** description of the reminder
* **date: (Date, required)** date of the reminder
* **time: (String, required)** time of the reminder
* **isCompleted: (Boolean, required, default: false)** indicates whether the reminder has been completed

### Consultation Schema

The consultation schema describes the consultation object, which is used to store information about medical consultations.

* **date: (Date, required)** The date of the consultation.
* **duration: (Number, required)** The duration of the consultation, in hours.
* **notes: (String, maxlength: 1000)** Any notes about the consultation.

### Feedback Schema

The feedback schema describes the feedback object, which is used to store feedback provided by patients.

* **title: (String, required)** The title of the feedback.
* **content: (String, required)** The content of the feedback.
* **createdAt: (Date)** The timestamp of when the feedback was created.
* **updatedAt: (Date)** The timestamp of when the feedback was last updated.


## API Reference

#### /api/auth

* `POST /login` : Authenticates a user and returns a JWT token.
* `POST /register` : Registers a new user and returns a JWT token.
* `POST /me` : Returns the current user.

#### /api/appointments

* `GET /appointments` : Retrieves a list of available appointment slots.
* `POST /appointments` : Reserves a new appointment.
* `PUT /appointments/{id}` : Updates an existing appointment by its ID.
* `DELETE /appointments/{id}` : Cancels an existing appointment by its ID.

#### /api/patients

###### patients

* `GET /patients` : Retrieves a list of patients.
* `POST /patients` : Creates a new patient.
* `PUT /patients/{id}` : Updates an existing patient by their ID.
* `DELETE /patients/{id}` : Deletes an existing patient by their ID.

###### medical records

* `GET /patients/{id}/records` : Retrieves a patient's medical records by their ID.
* `PUT /patients/{id}/records` : Updates a patient's medical records by their ID.
* `POST /patients/{id}/records` : Creates a new medical record for a patient by their ID.
* `DELETE /patients/{id}/records/{record_id}` : Deletes a specific medical record for a patient by their ID and record ID.

###### prescriptions, reminders, health data

* `GET /patients/{id}/prescriptions` : Retrieves a patient's prescriptions by their ID.
* `POST /patients/{id}/prescriptions` : Creates a new prescription for a patient by their ID.
* `PUT /patients/{id}/prescriptions/{prescription_id}` : Updates a specific prescription for a patient by their ID and prescription ID.
* `DELETE /patients/{id}/prescriptions/{prescription_id}` : Deletes a specific prescription for a patient by their ID and prescription ID.
* `GET /patients/{id}/reminders` : Retrieves a patient's reminders by their ID.
* `POST /patients/{id}/reminders` : Creates a new reminder for a patient by their ID.
* `PUT /patients/{id}/reminders/{reminder_id}` : Updates a specific reminder for a patient by their ID and reminder ID.
* `DELETE /patients/{id}/reminders/{reminder_id}` : Deletes a specific reminder for a patient by their ID and reminder ID.
* `GET /patients/{id}/health-data` : Retrieves a patient's health data by their ID.
* `POST /patients/{id}/health-data` : Creates new health data for a patient by their ID.
* `PUT /patients/{id}/health-data/{data_id}` : Updates specific health data for a patient by their ID and data ID.
* `DELETE /patients/{id}/health-data/{data_id}` : Deletes specific health data for a patient by their ID and data ID.

#### /api/consultations

* `GET /consultations` : Retrieves a list of available consultation sessions.
* `POST /consultations` : Creates a new consultation session.
* `PUT /consultations/{id}` : Updates an existing consultation session by its ID.
* `DELETE /consultations/{id}` : Cancels an existing consultation session by its ID.

#### /api/feedback

* `GET /feedback` : Retrieves all feedback.
* `POST /feedback` : Creates new feedback.
* `GET /feedback/{id}` : Retrieves specific feedback by its ID.
* `PUT /feedback/{id}` : Updates specific feedback by its ID.
* `DELETE /feedback/{id}` : Deletes specific feedback by its ID.

#### /api/doctors

* `GET /doctors` : Retrieves a list of doctors.
* `POST /doctors` : Creates a new doctor.
* `PUT /doctors/{id}` : Updates an existing doctor by their ID.
* `DELETE /doctors/{id}` : Deletes an existing doctor by their ID.
