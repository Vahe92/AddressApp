$(document).ready(() => {
    $('#country').change(() => {

        const countryId = $('#country').val();

        $('#region')
            .find('option:not(:first)').remove();

        $.get(`http://localhost:5999/regions/${countryId}`, (data) => {
            data.forEach(region => {
                $('#region')
                    .append($(`<option value=${region._id}></option>`)
                        .text(region.name));
            });
        });
    });

    $('#form').submit(function (e) {

        e.preventDefault();
        var data = $(this).serializeArray();

        $.ajax({
            url: 'http://localhost:5999/users',
            type: 'POST',
            data: data,
            success: function (data) {
                $('#form').find('input[type=text], textarea').val('');
                $("#country").val($("#country option:first").val());
                $('#region').find('option:not(:first)').remove();
                $('#errorSpan').text('');
            },
            error: function (error) {
                $('#errorSpan').text(error.responseText);
            }
        });
    });

});

