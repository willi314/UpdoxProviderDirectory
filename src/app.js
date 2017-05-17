var existingData = '['+
    '{"last_name": "Harris", "first_name": "Mike", "email_address": "mharris@updox.com", "specialty": "Pediatrics", "practice_name": "Harris Pediatrics"},' +
    '{"last_name": "Wijoyo", "first_name": "Bimo", "email_address": "bwijoyo@updox.com", "specialty": "Podiatry", "practice_name": "Wijoyo Podiatry"},' +
    '{"last_name": "Rose", "first_name": "Nate", "email_address": "nrose@updox.com", "specialty": "Surgery", "practice_name": "Rose Cutters"},' +
    '{"last_name": "Carlson", "first_name": "Mike", "email_address": "mcarlson@updox.com", "specialty": "Orthopedics", "practice_name": "Carlson Orthopedics"},' +
    '{"last_name": "Witting", "first_name": "Mike", "email_address": "mwitting@updox.com", "specialty": "Pediatrics", "practice_name": "Witting\'s Well Kids Pediatrics"},' +
    '{"last_name": "Juday", "first_name": "Tobin", "email_address": "tjuday@updox.com", "specialty": "General Medicine", "practice_name": "Juday Family Practice"}' +
    ']';
var providerList = JSON.parse(existingData);
$(document).ready(function() {
    for(i = 0; i < providerList.length; i++){
        $("#providerDirectoryTable tbody").append(createTableRowString(providerList, i));
    }
    $("#providerDirectoryTable").tablesorter( {sortList: [[0,0]]});
    $("#providerSubmitButton").click(function(){
        providerList.push({last_name: escapeHtml($("#lastNameInput").val()),
            first_name: escapeHtml($("#firstNameInput").val()),
            email_address: escapeHtml($("#emailAddressInput").val()),
            specialty: escapeHtml($("#specialtyInput").val()),
            practice_name: escapeHtml($("#practiceNameInput").val())});
        $("#providerDirectoryTable tbody").append(createTableRowString(providerList, providerList.length -1));
        $("#providerDirectoryTable").trigger("update");
        $("#providerDirectoryTable").trigger("sorton");
        $("#providerDirectoryTable").tablesorter();
    });
});

function createTableRowString(providerList, providerIndex){
    return "<tr><td>" + providerList[providerIndex].last_name + "</td><td>" +
        providerList[providerIndex].first_name + "</td><td>" +
        providerList[providerIndex].email_address + "</td><td>" +
        providerList[providerIndex].specialty + "</td><td>" +
        providerList[providerIndex].practice_name + "</td></tr>";
}

function escapeHtml(unsafeText) {
    return unsafeText
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

