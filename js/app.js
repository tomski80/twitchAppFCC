'use strict';

$(function() {

    function renderDOM(template){    
        var html = template(streamInfoCollection);
        $('#result').html(html);
    }

    var theTemplateScript = $('#content-row').html();
    var theTemplate = Handlebars.compile(theTemplateScript);



    var streamNames = ['streamerhouse','freecodecamp', 'dieserpan', 
            'gaming_artist', 'cretetion', 'storbeck', 
            'habathcx','RobotCaleb', 'noobs2ninjas'],
        streamInfoCollection = []; 

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
                renderDOM(theTemplate);
            });
    });
});
