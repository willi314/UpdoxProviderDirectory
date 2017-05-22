var existingData = '['+
    '{"last_name": "Harris", "first_name": "Mike", "email_address": "mharris@updox.com", "specialty": "Pediatrics", "practice_name": "Harris Pediatrics"},' +
    '{"last_name": "Wijoyo", "first_name": "Bimo", "email_address": "bwijoyo@updox.com", "specialty": "Podiatry", "practice_name": "Wijoyo Podiatry"},' +
    '{"last_name": "Rose", "first_name": "Nate", "email_address": "nrose@updox.com", "specialty": "Surgery", "practice_name": "Rose Cutters"},' +
    '{"last_name": "Carlson", "first_name": "Mike", "email_address": "mcarlson@updox.com", "specialty": "Orthopedics", "practice_name": "Carlson Orthopedics"},' +
    '{"last_name": "Witting", "first_name": "Mike", "email_address": "mwitting@updox.com", "specialty": "Pediatrics", "practice_name": "Witting\'s Well Kids Pediatrics"},' +
    '{"last_name": "Juday", "first_name": "Tobin", "email_address": "tjuday@updox.com", "specialty": "General Medicine", "practice_name": "Juday Family Practice"}' +
    ']';
var providerList = JSON.parse(existingData);
var sortProperty = "last_name";

$(document).ready(function() {
    var providerDirectoryList = $("#providerList");
    generateProviderList(providerDirectoryList);

    $('#sortDropDown').change(function() {
        sortProperty = $("#sortDropDown").val();
        sortAndGenerateProviderList(providerDirectoryList);
        $("#sortDropDown").val("sort_by");

    });

    $("#sortDirectionCheckbox").change(function(){
        sortAndGenerateProviderList(providerDirectoryList);
    });

    $("#removeSelectedButton").click(function(){
        for(var i = 0; i < providerList.length; i++){
            var listIndexIsChecked = providerDirectoryList.find("li").eq(i).find("input").is(":checked");
            if(listIndexIsChecked){
                providerList.splice(i, 1);
                providerDirectoryList.find("li").eq(i).remove();
                i--;
            }
        }
    });

    $("#providerSubmitButton").click(function(){
        var newProvider = {last_name: escapeHtml($("#lastNameInput").val()),
            first_name: escapeHtml($("#firstNameInput").val()),
            email_address: escapeHtml($("#emailAddressInput").val()),
            specialty: escapeHtml($("#specialtyInput").val()),
            practice_name: escapeHtml($("#practiceNameInput").val())};
        if (/\S/.test(newProvider.last_name) && /\S/.test(newProvider.first_name) && /\S/.test(newProvider.email_address)) {
            providerList.push(newProvider);
            providerList.sort(dynamicSort(sortProperty));
            providerDirectoryList.empty();
            generateProviderList(providerDirectoryList);
        }
        else{
            alert("First name, last name, and email address fields cannot be empty.");
        }
    });
});

function createListElementString(providerList, providerIndex){
    return "<li>" +
        "<div class=\"providerListElement\">" +
        "<div class=\"providerListCheckboxHolder\"><input type=\"checkbox\"></div>" +
        "<div class=\"providerListElementLeftColumn\">" +
        "<h3>" + providerList[providerIndex].last_name + ", " + providerList[providerIndex].first_name + "</h3>" +
        "<p>" + providerList[providerIndex].email_address + "</p>" +
        "</div>" +
        "<div class=\"providerListElementRightColumn\">" +
        "<h3 style=\"font-weight: normal\">" + providerList[providerIndex].practice_name + "</h3>" +
        "<p>" + providerList[providerIndex].specialty + "</p>" +
        "</div>" +
        "</div>" +
        "</li>";
}

function escapeHtml(unsafeText) {
    return unsafeText
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function dynamicSort(property) {
    var sortOrder = 1;
    if($("#sortDirectionCheckbox").is(":checked")) {
        sortOrder = -1;
    }
    return function (a,b) {
        var result = (a[property].toLowerCase() < b[property].toLowerCase()) ? -1 : (a[property].toLowerCase() > b[property].toLowerCase()) ? 1 : 0;
        return result * sortOrder;
    }
}

function sortAndGenerateProviderList(providerDirectoryList){
    if(sortProperty != "sort_by"){
        providerList.sort(dynamicSort(sortProperty));
        providerDirectoryList.empty();
        generateProviderList(providerDirectoryList);
    }
}

function generateProviderList(providerDirectoryList){
    for(var i = 0; i < providerList.length; i++) {
        providerDirectoryList.append(createListElementString(providerList, i));
    }
}
