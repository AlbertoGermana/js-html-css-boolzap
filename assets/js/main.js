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
    // dichiaro variabili di riferimento
    var sendingMsg = $('#sending_message');
    var searchField = $('#searchField');
    var singleChatName = $('.single_chat_name');

    //al click del pulsante invia messaggio
    $('.sendMsg').click(sendMessage);
    
    // alla pressione del tasto invio, invia messaggio
    sendingMsg.keypress(function (e) {
        var key = e.which;
        if(key == 13){
            sendMessage();
        }
    });  

    // controlla se c'è testo nel campo cosi da scegliere quale tasto mostrare
    sendingMsg.keyup(function(){
        if($(this).val() == ''){
            $('#send').hide();
            $('#vocal_msg').show();
        }else{
            $('#send').show();
            $('#vocal_msg').hide();
            }
        });
      
    
    // Filtro degli amici nella lista all'inserimento di caratteri da tastiera
    searchField.keyup(function(){
        // salvo input utente in campo del filtro
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
        });
    });
    // al mouse hover del singolo messaggio appare la freccia del menu
    $('.chat_message').mouseover(function(){
        $(this).children().children('.fa.fa-chevron-down').show();
    })
    // al mouse out del singolo messaggio scompare la freccia del menu
    $('.chat_message').mouseleave(function(){
        $(this).children().children('.fa.fa-chevron-down').hide();
    })


    ////////////////////// funzioni //////////////////////////
    
       // funzione che invia il messaggio
       function sendMessage(){
           /* salvo testo messaggio nella variabile */                       
           var textToSend = sendingMsg.val();
           
           // controllo se il campo di testo è vuoto o ha uno spazio vuoto
           if(textToSend == "" || textToSend == " "){
               
           }else{
           //lancio funzione e gli do in pasto il messagio in modo da stampare html con il messaggio
           sendByUser(textToSend);
    
           //svuoto il campo di testo 
           sendingMsg.val('');
    
           // lancio con 1 secondo di ritardo la risposta dell'amico
           setTimeout(sendByFriend, 1000);
           }
       }
    
       /* appendo html con nuovo messaggio */
       function sendByUser(messaggio){
           $('.container_right_chatSpace').append('<div class="chat_message user_msg"><a href=""><i class="fa fa-chevron-down"></i></a><p>' + messaggio + '</p><small>15:40</small></div>');
       }
       /* appendo html con nuovo messaggio di risposta */
       function sendByFriend(){
           $('.container_right_chatSpace').append('<div class="chat_message friend_msg"><a href=""><i class="fa fa-chevron-down"></i></a><p>' + 'Ok!' + '</p><small>15:40</small></div>');
       }
});