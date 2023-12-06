function fetchOrderDetails() {
    var trackingCode = document.getElementById('trackingCode').value;
    if(trackingCode) {
        fetch('fetchOrder.php', {
            method: 'POST',
            body: JSON.stringify({ trackingCode: trackingCode }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            var orderDetailsDiv = document.getElementById('orderDetails');
            var additionalOrderDetailsDiv = document.getElementById('additionalOrderDetails');
            var errorMessageDiv = document.getElementById('errorMessage');

            errorMessageDiv.style.display = 'none';
            orderDetailsDiv.style.display = 'none';
            additionalOrderDetailsDiv.style.display = 'none';

            if(data.error) {
                errorMessageDiv.innerHTML = data.error;
                errorMessageDiv.style.display = 'block';
            } else {
                orderDetailsDiv.innerHTML = '<div class="detail">Дата прибытия: <span>' + data.arrivalDate + '</span></div>' +
                                            '<div class="detail">Статус: <span>' + data.status + '</span></div>';
                orderDetailsDiv.style.display = 'block';
            }

            if(data.additionalInfo) {
                var arrivalDate = data.additionalInfo.arrivalDate || 'Товар ещё не прибыл';
                var status = data.additionalInfo.status || 'Статус неизвестен';
                additionalOrderDetailsDiv.innerHTML = '<div class="detail"> Дата прибытия в Душанбе!: <span>' + 
                                                       arrivalDate + ' - Cтатус: ' + status + '</span></div>';
                additionalOrderDetailsDiv.style.display = 'block';
            }
        })
        .catch(error => {
            document.getElementById('errorMessage').innerHTML = 'Произошла ошибка: ' + error;
            document.getElementById('errorMessage').style.display = 'block';
        });
    }
}
