	var Dairy = new Array();

        $(document).ready(function () { // Загружаємо повідомлення 
            loadPHP();
        })

        function savePHP() {
            var jsonString = JSON.stringify(Dairy);
            $.ajax({
                type: "POST",
                url: "PHPsave.php",
                data: "data=" + jsonString,
                success: function (html) {
                }
            });
            return false;
        }
        function addRecord() {  // Створюємо елементи для додавання повідомлення
            $('#message').html('<p>Input topic name</p><div><input type="text" id="usermessagename" /><input type="button" id="setName" value="Add message!" onclick="addMessage()" /></div><br/><textarea name="comment" id="txtarea" rows="24" cols="50" form="usrform"></textarea>')
        }
        function changeRecord(num) {
            $('#message').html('<p>Input topic name</p><div><input type="text" value="' + Dairy[num][1] + ' " id="usermessagename" /></div><br/><textarea name="comment" id="txtarea" rows="24" cols="50" form="usrform">' + Dairy[num][2] + '</textarea>' + 
                '<br/><input type="button" id="setName" value="Edit message!" onclick="editMessage(' + num + ')" /><input type="button" id="remMessage" value="Remove message!" onclick="removeMessage(' + num + ')" />')
        }
        function loadPHP() {  // Із XML-файлу сервера загружаємо дані в масив записів Dairy
            $.ajax({
                type: "GET",
                url: "PHPload.php",
                dataType: "xml",
                success: function (xml) {
                    var i = 0;
                    $(xml).find('message').each(function () {
                        var tmp = new Array();
                        tmp[0] = $(this).find('date').text();
                        tmp[1] = $(this).find('name').text();
                        tmp[2] = $(this).find('text').text();
                        Dairy[i] = tmp;
                        i += 1;
                    });
                    refreshTopics();
                },
                error: function () {
                    alert("The XML File could not be processed correctly.");
                }
            });
        }

        function refreshTopics() { // Загружаємо елементи повідомлень із вмісту масиву записів Dairy 
            var s = "";
            for (var i = 0; i < Dairy.length; i++) {
                s += "<div><div><a href='javascript:changeRecord(" + i + ")'>" + Dairy[i][1] + "</a></div<div><p>" + Dairy[i][0] + "</p></div></div><br/>";
            }
            $('#topics').html(s);
        }

        function addMessage() {   // Додаємо до бази даних нове повідомлення
            var tmp = new Array();
            var d = new Date();
            tmp[0] = d.getDate() + '.' + (d.getMonth()+1) + '.' + d.getFullYear() + 'p';
            tmp[1] = $('#usermessagename').val();
            tmp[2] = $('#txtarea').val();
            Dairy[Dairy.length] = tmp;
            refreshTopics();
        }

        function editMessage(num) {
            var tmp = new Array();

            var d = new Date();
            tmp[0] = d.getDate() + '.' + (d.getMonth()+1) + '.' + d.getFullYear() + 'p';
            console.log(tmp[0]);
            tmp[1] = $('#usermessagename').val();
            tmp[2] = $('#txtarea').val();
            Dairy[num] = tmp;
            refreshTopics();
        }

        function removeMessage(num) {
            for(var i = num; i + 1 < Dairy.length; i++)
            {
                Dairy[i] = Dairy[i + 1];
            }
            Dairy[Dairy.length - 1] = null;
            Dairy.length--;
            refreshTopics();
        }