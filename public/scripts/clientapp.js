$(document).ready(function() {

    $('#submit-button').on('click', postData);


});

function postData() {
    event.preventDefault();

    var values = {};
    $.each($('#sql-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log(values);

    $.ajax({
        type: 'POST',
        url: '/people',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                getData();
            } else {
                console.log('error');
            }
        }
    });

}

function getData() {
    $.ajax({
        type: 'GET',
        url: '/people',
        success: function(data) {
            console.log(data);
            var sqlList = [];
            for(var i = 0; i < data.length; i++) {
                sqlList.push(data[i].name);
                sqlList.push(data[i].address);
                sqlList.push(data[i].city);
                sqlList.push(data[i].state);
                sqlList.push(data[i].zip_code);
                $('#displayData').append('<div><span>' + sqlList + '</span></div>');
                console.log(sqlList);
                sqlList = [];

            }

        }
    });
}

