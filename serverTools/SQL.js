/**
 * Created by Rami Khadder on 7/25/2017.
 */
var mysql = require('mysql');
var sqlSecret = require('./secrets/sql_secret.json');

var connection = mysql.createConnection({
  host: sqlSecret.HOST,
  port: sqlSecret.PORT,
  user: sqlSecret.MYSQL_USER,
  password: sqlSecret.MYSQL_PASS,
  database: sqlSecret.DATABASE
});

exports.getUser = function(user, onPostExecute){
  connection.query("SELECT * FROM admin WHERE user='" + user + "'", function(err, result){
    onPostExecute(err, result);
  });
};

exports.updateEmergencyContacts = function (emergencyContact, onPostExecute){
  connection.query("INSERT INTO emergencyContacts (id, first_name, last_name, middle_initial, " +
    "street_address, apartment_unit, city, state, zip_code, primary_phone, alternate_phone, " +
    "relationship) VALUES ('" + emergencyContact.id + "', '" + emergencyContact.firstName + "', '" +
    emergencyContact.lastName + "', '" + emergencyContact.middleInitial + "', '" +
    emergencyContact.streetAddress + "', '" + emergencyContact.apartmentUnit + "', '" +
    emergencyContact.city + "', '" + emergencyContact.state + "', '" + emergencyContact.zipCode + "', '" +
    emergencyContact.primaryPhone + "', '" +  emergencyContact.altPhone + "', '" +
    emergencyContact.relationship + "') " +
    "ON DUPLICATE KEY UPDATE first_name='" + emergencyContact.firstName + "', last_name='" +
    emergencyContact.lastName + "', middle_initial='" + emergencyContact.middleInitial + "', street_address='" +
    emergencyContact.streetAddress + "', apartment_unit='" + emergencyContact.apartmentUnit + "', city='" +
    emergencyContact.city + "', state='" + emergencyContact.state + "', zip_code='" +
    emergencyContact.zipCode + "', primary_phone='" + emergencyContact.primaryPhone + "', alternate_phone='" +
    emergencyContact.altPhone + "', relationship='" + emergencyContact.relationship + "'",
    function(err, rows){
      onPostExecute(err);
  });
};

exports.updatePersonalInformation = function(personalInformation, onPostExecute){
  connection.query("INSERT INTO personalInformation (id, " + "middle_initial, " +
    "street_address, apartment_unit, city, state, zip_code, home_phone, alternate_phone, birthday, " +
    "spouse_name, spouse_employer, spouse_work_phone, computer) VALUES ('" + personalInformation.id + "', '" +
    personalInformation.middleInitial + "', '" + personalInformation.streetAddress + "', '" +
    personalInformation.apartmentUnit + "', '" + personalInformation.city + "', '" +
    personalInformation.state + "', '" + personalInformation.zipCode + "', '" +
    personalInformation.homePhone + "', '" + personalInformation.altPhone + "', '" +
    personalInformation.birthday + "', '" + personalInformation.spouseName + "', '" +
    personalInformation.spouseEmployer + "', '" + personalInformation.spouseWorkPhone + "', '" +
    personalInformation.computer + "') " +
    "ON DUPLICATE KEY UPDATE middle_initial='" + personalInformation.middleInitial + "', street_address='" +
    personalInformation.streetAddress + "', apartment_unit='" + personalInformation.apartmentUnit + "', city='" +
    personalInformation.city + "', state='" + personalInformation.state + "', zip_code='" +
    personalInformation.zipCode + "', home_phone='" + personalInformation.homePhone + "', alternate_phone='" +
    personalInformation.altPhone + "', birthday='" + personalInformation.birthday + "', spouse_name='" +
    personalInformation.spouseName + "', spouse_employer='" + personalInformation.spouseEmployer + "', spouse_work_phone='" +
    personalInformation.spouseWorkPhone + "', computer='" + personalInformation.computer + "'",
    function(err, rows){
      onPostExecute(err);
    });
};
