/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++  ESERCIZIO  +++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ *//* 
Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse (quindi tutto statico);
Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando invia il testo viene aggiunto al thread sopra, come messaggio verde (quindi solo quello NON aggiungiamo dinamicamente anche quello bianco di risposta) 
BONUS: (ma solo se il resto è fatto)
quando clicco sull’input e quindi il cursore è pronto a scrivere per l’inserimento messaggio, l’icona cambia;
se lo volete fare tenetelo pure nella cartella principale.

Milestone 2:
Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

Milestone 3:
Click sul contatto mostra la conversazione del contatto cliccato,
è possibile inserire nuovi messaggi per ogni conversazione
Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato

*/
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* +++++++++++++++++++++++++++++++  SVOLGIMENTO  ++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

$(document).ready(function(){
    // variabili di riferimento a elemendi del DOM
    var sendingMsg = $('#sending_message'); // input text per invio dei messaggi
    var chat_space = $('.container_right_chatSpace'); // spazio dedicato alla conversazione
    var single_chat_name = $('.single_chat_name'); // nome dell'amico, preso dalla lista conversazioni
    
    
    //al click del pulsante di invio messaggio
    $('.sendMsg').click(sendMessage);

    
    // alla pressione del tasto invio, invia messaggio
    sendingMsg.keypress(function (e) {
        var key = e.which;
        if(key == 13){
            sendMessage();
        }
    });  

    /* nel campo di invio testo:
    controlla se c'è testo cosi da scegliere quale tasto mostrare */
    sendingMsg.keyup(function(){
        if($(this).val() == ''){
            $('#send').hide();
            $('#vocal_msg').show();
        }else{
            $('#send').show();
            $('#vocal_msg').hide();
            }
        });
      
    
    /* Filtro per la lista chat all'inserimento di caratteri da tastiera */
    $('#searchField').keyup(function(){
        // salvo input utente in campo del filtro
        var testoInserito = $(this).val();
        // ciclo tra tutti i nomi della lista chat
        single_chat_name.each(function(){
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


    /* Nel messaggio inviato o ricevuto:
    al passaggio del mouse si mostra/nasconde il bottone per l'info menu */
    chat_space.on('mouseover','.chat_message', function(){
        $(this).find('.fa.fa-chevron-down').show();
    })
    chat_space.on('mouseleave','.chat_message', function(){
        $(this).find('.fa.fa-chevron-down').hide();
    })

    /* Nel messaggio inviato o ricevuto
    al click del mouse sul pulsante del menu-messaggio appare il menu */
    chat_space.on('click','.chat_menu_btn', function(){
        $(this).siblings('.msg_info').show();
    })
    
    /* Nel menù del messaggio inviato o ricevuto:
    Se clicco sul secondo elemento (cancella), cancella il messaggio */
    chat_space.on('click','ul li:last-child', function(){
        $(this).parent().parent().parent().remove();
    })

    /* Nel menù del messaggio inviato o ricevuto:
    Se faccio il mouseleave esco dal menù */
    chat_space.on('mouseleave','.msg_info', function(){
        $(this).hide();
    })
    
    /* Visualizzare ed aprire la conversazione selezionata */
    $('.single_chat').click(function(){
        // cambio stile per la selezione
        $('.single_chat').removeClass('chat_selected');
        $(this).addClass('chat_selected');
        
        //assegno l'avatar dell'amico selezionato all'avatar della conversazione attiva
        var avatarSelected = $('.chat_selected>img').attr('src');
        $('#friend_avatar>img').attr('src', avatarSelected);
        
        //assegno il nome dell'amico selezionato al nome dell'amico nella conversazione attiva
        var nameFriendSelected = $('.chat_selected').find(single_chat_name).text();
        $('#friend_selected').text(nameFriendSelected);
        
        
        /* Funzione per cambiare conversazione */
        
        chat_space.each(function(){ //scorro tra tutte le conversazioni 
            /* e controllo che ci sia corrispondenza tra attributo-proprietà della chat selezionata 
            e attributo-proprietà della conversazione  */
            if($('.chat_selected').data('singlechat') == $(this).data('conversazione')){
                // se vero nascondo tutte le altre conversazioni
                chat_space.removeClass('active');
                //e visualizzo la conversazione corrispondente
                $(this).addClass('active');
            }
        })
    })   


/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++++  FUNZIONI  ++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    
       // funzione che invia il messaggio
    function sendMessage(){
        /* salvo testo messaggio nella variabile */                       
        var textToSend = sendingMsg.val();
        
        // controllo se il campo di testo è vuoto o ha uno spazio vuoto
        if(textToSend == "" || textToSend == " "){
            //non cambia nulla
        }else{
        //lancio funzione e gli passo il messaggio e stampo html
        sendByUser(textToSend);

        //svuoto il campo di testo 
        sendingMsg.val('');

        // lancio con 1 secondo di ritardo la risposta dell'amico
        setTimeout(sendByFriend, 1000);
        }
    }
 
    /* appendo html con nuovo messaggio */
    function sendByUser(messaggio){
     $('.container_right_chatSpace.active').append('<div class="chat_message user_msg"><a class="chat_menu_btn" href="#"><i class="fa fa-chevron-down"></i></a><div class="message"><p>' + messaggio + '</p></div><div class="msg_info"><ul><li>Info</li><li>Cancella</li></ul></div><small>15:40</small></div>');
    }
    /* appendo html con nuovo messaggio di risposta */
    function sendByFriend(){
        $('.container_right_chatSpace.active').append('<div class="chat_message friend_msg"><a class="chat_menu_btn" href="#"><i class="fa fa-chevron-down"></i></a><div class="message"><p>Ok!</p></div><div class="msg_info"><ul><li>Info</li><li>Cancella</li></ul></div><small>15:40</small></div>');
    }   
});