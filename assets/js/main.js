/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++  ESERCIZIO  +++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse (quindi tutto statico);
Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando invia il testo viene aggiunto al thread sopra, come messaggio verde (quindi solo quello NON aggiungiamo dinamicamente anche quello bianco di risposta) 
BONUS: (ma solo se il resto è fatto)
quando clicco sull’input e quindi il cursore è pronto a scrivere per l’inserimento messaggio, l’icona cambia;
se lo volete fare tenetelo pure nella cartella principale.
*/

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* +++++++++++++++++++++++++++++++  SVOLGIMENTO  ++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

$(document).ready(function(){
    
    var sendingMsg = $('#sending_message');
    
    //al click del pulsante invia. 
    /* NOTA: avendo utilizzato piu avanti focusin e focusout ho dovuto mettere l'azione click all'elemento microfono perche' nel modo di cliccare giustamente il focus cambia */
    $('#vocal_msg').click(
        function(){
            /* salvo testo messaggio nella variabile */                       
            var textToSend = sendingMsg.val();
            //lancio funzione e gli do in pasto il messagio in modo da stampare html con il messaggio
            sendByUser(textToSend);
        }
    )
    /* al focus in cambio icona */
    sendingMsg.focusin(
        function(){
            $('#send').show();
            $('#vocal_msg').hide();
            
        });
    /* al focus out cambio icona */
    sendingMsg.focusout(
        function(){
            $('#send').hide();
            $('#vocal_msg').show();            
        });
    /* inserisco html per inserire nuovo messaggio inviato */
    function sendByUser(messaggio){
        $('.container_right_chatSpace').append('<div class="chat_message user_msg"><a href=""><i class="fa fa-chevron-down"></i></a><p>' + messaggio + '</p><small>15:40</small></div>');
    }








});
