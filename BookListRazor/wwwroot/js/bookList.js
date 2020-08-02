var dataTable
$(document).ready(function () { loadDataTable() })

function loadDataTable() {
    //populate data table with Get request from the server , the route api/Book is the same in BookController.cs
    dataTable = $('#DT_load').DataTable(
        {
            "ajax": {
                "url": "/api/Book",
                "type": "GET",
                "datatype": "json"
            },
            "columns": [
                { "data": "name", "width": "25%" },
                { "data": "author", "width": "25%" },
                { "data": "isbn", "width": "25%" },
                {
                    "data": "id", "render": function (data) {
                        return `
                        <div class="text-center">
                            <a href="BookList/Upsert?id=${data}" class="btn btn-success btn-sm" style="cursor:pointer;width:70px;">Edit</a>
&nbsp
<a  class="btn btn-danger btn-sm text-white" style="cursor:pointer;width:70px;" onClick= Delete('/api/book?id='+${data})>Delete</a>
</div>

                                `;
                    }, "width": "25%"
                }
            ],
            "language":
            {
                "emptyTable": "No data available"
            }, "width": "100%"
        })
}

//delete a book using delete request from the server, the request is constructed in the button's tag
//as api / book ? id = requestedId
function Delete(url) {
    swal({
        title: "are you sure ?",
        text: "once deleted, this item cannot be retrieved",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((deleting) => {
        if (deleting) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message)

                        dataTable.ajax.reload()
                        $("#DT_Razor").load(location.href + " #DT_Razor");
                    }
                    else {
                        toastr.error(data.message)
                    }
                }
            })
        }
    })
}