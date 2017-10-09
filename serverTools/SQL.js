/**
 * Created by Rami Khadder on 7/25/2017.
 */
var mysql = require('mysql');
var sqlSecret = require('./secrets/sql_secret.json');

var sql_config = {
  host: sqlSecret.HOST,
  port: sqlSecret.PORT,
  user: sqlSecret.MYSQL_USER,
  password: sqlSecret.MYSQL_PASS,
  database: sqlSecret.DATABASE,
  multipleStatements: true
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(sql_config);

  connection.connect(function (err) {              // The server is either down
    if (err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function (err) {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();


exports.getUser = function(user, onPostExecute){
  connection.query("SELECT * FROM admin WHERE user='" + user + "'", function(err, result){
    onPostExecute(err, result);
  });
};

exports.getProjectManagers = function(projectId, onPostExecute) {
  connection.query("SELECT e.email " +
    "FROM employees e " +
    "RIGHT OUTER JOIN assignments a ON a.project_id = " + projectId + " AND e.id = a.user_id " +
    "WHERE a.deactivated = 0 " +
    "AND a.is_project_manager = 1 " +
    "AND e.is_active = 1", function (err, result) {
    onPostExecute(err, result);
  })
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

exports.getInformationAndContacts = function (callback) {
  connection.query('SELECT e.id, e.email, e.first_name, e.last_name, ' +
    'p.middle_initial, p.street_address as p_street_address, p.apartment_unit as p_apartment_unit, ' +
    'p.city as p_city, p.state as p_state, p.zip_code as p_zip_code, p.home_phone as p_home_phone, ' +
    'p.alternate_phone as p_alternate_phone, p.birthday, p.spouse_name, p.spouse_employer, p.spouse_work_phone, ' +
    'p.computer, ec.first_name as ec_first_name, ec.last_name as ec_last_name, ec.middle_initial as ec_middle_initial, ' +
    'ec.street_address as ec_street_address, ec.apartment_unit as ec_apartment_unit, ec.city as ec_city, ' +
    'ec.state as ec_state, ec.zip_code as ec_zip_code, ec.primary_phone as ec_primary_phone, ' +
    'ec.alternate_phone as ec_alternate_phone, ec.relationship FROM employees e ' +
    'LEFT OUTER JOIN personalInformation p ON e.id = p.id ' +
    'LEFT OUTER JOIN emergencyContacts ec ON e.id = ec.id ' +
    'WHERE e.is_active = 1 ' +
    'AND p.street_address IS NOT NULL ' +
    'ORDER BY e.last_name', function (err, result) {
      callback(err, result);
  })
};
