/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++  ESERCIZIO  +++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse (quindi tutto statico);
Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando invia il testo viene aggiunto al thread sopra, come messaggio verde (quindi solo quello NON aggiungiamo dinamicamente anche quello bianco di risposta) 
BONUS: (ma solo se il resto è fatto)
quando clicco sull’input e quindi il cursore è pronto a scrivere per l’inserimento messaggio, l’icona cambia;
se lo volete fare tenetelo pure nella cartella principale.
*/

/* Milestone 2:
Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina) */

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* +++++++++++++++++++++++++++++++  SVOLGIMENTO  ++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

$(document).ready(function(){
    
    var sendingMsg = $('#sending_message');
    var searchField = $('#searchField');
    var singleChatName = $('.single_chat_name');
    //debug//
    var tastoCercaContatto = $('#chatList_search>i');

    //al click del pulsante invia. 
    $('.sendMsg').click(
        function(){
            /* salvo testo messaggio nella variabile */                       
            var textToSend = sendingMsg.val();
            //lancio funzione e gli do in pasto il messagio in modo da stampare html con il messaggio
            sendByUser(textToSend);

            //svuoto il campo di testo 
            sendingMsg.val('');

            // lancio con 1 secondo di ritardo la risposta dell'amico
            setTimeout(sendByFriend, 1000);
            
        }
    )
    sendingMsg.keyup(
        function(){
            if($(this).val() == ''){
                $('#send').hide();
                $('#vocal_msg').show();
            }else{
                $('#send').show();
                $('#vocal_msg').hide();}
        }
    )


    /* inserisco html per inserire nuovo messaggio inviato */
    function sendByUser(messaggio){
        $('.container_right_chatSpace').append('<div class="chat_message user_msg"><a href=""><i class="fa fa-chevron-down"></i></a><p>' + messaggio + '</p><small>15:40</small></div>');
    }
    /* messaggio di risposta */
    function sendByFriend(){
        $('.container_right_chatSpace').append('<div class="chat_message friend_msg"><a href=""><i class="fa fa-chevron-down"></i></a><p>' + 'Ok!' + '</p><small>15:40</small></div>');
    }


// filtro contatti
  // all'inserimento di caratteri da tastiera
  searchField.keyup(function(){
          // salvarmi input utente in campo del filtro
        var testoInserito = searchField.val();
        
        // ciclo tra tutti i nomi della lista chat
        singleChatName.each(function(){
            // se il testo digitato è incluso tra i nomi
            if($(this).text().toLowerCase().includes(testoInserito.toLowerCase())){
                /* mostro i risultati */
                $(this).parent().parent().show();
             // se il testo digitato non è incluso tra i nomi
            }else{
                // escludo quelli che non contengono le lettere digitate
                $(this).parent().parent().hide();
            }        
        })
    })  
});


/*  to do list:
Inserire il tasto "invio" per l'invio dei messaggi
Sistemare pulsante di invio microfono-aeroplano
inserire mousein e mouseover sul singolo messaggio per show/hide freccia opzioni
controllo che non mandi messaggi vuoti
*/