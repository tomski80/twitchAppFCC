'use strict';

$(function() {

    function renderDOM(streamsCollection){    
        var html = theTemplate(streamsCollection);
        $('#result').html(html);
    }

    var theTemplateScript = $('#content-row').html();
    var theTemplate = Handlebars.compile(theTemplateScript);

    var streamNames = ['streamerhouse','freecodecamp', 'dieserpan', 
            'gaming_artist', 'cretetion', 'storbeck', 
            'habathcx','RobotCaleb', 'noobs2ninjas'],
        streamInfoCollection = [],
        streamsOnline = [],
        streamsOffline = [],
        streamsSearchedFor = [];


    $.ajaxSetup({ 
        headers: {
            'Client-ID': 'qek5i60s0qwqduvrqo3fotxjpjgg49'
        }
    });

    streamNames.forEach( function(name){
        $.getJSON('https://api.twitch.tv/kraken/streams/' + name,
            function (data){
                var streamInfo = {};
                if(data.stream){

                    streamInfo.name = data.stream.channel.name.toUpperCase(),
                    streamInfo.logoURL =  data.stream.channel.logo,
                    streamInfo.status = data.stream.channel.status;
                    streamInfo.link = 'https://www.twitch.tv/'+name;
                    streamInfo.class = 'streaming';

                    streamInfoCollection.push(streamInfo);
                }else{

                    streamInfo.name = name.toUpperCase();
                    streamInfo.logoURL = 'images/default1.jpg';
                    streamInfo.status = '';
                    streamInfo.class = '';

                    streamInfoCollection.push(streamInfo);
                }
            });
    });

    $(document).ajaxStop(function() {

        streamInfoCollection.sort( function(a,b){
            if( a.name < b.name) {
                return -1;
            }
            if( b.name < a.name){
                return 1;
            }
            return 0;
        });
        renderDOM(streamInfoCollection);

        streamsOnline = streamInfoCollection.filter( function(elem){
            return elem.status;
        });

        streamsOffline = streamInfoCollection.filter( function(elem){
            return !elem.status;
        });

    });

    var btnAll = $('#btn-all'),
        btnOnline = $('#btn-online'),
        btnOffline = $('#btn-offline');

    function toggleCurrentClass(btn){
        btnAll.removeClass('btn-current');
        btnOnline.removeClass('btn-current');
        btnOffline.removeClass('btn-current');
    
        btn.addClass('btn-current');
    }

    btnAll.on('click', function(){
        $('#search-input').val('');
        toggleCurrentClass(btnAll);
        renderDOM(streamInfoCollection);
    });

    btnOnline.on('click', function(){
        $('#search-input').val('');
        toggleCurrentClass(btnOnline);
        renderDOM(streamsOnline);
    });

    btnOffline.on('click', function(){
        $('#search-input').val('');
        toggleCurrentClass(btnOffline);
        renderDOM(streamsOffline);
    });
    
    $('#search-input').keyup( function(){
        var inputVal = $('#search-input').val();
        streamsSearchedFor = streamInfoCollection.filter( function(stream) {
            var len = inputVal.length;
            return stream.name.slice(0,len).toUpperCase() === inputVal.toUpperCase();
        });
        renderDOM(streamsSearchedFor);
    });

    
});
