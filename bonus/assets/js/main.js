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

/* 
                            ++++++++++++ BONUS +++++++++++++

Aggiunte funzionalità:
- Dinamicità delle info della conversazione attiva (Nome amico, status online-ultimo accesso, sta scrivendo) aggiungendo delle timingFunctions
- Orario effettivo nei messaggi inviati e ricevuti.
- Aggiornamento degli ultimi messaggi ricevuti e inviati, comprensivi di orario nella lista chat.  */

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* +++++++++++++++++++++++++++++++  SVOLGIMENTO  ++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

$(document).ready(function(){
    // variabili di riferimento a elemendi del DOM
    var sendingMsg = $('#sending_message'); // input text per invio dei messaggi
    var chat_space = $('.container_right_chatSpace'); // spazio dedicato alla conversazione
    var single_chat_name = $('.single_chat_name'); // nome dell'amico, preso dalla lista conversazioni
    
    //al click del pulsante di invio messaggio lancio la funzione per mandare il messaggio
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
        
        
        /* Funzione per cambiare conversazione quando seleziono chat dalla chatList */
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
    
    })// fine document.ready


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
        //lancio funzione e gli passo il messaggio e la classe
        sendByUser(textToSend, "user_msg");

        //svuoto il campo di testo 
        sendingMsg.val('');

        /* +++++ bonus +++++ */
        /* Simulo tutti gli status della barra in alto quando l'amico riceve il mio messaggio:
        dopo 3 secondi, diventa online, attesa di 3 secondi e poi scrive,
        dopo altri due secondi arriva la risposta e dopo 4 secondi l'amico si 
        disconnette facendo apparire l'ultimo accesso */
        setTimeout(nowOnline,3000);
        setTimeout(nowWriting, 6000);
        setTimeout(sendByFriend,8000);
        setTimeout(nowOnline,8000);
        setTimeout(nowOffline,12000);
        }
    }
    
    /* appendo html con nuovo messaggio */
    /* +++++ bonus +++++ 
    aggiunti: Orario dinamico nel messaggio in conversazione 
    aggiornamento testo ultimo messaggio nella lista chat
    aggiornamento orario ultimo messaggio lista chat*/
    /* utilizzo handlerbars per compilare html dinamico */
    function sendByUser(messaggio, chiScrive){
        var source = $("#msg-template").html();
        var template = Handlebars.compile(source);

        var context = { 
            "user-friend_msg": chiScrive, 
            "message": messaggio,
            "sentTime": nowTime()
        }
        var html = template(context);
        $('.container_right_chatSpace.active').append(html);
        $('.single_chat.chat_selected .lastWrite').text(nowTime);
        $('.single_chat.chat_selected .single_chat_lastMsg').text(messaggio); 
    }
    
    /* appendo html con nuovo messaggio di risposta */
    /* +++++ bonus +++++  
    aggiunti: Orario dinamico nel messaggio in conversazione 
    aggiornamento testo ultimo messaggio nella lista chat
    aggiornamento orario ultimo messaggio lista chat*/
    /* utilizzo handlerbars per compilare html dinamico */
    function sendByFriend(){
        var source = $("#msg-template").html();
        var template = Handlebars.compile(source);

        var context = { 
            "user-friend_msg": "friend_msg", 
            "message": "Ok, ricevuto!",
            "sentTime": nowTime()
        }
        var html = template(context);
        $('.container_right_chatSpace.active').append(html);
        $('.single_chat.chat_selected .lastWrite').text(nowTime);
        $('.single_chat.chat_selected .single_chat_lastMsg').text(context["message"]); 
        return context["message"];
    }
    
    /* +++++ bonus +++++ */
    // mostra la scritta: "Sta scrivendo..."
    function nowWriting(){
        $('.friend_chat_details>small').hide();
        $('.friendWriting').show();
    }
    /* +++++ bonus +++++ */
    // mostra la scritta: "Online"
    function nowOnline(){
        $('.friend_chat_details>small').hide();
        $('.friendStatus').show();
    }
    /* +++++ bonus +++++ */
    // mostra la scritta: "Ultimo accesso alle ore: ####"
    function nowOffline(){
        $('.friend_chat_details>small').hide();
        $('.lastSeen').show();
        //qui lancio funzione che raccoglie orario di sistema
        $('.lastSeenTime').text(nowTime());
    }

    /* +++++ bonus +++++ */
    // funzione che restituisce orario di sistema
    function nowTime(){
        var now = new Date();
        var minutes = now.getMinutes();
        var hours = now.getHours();
        //aggiungo uno 0 se i minuti o le ore sono meno di 10
        if(minutes <= 9){
            minutes = "0" + minutes;
        }
        if(hours <= 9){
            hours = "0" + hours;
        }
        return hours + ":" + minutes;
    }      

});