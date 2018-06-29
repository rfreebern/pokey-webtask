var Pokey = function (ctx, done) {
    var cheerio = require('cheerio@0.19.0');
    var fetch = require('isomorphic-fetch@2.2.0');

    if (typeof ctx.data.text === 'undefined') {
        done('You must provide a "text" querystring parameter.');
    }

    termEncoded = encodeURIComponent(ctx.data.text);

    fetch('http://yellow5.com/pokey/search/?kw=' + termEncoded)
        .then(function (response) {
            if (response.status >= 400) {
                done(
                    null,
                    'Sorry, there was an error connecting to the server.'
                );
            }
            return response.text();
        })
        .then(function (text) {
            var $ = cheerio.load(text);
            var strips = $('h3');
            var links = $('a');
            var images = $('img');
            var texts = $('i');

            if (strips.length === 0) {
                done(
                    null,
                    'Sorry, that search returned no results.'
                );
            }

            var results = new Array(strips.length).fill().map(Object);
            strips.each(function (i, element) {
                results[i].title = $(element).text();
            });
            links.each(function (i, element) {
                results[i].link = $(element).attr('href');
            });
            images.each(function (i, element) {
                results[i].image = $(element).attr('src');
            });
            texts.each(function (i, element) {
                results[i].text = $(element).text();
            });

            var s = Math.floor(Math.random()*results.length);
            return done(
                null,
                {
                    response_type: 'in_channel',
                    attachments: [
                        {
                            fallback: results[s].text,
                            title: results[s].title,
                            title_link: results[s].link,
                            image_url: results[s].image
                        }
                    ]
                }
            );
        });
};
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Pokey;
}
