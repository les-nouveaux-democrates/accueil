$('#read-more').click(function(){
	$('#tribune-contenu').addClass('read-more')
	$(this).fadeOut()
})

function loadPortraits() {
	// Tries to get data from the Sheets api. Otherwise, retries 200ms later.
	if (callPortraits.responseJSON === undefined) setTimeout(loadPortraits, 200)
	else buildPortraits(callPortraits.responseJSON.feed.entry) 
}

function buildPortraits(people) {
	// Builds the HTML structure around a portrait.
	$.each(people, function(i, person) {
		var nom = person.title.$t
			details = person.content.$t.replace('prénom: ', '')
				.replace(', photo: ','|')
				.replace(', description: ','|')
				.replace(', citation: ','|')
				.replace(', statut: ','|')
				.replace(', actif: ','|')
				.split('|')
			prenom = details[0]
			image = details[1]
			description = details[2]
			citation = details[3]
			statut = details[4]
			actif = details[5]

		if (statut==="Listeux") $('#listeux').append('<div id="portrait-' + i + '" class="portrait-box"></div>')
		if (statut==="Soutien") $('#copains').append('<div id="portrait-' + i + '" class="portrait-box"></div>')

		$('#portrait-' + i)
			.attr('data-name', prenom + ' ' + nom)
			.attr('data-description', description)
			.attr('data-image', image)
			.attr('data-quote', citation)
			.attr('data-status', statut)
			.attr('data-active', actif)
	})

	var datubercounter = 0

	$('#listeux > div, #copains > div').each(function(){
		var $membre = $(this)
			name = $membre.attr('data-name')
			image = $membre.attr('data-image')
			quote = $membre.attr('data-quote')
			description = $membre.attr('data-description')
			status = $membre.attr('data-status')
			active = $membre.attr('data-active')
			randomDelay = '.' + (Math.floor(Math.random() * 10 ) + 1).toString() + 's'
		if (active==="Non") {
			image = "http://imgur.com/8Nc65xR.png"
			name = "???"
			description = "Pas encore dévoilé"
		}


		$(this).addClass('col-sm-6 col-md-4 col-lg-2 text-center wow flipInY')
		if (datubercounter % 5 === 0) $(this).addClass('col-lg-offset-1')
		datubercounter += 1
		$(this).attr('data-wow-delay', randomDelay).attr('data-wow-duration', '3s' )
		$(this).append('<div class="portrait" style="background-image: url(&quot;' + image + '&quot;)"></div>')
		$(this).append('<h3>' + name + '</h3>')
		if (typeof description !== "undefined") $(this).append('<p class="description">' + description + '</p>')
	//	if (typeof quote !== "undefined") $(this).append('<hr><p class="quote">' + quote + '</p>')
	})
}
	
var api = "https://spreadsheets.google.com/feeds/list/1cFiTd89Hbtzp_Gd0lGm8Z00ZMdI4MQY2DifmG_Fv2iM/1/public/basic?alt=json"

callPortraits = $.ajax(api)
loadPortraits()

var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
var is_safari = navigator.userAgent.indexOf("Safari") > -1;
var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
if ((is_chrome)&&(is_safari)) {is_safari=false;}
if ((is_chrome)&&(is_opera)) {is_chrome=false;}

if (is_safari) $('.wow').removeClass('wow')